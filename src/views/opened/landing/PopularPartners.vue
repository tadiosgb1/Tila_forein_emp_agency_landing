<template>
  <section id="partners" class="py-28 bg-white border-b border-gray-100 scroll-mt-24 relative overflow-hidden">
    <!-- Ambient Glow Background Orbs to make it special -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px] animate-orb"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] animate-orb" style="animation-delay: -4s;"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6">
      
      <!-- Section Header aligned with Tila Branding -->
      <div class="text-center mb-16 reveal-up">
        <span class="text-xs font-bold tracking-widest text-amber-600 uppercase">Global Network</span>
        <h2 class="text-4xl font-black text-gray-900 mt-3 mb-4">Our Popular International Partners</h2>
        <p class="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          We connect you directly with government-approved employers across the Gulf region through transparent, honest pipelines.
        </p>

        <!-- Clear Dynamic Truth Callout Banner -->
        <div class="inline-flex flex-col sm:flex-row items-center gap-2 mt-6 px-5 py-3 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 rounded-2xl border border-amber-100/70 shadow-sm text-xs font-bold">
          <div class="flex items-center gap-2">
            <i class="fas fa-info-circle text-amber-600 text-sm"></i>
            <span><span class="text-amber-700 font-black">Zero Agency Service Fees:</span> Tila assists you entirely for free.</span>
          </div>
          <span class="hidden sm:inline text-amber-300">|</span>
          <span class="text-gray-500 font-medium">Mandatory travel, ticketing, and document costs are covered directly by the applicant.</span>
        </div>
      </div>

      <!-- Partners Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(partner, i) in partners" 
          :key="partner.name"
          class="reveal-up group relative bg-white border border-gray-100 rounded-3xl p-3 hover:border-transparent hover:shadow-2xl transition-all duration-500"
          :style="`transition-delay: ${i * 0.1}s`"
        >
          <!-- Special Glow Outer Ring Highlight on Card Hover -->
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/40 via-blue-500/0 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-[1px]"></div>
          <div class="absolute inset-[1px] rounded-[23px] bg-white -z-10"></div>

          <!-- Image Wrapper with Destination Tag -->
          <div class="relative h-48 bg-gray-50 rounded-2xl overflow-hidden">
            <img 
              :src="partner.image" 
              :alt="partner.name" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            
            <!-- Flag & Country Badge -->
            <div class="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md">
              <span class="text-sm shrink-0">{{ partner.flag }}</span>
              <span class="text-[11px] font-black uppercase tracking-wider text-gray-800">{{ partner.country }}</span>
            </div>
          </div>

          <!-- Partner Details Content -->
          <div class="p-5 pt-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
                {{ partner.sector }}
              </span>
              <div class="flex items-center gap-1 text-amber-500 text-xs">
                <i class="fas fa-star text-[10px]"></i>
                <span class="font-bold text-[10px] uppercase tracking-wider text-gray-400">Verified Employer</span>
              </div>
            </div>

            <h3 class="font-black text-gray-900 text-base mb-2 group-hover:text-amber-600 transition-colors duration-300">
              {{ partner.name }}
            </h3>
            
            <p class="text-xs text-gray-500 leading-relaxed mb-6">
              {{ partner.desc }}
            </p>

            <!-- Metadata Metrics Table Matrix -->
            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p class="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Tila Service Fee</p>
                <p class="text-xs font-black text-emerald-600 mt-1 flex items-center gap-1">
                  <i class="fas fa-check text-[9px]"></i> Free ($0.00)
                </p>
              </div>
              <div>
                <p class="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Process Expenses</p>
                <p class="text-[11px] font-bold text-gray-700 mt-1 leading-tight">Ticket & Visa by Candidate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'PopularPartners',
  data() {
    return {
      partners: [
        {
          name: 'Al-Kharafi Group Hospitality',
          country: 'Kuwait',
          flag: '🇰🇼',
          sector: 'Hospitality',
          image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600&q=80',
          desc: 'One of the largest premier food services and resort operators across Kuwait City, offering transparent legal work arrangements and structured environments.'
        },
        {
          name: 'Saudi Binladin Group (SBG)',
          country: 'Saudi Arabia',
          flag: '🇸🇦',
          sector: 'Construction',
          image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80',
          desc: 'A historic infrastructure conglomerate leading mega urban landscape builds throughout Riyadh. Partners directly through verified administrative portals.'
        },
        {
          name: 'Hamad Medical Network Affiliates',
          country: 'Qatar',
          flag: '🇶🇦',
          sector: 'Healthcare Support',
          image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
          desc: 'Premium community-based support systems and specialized therapeutic care branches running residential assistance assignments in Doha.'
        }
      ]
    };
  },
  methods: {
    initReveal() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      this.$el.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initReveal();
    });
  }
};
</script>

<style scoped>
/* Scroll Reveal Layout Animation */
.reveal-up {
  opacity: 0;
  transform: translateY(48px);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-up.revealed {
  opacity: 1;
  transform: translate(0, 0);
}

/* Background Ambient Orb Pulse Effect */
@keyframes orb {
  0%, 100% { opacity: 0.3; transform: scale(1) translate(0px, 0px); }
  50%      { opacity: 0.6; transform: scale(1.12) translate(10px, -15px); }
}
.animate-orb { 
  animation: orb 10s ease-in-out infinite; 
}
</style>