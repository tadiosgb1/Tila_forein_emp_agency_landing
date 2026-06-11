<template>
  <div class="bg-white text-slate-800 min-h-screen flex flex-col justify-between overflow-hidden">
    <!-- ── Header Container (Isolates Dark BG & Small Height Hero) ── -->
    <div class="bg-[#0a1f44] text-white relative">
      <!-- Navigation Header -->
      <Header @open-apply="$emit('open-apply')" />

      <!-- Page Header Section (Reduced Height) -->
      <section class="relative pt-28 pb-12 md:pt-32 md:pb-16 border-b border-white/5">
        <!-- Grid texture overlay matching Hero -->
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
          style="background-image:linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px);background-size:60px 60px"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-amber-400 bg-amber-400/10 rounded-full uppercase border border-amber-400/25">
            Who We Are
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-2xl">
            Empowering Lives Through <br class="hidden sm:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
              Legal & Ethical Recruitment
            </span>
          </h1>
          <p class="text-blue-100/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Since 2010, Tila Foreign Employment Agency has stood as a trusted bridge between talented Ethiopian professionals and global employers, establishing a legacy built on dignity, safety, and transparency.
          </p>
        </div>
      </section>
    </div>

    <!-- ── Main Content Area (White Background Context) ── -->
    <main class="flex-grow">
      
      <!-- ── Strategic Foundations (Mission & Vision) ── -->
      <section class="py-20 max-w-7xl mx-auto px-6 relative">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          <!-- Vision Card -->
          <div class="group relative bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-12 transition-all duration-300 hover:border-amber-500/30 hover:bg-slate-50/50 flex flex-col justify-between overflow-hidden shadow-sm">
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all duration-500"></div>
            <div>
              <div class="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-8 text-amber-600 text-2xl group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-eye"></i>
              </div>
              <h2 class="text-2xl md:text-3xl font-black mb-4 tracking-tight text-slate-900">Our Vision</h2>
              <p class="text-slate-600 text-base md:text-lg leading-relaxed">
                To be recognized as the premier, safest, and most progressive foreign employment agency in East Africa. We envision a future where overseas employment is consistently secure, mutually prosperous, and serves as a powerful catalyst for socio-economic transformation across generations.
              </p>
            </div>
            <div class="mt-8 border-t border-slate-200 pt-4 text-xs font-semibold uppercase tracking-widest text-amber-600/60 group-hover:text-amber-600 transition-colors">
              Looking Beyond Horizons
            </div>
          </div>

          <!-- Mission Card -->
          <div class="group relative bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-12 transition-all duration-300 hover:border-amber-500/30 hover:bg-slate-50/50 flex flex-col justify-between overflow-hidden shadow-sm">
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500"></div>
            <div>
              <div class="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-8 text-amber-600 text-2xl group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-bullseye"></i>
              </div>
              <h2 class="text-2xl md:text-3xl font-black mb-4 tracking-tight text-slate-900">Our Mission</h2>
              <p class="text-slate-600 text-base md:text-lg leading-relaxed">
                To transform lives by safely and legally matching skilled and semi-skilled Ethiopian workers with fully vetted international employers. We are dedicated to delivering professional migration support services, implementing rigid ethical compliance protocols, and providing thorough protective advocacy for every worker we place.
              </p>
            </div>
            <div class="mt-8 border-t border-slate-200 pt-4 text-xs font-semibold uppercase tracking-widest text-amber-600/60 group-hover:text-amber-600 transition-colors">
              Driven by Purpose
            </div>
          </div>

        </div>
      </section>

      <!-- ── Core Values Section ── -->
      <section class="py-20 border-t border-slate-100 bg-gradient-to-b from-transparent to-slate-50/50">
        <div class="max-w-7xl mx-auto px-6">
          
          <div class="text-center max-w-xl mx-auto mb-16">
            <h2 class="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900">
              The Principles That <span class="text-amber-600">Guide Us</span>
            </h2>
            <p class="text-slate-500 text-sm md:text-base">
              Our daily conduct is governed by strict ethical standards designed to prioritize human dignity and structural excellence above everything else.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="value in coreValues" 
              :key="value.title" 
              class="group bg-slate-50/60 hover:bg-white border border-slate-200/60 hover:border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div class="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg mb-5 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                <i :class="value.icon"></i>
              </div>
              <h3 class="text-xl font-bold mb-2 text-slate-900 group-hover:text-amber-600 transition-colors">
                {{ value.title }}
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                {{ value.desc }}
              </p>
            </div>
          </div>

        </div>
      </section>

      <!-- ── Our Journey & Milestones ── -->
      <section class="py-20 max-w-7xl mx-auto px-6 mb-12">
        <div class="bg-gradient-to-r from-amber-500/5 to-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-10 shadow-sm">
          <div class="lg:w-2/3">
            <div class="text-xs font-bold tracking-widest text-amber-600 uppercase mb-3">Why Tila Stands Out</div>
            <h2 class="text-2xl md:text-3xl font-black mb-4 tracking-tight text-slate-900">Over a Decade of Trust & Accountability</h2>
            <p class="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
              Unlike standard agencies, Tila views migration as a collaborative journey. We actively collaborate with international ministries, labor unions, and premium insurance institutions to certify that the living quarters, salary ranges, and physical welfare of our workers are entirely compliant with international human rights requirements.
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div v-for="metric in historicalMetrics" :key="metric.label" class="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-xs">
                <p class="text-xl md:text-2xl font-black text-amber-600">{{ metric.value }}</p>
                <p class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">{{ metric.label }}</p>
              </div>
            </div>
          </div>
          <div class="lg:w-1/3 w-full flex flex-col gap-4">
            <button 
              @click="$emit('open-apply')"
              class="w-full py-4 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-xl shadow-xl shadow-amber-500/10 hover:shadow-amber-400/20 transition-all duration-300 text-sm flex items-center justify-center gap-3"
            >
              <i class="fas fa-file-signature"></i>
              Start Your Journey With Us
            </button>
            <a 
              href="#services"
              class="w-full py-4 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold rounded-xl border border-slate-200/60 transition-all duration-300 text-sm flex items-center justify-center gap-2"
            >
              <!-- Fixed href logic syntax warning by removing text icon conflict -->
              Explore Work Frameworks
            </a>
          </div>
        </div>
      </section>

    </main>

    <!-- ── Global Footer ── -->
    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';

export default {
  name: 'AboutView',
  emits: ['open-apply'],
  
  components: {
    Header,
    Footer
  },
  
  data() {
    return {
      coreValues: [
        {
          icon: 'fas fa-shield-alt',
          title: 'Absolute Integrity',
          desc: 'We operate with total accountability, ensuring zero hidden fees, fully authentic job listings, and zero structural compromises.'
        },
        {
          icon: 'fas fa-hand-holding-heart',
          title: 'Human-First Dignity',
          desc: 'Our applicants are individuals pursuing higher dreams. We enforce labor frameworks that guarantee fair wages, safety, and respect.'
        },
        {
          icon: 'fas fa-balance-scale',
          title: 'Strict Legal Compliance',
          desc: 'Fully licensed by ministry bodies. We navigate global migration laws perfectly so your deployments remain 100% legal.'
        },
        {
          icon: 'fas fa-user-shield',
          title: 'Continuous Advocacy',
          desc: 'Our service does not end at the airport. We provide full on-site conflict management and liaison help throughout your contract lifecycle.'
        },
        {
          icon: 'fas fa-graduation-cap',
          title: 'Empowerment Training',
          desc: 'We cultivate specialized pre-departure cultural training, language prep, and practical workspace coaching to accelerate success.'
        },
        {
          icon: 'fas fa-handshake',
          title: 'Verified Alliances',
          desc: 'We forge long-term strategic alignments solely with verified international corporate networks and monitored employers.'
        }
      ],
      historicalMetrics: [
        { value: '12+', label: 'Years Active' },
        { value: '5,000+', label: 'Lives Changed' },
        { value: '100%', label: 'Legal Paths' },
        { value: '24/7', label: 'Liaison Support' }
      ]
    };
  }
};
</script>

<style scoped>
.writing-mode-vertical {
  writing-mode: vertical-rl;
}
</style>