<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useClientsStore } from '@/stores/clients'
import { computed } from 'vue'

const router = useRouter()
const cartStore = useCartStore()
const clientsStore = useClientsStore()
const cartItemCount = computed(() => cartStore.itemCount)

function goToShop() {
  // Ir a seleccionar categoría (Escolares/Empresariales)
  router.push('/shop-category')
}
</script>

<template>
  <header class="w-full bg-white border-b border-border-soft sticky top-0 z-50">
    <div class="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between uppercase text-[10px] tracking-[0.2em] font-medium">
      <!-- Navigation Left -->
      <nav class="hidden lg:flex items-center gap-10 flex-1">
        <RouterLink to="/" class="hover:opacity-50 transition-opacity">Inicio</RouterLink>
        <RouterLink to="/escuela" class="hover:opacity-50 transition-opacity">Mi Colegio</RouterLink>
        <button @click="goToShop" class="hover:opacity-50 transition-opacity cursor-pointer">TIENDA</button>
        <RouterLink to="/acerca" class="hover:opacity-50 transition-opacity">Acerca de Nosotros</RouterLink>
      </nav>

      <!-- Logo Center -->
      <div class="flex-shrink-0">
        <RouterLink to="/" class="inline-block">
          <img src="@/assets/utamys_logo/utamys_horizontal.png" alt="Uniformes Tamys Store" class="h-12 w-auto object-contain" />
        </RouterLink>
      </div>

      <!-- Right Section -->
      <div class="flex items-center justify-end gap-8 flex-1">
        <div class="hidden md:flex items-center gap-4">
          <button style="display: none;" class="hover:opacity-50 transition-opacity">Buscar</button>
          <button style="display: none;" class="hover:opacity-50 transition-opacity">Cuenta</button>
        </div>
        <RouterLink to="/carrito" class="flex items-center gap-1 hover:opacity-50 transition-opacity">
          Carrito <span class="opacity-50">({{ cartItemCount }})</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
