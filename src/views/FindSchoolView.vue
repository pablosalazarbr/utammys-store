<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClientsStore } from '@/stores/clients'
import { useProductsStore } from '@/stores/products'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

const router = useRouter()
const clientsStore = useClientsStore()
const productsStore = useProductsStore()
const searchQuery = ref('')
const selectedLetter = ref('A')

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const filteredSchools = computed(() => {
  return clientsStore.clients.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesLetter = school.name.toUpperCase().startsWith(selectedLetter.value)
    return matchesSearch || (!searchQuery.value && matchesLetter)
  })
})

onMounted(() => {
  clientsStore.fetchClients()
})

function selectSchool(school) {
  // Guardar el cliente seleccionado en el store
  clientsStore.setSelectedClient(school.id)
  // Actualizar también en productsStore
  productsStore.setSelectedClient(school.id)
  
  // Ir a la tienda
  router.push('/tienda')
}
</script>

<template>
  <main class="flex-1">
    <!-- Page Header -->
    <section class="py-16 px-6 md:px-12 max-w-[1600px] mx-auto text-center border-b border-border-soft">
      <h1 class="text-5xl md:text-6xl font-serif italic mb-8">Encuentra Tu Colegio</h1>
      
      <!-- Search Bar -->
      <div class="max-w-2xl mx-auto mt-12">
        <div class="flex items-center border-b-2 border-border-soft focus-within:border-primary transition-colors py-2">
          <svg class="w-5 h-5 text-neutral-400 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <input 
            v-model="searchQuery"
            class="w-full bg-transparent border-none focus:ring-0 text-xl font-light placeholder:text-neutral-400 text-primary pb-2 focus:outline-none" 
            placeholder="Escribe el nombre de tu colegio..."
            type="text"
          />
        </div>
      </div>
    </section>

    <!-- Alphabet Filter -->
    <section class="border-y border-border-soft py-6 px-6 md:px-12">
      <div class="max-w-[1600px] mx-auto">
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-4">
          <button
            v-for="letter in alphabet"
            :key="letter"
            @click="selectedLetter = letter; searchQuery = ''"
            :class="{
              'text-primary font-bold underline decoration-2 underline-offset-4': selectedLetter === letter,
              'text-neutral-400 hover:text-primary': selectedLetter !== letter
            }"
            class="text-xs font-semibold tracking-widest uppercase transition-colors"
          >
            {{ letter }}
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Schools Grid -->
    <section class="py-16 px-6 md:px-12 max-w-[1600px] mx-auto">
      <!-- Loading State -->
      <div v-if="clientsStore.loading">
        <SkeletonLoader type="card" :count="6" />
      </div>

      <!-- No Results State -->
      <div v-else-if="filteredSchools.length === 0" class="text-center py-12">
        <p class="text-neutral-400 text-lg">No se encontraron escuelas con ese criterio.</p>
      </div>

      <!-- Schools Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div 
          v-for="school in filteredSchools"
          :key="school.id"
          @click="selectSchool(school)"
          class="group cursor-pointer"
        >
          <!-- Image -->
          <div class="aspect-[4/5] overflow-hidden bg-neutral-100 mb-6 rounded-sm relative flex items-center justify-center">
            <img 
              :alt="school.name" 
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
              :src="school.logo_url || school.image || 'https://images.unsplash.com/photo-1488161994519-c21cc028cb0d?w=400&h=500&fit=crop'"
            />
          </div>

          <!-- Info -->
          <div class="space-y-2">
            <h3 class="text-sm font-bold uppercase tracking-widest text-primary group-hover:opacity-70 transition-opacity">
              {{ school.name }}
            </h3>
            <p class="text-xs text-neutral-500 uppercase tracking-tighter">{{ school.city }} • {{ school.established_year }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="py-16 px-6 md:px-12 bg-accent-grey border-t border-border-soft">
      <div class="max-w-[1200px] mx-auto text-center space-y-6">
        <h2 class="text-3xl font-serif italic">¿No encuentras tu institución?</h2>
        <p class="text-neutral-600 max-w-2xl mx-auto">
          Si tu escuela o empresa no aparece en nuestro directorio, puedes contactarnos directamente para agregar tu institución a nuestra base de datos.
        </p>
        <button class="px-10 py-4 bg-primary text-white text-[11px] uppercase tracking-widest font-semibold hover:bg-black/90 transition-colors">
          Contactar Ventas
        </button>
      </div>
    </section>
  </main>
</template>
