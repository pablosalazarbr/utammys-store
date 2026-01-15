<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Bienvenido a Utammy's Store</h1>
        <p class="hero-subtitle">Tu tienda de confianza para uniformes escolares y empresariales</p>
        <p class="hero-description">
          Ofrecemos uniformes de la más alta calidad, diseñados para brindar comodidad y
          durabilidad. Contamos con una amplia variedad de tallas y estilos para satisfacer todas
          tus necesidades.
        </p>
        <RouterLink to="/productos" class="btn-primary">Ver Catálogo</RouterLink>
      </div>
    </section>

    <section class="features">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎒</div>
          <h3>Uniformes Escolares</h3>
          <p>Uniformes completos para todas las edades, desde preescolar hasta preparatoria</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💼</div>
          <h3>Uniformes Empresariales</h3>
          <p>Ropa corporativa profesional que representa la imagen de tu empresa</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">⭐</div>
          <h3>Alta Calidad</h3>
          <p>Materiales duraderos y cómodos que resisten el uso diario</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🚚</div>
          <h3>Envío Rápido</h3>
          <p>Entregas rápidas y seguras a todo el país</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>¿Listo para hacer tu pedido?</h2>
      <p>Explora nuestro catálogo y encuentra el uniforme perfecto</p>
      <RouterLink to="/productos" class="btn-secondary">Ir a Productos</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 12px;
  margin-bottom: 3rem;
}

.hero-content h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #667eea;
  margin-bottom: 1rem;
  font-weight: 500;
}

.hero-description {
  font-size: 1.1rem;
  color: #555;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.8;
}

.btn-primary,
.btn-secondary {
  display: inline-block;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.features {
  margin: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.cta {
  text-align: center;
  padding: 4rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 3rem;
}

.cta h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.cta p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
