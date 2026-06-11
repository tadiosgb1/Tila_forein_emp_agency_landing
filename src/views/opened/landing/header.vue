<template>
  <header class="sticky top-0 z-[100] shadow-md">

    <!-- ── Top Info Bar ── -->
    <div class="bg-[#0a1f44] text-white text-[11px] font-medium">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">

        <!-- Left: contact info -->
        <div class="flex items-center gap-5">
          <a href="tel:+251913925558" class="flex items-center gap-1.5 hover:text-amber-300 transition-colors duration-200">
            <i class="fas fa-phone-alt text-amber-400 text-[10px]"></i>
            <span>+251 91 392 5558</span>
          </a>
          <a href="mailto:info@tilaemployment.com" class="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition-colors duration-200">
            <i class="fas fa-envelope text-amber-400 text-[10px]"></i>
            <span>info@tilaemployment.com</span>
          </a>
        </div>

        <!-- Right: tagline + socials -->
        <div class="flex items-center gap-3">
          <span class="hidden md:inline text-blue-200/70">Licensed Foreign Employment Agency</span>
          <div class="flex items-center gap-2.5 ml-2">
            <a href="#" aria-label="Facebook" class="hover:text-amber-300 transition-colors duration-200"><i class="fab fa-facebook-f text-[10px]"></i></a>
            <a href="#" aria-label="Telegram" class="hover:text-amber-300 transition-colors duration-200"><i class="fab fa-telegram text-[10px]"></i></a>
            <a href="#" aria-label="LinkedIn" class="hover:text-amber-300 transition-colors duration-200"><i class="fab fa-linkedin-in text-[10px]"></i></a>
          </div>
        </div>

      </div>
    </div>

    <!-- ── Main Nav Bar ── -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="relative shrink-0">
            <!-- glow ring -->
            <div class="absolute inset-0 rounded-full bg-amber-400/30 blur-md opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
            <!-- spinning dashed ring -->
            <div class="absolute inset-[-3px] rounded-full border-2 border-dashed border-blue-700/30 group-hover:border-amber-400/70 animate-spin-slow transition-colors duration-300"></div>
            <!-- logo image — save the provided logo as src/assets/img/agency-logo.png -->
            <img
              v-if="!logoError"
              src="../../../assets/img/agency-logo.png"
              alt="Tila Foreign Employment Agency Logo"
              class="relative w-12 h-12 rounded-full object-contain bg-white ring-2 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300 p-0.5"
              @error="logoError = true"
            />
            <!-- fallback: shown if image is missing -->
            <div v-else
              class="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-700 to-[#0a1f44] ring-2 ring-white shadow-lg flex items-center justify-center">
              <i class="fas fa-globe text-amber-400 text-lg"></i>
            </div>
          </div>
          <div class="flex flex-col leading-none">
            <span class="text-base font-black text-gray-900 tracking-tight">
              Tila<span class="text-amber-500">Agency</span>
            </span>
            <span class="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mt-0.5 hidden sm:block">
              Foreign Employment
            </span>
          </div>
        </router-link>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1">
          <router-link
            v-for="nav in navLinks"
            :key="nav.path"
            :to="nav.path"
            class="px-4 py-2 text-gray-600 text-xs font-semibold uppercase tracking-wider hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
            active-class="text-blue-700 bg-blue-50"
          >
            {{ nav.name }}
          </router-link>
        </nav>

        <!-- Desktop CTA buttons -->
        <div class="hidden md:flex items-center gap-3">
          <button
            @click="$emit('open-login')"
            class="px-5 py-2 text-gray-600 hover:text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-200 hover:border-blue-200"
          >
            Track Application
          </button>
          <button
            @click="$emit('open-register')"
            class="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow shadow-amber-400/30 hover:shadow-amber-400/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            <i class="fas fa-plane-departure text-[10px]"></i>
            Apply Now
          </button>
        </div>

        <!-- Mobile hamburger -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
          :class="{ 'bg-blue-50 text-blue-700': mobileMenuOpen }"
          aria-label="Toggle menu"
        >
          <i class="fas text-sm" :class="mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t border-gray-100 px-4 pb-5 pt-2 space-y-1">
          <router-link
            v-for="nav in navLinks"
            :key="nav.path"
            :to="nav.path"
            @click="mobileMenuOpen = false"
            class="flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 hover:text-blue-700 hover:bg-blue-50 text-sm font-semibold transition-all duration-200"
          >
            {{ nav.name }}
            <i class="fas fa-chevron-right text-[10px] text-gray-300"></i>
          </router-link>

          <!-- Mobile contact info -->
          <div class="pt-2 pb-1 px-4 flex flex-col gap-1.5 text-xs text-gray-500">
            <a href="tel:+251913925558" class="flex items-center gap-2 hover:text-amber-600 transition">
              <i class="fas fa-phone-alt text-amber-500"></i> +251 91 392 5558
            </a>
            <a href="mailto:info@tilaemployment.com" class="flex items-center gap-2 hover:text-amber-600 transition">
              <i class="fas fa-envelope text-amber-500"></i> info@tilaemployment.com
            </a>
          </div>

          <div class="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              @click="mobileMenuOpen = false; $emit('open-login')"
              class="w-full py-3 text-gray-600 hover:text-blue-700 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-all border border-gray-200"
            >
              Track My Application
            </button>
            <button
              @click="mobileMenuOpen = false; $emit('open-register')"
              class="w-full py-3 bg-amber-500 hover:bg-amber-400 text-white text-sm font-black rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <i class="fas fa-plane-departure text-xs"></i>
              Apply Now — It's Free
            </button>
          </div>
        </div>
      </transition>
    </div>

  </header>
</template>

<script>
export default {
  name: 'SiteHeader',
  emits: ['open-login', 'open-register'],

  data() {
    return {
      mobileMenuOpen: false,
      logoError: false,
      navLinks: [
        { name: 'Home',        path: '/' },
        { name: 'Services',    path: '/#services' },
        { name: 'Job Openings', path: '/jobs' },
        { name: 'About Us',    path: '/about' },
        { name: 'News',        path: '/news-events' },
        { name: 'Contact',     path: '/contact' },
      ],
    };
  },

  watch: {
    $route() {
      this.mobileMenuOpen = false;
    },
  },
};
</script>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}
</style>
