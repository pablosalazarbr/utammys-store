<script setup>
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'

const cartStore = useCartStore()
const checkoutSuccess = ref(false)

function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price)
}

async function handleCheckout() {
  if (cartStore.items.length === 0) {
    alert('Tu carrito está vacío')
    return
  }

  const confirmCheckout = confirm('¿Deseas proceder con la compra?')
  if (!confirmCheckout) return

  try {
    await cartStore.checkout()
    checkoutSuccess.value = true
    setTimeout(() => {
      checkoutSuccess.value = false
    }, 5000)
  } catch (error) {
    alert('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.')
  }
}
</script>

<template>
  <div class="carrito">
    <h1>Mi Carrito de Compras</h1>

    <div v-if="checkoutSuccess" class="success-message">
      ¡Pedido realizado con éxito! Gracias por tu compra.
    </div>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p class="empty-icon">🛒</p>
      <h2>Tu carrito está vacío</h2>
      <p>Agrega productos desde nuestro catálogo para comenzar tu compra</p>
      <RouterLink to="/productos" class="btn-primary">Ver Productos</RouterLink>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="`${item.id}-${item.size}`" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>

          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-category">{{ item.category }}</p>
            <p class="item-size">Talla: {{ item.size }}</p>
            <p class="item-price">{{ formatPrice(item.price) }}</p>
          </div>

          <div class="item-quantity">
            <button
              @click="cartStore.updateQuantity(item.id, item.size, item.quantity - 1)"
              class="quantity-btn"
            >
              -
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button
              @click="cartStore.updateQuantity(item.id, item.size, item.quantity + 1)"
              class="quantity-btn"
            >
              +
            </button>
          </div>

          <div class="item-subtotal">
            <p class="subtotal-label">Subtotal:</p>
            <p class="subtotal-price">{{ formatPrice(item.price * item.quantity) }}</p>
          </div>

          <button
            @click="cartStore.removeItem(item.id, item.size)"
            class="remove-btn"
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Resumen del Pedido</h2>

        <div class="summary-line">
          <span>Productos:</span>
          <span>{{ cartStore.itemCount }}</span>
        </div>

        <div class="summary-line total">
          <span>Total:</span>
          <span>{{ formatPrice(cartStore.total) }}</span>
        </div>

        <button @click="handleCheckout" class="btn-checkout" :disabled="cartStore.loading">
          {{ cartStore.loading ? 'Procesando...' : 'Proceder al Pago' }}
        </button>

        <button @click="cartStore.clearCart" class="btn-clear">Vaciar Carrito</button>

        <RouterLink to="/productos" class="continue-shopping"> ← Continuar Comprando </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carrito h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.success-message {
  background: #10b981;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.empty-cart h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.empty-cart p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.btn-primary {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto auto auto;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  align-items: center;
}

.item-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.item-category {
  color: #667eea;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.item-size {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.item-price {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: #667eea;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.quantity-btn:hover {
  background: #764ba2;
}

.quantity {
  font-weight: 600;
  font-size: 1.1rem;
  min-width: 30px;
  text-align: center;
}

.item-subtotal {
  text-align: right;
}

.subtotal-label {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.subtotal-price {
  font-weight: 700;
  color: #667eea;
  font-size: 1.3rem;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  transition: transform 0.2s;
}

.remove-btn:hover {
  transform: scale(1.2);
}

.cart-summary {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.cart-summary h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #e0e0e0;
  color: #666;
}

.summary-line.total {
  border-bottom: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-top: 1rem;
}

.btn-checkout {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: transform 0.2s;
}

.btn-checkout:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-checkout:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-clear {
  width: 100%;
  padding: 0.75rem;
  background: white;
  color: #ff4757;
  border: 2px solid #ff4757;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s;
}

.btn-clear:hover {
  background: #ff4757;
  color: white;
}

.continue-shopping {
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.continue-shopping:hover {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }

  .cart-item {
    grid-template-columns: 100px 1fr;
    grid-template-areas:
      'image details'
      'image quantity'
      'subtotal subtotal'
      'remove remove';
    gap: 1rem;
  }

  .item-image {
    grid-area: image;
    width: 100px;
    height: 100px;
  }

  .item-details {
    grid-area: details;
  }

  .item-quantity {
    grid-area: quantity;
  }

  .item-subtotal {
    grid-area: subtotal;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .remove-btn {
    grid-area: remove;
    justify-self: center;
  }
}
</style>
