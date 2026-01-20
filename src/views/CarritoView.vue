<script setup>
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const cartStore = useCartStore()
const checkoutSuccess = ref(false)

function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price)
}

async function handleCheckout() {
  if (cartStore.items.length === 0) {
    alert('Tu carrito está vacío')
    return
  }

  const confirmCheckout = confirm('¿Deseas proceder con la compra?')
  if (!confirmCheckout) return

  try {
    await cartStore.checkout()
    checkoutSuccess.value = true
    setTimeout(() => {
      checkoutSuccess.value = false
    }, 5000)
  } catch (error) {
    alert('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.')
  }
}
</script>

<template>
  <main class="flex-1">
    <!-- Page Header -->
    <div class="border-b border-border-soft py-12 px-6 md:px-12">
      <div class="max-w-[1600px] mx-auto">
        <h1 class="text-5xl md:text-6xl font-serif mb-2">Carrito de Compras</h1>
        <p class="text-neutral-500 text-sm font-light uppercase tracking-widest">Artículos seleccionados para tu compra</p>
      </div>
    </div>

    <!-- Success Message -->
    <transition name="fade">
      <div v-if="checkoutSuccess" class="bg-green-50 border border-green-200 py-4 px-6 md:px-12">
        <div class="max-w-[1600px] mx-auto text-green-700 font-semibold">
          ✓ ¡Pedido realizado con éxito! Gracias por tu compra.
        </div>
      </div>
    </transition>

    <!-- Empty Cart -->
    <div v-if="cartStore.items.length === 0" class="py-32 px-6 md:px-12">
      <div class="max-w-[600px] mx-auto text-center space-y-6">
        <div class="text-6xl mb-4">🛒</div>
        <h2 class="text-3xl font-serif">Tu carrito está vacío</h2>
        <p class="text-neutral-500 text-lg">Agrega productos desde nuestro catálogo para comenzar tu compra</p>
        <RouterLink to="/tienda" class="inline-block px-10 py-4 bg-primary text-white text-[11px] uppercase tracking-widest font-semibold hover:bg-black/90 transition-colors">
          Ver Catálogo
        </RouterLink>
      </div>
    </div>

    <!-- Cart Content -->
    <div v-else class="px-6 md:px-12 py-12">
      <div class="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Cart Table -->
        <div class="lg:col-span-2">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-border-soft">
                  <th class="py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 w-24">Producto</th>
                  <th class="py-6 px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">Descripción</th>
                  <th class="py-6 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 text-center w-32">Cantidad</th>
                  <th class="py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 text-right w-32">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-100">
                <tr v-for="item in cartStore.items" :key="`${item.id}-${item.size}`" class="hover:bg-accent-grey/50 transition-colors">
                  <!-- Product Image -->
                  <td class="py-8">
                    <div class="bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-sm w-20 border border-border-soft" 
                         :style="`background-image: url('${item.image || 'https://images.unsplash.com/photo-1488161994519-c21cc028cb0d?w=200&h=300&fit=crop'}')`">
                    </div>
                  </td>

                  <!-- Product Details -->
                  <td class="py-8 px-6">
                    <h3 class="text-primary font-semibold">{{ item.name }}</h3>
                    <p class="text-neutral-500 text-sm mt-2">{{ item.description }}</p>
                    <p class="text-neutral-400 text-xs mt-2">Talla: {{ item.size }} | Categoría: {{ item.category }}</p>
                    
                    <!-- Customization Info -->
                    <div v-if="item.customizationText" class="mt-3 pt-3 border-t border-neutral-200">
                      <p class="text-xs font-semibold text-blue-600">Personaliza tu Prenda - {{ item.customizationText }}</p>
                      <p class="text-xs text-blue-600">+{{ formatPrice(item.customizationCost) }}</p>
                    </div>
                    
                    <p class="text-primary font-semibold text-sm mt-4">{{ formatPrice(item.price) }}</p>
                  </td>

                  <!-- Quantity -->
                  <td class="py-8 px-4 text-center">
                    <div class="inline-flex items-center border border-border-soft rounded-sm">
                      <button 
                        @click="cartStore.updateQuantity(item.id, item.size, item.quantity - 1)"
                        class="px-3 py-1 text-neutral-400 hover:text-primary transition-colors font-semibold"
                      >
                        −
                      </button>
                      <span class="px-3 py-1 text-sm font-semibold w-8 text-center">{{ item.quantity }}</span>
                      <button 
                        @click="cartStore.updateQuantity(item.id, item.size, item.quantity + 1)"
                        class="px-3 py-1 text-neutral-400 hover:text-primary transition-colors font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <!-- Total & Remove -->
                  <td class="py-8 text-right pr-6">
                    <div class="flex items-center justify-between">
                      <span class="font-semibold text-primary">{{ formatPrice((item.price + item.customizationCost) * item.quantity) }}</span>
                      <button 
                        @click="cartStore.removeItem(item.id, item.size)"
                        class="text-neutral-400 hover:text-red-500 transition-colors ml-4"
                      >
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Continue Shopping -->
          <div class="mt-12 pt-8 border-t border-border-soft">
            <RouterLink to="/tienda" class="text-[11px] uppercase tracking-[0.2em] border-b border-primary pb-1 hover:opacity-70 transition-opacity inline-flex items-center gap-2">
              <svg class="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
              Continuar Comprando
            </RouterLink>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <aside class="lg:col-span-1">
          <div class="bg-accent-grey border border-border-soft p-8 sticky top-32">
            <h2 class="text-primary text-xl font-bold uppercase tracking-tight mb-8">Resumen de Orden</h2>

            <!-- Items -->
            <div class="space-y-4 mb-8">
              <div class="flex justify-between text-sm">
                <span class="text-neutral-500 uppercase tracking-widest text-[11px] font-bold">Subtotal</span>
                <span class="text-primary font-semibold">{{ formatPrice(cartStore.total) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-neutral-500 uppercase tracking-widest text-[11px] font-bold">Envío</span>
                <span class="text-primary font-semibold">A calcular</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-neutral-500 uppercase tracking-widest text-[11px] font-bold">Impuesto</span>
                <span class="text-primary font-semibold">{{ formatPrice(0) }}</span>
              </div>
            </div>

            <!-- Total -->
            <div class="border-t border-border-soft pt-6 mb-8">
              <div class="flex justify-between items-center">
                <span class="text-primary uppercase tracking-widest text-[11px] font-bold">TOTAL</span>
                <span class="text-2xl font-bold text-primary">{{ formatPrice(cartStore.total) }}</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="space-y-4">
              <button 
                @click="handleCheckout"
                :disabled="cartStore.loading"
                class="w-full bg-primary text-white py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {{ cartStore.loading ? 'Procesando...' : 'Proceder al Pago' }}
              </button>
              <button 
                @click="cartStore.clearCart"
                class="w-full border border-primary text-primary py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all"
              >
                Vaciar Carrito
              </button>
            </div>

            <!-- Items Count -->
            <div class="mt-8 pt-8 border-t border-border-soft text-center">
              <p class="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Items en carrito</p>
              <p class="text-2xl font-bold text-primary">{{ cartStore.itemCount }}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
