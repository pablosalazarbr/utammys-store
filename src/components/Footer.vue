<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-white border-t border-border-soft py-24">
    <div class="max-w-[1600px] mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <!-- Column 1: Brand & Newsletter -->
        <div class="lg:col-span-5 space-y-10">
          <RouterLink to="/" class="hover:opacity-70 transition-opacity inline-block">
            <img src="@/assets/utamys_logo/utamys_horizontal.png" alt="Uniformes Tamys Store" class="h-10 w-auto object-contain" />
          </RouterLink>
          <p class="text-neutral-500 text-sm font-light max-w-sm leading-relaxed">
            Suministrando uniformes de calidad premium en toda Guatemala. Uniformes escolares y empresariales que equilibran tradición y modernidad.
          </p>
        </div>

        <!-- Column 2: Navigation -->
        <div class="lg:col-span-2 space-y-8">
          <h4 class="text-[10px] uppercase tracking-[0.3em] font-bold">Navegación</h4>
          <ul class="space-y-4 text-sm font-light text-neutral-600">
            <li><RouterLink to="/" class="hover:text-black transition-colors">Inicio</RouterLink></li>
            <li><RouterLink to="/tienda" class="hover:text-black transition-colors">Tienda</RouterLink></li>
            <li><RouterLink to="/carrito" class="hover:text-black transition-colors">Carrito</RouterLink></li>
            <li><RouterLink to="/acerca" class="hover:text-black transition-colors">Acerca de Nosotros</RouterLink></li>
          </ul>
        </div>

        <!-- Column 3: Information -->
        <div class="lg:col-span-2 space-y-8">
          <h4 class="text-[10px] uppercase tracking-[0.3em] font-bold">Información</h4>
          <ul class="space-y-4 text-sm font-light text-neutral-600">
            <li><a href="#" class="hover:text-black transition-colors">Envíos y Devoluciones</a></li>
            <li><a href="#" class="hover:text-black transition-colors">Guía de Tallas</a></li>
            <li><a href="#" class="hover:text-black transition-colors">Compras Institucionales</a></li>
            <li><a href="#" class="hover:text-black transition-colors">Contacto</a></li>
          </ul>
        </div>

        <!-- Column 4: Social -->
        <div class="lg:col-span-3 space-y-8">
          <h4 class="text-[10px] uppercase tracking-[0.3em] font-bold">Redes Sociales</h4>
          <div class="flex gap-6">
            <a href="#" class="text-sm font-light border-b border-transparent hover:border-black transition-all">Instagram</a>
            <a href="#" class="text-sm font-light border-b border-transparent hover:border-black transition-all">Facebook</a>
            <a href="#" class="text-sm font-light border-b border-transparent hover:border-black transition-all">WhatsApp</a>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-32 pt-12 border-t border-border-soft flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
        <p>© 2026 Uniformes Tamys Store. Todos los derechos reservados.</p>
        <div class="flex gap-10">
          <RouterLink to="/privacidad" class="hover:text-black transition-colors">Privacidad</RouterLink>
          <RouterLink to="/terminos" class="hover:text-black transition-colors">Términos</RouterLink>
          <RouterLink to="/accesibilidad" class="hover:text-black transition-colors">Accesibilidad</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>
