<script setup>
import { useRouter } from 'vue-router'
import { useClientsStore } from '@/stores/clients'
import uniformesEscolaresImg from '@/assets/images/uniformes_escolares.jpg'

const router = useRouter()
const clientsStore = useClientsStore()

function selectCategory(category) {
  // Limpiar la selección anterior de cliente
  clientsStore.selectedClient = null
  localStorage.removeItem('selectedClient')
  
  // Ir a seleccionar colegio/empresa
  router.push('/escuela')
}
</script>

<template>
  <main class="flex-1">
    <!-- Hero Section -->
    <section class="relative w-full h-[60vh] bg-accent-grey overflow-hidden flex items-center justify-center">
      <div class="text-center space-y-8">
        <h1 class="text-6xl md:text-7xl font-serif">Elige tu Categoría</h1>
        <p class="text-neutral-500 text-lg max-w-2xl mx-auto">
          Selecciona si deseas ver uniformes para escuelas o uniformes empresariales
        </p>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen border-t border-border-soft">
      <!-- Education Category -->
      <div class="relative group h-[50vh] md:h-full overflow-hidden md:border-r border-border-soft">
        <img 
          alt="Uniformes Escolares" 
          class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
          :src="uniformesEscolaresImg"
        />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 flex items-center justify-center transition-all duration-300">
          <div class="text-center text-white">
            <h3 class="text-5xl mb-6 font-serif">Escolares</h3>
            <button 
              @click="selectCategory('Escolares')"
              class="text-[10px] uppercase tracking-[0.4em] border-b border-white pb-2 hover:opacity-50 transition-opacity"
            >
              Explorar
            </button>
          </div>
        </div>
      </div>

      <!-- Professional Category -->
      <div class="relative group h-[50vh] md:h-full overflow-hidden">
        <img 
          alt="Uniformes Empresariales" 
          class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop"
        />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 flex items-center justify-center transition-all duration-300">
          <div class="text-center text-white">
            <h3 class="text-5xl mb-6 font-serif">Empresariales</h3>
            <button 
              @click="selectCategory('Empresariales')"
              class="text-[10px] uppercase tracking-[0.4em] border-b border-white pb-2 hover:opacity-50 transition-opacity"
            >
              Explorar
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
