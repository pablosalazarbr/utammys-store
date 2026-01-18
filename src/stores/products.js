import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)
  const categories = ref(['Todos', 'Escolares', 'Empresariales'])
  const selectedCategory = ref('Todos')
  const selectedClient = ref(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

  // Computed
  const filteredProducts = computed(() => {
    if (selectedCategory.value === 'Todos') {
      return products.value
    }
    return products.value.filter((product) => product.category === selectedCategory.value)
  })

  // Actions
  async function fetchProducts() {
    if (!selectedClient.value) {
      console.warn('No client selected')
      return
    }

    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${API_URL}/shop/products`, {
        params: {
          client_id: selectedClient.value
        }
      })
      
      if (response.data.success) {
        products.value = response.data.data
      } else {
        error.value = response.data.message || 'Error al obtener productos'
      }
    } catch (err) {
      error.value = err.message
      console.error('Error fetching products:', err)
      // Mock data for development fallback
      products.value = [
        {
          id: 1,
          name: 'Uniforme Escolar Completo',
          description: 'Incluye camisa, pantalón y corbata',
          price: 45000,
          category: 'Escolares',
          image: 'https://via.placeholder.com/300x400?text=Uniforme+Escolar',
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
        },
        {
          id: 2,
          name: 'Camisa Empresarial',
          description: 'Camisa de manga larga para empresas',
          price: 25000,
          category: 'Empresariales',
          image: 'https://via.placeholder.com/300x400?text=Camisa+Empresarial',
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        },
        {
          id: 3,
          name: 'Falda Escolar',
          description: 'Falda plisada para uniforme escolar',
          price: 18000,
          category: 'Escolares',
          image: 'https://via.placeholder.com/300x400?text=Falda+Escolar',
          sizes: ['XS', 'S', 'M', 'L'],
        },
        {
          id: 4,
          name: 'Pantalón Empresarial',
          description: 'Pantalón de vestir para empresas',
          price: 30000,
          category: 'Empresariales',
          image: 'https://via.placeholder.com/300x400?text=Pantalón+Empresarial',
          sizes: ['28', '30', '32', '34', '36', '38'],
        },
        {
          id: 5,
          name: 'Sweater Escolar',
          description: 'Sweater con el logo de la institución',
          price: 22000,
          category: 'Escolares',
          image: 'https://via.placeholder.com/300x400?text=Sweater+Escolar',
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
        },
        {
          id: 6,
          name: 'Blazer Empresarial',
          description: 'Blazer ejecutivo de alta calidad',
          price: 65000,
          category: 'Empresariales',
          image: 'https://via.placeholder.com/300x400?text=Blazer+Empresarial',
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        },
      ]
    } finally {
      loading.value = false
    }
  }

  function setCategory(category) {
    selectedCategory.value = category
  }

  function setSelectedClient(clientId) {
    selectedClient.value = clientId
    // Automáticamente cargar productos del cliente
    fetchProducts()
  }

  return {
    products,
    loading,
    error,
    categories,
    selectedCategory,
    selectedClient,
    filteredProducts,
    fetchProducts,
    setCategory,
    setSelectedClient,
  }
})
