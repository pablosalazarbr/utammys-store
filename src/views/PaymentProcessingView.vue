<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const status = ref('processing')
const message = ref('Verificando tu pago...')

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

onMounted(async () => {
  try {
    // Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search)
    const queryStatus = params.get('status')
    
    console.log('📊 Payment processing page - status:', queryStatus)
    
    // Recuperar email del checkout anterior
    const email = localStorage.getItem('checkout_email')
    
    if (!email) {
      throw new Error('No email found')
    }
    
    // Esperar un poco para que el webhook procese
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Verificar que se creó la orden
    const response = await axios.get(`${API_URL}/shop/orders/latest`, {
      params: { email }
    })
    
    if (response.data.success) {
      console.log('✅ Orden encontrada:', response.data.data.order_id)
      status.value = 'success'
      message.value = 'Pago completado exitosamente'
      
      // Limpiar localStorage
      localStorage.removeItem('checkout_session_id')
      localStorage.removeItem('checkout_url')
      localStorage.removeItem('checkout_email')
      
      // Redirigir a checkout success en 2 segundos
      setTimeout(() => {
        router.push({ 
          path: '/checkout/success', 
          query: { order_id: response.data.data.order_id }
        })
      }, 2000)
    } else {
      throw new Error('Order not found')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
    status.value = 'error'
    message.value = 'Error verificando tu pago. Intenta nuevamente.'
    
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
