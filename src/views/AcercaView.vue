<script setup></script>

<template>
  <div class="acerca">
    <section class="intro">
      <h1>Acerca de Utammy's Store</h1>
      <p class="subtitle">
        Somos tu tienda de confianza para uniformes escolares y empresariales de alta calidad
      </p>
    </section>

    <section class="content">
      <div class="section-card">
        <h2>🎯 Nuestra Misión</h2>
        <p>
          Proveer uniformes de la más alta calidad que combinen comodidad, durabilidad y estilo,
          satisfaciendo las necesidades de instituciones educativas y empresas en todo el país.
        </p>
      </div>

      <div class="section-card">
        <h2>👁️ Nuestra Visión</h2>
        <p>
          Ser la tienda líder en uniformes en el mercado, reconocida por nuestra excelencia en
          servicio al cliente, calidad de productos y compromiso con la satisfacción de nuestros
          clientes.
        </p>
      </div>

      <div class="section-card">
        <h2>⭐ Nuestros Valores</h2>
        <ul>
          <li>
            <strong>Calidad:</strong> Materiales duraderos y cómodos en todos nuestros productos
          </li>
          <li><strong>Servicio:</strong> Atención personalizada y compromiso con cada cliente</li>
          <li>
            <strong>Confianza:</strong> Transparencia y honestidad en todas nuestras operaciones
          </li>
          <li><strong>Innovación:</strong> Constante mejora en diseños y procesos</li>
        </ul>
      </div>

      <div class="section-card">
        <h2>🏆 ¿Por Qué Elegirnos?</h2>
        <ul>
          <li>Más de 10 años de experiencia en el mercado</li>
          <li>Amplio catálogo de productos para todas las edades</li>
          <li>Materiales de primera calidad importados y nacionales</li>
          <li>Atención personalizada y asesoría en la selección de tallas</li>
          <li>Entregas rápidas y seguras a nivel nacional</li>
          <li>Precios competitivos y opciones de pago flexibles</li>
        </ul>
      </div>

      <div class="section-card contact">
        <h2>📞 Contáctanos</h2>
        <p>¿Tienes preguntas sobre nuestros productos o servicios? No dudes en contactarnos:</p>
        <div class="contact-info">
          <p><strong>📧 Email:</strong> info@utammysstore.com</p>
          <p><strong>📱 Teléfono:</strong> +57 (123) 456-7890</p>
          <p><strong>🏢 Dirección:</strong> Calle 123 #45-67, Ciudad, Colombia</p>
          <p><strong>🕐 Horario:</strong> Lunes a Viernes: 8:00 AM - 6:00 PM</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.acerca {
  max-width: 900px;
  margin: 0 auto;
}

.intro {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 12px;
}

.intro h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.section-card h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.section-card p {
  color: #666;
  line-height: 1.8;
  font-size: 1.05rem;
}

.section-card ul {
  list-style: none;
  padding: 0;
}

.section-card ul li {
  color: #666;
  padding: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
}

.section-card ul li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.section-card ul li strong {
  color: #2c3e50;
}

.contact {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.contact h2 {
  color: white;
}

.contact p {
  color: rgba(255, 255, 255, 0.95);
}

.contact-info {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.contact-info p {
  margin: 0.75rem 0;
  font-size: 1.05rem;
}

.contact-info strong {
  color: white;
  font-weight: 600;
}

@media (max-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .section-card {
    padding: 1.5rem;
  }

  .section-card h2 {
    font-size: 1.3rem;
  }
}
</style>
