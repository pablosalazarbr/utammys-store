<script setup>
import { ref } from 'vue'
</script>

<template>
  <main class="flex-1">
    <!-- Header Section -->
    <section class="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border-soft">
      <div class="max-w-2xl">
        <p class="uppercase text-xs tracking-[0.3em] mb-6 text-neutral-400">Sobre Nosotros</p>
        <h1 class="text-6xl md:text-7xl leading-tight font-serif mb-8">
          Uniformes de
          <br/>
          <span class="italic">calidad guatemalteca</span>
        </h1>
        <p class="text-xl text-neutral-600 font-light max-w-lg leading-relaxed">
          20 años de experiencia transformando uniformes escolares y empresariales con diseño moderno, comodidad y los más altos estándares de calidad.
        </p>
      </div>
    </section>

    <!-- Company Story -->
    <section class="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div class="space-y-8">
          <div>
            <h2 class="text-4xl font-serif mb-6">Nuestra Historia</h2>
            <p class="text-lg text-neutral-600 font-light leading-relaxed mb-6">
              Somos una empresa 100% guatemalteca con 20 años de experiencia en el mercado de confección de uniformes con los más altos estándares de calidad. Desde nuestros inicios, hemos buscado romper y evolucionar el esquema tradicional de uniformes.
            </p>
            <p class="text-lg text-neutral-600 font-light leading-relaxed">
              Nuestro compromiso es ofrecerte prendas que combinan diseño moderno, comodidad excepcional y durabilidad garantizada. Cada uniforme es creado con atención al detalle y pasión por la excelencia.
            </p>
          </div>
        </div>
        <div class="aspect-[4/5] bg-accent-grey overflow-hidden">
          <img 
            alt="Tamys facility" 
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop"
          />
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values -->
    <section class="py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border-soft">
      <div class="space-y-16">
        <!-- Mission -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 class="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4">Nuestra Misión</h3>
            <h2 class="text-4xl font-serif mb-6">Uniformes que perduran</h2>
            <p class="text-lg text-neutral-600 font-light leading-relaxed">
              Proveer uniformes de la más alta calidad que combinen comodidad, durabilidad y estilo, satisfaciendo las necesidades de instituciones educativas y empresas con profesionalismo e innovación.
            </p>
          </div>
          <div class="aspect-[4/5] bg-accent-grey overflow-hidden order-first md:order-last">
            <img 
              alt="Craftsmanship" 
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              src="https://images.unsplash.com/photo-1488161994519-c21cc028cb0d?w=600&h=800&fit=crop"
            />
          </div>
        </div>

        <!-- Vision -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div class="aspect-[4/5] bg-accent-grey overflow-hidden">
            <img 
              alt="Innovation" 
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              src="https://images.unsplash.com/photo-1441123694162-e5b91eee20e7?w=600&h=800&fit=crop"
            />
          </div>
          <div>
            <h3 class="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4">Nuestra Visión</h3>
            <h2 class="text-4xl font-serif mb-6">Líderes en innovación</h2>
            <p class="text-lg text-neutral-600 font-light leading-relaxed">
              Ser la marca líder en uniformes reconocida por excelencia en servicio, calidad de productos y compromiso con nuestros clientes. Innovadores y altamente reconocidos en el mercado regional.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border-soft">
      <div class="max-w-2xl mb-16">
        <h2 class="text-5xl font-serif mb-6">Nuestros Valores</h2>
        <p class="text-lg text-neutral-600 font-light">Principios que guían cada decisión y acción dentro de Tamys</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="space-y-3 pb-6 border-b border-border-soft">
          <h3 class="text-2xl font-serif">Confianza</h3>
          <p class="text-neutral-600 font-light">Transparencia y honestidad en todas nuestras operaciones y relaciones comerciales.</p>
        </div>
        <div class="space-y-3 pb-6 border-b border-border-soft">
          <h3 class="text-2xl font-serif">Profesionalismo</h3>
          <p class="text-neutral-600 font-light">Excelencia en servicio, productos y atención personalizada en cada interacción.</p>
        </div>
        <div class="space-y-3 pb-6 border-b border-border-soft">
          <h3 class="text-2xl font-serif">Innovación</h3>
          <p class="text-neutral-600 font-light">Constante mejora en diseños, procesos y tecnologías para evolucionar nuestros uniformes.</p>
        </div>
        <div class="space-y-3 pb-6 border-b border-border-soft">
          <h3 class="text-2xl font-serif">Compromiso</h3>
          <p class="text-neutral-600 font-light">Dedicación total a la satisfacción de nuestros clientes y el crecimiento mutuo.</p>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border-soft">
      <div class="max-w-2xl mb-16">
        <h2 class="text-5xl font-serif mb-6">Nuestros Servicios</h2>
        <p class="text-lg text-neutral-600 font-light">Soluciones completas en confección de uniformes y personalización textil</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-8 bg-accent-grey">
          <h3 class="text-xl font-serif mb-3">Uniformes Escolares</h3>
          <p class="text-neutral-600 font-light">Diseños modernos y cómodos para instituciones educativas de todos los niveles.</p>
        </div>
        <div class="p-8 bg-accent-grey">
          <h3 class="text-xl font-serif mb-3">Uniformes Empresariales</h3>
          <p class="text-neutral-600 font-light">Vestuario profesional que refleja la identidad y profesionalismo de tu empresa.</p>
        </div>
        <div class="p-8 bg-accent-grey">
          <h3 class="text-xl font-serif mb-3">Sublimación Textil</h3>
          <p class="text-neutral-600 font-light">Impresión de alta calidad con colores vibrantes y detalles precisos.</p>
        </div>
        <div class="p-8 bg-accent-grey">
          <h3 class="text-xl font-serif mb-3">Serigrafía</h3>
          <p class="text-neutral-600 font-light">Estampado tradicional para logos y diseños duraderos en uniformes.</p>
        </div>
        <div class="p-8 bg-accent-grey">
          <h3 class="text-xl font-serif mb-3">Bordado y Digitalizado</h3>
          <p class="text-neutral-600 font-light">Bordados precisos y digitalizaciones profesionales de tus diseños.</p>
        </div>
        <div class="p-8 bg-accent-grey">
          <h3 class="text-xl font-serif mb-3">Bordado de Logotipo</h3>
          <p class="text-neutral-600 font-light">Personalización de logos con bordado de alta calidad en tus uniformes.</p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border-soft">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 class="text-5xl font-serif mb-8">Contáctanos</h2>
          <p class="text-lg text-neutral-600 font-light mb-12 max-w-lg">
            ¿Tienes preguntas sobre nuestros productos o servicios? Nuestro equipo está listo para ayudarte.
          </p>

          <div class="space-y-8">
            <div>
              <p class="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Ubicación</p>
              <p class="text-lg font-light">
                Km.14.5, Carretera a El Salvador<br/>
                Centro Comercial Gran Plaza, bodega 116<br/>
                Guatemala
              </p>
            </div>

            <div>
              <p class="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Teléfono</p>
              <p class="text-lg font-light">
                (502) 2318-1032<br/>
                (502) 2318-1033
              </p>
            </div>

            <div>
              <p class="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">WhatsApp</p>
              <p class="text-lg font-light">(502) 3003-9946</p>
            </div>

            <div>
              <p class="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Email</p>
              <p class="text-lg font-light">info@uniformestamys.com</p>
            </div>

            <div>
              <p class="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Horario</p>
              <p class="text-lg font-light">
                Lunes - Jueves: 8:00 AM - 4:00 PM<br/>
                Viernes: 8:00 AM - 3:00 PM<br/>
                Sábado y Domingo: Cerrado
              </p>
            </div>
          </div>
        </div>

        <div class="aspect-[4/5] bg-accent-grey overflow-hidden">
          <img 
            alt="Contact" 
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop"
          />
        </div>
      </div>
    </section>
  </main>
</template>
