<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex-1">
    <!-- Hero Section -->
    <section class="py-16 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-border-soft">
      <div class="space-y-4">
        <h1 class="text-5xl md:text-6xl font-serif">Accesibilidad</h1>
        <p class="text-neutral-500 text-sm font-light uppercase tracking-widest">Nuestro compromiso con la inclusión</p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-20 px-6 md:px-12 max-w-[900px] mx-auto">
      <div class="space-y-12 text-neutral-700">
        <!-- Introduction -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">Nuestro Compromiso con la Accesibilidad</h2>
          <p class="text-sm font-light leading-relaxed">
            En Uniformes Tamys, creemos que todos los usuarios deben poder acceder y utilizar nuestro sitio web independientemente de sus capacidades. Nos comprometemos a proporcionar una experiencia inclusiva y accesible para todos.
          </p>
        </div>

        <!-- WCAG Compliance -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">1. Estándares de Accesibilidad</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Nuestro sitio web se ha diseñado y desarrollado para cumplir con las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, Nivel AA, establecidas por el W3C (World Wide Web Consortium).
          </p>
          <p class="text-sm font-light leading-relaxed">
            Esto significa que nos esforzamos por:
          </p>
          <ul class="space-y-3 ml-4 mt-3">
            <li class="text-sm font-light leading-relaxed"><strong>Perceptibilidad:</strong> La información y los componentes de la interfaz de usuario deben presentarse de forma que los usuarios puedan percibirlos</li>
            <li class="text-sm font-light leading-relaxed"><strong>Operabilidad:</strong> Los componentes de la interfaz de usuario y la navegación deben ser operables</li>
            <li class="text-sm font-light leading-relaxed"><strong>Comprensibilidad:</strong> El texto y la operación de la interfaz de usuario deben ser comprensibles</li>
            <li class="text-sm font-light leading-relaxed"><strong>Robustez:</strong> El contenido debe ser compatible con herramientas de asistencia</li>
          </ul>
        </div>

        <!-- Keyboard Navigation -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">2. Navegación por Teclado</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Todo el contenido interactivo del sitio es accesible mediante teclado:
          </p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">Usa <strong>Tab</strong> para navegar por los elementos interactivos</li>
            <li class="text-sm font-light leading-relaxed">Usa <strong>Shift + Tab</strong> para navegar hacia atrás</li>
            <li class="text-sm font-light leading-relaxed">Usa <strong>Enter</strong> o <strong>Espacio</strong> para activar botones</li>
            <li class="text-sm font-light leading-relaxed">Usa <strong>Flechas</strong> para navegar dentro de menús y listas</li>
          </ul>
        </div>

        <!-- Screen Readers -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">3. Lectores de Pantalla</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Nuestro sitio es compatible con lectores de pantalla populares como:
          </p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">NVDA (NonVisual Desktop Access)</li>
            <li class="text-sm font-light leading-relaxed">JAWS (Job Access With Speech)</li>
            <li class="text-sm font-light leading-relaxed">VoiceOver (en macOS e iOS)</li>
            <li class="text-sm font-light leading-relaxed">Narrator (en Windows)</li>
          </ul>
          <p class="text-sm font-light leading-relaxed mt-4">
            Todos los elementos gráficos incluyen descripciones alternativas para que los lectores de pantalla puedan transmitir la información adecuadamente.
          </p>
        </div>

        <!-- Text and Color -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">4. Texto y Color</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Nuestro diseño asegura:
          </p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">Contraste suficiente entre texto y fondo para garantizar legibilidad (relación de contraste 4.5:1 o superior)</li>
            <li class="text-sm font-light leading-relaxed">Tamaño de fuente claramente legible</li>
            <li class="text-sm font-light leading-relaxed">Espaciado adecuado entre líneas y párrafos</li>
            <li class="text-sm font-light leading-relaxed">La información no se transmite únicamente por color; se utilizan etiquetas e iconos adicionales</li>
          </ul>
        </div>

        <!-- Forms and Inputs -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">5. Formularios e Inputs</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Todos los formularios incluyen:
          </p>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">Etiquetas claras y explícitas para cada campo</li>
            <li class="text-sm font-light leading-relaxed">Instrucciones de entrada evidentes</li>
            <li class="text-sm font-light leading-relaxed">Mensajes de error descriptivos</li>
            <li class="text-sm font-light leading-relaxed">Confirmación visual de campos completados correctamente</li>
          </ul>
        </div>

        <!-- Responsive Design -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">6. Diseño Responsive</h2>
          <p class="text-sm font-light leading-relaxed">
            Nuestro sitio se adapta a diferentes tamaños de pantalla y resoluciones, permitiendo a los usuarios con baja visión aumentar el tamaño del texto hasta un 200% sin pérdida de funcionalidad.
          </p>
        </div>

        <!-- Accessibility Features -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">7. Características de Accesibilidad Implementadas</h2>
          <ul class="space-y-3 ml-4">
            <li class="text-sm font-light leading-relaxed">Atributos ALT descriptivos en todas las imágenes</li>
            <li class="text-sm font-light leading-relaxed">Encabezados semánticamente correctos (H1, H2, H3, etc.)</li>
            <li class="text-sm font-light leading-relaxed">Listas estructuradas apropiadamente</li>
            <li class="text-sm font-light leading-relaxed">Enlaces con texto descriptivo</li>
            <li class="text-sm font-light leading-relaxed">Soporte para navegación por puntos de referencia</li>
            <li class="text-sm font-light leading-relaxed">Indicadores de enfoque claros para la navegación por teclado</li>
          </ul>
        </div>

        <!-- Feedback and Improvement -->
        <div class="space-y-4">
          <h2 class="text-2xl font-serif">8. Retroalimentación y Mejora Continua</h2>
          <p class="text-sm font-light leading-relaxed mb-4">
            Estamos comprometidos con la mejora continua. Si encuentras problemas de accesibilidad o tienes sugerencias:
          </p>
          <div class="space-y-2 text-sm font-light">
            <p><strong>Email:</strong> accesibilidad@uniformestamys.com</p>
            <p><strong>Teléfono:</strong> (502) 2318-1032</p>
            <p><strong>WhatsApp:</strong> (502) 3003-9946</p>
          </div>
          <p class="text-sm font-light leading-relaxed mt-4">
            Responderemos a tu retroalimentación dentro de 48 horas y trabajaremos para resolver cualquier problema de accesibilidad.
          </p>
        </div>

        <!-- Compliance Statement -->
        <div class="space-y-4 pt-8 border-t border-border-soft">
          <h2 class="text-2xl font-serif">9. Declaración de Cumplimiento</h2>
          <p class="text-sm font-light leading-relaxed">
            Uniformes Tamys se esfuerza por garantizar la accesibilidad del sitio web de conformidad con la WCAG 2.1, Nivel AA. Si experimentas dificultades al acceder a cualquier parte de nuestro sitio, no dudes en comunicarte con nosotros para obtener ayuda.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
