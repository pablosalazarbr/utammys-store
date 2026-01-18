<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex-1">
    <!-- Hero Section -->
    <section class="py-16 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-border-soft">
      <div class="space-y-4">
        <h1 class="text-5xl md:text-6xl font-serif">Términos y Condiciones</h1>
        <p class="text-neutral-500 text-sm font-light uppercase tracking-widest">Última actualización: enero 2026</p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-20 px-6 md:px-12 max-w-[900px] mx-auto">
      <div class="space-y-12 text-neutral-700">
        <!-- Introduction -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">1. Aceptación de Términos</h2>
          <p class="text-sm font-light leading-relaxed">
            Al acceder y utilizar este sitio web y plataforma de tienda en línea (el "Sitio"), aceptas estar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar el Sitio.
          </p>
        </div>

        <!-- Use License -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">2. Licencia de Uso</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Se te otorga una licencia limitada, no exclusiva y revocable para acceder y utilizar el Sitio para propósitos personales y de compra. No se permite:
          </p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">Modificar o copiar el contenido del Sitio</li>
            <li class="text-sm font-light leading-relaxed">Usar el Sitio para propósitos comerciales no autorizados</li>
            <li class="text-sm font-light leading-relaxed">Realizar ingeniería inversa o descompilar el Sitio</li>
            <li class="text-sm font-light leading-relaxed">Transmitir virus, malware o código malicioso</li>
            <li class="text-sm font-light leading-relaxed">Interferir con la funcionalidad o seguridad del Sitio</li>
          </ul>
        </div>

        <!-- Product Information -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">3. Información del Producto</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Nos esforzamos por mantener información precisa de productos. Sin embargo:
          </p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">No garantizamos que las descripciones, precios o disponibilidad sean exactas</li>
            <li class="text-sm font-light leading-relaxed">Nos reservamos el derecho de corregir errores sin previo aviso</li>
            <li class="text-sm font-light leading-relaxed">Las imágenes de productos son representativas y pueden variar ligeramente</li>
            <li class="text-sm font-light leading-relaxed">Todos los precios están sujetos a cambio sin previo aviso</li>
          </ul>
        </div>

        <!-- Pricing and Payment -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">4. Precios y Pago</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Todos los precios se muestran en Quetzales Guatemaltecos (Q). Al realizar una compra:
          </p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">Aceptas los términos de pago mostrados al momento de la compra</li>
            <li class="text-sm font-light leading-relaxed">Confirmas que la información de pago proporcionada es correcta</li>
            <li class="text-sm font-light leading-relaxed">Aceptas ser cobrado por el monto total mostrado</li>
            <li class="text-sm font-light leading-relaxed">El pago debe realizarse para completar la compra</li>
          </ul>
        </div>

        <!-- Shipping and Delivery -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">5. Envío y Entrega</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Respecto al envío y entrega de productos:
          </p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">Los tiempos de envío son estimados y no garantizados</li>
            <li class="text-sm font-light leading-relaxed">No somos responsables de retrasos causados por terceros (proveedores de envío, eventos externos)</li>
            <li class="text-sm font-light leading-relaxed">Es tu responsabilidad proporcionar una dirección de entrega correcta</li>
            <li class="text-sm font-light leading-relaxed">El riesgo de los productos pasa a ti cuando recibes la entrega</li>
          </ul>
        </div>

        <!-- Returns and Refunds -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">6. Devoluciones y Reembolsos</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Nuestra política de devoluciones es:
          </p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">Los productos deben devolverse dentro de 14 días de la compra</li>
            <li class="text-sm font-light leading-relaxed">Los productos deben estar en condición original sin usar</li>
            <li class="text-sm font-light leading-relaxed">El cliente es responsable del costo de envío de devolución</li>
            <li class="text-sm font-light leading-relaxed">Los reembolsos se procesarán dentro de 7 a 10 días después de la devolución</li>
          </ul>
          <p class="text-sm font-light leading-relaxed mt-4">
            Para solicitar una devolución, contáctanos en info@uniformestamys.com
          </p>
        </div>

        <!-- Warranty Disclaimer -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">7. Descargo de Responsabilidad</h2>
          <p class="text-sm font-light leading-relaxed">
            El Sitio se proporciona "tal cual" sin garantías de ningún tipo, expresas o implícitas. No garantizamos que el Sitio será ininterrumpido, seguro o libre de errores. En la máxima medida permitida por la ley, no somos responsables de daños directos, indirectos, incidentales o consecuentes derivados del uso del Sitio.
          </p>
        </div>

        <!-- Limitation of Liability -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">8. Limitación de Responsabilidad</h2>
          <p class="text-sm font-light leading-relaxed">
            Nuestra responsabilidad total hacia ti por cualquier reclamo no excederá el monto que pagaste por la compra específica en cuestión. Esto se aplica incluso si hemos sido advertidos de la posibilidad de tales daños.
          </p>
        </div>

        <!-- Intellectual Property -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">9. Propiedad Intelectual</h2>
          <p class="text-sm font-light leading-relaxed">
            Todo el contenido del Sitio, incluidos textos, gráficos, logos y código, es propiedad de Uniformes Tamys o sus proveedores de contenido. Está protegido por leyes de derechos de autor y no puede ser reproducido sin permiso expreso.
          </p>
        </div>

        <!-- Contact -->
        <div class="space-y-4 pt-8 border-t border-border-soft">
          <h2 class="text-2xl font-serif">10. Contacto</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Para preguntas sobre estos Términos y Condiciones, contáctanos:
          </p>
          <div class="space-y-2 text-sm font-light">
            <p><strong>Email:</strong> info@uniformestamys.com</p>
            <p><strong>Teléfono:</strong> (502) 2318-1032 / (502) 2318-1033</p>
            <p><strong>WhatsApp:</strong> (502) 3003-9946</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
