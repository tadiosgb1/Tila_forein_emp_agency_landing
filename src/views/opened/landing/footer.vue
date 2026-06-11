<template>
  <footer class="bg-[#0a1f44] text-white pt-16 pb-8 px-6 border-t border-white/5 relative z-20">
    <!-- Grid texture overlay matching Hero and About page -->
    <div class="absolute inset-0 opacity-[0.02] pointer-events-none"
      style="background-image:linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px);background-size:60px 60px"></div>

    <div class="max-w-7xl mx-auto relative z-10">

      <!-- Top Section -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-white/10">

        <!-- Brand Column -->
        <div class="md:col-span-2 space-y-5">
          <div>
            <span class="text-xl font-black text-white tracking-tight">
              Tila<span class="text-amber-400">Agency</span>
            </span>
            <p class="text-[10px] text-white/40 uppercase tracking-widest leading-none mt-1">
              Foreign Employment Agency
            </p>
          </div>

          <p class="text-blue-100/50 text-sm leading-relaxed max-w-sm">
            Connecting skilled Ethiopian professionals with verified global opportunities. Fully licensed, ethical, and structured around safety and accountability since 2010.
          </p>

          <!-- Social Links -->
          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.name" href="#"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-500 border border-white/5 hover:border-amber-500 flex items-center justify-center transition-all duration-200 group">
              <i :class="[social.icon, 'text-sm text-white/50 group-hover:text-white transition-colors']"></i>
            </a>
          </div>
        </div>

        <!-- Navigation Columns -->
        <div v-for="group in navGroups" :key="group.title">
          <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5">{{ group.title }}</h3>
          <ul class="space-y-3">
            <li v-for="link in group.links" :key="link.name">
              <router-link v-if="link.route" :to="link.route"
                class="text-sm text-blue-100/60 hover:text-amber-400 transition-colors">
                {{ link.name }}
              </router-link>
              <a v-else href="#"
                class="text-sm text-blue-100/60 hover:text-amber-400 transition-colors">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-white/30">
          © {{ new Date().getFullYear() }} Tila Foreign Employment Agency. All rights reserved.
        </p>
        <div class="flex gap-6">
          <a href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
          <a href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Service</a>
          <a href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors">Verify License</a>
        </div>
        <!-- Scroll to Top -->
        <a href="#top"
          class="w-10 h-10 bg-white/5 hover:bg-amber-500 border border-white/10 hover:border-amber-500 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          title="Back to top">
          <i class="fas fa-arrow-up text-xs"></i>
        </a>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  data() {
    return {
      socials: [
        { name: 'LinkedIn', icon: 'fab fa-linkedin-in' },
        { name: 'Telegram', icon: 'fab fa-telegram-plane' },
        { name: 'Facebook', icon: 'fab fa-facebook-f' },
        { name: 'Twitter',  icon: 'fab fa-twitter' },
      ],
      navGroups: [
        {
          title: 'Opportunities',
          links: [
            { name: 'Open Positions', route: null },
            { name: 'How to Apply',   route: null },
            { name: 'Requirements',  route: null },
            { name: 'Destinations',  route: null },
          ],
        },
        {
          title: 'Services',
          links: [
            { name: 'Visa Processing',     route: null },
            { name: 'Contract Verification', route: null },
            { name: 'Pre-Departure Prep',  route: null },
            { name: 'Worker Advocacy',      route: null },
          ],
        },
        {
          title: 'Company',
          links: [
            { name: 'About Us',      route: '/about' },
            { name: 'Our Processes', route: null },
            { name: 'Agency News',   route: null },
            { name: 'Contact Us',    route: '/contact' },
          ],
        },
      ],
    };
  },
};
</script>