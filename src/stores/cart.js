import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Mock API URL
  const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com'
  const API_BASE_URL = API_URL.replace(/\/api$/, '')

  // Computed
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const total = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  // Actions
  function getImageUrl(mediaPath) {
    if (!mediaPath) {
      return 'https://images.unsplash.com/photo-1488161994519-c21cc028cb0d?w=500&h=600&fit=crop'
    }
    return `${API_BASE_URL}${mediaPath}`
  }

  function addItem(product, size, quantity = 1, customization = null) {
    // Obtener el objeto de la talla seleccionada
    const sizeObj = product.sizes.find(s => s.size === size)
    const price = sizeObj ? parseFloat(sizeObj.price) : product.price
    
    // Calcular el precio total con personalización
    let totalPrice = price
    if (customization?.customizationCost) {
      totalPrice += customization.customizationCost
    }
    
    const existingItem = items.value.find((item) => item.id === product.id && item.size === size && item.customizationText === customization?.customizationText)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      // Asegurar que siempre tengamos product_size_id (usar el ID o índice como fallback)
      const productSizeId = sizeObj?.id || `${product.id}-${size}`
      
      items.value.push({
        id: product.id,
        product_id: product.id,
        product_size_id: productSizeId,
        name: product.name,
        description: product.description,
        price: price,
        totalPrice: totalPrice,
        image: getImageUrl(product.media?.main),
        size,
        quantity,
        category: product.category?.name || 'Sin categoría',
        customization: customization,
        customizationText: customization?.customizationText || null,
        customizationCost: customization?.customizationCost || 0,
      })
    }
  }

  function removeItem(itemId, size) {
    const index = items.value.findIndex((item) => item.id === itemId && item.size === size)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(itemId, size, quantity) {
    const item = items.value.find((item) => item.id === itemId && item.size === size)
    if (item) {
      if (quantity <= 0) {
        removeItem(itemId, size)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  async function checkout() {
    loading.value = true
    error.value = null
    try {
      // Replace with actual API call
      const response = await axios.post(`${API_URL}/checkout`, {
        items: items.value,
        total: total.value,
      })

      // On success, clear the cart
      clearCart()
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    checkout,
  }
})
