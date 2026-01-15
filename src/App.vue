<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()
const cartItemCount = computed(() => cartStore.itemCount)
</script>

<template>
  <div id="app">
    <header>
      <div class="header-container">
        <div class="logo">
          <RouterLink to="/">
            <h1>Utammy's Store</h1>
            <p class="tagline">Uniformes de Calidad</p>
          </RouterLink>
        </div>

        <nav>
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/productos">Productos</RouterLink>
          <RouterLink to="/acerca">Acerca</RouterLink>
          <RouterLink to="/carrito" class="cart-link">
            🛒 Carrito
            <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <div class="footer-container">
        <p>&copy; 2026 Utammy's Store. Todos los derechos reservados.</p>
        <p>Uniformes escolares y empresariales de alta calidad</p>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  text-decoration: none;
  color: white;
}

.logo h1 {
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
}

.tagline {
  font-size: 0.9rem;
  opacity: 0.9;
}

nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
  position: relative;
}

nav a:hover {
  opacity: 0.8;
}

nav a.router-link-active {
  font-weight: 700;
}

.cart-link {
  position: relative;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

footer {
  background: #2c3e50;
  color: white;
  padding: 2rem 0;
  text-align: center;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

footer p {
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  main {
    padding: 1rem;
  }
}
</style>
