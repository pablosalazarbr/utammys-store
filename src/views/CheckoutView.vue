<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import axios from 'axios'

const router = useRouter()
const cartStore = useCartStore()

const currentStep = ref(1)
const shippingMethod = ref('pickup')
const paymentMethod = ref('card')

// Step 1: Información de envío
const fullName = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const neighborhood = ref('')
const city = ref('')

// Step 2: Sesión de checkout de Recurrente
const checkoutSessionId = ref(null)
const checkoutLoading = ref(false)

// Estado de procesamiento
const isProcessing = ref(false)
const paymentError = ref('')
const orderConfirmation = ref(null)

const SHIPPING_COST = 45
const STORE_ADDRESS = 'Km.14.5, Carretera a El Salvador, Centro Comercial Gran Plaza, bodega 116'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const API_BASE_URL = API_URL.replace(/\/api$/, '')

// Cargar Recurrente en el cliente (solo para verificación de sesión)
onMounted(async () => {
  // Recuperar sesión guardada si existe
  const savedSessionId = localStorage.getItem('checkout_session_id')
  if (savedSessionId) {
    checkoutSessionId.value = savedSessionId
    console.log('📋 Sesión de checkout recuperada:', savedSessionId)
  }
})

function getImageUrl(mediaPath) {
  if (!mediaPath) {
    return 'https://images.unsplash.com/photo-1488161994519-c21cc028cb0d?w=200&h=300&fit=crop'
  }
  return `${API_BASE_URL}${mediaPath}`
}

// Validar formularios
const isStep1Valid = computed(() => {
  if (!fullName.value || !email.value || !phone.value) return false
  if (shippingMethod.value === 'delivery' && (!address.value || !city.value)) return false
  return true
})

const isStep2Valid = computed(() => {
  // Solo necesitamos que la sesión de checkout esté creada
  return checkoutSessionId.value !== null
})

// Calcular total con envío
const subtotal = computed(() => cartStore.total)
const shippingCost = computed(() => shippingMethod.value === 'delivery' ? SHIPPING_COST : 0)
const total = computed(() => subtotal.value + shippingCost.value)

function goToStep(step) {
  if (step < currentStep.value) {
    currentStep.value = step
  } else if (step === currentStep.value + 1 && (currentStep.value === 1 ? isStep1Valid.value : isStep2Valid.value)) {
    currentStep.value = step
  }
}

// Inicializar sesión de checkout en Recurrente
async function initializeCheckoutSession() {
  checkoutLoading.value = true
  paymentError.value = ''

  try {
    console.log('📋 Inicializando sesión de checkout en Recurrente...')
    
    // Validar que los campos de envío estén llenos
    if (!address.value && shippingMethod.value === 'delivery') {
      paymentError.value = 'Por favor completa la dirección de envío'
      checkoutLoading.value = false
      return false
    }
    
    if (!city.value && shippingMethod.value === 'delivery') {
      paymentError.value = 'Por favor completa la ciudad'
      checkoutLoading.value = false
      return false
    }

    // Para items vacíos o sin producto_id/product_size_id, obtener los datos del producto
    let processedItems = []
    for (const item of cartStore.items) {
      if (!item.product_id && !item.product_size_id) {
        // El carrito solo tiene ID y size, necesitamos obtener el product_size_id
        // Hacemos una llamada a la API para obtener los detalles del producto
        try {
          const productRes = await axios.get(`${API_URL}/shop/products/${item.id}`)
          const product = productRes.data.data
          const sizeObj = product.sizes.find(s => s.size === item.size)
          
          if (sizeObj) {
            processedItems.push({
              product_id: item.id,
              product_size_id: sizeObj.id,
              quantity: item.quantity,
              customization_text: item.customizationText || null
            })
          }
        } catch (err) {
          console.error('Error obteniendo datos del producto:', err)
          paymentError.value = 'Error obteniendo datos del producto'
          checkoutLoading.value = false
          return false
        }
      } else {
        // Ya tiene los IDs correctos
        processedItems.push({
          product_id: item.product_id || item.id,
          product_size_id: item.product_size_id,
          quantity: item.quantity,
          customization_text: item.customizationText || null
        })
      }
    }
    
    const payload = {
      buyer_name: fullName.value,
      buyer_email: email.value,
      buyer_phone: phone.value,
      shipping_method: shippingMethod.value,
      shipping_address: address.value || 'N/A',
      shipping_neighborhood: neighborhood.value || '',
      shipping_city: city.value || 'N/A',
      items: processedItems
    }
    
    console.log('📤 Enviando payload:', payload)
    
    const response = await axios.post(`${API_URL}/shop/cart/initialize-checkout`, payload)

    if (response.data.success) {
      const sessionData = response.data.data
      checkoutSessionId.value = sessionData.session_id
      
      // Guardar en localStorage para recuperación
      localStorage.setItem('checkout_session_id', sessionData.session_id)
      localStorage.setItem('checkout_url', sessionData.checkout_url)
      
      console.log('✅ Sesión de checkout creada:', sessionData.session_id)
      console.log('🔗 Checkout URL:', sessionData.checkout_url)
      console.log('💰 Monto total:', sessionData.amount)
      
      // Retornar la URL para que se cargue después en submitOrder
      return { success: true, sessionData }
    } else {
      paymentError.value = response.data.message || 'Error inicializando checkout'
      return { success: false }
    }

  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || 'Error inicializando checkout'
    const errorDetails = error.response?.data?.errors || {}
    
    console.error('❌ Error completo:', {
      message: errorMsg,
      errors: errorDetails,
      status: error.response?.status,
      data: error.response?.data
    })
    
    paymentError.value = errorMsg
    return { success: false }
  } finally {
    checkoutLoading.value = false
  }
}

// Cargar el embedded checkout de Recurrente
function loadEmbeddedCheckout(checkoutUrl) {
  try {
    console.log('🔧 Cargando Embedded Checkout de Recurrente desde URL:', checkoutUrl)
    
    // Obtener o crear el contenedor del iframe
    const embeddedCheckoutContainer = document.getElementById('embedded-checkout')
    
    if (!embeddedCheckoutContainer) {
      console.error('❌ No se encontró el contenedor #embedded-checkout')
      paymentError.value = 'Error preparando formulario de pago'
      return
    }

    // Limpiar contenido anterior
    embeddedCheckoutContainer.innerHTML = ''

    // Crear iframe
    const iframe = document.createElement('iframe')
    iframe.src = checkoutUrl
    iframe.style.width = '100%'
    iframe.style.height = '600px'
    iframe.style.border = 'none'
    iframe.style.borderRadius = '8px'
    iframe.setAttribute('allow', 'payment')
    // Permitir navegación top-level para que las redirecciones funcionen
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation')
    iframe.id = 'recurrente-checkout-iframe'
    
    embeddedCheckoutContainer.appendChild(iframe)
    console.log('✅ Iframe de checkout creado')
    
  } catch (error) {
    console.error('❌ Error cargando embedded checkout:', error)
    paymentError.value = 'Error cargando formulario de pago'
  }
}

// Manejar éxito del pago
async function handlePaymentSuccess(paymentData) {
  try {
    console.log('📊 Pago completado! Datos recibidos:', paymentData)
    console.log('💾 El webhook de Recurrente está creando la orden en el backend...')
    
    // Esperar a que el webhook procese la orden (normalmente 2-5 segundos)
    // Hacer polling para verificar que se creó
    let maxAttempts = 30 // 30 intentos = 30 segundos máximo
    let attempt = 0
    
    while (attempt < maxAttempts) {
      try {
        // Intentar obtener la orden creada desde el webhook
        const response = await axios.get(`${API_URL}/shop/orders/latest`, {
          params: {
            email: email.value
          }
        })
        
        if (response.data.success && response.data.data.order_id) {
          console.log('✅ Orden creada con éxito:', response.data.data.order_id)
          orderConfirmation.value = response.data.data
          
          // Limpiar estado
          cartStore.clearCart()
          localStorage.removeItem('checkout_session_id')
          localStorage.removeItem('checkout_url')
          
          // Mostrar confirmación
          currentStep.value = 4
          return
        }
      } catch (err) {
        // Aún no se creó la orden, seguir intentando
      }
      
      // Esperar 1 segundo antes de intentar de nuevo
      await new Promise(resolve => setTimeout(resolve, 1000))
      attempt++
    }
    
    // Si llegamos aquí, no se creó la orden en tiempo
    console.warn('⚠️ La orden no se creó en el tiempo esperado, pero el webhook está procesando')
    console.log('Mostrando Step 4 con espera')
    
    // Mostrar confirmación de todas formas (la orden se creará en background)
    orderConfirmation.value = {
      order_id: 'PROCESSING',
      message: 'Procesando tu pago...'
    }
    currentStep.value = 4
    
  } catch (error) {
    console.error('❌ Error manejando éxito de pago:', error)
    paymentError.value = 'Error procesando el pago'
  }
}

async function submitOrder() {
  if (!isStep1Valid.value) {
    paymentError.value = 'Por favor completa los datos de envío'
    return
  }

  try {
    // SIEMPRE crear una nueva sesión (no usar una anterior)
    console.log('📋 Iniciando proceso de checkout...')
    console.log('🔄 Limpiando sesión anterior si existe')
    
    // Guardar email en localStorage para que PaymentProcessingView pueda recuperarlo
    localStorage.setItem('checkout_email', email.value)
    
    // Limpiar sesión anterior
    checkoutSessionId.value = null
    localStorage.removeItem('checkout_session_id')
    localStorage.removeItem('checkout_url')
    
    const result = await initializeCheckoutSession()
    
    if (result.success && result.sessionData) {
      console.log('✅ Sesión creada exitosamente, moviendo a Step 2')
      
      // Cambiar a Step 2 PRIMERO para que se renderice el contenedor
      currentStep.value = 2
      
      // Esperar a que Vue renderice el DOM
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // AHORA cargar el embedded checkout
      loadEmbeddedCheckout(result.sessionData.checkout_url)
    } else {
      console.error('❌ Falló la creación de la sesión')
    }
  } catch (error) {
    console.error('❌ Error en submitOrder:', error)
    paymentError.value = 'Error procesando el pedido'
  }
}

function backToCart() {
  router.back()
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    minimumFractionDigits: 2,
  }).format(price)
}
</script>

<template>
  <main class="flex-1 min-h-screen bg-white">
    <!-- Header -->
    <header class="border-b border-border-soft w-full">
      <div class="max-w-full px-6 md:px-12 py-8">
        <div class="flex items-center justify-between">
          <h1 class="text-4xl font-serif">Checkout</h1>
          <button 
            @click="backToCart"
            class="text-sm text-neutral-400 hover:text-neutral-600 transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            Volver al Carrito
          </button>
        </div>

        <!-- Progress Indicator -->
        <div class="mt-8 flex items-center gap-4">
          <div 
            v-for="step in 4" 
            :key="step"
            class="flex items-center"
          >
            <div 
              @click="goToStep(step)"
              :class="{
                'bg-primary text-white': currentStep >= step,
                'bg-neutral-200 text-neutral-400': currentStep < step
              }"
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold cursor-pointer hover:opacity-80 transition-opacity"
            >
              {{ step }}
            </div>
            <div 
              v-if="step < 4"
              :class="currentStep > step ? 'bg-primary' : 'bg-neutral-200'"
              class="h-1 w-12 mx-2"
            ></div>
          </div>
        </div>

        <!-- Step Labels -->
        <div class="mt-4 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-neutral-400">
          <span :class="currentStep >= 1 ? 'text-primary' : ''">Envío</span>
          <span :class="currentStep >= 2 ? 'text-primary' : ''">Pago</span>
          <span :class="currentStep >= 3 ? 'text-primary' : ''">Revisión</span>
          <span :class="currentStep >= 4 ? 'text-primary' : ''">Confirmación</span>
        </div>
      </div>
    </header>

    <!-- Content -->
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Left: Form -->
        <div class="lg:col-span-2">
          <!-- Step 1: Shipping Information -->
          <div v-if="currentStep === 1" class="space-y-8">
            <div>
              <h2 class="text-2xl font-serif mb-6">Información de Envío</h2>
              
              <!-- Shipping Method Selection -->
              <div class="mb-8 pb-8 border-b border-border-soft space-y-4">
                <h3 class="text-sm font-bold uppercase tracking-widest text-neutral-400">Método de Entrega</h3>
                
                <!-- Pickup Option -->
                <label class="flex items-start gap-4 p-4 border border-border-soft rounded-sm cursor-pointer hover:bg-neutral-50 transition-colors" :class="shippingMethod === 'pickup' ? 'border-primary bg-blue-50' : ''">
                  <input 
                    v-model="shippingMethod" 
                    type="radio" 
                    value="pickup"
                    class="mt-1"
                  />
                  <div class="flex-1">
                    <p class="font-semibold">Retiro en Tienda</p>
                    <p class="text-sm text-neutral-500 mt-1">{{ STORE_ADDRESS }}</p>
                    <p class="text-sm font-semibold text-green-600 mt-2">Gratis</p>
                  </div>
                </label>

                <!-- Delivery Option -->
                <label class="flex items-start gap-4 p-4 border border-border-soft rounded-sm cursor-pointer hover:bg-neutral-50 transition-colors" :class="shippingMethod === 'delivery' ? 'border-primary bg-blue-50' : ''">
                  <input 
                    v-model="shippingMethod" 
                    type="radio" 
                    value="delivery"
                    class="mt-1"
                  />
                  <div class="flex-1">
                    <p class="font-semibold">Entrega a Domicilio</p>
                    <p class="text-sm text-neutral-500 mt-1">Entrega en la dirección que indiques</p>
                    <p class="text-sm font-semibold text-primary mt-2">+Q{{ SHIPPING_COST }}.00</p>
                  </div>
                </label>
              </div>

              <!-- Contact Information -->
              <div class="space-y-4 mb-8">
                <h3 class="text-sm font-bold uppercase tracking-widest text-neutral-400">Información de Contacto</h3>
                
                <div>
                  <label class="text-xs text-neutral-500 font-medium mb-2 block">Nombre Completo *</label>
                  <input 
                    v-model="fullName"
                    type="text"
                    placeholder="Juan Pérez"
                    class="w-full px-4 py-3 border border-border-soft rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label class="text-xs text-neutral-500 font-medium mb-2 block">Email *</label>
                  <input 
                    v-model="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    class="w-full px-4 py-3 border border-border-soft rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label class="text-xs text-neutral-500 font-medium mb-2 block">Teléfono *</label>
                  <input 
                    v-model="phone"
                    type="tel"
                    placeholder="+502 XXXX-XXXX"
                    class="w-full px-4 py-3 border border-border-soft rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <!-- Address (show only for delivery) -->
              <div v-if="shippingMethod === 'delivery'" class="space-y-4 pb-8 border-b border-border-soft">
                <h3 class="text-sm font-bold uppercase tracking-widest text-neutral-400">Dirección de Entrega</h3>
                
                <div>
                  <label class="text-xs text-neutral-500 font-medium mb-2 block">Dirección *</label>
                  <input 
                    v-model="address"
                    type="text"
                    placeholder="Calle y número"
                    class="w-full px-4 py-3 border border-border-soft rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label class="text-xs text-neutral-500 font-medium mb-2 block">Barrio/Zona (Opcional)</label>
                  <input 
                    v-model="neighborhood"
                    type="text"
                    placeholder="Zona 1, Zona 10, etc."
                    class="w-full px-4 py-3 border border-border-soft rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label class="text-xs text-neutral-500 font-medium mb-2 block">Ciudad *</label>
                  <input 
                    v-model="city"
                    type="text"
                    placeholder="Ciudad de Guatemala"
                    class="w-full px-4 py-3 border border-border-soft rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex items-center justify-between pt-8">
              <button 
                @click="backToCart"
                class="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold uppercase tracking-widest"
              >
                Volver
              </button>
              <button 
                @click="submitOrder"
                :disabled="!isStep1Valid || checkoutLoading"
                class="px-8 py-3 bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-bold uppercase tracking-widest flex items-center gap-2"
              >
                Continuar al Pago
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
              </button>
            </div>
          </div>

          <!-- Step 2: Payment Information -->
          <div v-if="currentStep === 2" class="space-y-8">
            <div>
              <h2 class="text-2xl font-serif mb-6">Información de Pago</h2>
              
              <div class="bg-blue-50 border border-blue-200 p-4 rounded-sm mb-8">
                <p class="text-sm text-blue-900">
                  <strong>Nota:</strong> Por el momento solo aceptamos pagos con tarjeta de crédito o débito. Tu información de tarjeta se procesa de forma segura a través de Recurrente.
                </p>
              </div>

              <!-- Error message -->
              <div v-if="paymentError" class="bg-red-50 border border-red-200 p-4 rounded-sm mb-8">
                <p class="text-sm text-red-900">{{ paymentError }}</p>
              </div>

              <!-- Recurrente Embedded Checkout -->
              <div v-if="checkoutSessionId" class="space-y-4">
                <div id="embedded-checkout" class="bg-white border border-border-soft rounded-sm p-6 min-h-[400px]">
                  <!-- El embedded checkout se cargará aquí -->
                </div>
              </div>

              <!-- Loading state while creating session -->
              <div v-else class="space-y-4">
                <div class="bg-neutral-50 border border-border-soft rounded-sm p-6">
                  <p class="text-neutral-500 text-sm">Cargando formulario de pago...</p>
                  <div class="mt-4 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div class="h-full bg-primary animate-pulse" style="width: 70%"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex items-center justify-between pt-8">
              <button 
                @click="goToStep(1)"
                class="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <svg class="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                Volver
              </button>
              <button 
                v-if="!checkoutSessionId"
                @click="initializeCheckoutSession"
                :disabled="checkoutLoading || !isStep1Valid"
                class="px-8 py-3 bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-bold uppercase tracking-widest flex items-center gap-2"
              >
                {{ checkoutLoading ? 'Cargando...' : 'Cargar Formulario de Pago' }}
              </button>
            </div>
          </div>

          <!-- Step 3: Review Order -->
          <div v-if="currentStep === 3" class="space-y-8">
            <div>
              <h2 class="text-2xl font-serif mb-6">Revisión de tu Orden</h2>

              <!-- Shipping Review -->
              <div class="mb-8 pb-8 border-b border-border-soft">
                <h3 class="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Información de Envío</h3>
                <div class="space-y-2 text-sm">
                  <p><strong>Nombre:</strong> {{ fullName }}</p>
                  <p><strong>Email:</strong> {{ email }}</p>
                  <p><strong>Teléfono:</strong> {{ phone }}</p>
                  <div class="mt-3 p-3 bg-neutral-50 rounded-sm">
                    <p v-if="shippingMethod === 'pickup'" class="text-neutral-700">
                      <strong>Método de Entrega:</strong> Retiro en Tienda<br/>
                      {{ STORE_ADDRESS }}
                    </p>
                    <p v-else class="text-neutral-700">
                      <strong>Método de Entrega:</strong> Entrega a Domicilio<br/>
                      {{ address }}<span v-if="neighborhood">, {{ neighborhood }}</span><br/>
                      {{ city }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Payment Review -->
              <div class="mb-8 pb-8 border-b border-border-soft">
                <h3 class="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Información de Pago</h3>
                <div class="space-y-2 text-sm">
                  <p><strong>Método:</strong> Tarjeta de crédito/débito</p>
                  <p class="text-neutral-500 text-xs mt-2">🔒 Datos procesados de forma segura por Recurrente</p>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="bg-neutral-50 p-6 rounded-sm">
                <h3 class="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Resumen de la Orden</h3>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span>Subtotal ({{ cartStore.itemCount }} item{{ cartStore.itemCount !== 1 ? 's' : '' }})</span>
                    <span>{{ formatPrice(subtotal) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Envío</span>
                    <span>{{ shippingCost > 0 ? formatPrice(shippingCost) : 'Gratis' }}</span>
                  </div>
                  <div class="border-t border-border-soft pt-3 flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span class="text-primary">{{ formatPrice(total) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex items-center justify-between pt-8">
              <button 
                @click="goToStep(2)"
                class="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <svg class="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                Volver
              </button>
              <div class="flex flex-col items-end gap-2">
                <div v-if="paymentError" class="text-red-600 text-sm">{{ paymentError }}</div>
                <button 
                  @click="submitOrder"
                  :disabled="isProcessing"
                  class="px-8 py-3 bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-sm font-bold uppercase tracking-widest flex items-center gap-2"
                >
                  <span v-if="isProcessing">⏳ Procesando...</span>
                  <span v-else>Confirmar y Pagar {{ formatPrice(total) }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Step 4: Order Confirmation -->
          <div v-if="currentStep === 4" class="text-center space-y-6 py-12">
            <div class="text-6xl mb-4">✓</div>
            <h2 class="text-3xl font-serif">¡Orden Confirmada!</h2>
            <p class="text-neutral-500 text-lg">
              Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación en {{ email }}
            </p>
            <div class="bg-green-50 border border-green-200 p-6 rounded-sm text-left max-w-md mx-auto">
              <p v-if="orderConfirmation" class="text-sm text-green-900 font-semibold mb-3">
                <strong>Número de Orden:</strong> {{ orderConfirmation.order_number }}
              </p>
              <p v-if="orderConfirmation" class="text-sm text-green-900 font-semibold mb-4">
                <strong>Total Pagado:</strong> {{ formatPrice(orderConfirmation.total_amount) }}
              </p>
              <p class="text-sm text-green-900 mb-4">
                <strong>Próximos pasos:</strong>
              </p>
              <ul class="text-sm text-green-800 space-y-2">
                <li v-if="orderConfirmation?.shipping_method === 'pickup'">
                  • Retira tu pedido en la tienda: {{ STORE_ADDRESS }}
                </li>
                <li v-else>
                  • Recibirás tu pedido en: {{ address }}
                </li>
                <li>• Te contactaremos por teléfono: {{ phone }}</li>
              </ul>
            </div>
            <div class="flex gap-4">
              <RouterLink to="/carrito" class="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold uppercase tracking-widest">
                Volver al Carrito
              </RouterLink>
              <RouterLink to="/tienda" class="px-8 py-3 bg-primary text-white hover:bg-primary/90 transition-all text-sm font-bold uppercase tracking-widest">
                Ir a la Tienda
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Right: Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-20 bg-neutral-50 border border-border-soft p-6 rounded-sm space-y-6">
            <h3 class="text-sm font-bold uppercase tracking-widest text-neutral-400">Resumen de tu Carrito</h3>

            <!-- Items -->
            <div class="space-y-4 max-h-80 overflow-y-auto">
              <div 
                v-for="item in cartStore.items" 
                :key="`${item.id}-${item.size}`"
                class="flex gap-3 pb-4 border-b border-border-soft last:border-0"
              >
                <div class="w-12 h-16 bg-neutral-200 rounded-sm flex-shrink-0 bg-center bg-cover" :style="`background-image: url('${item.image}')`"></div>
                <div class="flex-1 text-xs">
                  <p class="font-semibold text-neutral-900">{{ item.name }}</p>
                  <p class="text-neutral-500">Talla: {{ item.size }}</p>
                  <p class="text-neutral-500">Cantidad: {{ item.quantity }}</p>
                  <p class="text-primary font-semibold mt-1">{{ formatPrice((item.price + item.customizationCost) * item.quantity) }}</p>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-border-soft"></div>

            <!-- Totals -->
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-neutral-600">Subtotal</span>
                <span class="font-semibold">{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-neutral-600">Envío</span>
                <span class="font-semibold">{{ shippingCost > 0 ? formatPrice(shippingCost) : 'Gratis' }}</span>
              </div>
              <div class="border-t border-border-soft pt-3 flex justify-between">
                <span class="font-bold">Total</span>
                <span class="font-bold text-primary text-lg">{{ formatPrice(total) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
input[type="radio"] {
  accent-color: #195de6;
}
</style>
