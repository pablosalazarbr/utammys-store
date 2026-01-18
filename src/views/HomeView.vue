<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useClientsStore } from '@/stores/clients'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import axios from 'axios'
import uniformesEscolaresImg from '@/assets/images/uniformes_escolares.jpg'

const router = useRouter()
const clientsStore = useClientsStore()
const featuredProducts = ref([])
const loadingFeatured = ref(false)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const API_BASE_URL = API_URL.replace('/api', '')

const getImageUrl = (mediaPath) => {
  if (!mediaPath) {
    return 'https://images.unsplash.com/photo-1488161994519-c21cc028cb0d?w=500&h=600&fit=crop'
  }
  return `${API_BASE_URL}${mediaPath}`
}

onMounted(async () => {
  loadingFeatured.value = true
  try {
    // Obtener productos aleatorios
    const response = await axios.get(`${API_URL}/shop/products/random`)
    if (response.data.success) {
      featuredProducts.value = response.data.data.slice(0, 4)
    }
  } catch (error) {
    console.error('Error fetching featured products:', error)
    // Fallback: productos mock
    featuredProducts.value = [
      {
        id: 1,
        name: 'Uniforme Escolar Completo',
        description: 'Incluye camisa, pantalón y corbata',
        price: 45000,
        image: 'https://via.placeholder.com/300x400?text=Uniforme+Escolar',
        sizes: [{ id: 1, size: 'M', price: 45000 }],
      },
      {
        id: 2,
        name: 'Camisa Empresarial',
        description: 'Camisa de vestir para ambiente corporativo',
        price: 25000,
        image: 'https://via.placeholder.com/300x400?text=Camisa+Empresarial',
        sizes: [{ id: 2, size: 'M', price: 25000 }],
      },
      {
        id: 3,
        name: 'Pantalón Escolar',
        description: 'Pantalón de calidad premium',
        price: 18000,
        image: 'https://via.placeholder.com/300x400?text=Pantalon+Escolar',
        sizes: [{ id: 3, size: 'M', price: 18000 }],
      },
      {
        id: 4,
        name: 'Corbata Escolar',
        description: 'Corbata tejida en seda',
        price: 8000,
        image: 'https://via.placeholder.com/300x400?text=Corbata+Escolar',
        sizes: [{ id: 4, size: 'U', price: 8000 }],
      },
    ]
  } finally {
    loadingFeatured.value = false
  }
})

function navigateToSchools(category = null) {
  // Limpiar la selección anterior de cliente
  clientsStore.selectedClient = null
  localStorage.removeItem('selectedClient')
  
  // Guardar la categoría si se especifica
  if (category) {
    productsStore.setCategory(category)
  }
  
  // Ir a seleccionar colegio
  router.push('/escuela')
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
  <main class="flex-1">
    <!-- Hero Section -->
    <section class="relative w-full h-[90vh] bg-accent-grey overflow-hidden group">
      <div class="absolute inset-0">
        <img 
          class="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" 
          src="https://t3.ftcdn.net/jpg/06/32/65/84/360_F_632658450_3NZBgRjWgk7WdGOqAIkKBFjtWyd9X8KF.jpg?w=1600&h=900&fit=crop" 
          alt="Minimalist uniform display"
        />
      </div>
      <div class="absolute inset-0 bg-black/5"></div>
      <div class="relative h-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-24 text-white">
        <div class="max-w-2xl">
          <p class="uppercase text-xs tracking-[0.3em] mb-6">Ciclo Escolar 2026</p>
          <h1 class="text-6xl md:text-8xl mb-8 leading-[0.9] tracking-tighter font-serif">
            Uniformes de
            <br/>
            <span class="italic font-normal">calidad premium</span>
          </h1>
          <p class="text-lg font-light mb-8 max-w-lg">Diseñados a la moda con confort y durabilidad. Empresa 100% guatemalteca con los más altos estándares de calidad.</p>
          <div class="flex gap-6 flex-wrap">
            <button 
              @click="navigateToSchools()"
              class="px-10 py-4 bg-white text-black text-[11px] uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors duration-300"
            >
              Ver Catálogo
            </button>
            <button 
              @click="navigateToSchools('Escolares')"
              class="px-10 py-4 border border-white text-white text-[11px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors duration-300"
            >
              Explorar Ofertas
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div class="space-y-8">
          <h2 class="text-5xl leading-tight font-serif">
            Uniformes
            <br/>
            que rompen
            <br/>
            <span class="italic">esquemas </span>
            <span class="italic">tradicionales</span>
          </h2>
          <p class="text-lg text-neutral-500 font-light max-w-md leading-relaxed">
            Transformamos el concepto tradicional de uniformes en prendas modernas, cómodas y duraderas. Cada diseño combina funcionalidad con estética contemporánea, manteniendo los más altos estándares de calidad.
          </p>
        </div>
        <div class="aspect-[4/5] bg-accent-grey overflow-hidden">
          <img 
            alt="Editorial look" 
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            src="https://static.vecteezy.com/system/resources/thumbnails/072/508/815/small/a-young-girl-smiles-while-sitting-at-her-desk-in-a-classroom-photo.jpeg?w=600&h=800&fit=crop"
          />
        </div>
      </div>
    </section>

    <!-- Featured Selection -->
    <section class="pb-32 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div class="flex justify-between items-end mb-16">
        <div>
          <span class="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2 block">Selección</span>
          <h2 class="text-4xl italic font-serif">Productos Destacados</h2>
        </div>
        <button @click="navigateToSchools()" class="text-[11px] uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-50 transition-opacity">
          Ver Todos
        </button>
      </div>
      
      <div v-if="loadingFeatured">
        <SkeletonLoader type="product" :count="4" />
      </div>

      <div v-else-if="featuredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
        <div 
          v-for="product in featuredProducts" 
          :key="product.id"
          class="group cursor-pointer flex flex-col h-full"
        >
          <div class="aspect-[3/4] overflow-hidden bg-accent-grey mb-6 flex-shrink-0">
            <img 
              :alt="product.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              :src="getImageUrl(product.media?.main)"
            />
          </div>
          <div class="flex-1 space-y-2">
            <h3 class="text-lg font-serif group-hover:text-primary transition-colors">{{ product.name }}</h3>
            <p class="text-[11px] leading-relaxed text-neutral-500 line-clamp-2">
              {{ product.description || 'Producto de alta calidad' }}
            </p>
            <p class="pt-2 text-sm font-semibold">{{ formatPrice(product.sizes?.[0]?.price || 0) }}</p>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-neutral-400">No hay productos disponibles en este momento</p>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="grid grid-cols-1 md:grid-cols-2 w-full md:h-screen border-t border-border-soft">
      <!-- Education Category -->
      <div class="relative group h-full overflow-hidden md:border-r border-border-soft">
        <img 
          alt="Institutional" 
          class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
          :src="uniformesEscolaresImg"
        />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 flex items-center justify-center transition-all duration-300">
          <div class="text-center text-white">
            <h3 class="text-5xl mb-6 font-serif">Escolares</h3>
            <button 
              @click="navigateToSchools('Escolares')"
              class="text-[10px] uppercase tracking-[0.4em] border-b border-white pb-2 hover:opacity-50 transition-opacity"
            >
              Explorar
            </button>
          </div>
        </div>
      </div>

      <!-- Professional Category -->
      <div class="relative group h-full overflow-hidden">
        <img 
          alt="Professional" 
          class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop"
        />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 flex items-center justify-center transition-all duration-300">
          <div class="text-center text-white">
            <h3 class="text-5xl mb-6 font-serif">Empresariales</h3>
            <button 
              @click="navigateToSchools('Empresariales')"
              class="text-[10px] uppercase tracking-[0.4em] border-b border-white pb-2 hover:opacity-50 transition-opacity"
            >
              Explorar
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-40 bg-white">
      <div class="max-w-[1000px] mx-auto px-6 text-center space-y-12">
        <h2 class="text-4xl md:text-6xl font-serif italic">
          Innovación
          <br/>
          con
          <br/>
          <span class="normal-case">excelencia</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16 text-[10px] tracking-[0.2em] uppercase font-medium">
          <div class="space-y-4">
            <svg class="w-10 h-10 mx-auto mb-6 opacity-60" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
            <h3 class="font-bold">Durabilidad</h3>
            <p class="font-light text-sm">Confección con los más altos estándares de calidad</p>
          </div>
          <div class="space-y-4">
            <svg class="w-10 h-10 mx-auto mb-6 opacity-60" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            <h3 class="font-bold">Diseño Moderno</h3>
            <p class="font-light text-sm">Prendas diseñadas a la moda con tecnología innovadora</p>
          </div>
          <div class="space-y-4">
            <svg class="w-10 h-10 mx-auto mb-6 opacity-60" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2v6h2zm0 8h-2v2h2z"/></svg>
            <h3 class="font-bold">Trato Personalizado</h3>
            <p class="font-light text-sm">Soporte creativo y técnico en todo el proceso</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
