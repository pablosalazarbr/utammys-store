<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useClientsStore } from '@/stores/clients'
import { useCartStore } from '@/stores/cart'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

const router = useRouter()
const productsStore = useProductsStore()
const clientsStore = useClientsStore()
const cartStore = useCartStore()

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const API_BASE_URL = API_URL.replace('/api', '')

const selectedProduct = ref(null)
const selectedSize = ref('')
const quantity = ref(1)
const selectedClient = ref(null)
const selectedPrice = ref(null)
const selectedCategory = ref('Todos')

const getImageUrl = (mediaPath) => {
  if (!mediaPath) {
    return 'https://images.unsplash.com/photo-1488161994519-c21cc028cb0d?w=500&h=600&fit=crop'
  }
  return `${API_BASE_URL}${mediaPath}`
}

onMounted(async () => {
  // Cargar cliente guardado
  clientsStore.loadSelectedClient()
  
  // Si hay cliente, cargar productos
  if (clientsStore.selectedClient) {
    // Buscar el objeto completo del cliente
    const client = clientsStore.clients.find(c => c.id === clientsStore.selectedClient)
    if (client) {
      selectedClient.value = client
      productsStore.selectedClient = clientsStore.selectedClient
      await productsStore.fetchProducts()
    } else {
      // Si no se encuentra el cliente, cargar todos los clientes
      await clientsStore.fetchClients()
      const foundClient = clientsStore.clients.find(c => c.id === clientsStore.selectedClient)
      if (foundClient) {
        selectedClient.value = foundClient
        productsStore.selectedClient = clientsStore.selectedClient
        await productsStore.fetchProducts()
      } else {
        router.push('/escuela')
      }
    }
  } else {
    // Si no hay cliente, redirigir a seleccionar colegio
    router.push('/escuela')
  }
})

function selectProduct(product) {
  selectedProduct.value = product
  selectedSize.value = product.sizes?.[0]?.size || ''
  selectedPrice.value = product.sizes?.[0]?.price || 0
  quantity.value = 1
}

function closeModal() {
  selectedProduct.value = null
  selectedSize.value = ''
  selectedPrice.value = null
  quantity.value = 1
}

function addToCart() {
  if (!selectedSize.value) {
    alert('Por favor selecciona una talla')
    return
  }
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addItem(selectedProduct.value, selectedSize.value)
  }
  alert(`${quantity.value} producto(s) agregado(s) al carrito`)
  closeModal()
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    minimumFractionDigits: 2,
  }).format(price)
}

function backToSchools() {
  router.push('/escuela')
}

// Obtener categorías únicas de los productos disponibles
const availableCategories = computed(() => {
  const categorySet = new Set()
  
  productsStore.products.forEach(product => {
    if (product.category?.name) {
      categorySet.add(product.category.name)
    }
  })
  
  const sortedCategories = Array.from(categorySet).sort()
  return ['Todos', ...sortedCategories]
})

// Filtrar productos por categoría seleccionada
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'Todos') {
    return productsStore.products
  }
  return productsStore.products.filter(
    product => product.category?.name === selectedCategory.value
  )
})
</script>

<template>
  <main class="flex-1">
    <!-- School Hero Section -->
    <section v-if="selectedClient" class="relative h-[75vh] w-full overflow-hidden bg-neutral-100">
      <div class="absolute inset-0 bg-cover bg-center grayscale" :style="`background-image: url('https://media.gettyimages.com/id/1447981159/video/exterior-shot-of-elegant-large-brick-high-school-building-with-bright-green-lawn.jpg?s=640x640&k=20&c=mRuu2nfwDbsFskL-jv1dgvkYdBzZkH7rHu7zzY4U2LE=')`"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      <div class="relative h-full flex flex-col items-center justify-center text-center px-6">
        <h1 class="font-serif text-5xl md:text-7xl text-white mb-4 tracking-tight">{{ selectedClient.name }}</h1>
        <p class="text-white/90 text-sm md:text-base uppercase tracking-[0.2em] font-light max-w-2xl mb-12">
          Colección Oficial de Uniformes
        </p>
        <button 
          @click="backToSchools"
          class="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white/20 transition-all"
        >
          ← Volver a Colegios
        </button>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-20 px-6 md:px-12 max-w-[1600px] mx-auto">
      <!-- Header -->
      <div class="mb-16">
        <h2 class="text-4xl md:text-5xl font-serif mb-6">Nuestros Uniformes</h2>
        <p class="text-neutral-500 text-sm max-w-2xl">
          Explora toda nuestra colección de uniformes diseñados especialmente para 
          {{ selectedClient?.name }}. Cada pieza combina durabilidad, diseño moderno y confort.
        </p>
      </div>

      <!-- Category Filters -->
      <div v-if="!productsStore.loading && productsStore.products.length > 0" class="mb-12 sticky top-20 z-30 bg-white py-4 -mx-6 md:-mx-12 px-6 md:px-12 border-b border-border-soft">
        <div class="flex gap-4 overflow-x-auto pb-2 max-w-[1600px] mx-auto">
          <button
            v-for="category in availableCategories"
            :key="category"
            @click="selectedCategory = category"
            :class="{
              'border-b-2 border-primary text-primary': selectedCategory === category,
              'border-b-2 border-transparent text-neutral-400': selectedCategory !== category
            }"
            class="px-4 py-2 text-[11px] uppercase tracking-widest font-semibold whitespace-nowrap transition-colors hover:text-primary"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="productsStore.loading">
        <SkeletonLoader type="product" :count="8" />
      </div>

      <!-- No Products State -->
      <div v-else-if="productsStore.products.length === 0" class="text-center py-20">
        <p class="text-neutral-400 text-lg">No hay productos disponibles para este colegio en este momento.</p>
        <button 
          @click="backToSchools"
          class="mt-8 px-8 py-3 bg-primary text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
        >
          Seleccionar Otro Colegio
        </button>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="group cursor-pointer flex flex-col h-full"
          @click="selectProduct(product)"
        >
          <!-- Product Image -->
          <div class="aspect-[3/4] overflow-hidden bg-accent-grey mb-6 relative flex-shrink-0">
            <img 
              :alt="product.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              :src="getImageUrl(product.media?.main)"
            />
            <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <!-- Product Info -->
          <div class="flex-1 space-y-3">
            <h3 class="text-lg font-serif group-hover:text-primary transition-colors leading-tight">
              {{ product.name }}
            </h3>
            <p class="text-[11px] leading-relaxed text-neutral-500 line-clamp-2">
              {{ product.description || 'Producto de alta calidad' }}
            </p>
            <p class="pt-2 text-sm font-semibold">{{ formatPrice(product.sizes?.[0]?.price || 0) }}</p>
          </div>

          <!-- Hover CTA -->
          <button 
            class="w-full mt-4 py-3 bg-primary text-white text-[10px] font-bold uppercase tracking-widest opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            Ver Detalles
          </button>
        </div>
      </div>

      <!-- No Products for Category -->
      <div v-else class="text-center py-20">
        <p class="text-neutral-400 text-lg">No hay productos en la categoría "{{ selectedCategory }}"</p>
      </div>
    </section>

    <!-- Product Detail Modal -->
    <transition name="modal-fade">
      <div v-if="selectedProduct" class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" @click="closeModal">
        <div 
          class="bg-white rounded-sm max-w-[1200px] w-full max-h-[90vh] overflow-y-auto flex flex-col lg:flex-row"
          @click.stop
        >
          <!-- Left: Image Gallery -->
          <div class="w-full lg:w-2/3 p-6 lg:p-12 flex flex-col">
            <!-- Breadcrumbs -->
            <nav class="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-8">
              <button @click="closeModal" class="hover:text-primary transition-colors">Tienda</button>
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
              <span class="text-primary">{{ selectedProduct.category?.name || 'Producto' }}</span>
            </nav>

            <!-- Main Image -->
            <div class="aspect-[3/4] w-full bg-accent-grey overflow-hidden mb-4">
              <img 
                :src="getImageUrl(selectedProduct.media?.main)" 
                :alt="selectedProduct.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Thumbnail Grid -->
            <div class="grid grid-cols-3 gap-3">
              <div v-for="i in 3" :key="i" class="aspect-[3/4] bg-accent-grey overflow-hidden cursor-pointer hover:opacity-70 transition-opacity">
                <img 
                  :src="getImageUrl(selectedProduct.media?.main)" 
                  :alt="`Detail ${i}`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Right: Product Info -->
          <div class="w-full lg:w-1/3 p-6 lg:p-12 lg:border-l border-border-soft flex flex-col justify-between">
            <!-- Close Button -->
            <button 
              @click="closeModal"
              class="absolute top-6 right-6 lg:top-12 lg:right-12 text-neutral-400 hover:text-primary transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>

            <!-- Title & Price -->
            <div class="space-y-4 border-b border-border-soft pb-8 mb-8">
              <h2 class="text-3xl font-serif leading-tight">{{ selectedProduct.name }}</h2>
              <p class="text-lg text-neutral-500">{{ formatPrice(selectedPrice) }}</p>
            </div>

            <!-- Selections -->
            <div class="space-y-8 flex-1">
              <!-- Size Selection -->
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <p class="text-[10px] uppercase tracking-[0.2em] font-bold">Seleccionar Talla</p>
                  <button class="text-[10px] uppercase tracking-[0.1em] underline underline-offset-4 hover:opacity-60 transition-opacity">Guía de Tallas</button>
                </div>
                <div class="grid grid-cols-4 gap-2">
                  <button
                    v-for="sizeObj in selectedProduct.sizes"
                    :key="sizeObj.id || sizeObj.size"
                    @click="selectedSize = sizeObj.size"
                    :class="{
                      'border-primary bg-primary text-white': selectedSize === sizeObj.size,
                      'border-border-soft hover:border-primary text-primary': selectedSize !== sizeObj.size
                    }"
                    class="border py-3 text-xs font-semibold transition-all"
                  >
                    {{ sizeObj.size }}
                  </button>
                </div>
              </div>

              <!-- Quantity -->
              <div class="space-y-4">
                <p class="text-[10px] uppercase tracking-[0.2em] font-bold">Cantidad</p>
                <div class="inline-flex items-center border border-border-soft">
                  <button 
                    @click="quantity > 1 && quantity--"
                    class="px-4 py-2 text-neutral-400 hover:text-primary transition-colors"
                  >
                    −
                  </button>
                  <span class="px-4 py-2 text-sm font-semibold w-12 text-center">{{ quantity }}</span>
                  <button 
                    @click="quantity++"
                    class="px-4 py-2 text-neutral-400 hover:text-primary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="space-y-4 mt-8 pt-8 border-t border-border-soft">
              <button 
                @click="addToCart"
                class="w-full bg-primary text-white py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-black/90 transition-all"
              >
                Agregar al Carrito
              </button>
              <button 
                @click="closeModal"
                class="w-full border border-primary text-primary py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all"
              >
                Continuar Comprando
              </button>
            </div>

            <!-- Product Description -->
            <div class="mt-8 pt-8 border-t border-border-soft">
              <p class="text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Descripción</p>
              <p class="text-sm font-light text-neutral-600 leading-relaxed">
                {{ selectedProduct.description || 'Producto de alta calidad diseñado especialmente para uniformes escolares y empresariales.' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </main>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
