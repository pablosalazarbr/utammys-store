import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useClientsStore = defineStore('clients', () => {
  const clients = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedClient = ref(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

  // Actions
  async function fetchClients() {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${API_URL}/shop/clients`)
      
      if (response.data.success) {
        clients.value = response.data.data
      } else {
        error.value = response.data.message || 'Error al obtener clientes'
      }
    } catch (err) {
      error.value = err.message
      console.error('Error fetching clients:', err)
      // Fallback con datos de prueba
      clients.value = [
        {
          id: 1,
          name: 'Colegio San José',
          city: 'Guatemala',
          established_year: 2010,
          image: 'https://images.unsplash.com/photo-1427504494785-cdea0d6c1b10?w=600&h=400&fit=crop'
        },
        {
          id: 2,
          name: 'Instituto Técnico Nacional',
          city: 'Guatemala',
          established_year: 2005,
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
        }
      ]
    } finally {
      loading.value = false
    }
  }

  function setSelectedClient(clientId) {
    selectedClient.value = clientId
    localStorage.setItem('selectedClient', clientId)
  }

  function loadSelectedClient() {
    const saved = localStorage.getItem('selectedClient')
    if (saved) {
      selectedClient.value = parseInt(saved)
    }
  }

  return {
    clients,
    loading,
    error,
    selectedClient,
    fetchClients,
    setSelectedClient,
    loadSelectedClient
  }
})
