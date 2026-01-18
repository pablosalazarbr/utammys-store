<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex-1">
    <!-- Hero Section -->
    <section class="py-16 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-border-soft">
      <div class="space-y-4">
        <h1 class="text-5xl md:text-6xl font-serif">Política de Privacidad</h1>
        <p class="text-neutral-500 text-sm font-light uppercase tracking-widest">Última actualización: enero 2026</p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-20 px-6 md:px-12 max-w-[900px] mx-auto">
      <div class="space-y-12 text-neutral-700">
        <!-- Introduction -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">1. Introducción</h2>
          <p class="text-sm font-light leading-relaxed">
            En Uniformes Tamys ("nosotros", "la Compañía"), nos comprometemos a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos tu información cuando utilizas nuestro sitio web y plataforma de tienda en línea.
          </p>
        </div>

        <!-- Information Collection -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">2. Información que Recopilamos</h2>
          <p class="text-sm font-light leading-relaxed mb-4">Recopilamos información de las siguientes formas:</p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">
              <strong>Información de Contacto:</strong> Nombre, dirección de correo electrónico, número de teléfono y dirección física cuando realizas una compra o te pones en contacto con nosotros.
            </li>
            <li class="text-sm font-light leading-relaxed">
              <strong>Información de Compra:</strong> Detalles de productos, cantidades, direcciones de entrega y método de pago.
            </li>
            <li class="text-sm font-light leading-relaxed">
              <strong>Información de Navegación:</strong> Datos sobre cómo interactúas con nuestro sitio, incluidas cookies y análisis de comportamiento.
            </li>
            <li class="text-sm font-light leading-relaxed">
              <strong>Información Institucional:</strong> Si eres parte de una institución educativa o empresa, recopilamos información relevante para procesar órdenes institucionales.
            </li>
          </ul>
        </div>

        <!-- Data Usage -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">3. Uso de la Información</h2>
          <p class="text-sm font-light leading-relaxed mb-4">Utilizamos la información recopilada para:</p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">Procesar y entregar tus órdenes</li>
            <li class="text-sm font-light leading-relaxed">Comunicarnos sobre tus compras y proporcionar atención al cliente</li>
            <li class="text-sm font-light leading-relaxed">Personalizar tu experiencia en nuestro sitio</li>
            <li class="text-sm font-light leading-relaxed">Mejorar nuestros productos y servicios</li>
            <li class="text-sm font-light leading-relaxed">Cumplir con obligaciones legales y regulatorias</li>
            <li class="text-sm font-light leading-relaxed">Prevenir fraude y proteger la seguridad</li>
          </ul>
        </div>

        <!-- Data Protection -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">4. Protección de Datos</h2>
          <p class="text-sm font-light leading-relaxed">
            Implementamos medidas técnicas, administrativas y físicas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Utilizamos encriptación SSL/TLS para proteger la información durante la transmisión.
          </p>
        </div>

        <!-- Data Sharing -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">5. Compartición de Información</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            No vendemos, alquilamos ni compartimos tu información personal con terceros sin tu consentimiento, excepto en los siguientes casos:
          </p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed"><strong>Proveedores de Servicios:</strong> Compartimos información con proveedores que nos ayudan a operar el sitio y procesar pagos</li>
            <li class="text-sm font-light leading-relaxed"><strong>Requisitos Legales:</strong> Cuando sea requerido por ley o para proteger derechos legales</li>
            <li class="text-sm font-light leading-relaxed"><strong>Instituciones:</strong> Si compras como parte de una institución, podemos compartir información relevante con esa institución</li>
          </ul>
        </div>

        <!-- User Rights -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">6. Tus Derechos</h2>
          <p class="text-sm font-light leading-relaxed mb-4">Tienes derecho a:</p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">Acceder a tu información personal</li>
            <li class="text-sm font-light leading-relaxed">Corregir información inexacta</li>
            <li class="text-sm font-light leading-relaxed">Solicitar la eliminación de tu información</li>
            <li class="text-sm font-light leading-relaxed">Optar por no recibir comunicaciones de marketing</li>
          </ul>
          <p class="text-sm font-light leading-relaxed mt-4">Para ejercer estos derechos, contáctanos en info@uniformestamys.com</p>
        </div>

        <!-- Cookies -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">7. Cookies</h2>
          <p class="text-sm font-light leading-relaxed">
            Nuestro sitio utiliza cookies para mejorar tu experiencia. Puedes controlar el uso de cookies a través de la configuración de tu navegador. Las cookies nos ayudan a recordar tus preferencias y mejorar la funcionalidad del sitio.
          </p>
        </div>

        <!-- Contact -->
        <div class="space-y-4 pt-8 border-t border-border-soft">
          <h2 class="text-2xl font-serif">8. Contacto</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Si tienes preguntas sobre esta Política de Privacidad, contáctanos:
          </p>
          <div class="space-y-2 text-sm font-light">
            <p><strong>Email:</strong> info@uniformestamys.com</p>
            <p><strong>Teléfono:</strong> (502) 2318-1032 / (502) 2318-1033</p>
            <p><strong>WhatsApp:</strong> (502) 3003-9946</p>
            <p><strong>Dirección:</strong> Km.14.5, Carretera a El Salvador, Centro Comercial Gran Plaza, bodega 116, Guatemala</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
