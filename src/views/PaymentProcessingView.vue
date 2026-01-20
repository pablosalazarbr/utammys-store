<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import axios from 'axios'

const router = useRouter()
const cartStore = useCartStore()
const status = ref('processing')
const message = ref('Procesando tu pago...')

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

onMounted(async () => {
  try {
    // Obtener el checkout_id de la URL o localStorage
    const params = new URLSearchParams(window.location.search)
    const checkoutId = params.get('checkout_id') || localStorage.getItem('checkout_session_id')
    const email = localStorage.getItem('checkout_email')
    
    console.log('📊 Payment processing page')
    console.log('   checkout_id:', checkoutId)
    console.log('   email:', email)
    
    if (!checkoutId || !email) {
      throw new Error('Missing checkout_id or email')
    }
    
    // Obtener items del localStorage (guardados en CheckoutView)
    const savedItems = localStorage.getItem('checkout_items')
    const cartItems = savedItems ? JSON.parse(savedItems) : cartStore.items
    
    if (!cartItems || cartItems.length === 0) {
      throw new Error('No items in cart')
    }

    console.log('📦 Creando orden con items:', cartItems)

    // Crear la orden AHORA (antes de que llegue el webhook)
    const orderResponse = await axios.post(`${API_URL}/shop/orders/create-from-checkout`, {
      checkout_id: checkoutId,
      buyer_name: localStorage.getItem('checkout_buyer_name') || 'Customer',
      buyer_email: email,
      buyer_phone: localStorage.getItem('checkout_buyer_phone') || '',
      shipping_method: localStorage.getItem('checkout_shipping_method') || 'pickup',
      shipping_address: localStorage.getItem('checkout_shipping_address') || 'N/A',
      shipping_city: localStorage.getItem('checkout_shipping_city') || 'N/A',
      items: cartItems.map(item => ({
        product_id: item.product_id || item.id,
        product_size_id: item.product_size_id,
        quantity: item.quantity,
        customization_text: item.customization_text || null
      }))
    })

    if (orderResponse.data.success) {
      console.log('✅ Orden creada exitosamente:', orderResponse.data.data.order_id)
      
      // Esperar a que el webhook verifique el stock (máximo 20 segundos, 2 segundos entre requests)
      console.log('⏳ Esperando confirmación del webhook...')
      for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        try {
          const checkResponse = await axios.get(`${API_URL}/shop/orders/latest`, {
            params: { email: email }
          })
          
          if (checkResponse.data.success) {
            const order = checkResponse.data.data
            if (order.payment_status === 'completed') {
              console.log('✅ Webhook confirmado! Status:', order.status)
              break
            }
          }
        } catch (err) {
          console.log('⏳ Esperando webhook...')
        }
      }
      
      status.value = 'success'
      message.value = 'Pago procesado exitosamente. Recibirás la confirmación de tu pedido en tu correo electrónico.'
      
      // Limpiar localStorage
      localStorage.removeItem('checkout_session_id')
      localStorage.removeItem('checkout_url')
      localStorage.removeItem('checkout_email')
      localStorage.removeItem('checkout_buyer_name')
      localStorage.removeItem('checkout_buyer_phone')
      localStorage.removeItem('checkout_shipping_method')
      localStorage.removeItem('checkout_shipping_address')
      localStorage.removeItem('checkout_shipping_city')
      localStorage.removeItem('checkout_items')
      
      // Limpiar carrito
      cartStore.clearCart()
    } else {
      throw new Error(orderResponse.data.message || 'Failed to create order')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
    status.value = 'error'
    message.value = 'Error procesando tu pago. Intenta nuevamente.'
    
    setTimeout(() => {
      router.push('/checkout')
    }, 3000)
  }
})
</script>

<template>
  <main class="flex-1 min-h-screen bg-white flex items-center justify-center">
    <div class="text-center space-y-4">
      <div v-if="status === 'processing'" class="space-y-4">
        <div class="inline-block animate-spin">
          <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <p class="text-lg text-gray-600">{{ message }}</p>
      </div>
      
      <div v-else-if="status === 'success'" class="space-y-4">
        <div class="inline-block">
          <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </div>
        <p class="text-lg text-gray-600">{{ message }}</p>
      </div>
      
      <div v-else class="space-y-4">
        <div class="inline-block">
          <svg class="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
        </div>
        <p class="text-lg text-gray-600">{{ message }}</p>
      </div>
    </div>
  </main>
</template>
