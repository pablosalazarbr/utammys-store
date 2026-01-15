<script setup>
import { onMounted, ref } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const selectedProduct = ref(null)
const selectedSize = ref('')

onMounted(() => {
  productsStore.fetchProducts()
})

function selectProduct(product) {
  selectedProduct.value = product
  selectedSize.value = product.sizes[0] || ''
}

function closeModal() {
  selectedProduct.value = null
  selectedSize.value = ''
}

function addToCart() {
  if (!selectedSize.value) {
    alert('Por favor selecciona una talla')
    return
  }
  cartStore.addItem(selectedProduct.value, selectedSize.value)
  alert('Producto agregado al carrito')
  closeModal()
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price)
}
</script>

<template>
  <div class="productos">
    <h1>Nuestros Productos</h1>

    <div class="filters">
      <button
        v-for="category in productsStore.categories"
        :key="category"
        @click="productsStore.setCategory(category)"
        :class="{ active: productsStore.selectedCategory === category }"
        class="filter-btn"
      >
        {{ category }}
      </button>
    </div>

    <div v-if="productsStore.loading" class="loading">Cargando productos...</div>

    <div v-else class="products-grid">
      <div
        v-for="product in productsStore.filteredProducts"
        :key="product.id"
        class="product-card"
        @click="selectProduct(product)"
      >
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
          <span class="category-badge">{{ product.category }}</span>
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="description">{{ product.description }}</p>
          <p class="price">{{ formatPrice(product.price) }}</p>
          <button class="btn-add" @click.stop="selectProduct(product)">Ver Detalles</button>
        </div>
      </div>
    </div>

    <!-- Product Detail Modal -->
    <div v-if="selectedProduct" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">&times;</button>

        <div class="modal-grid">
          <div class="modal-image">
            <img :src="selectedProduct.image" :alt="selectedProduct.name" />
          </div>

          <div class="modal-details">
            <h2>{{ selectedProduct.name }}</h2>
            <p class="modal-category">{{ selectedProduct.category }}</p>
            <p class="modal-description">{{ selectedProduct.description }}</p>
            <p class="modal-price">{{ formatPrice(selectedProduct.price) }}</p>

            <div class="size-selector">
              <label>Selecciona tu talla:</label>
              <select v-model="selectedSize" class="size-select">
                <option v-for="size in selectedProduct.sizes" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
            </div>

            <button @click="addToCart" class="btn-add-cart">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.productos h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.filter-btn:hover {
  background: #667eea;
  color: white;
}

.filter-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #ff4757;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  height: 300px;
  overflow: hidden;
  background: #f8f9fa;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(102, 126, 234, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.product-info {
  padding: 1.5rem;
}

.product-info h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 1rem;
}

.btn-add {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-add:hover {
  transform: scale(1.02);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2rem;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s;
}

.close-btn:hover {
  background: #f0f0f0;
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.modal-image img {
  width: 100%;
  border-radius: 8px;
}

.modal-details h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.modal-category {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
}

.modal-description {
  color: #666;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.modal-price {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 2rem;
}

.size-selector {
  margin-bottom: 2rem;
}

.size-selector label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.size-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.size-select:focus {
  outline: none;
  border-color: #667eea;
}

.btn-add-cart {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-add-cart:hover {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .productos h1 {
    font-size: 2rem;
  }

  .modal-grid {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
