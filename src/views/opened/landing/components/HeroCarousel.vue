<template>
  <section class="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden" aria-label="Hero carousel">

    <!-- ── Slides ── -->
    <div class="absolute inset-0">
      <transition-group name="fade-slide" tag="div" class="absolute inset-0">
        <div
          v-for="(slide, i) in slides"
          :key="slide.id"
          v-show="current === i"
          class="absolute inset-0"
        >
          <!-- BG image with parallax-like scale -->
          <div
            class="absolute inset-0 bg-center bg-cover transition-transform duration-[8000ms] ease-out"
            :class="{ 'scale-110': current === i, 'scale-100': current !== i }"
            :style="{ backgroundImage: `url(${slide.img})` }"
          ></div>
          <!-- Dark overlay gradient -->
          <div class="absolute inset-0 bg-gradient-to-r from-[#0a1f44]/90 via-[#0a1f44]/60 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/70 via-transparent to-transparent"></div>
        </div>
      </transition-group>
    </div>

    <!-- ── Grid texture overlay ── -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="background-image:linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px);background-size:60px 60px"></div>

    <!-- ── Content ── -->
    <div class="relative h-full flex items-center">
      <div class="max-w-7xl mx-auto px-6 w-full">
        <transition-group name="content-fade" tag="div">
          <div
            v-for="(slide, i) in slides"
            :key="'content-' + slide.id"
            v-show="current === i"
            class="max-w-2xl"
          >
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 mb-7 text-xs font-bold tracking-widest text-amber-400 bg-amber-400/10 rounded-full uppercase border border-amber-400/25">
              <span class="relative flex h-2 w-2 shrink-0">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              {{ slide.badge }}
            </div>

            <!-- Heading -->
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight drop-shadow-2xl">
              {{ slide.heading }}
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                {{ slide.highlight }}
              </span>
            </h1>

            <!-- Sub text -->
            <p class="text-blue-100/85 text-lg leading-relaxed mb-9 max-w-xl drop-shadow">
              {{ slide.sub }}
            </p>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="$emit('open-apply')"
                class="group px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-2xl shadow-xl shadow-amber-500/30 hover:shadow-amber-400/40 hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center justify-center gap-3"
              >
                <i class="fas fa-globe text-xs"></i>
                {{ slide.cta }}
                <i class="fas fa-arrow-right text-xs group-hover:translate-x-1.5 transition-transform duration-300"></i>
              </button>
              <a
                href="#services"
                class="group px-8 py-4 bg-white/10 hover:bg-white/18 text-white font-semibold rounded-2xl border border-white/20 hover:border-amber-400/50 transition-all duration-300 text-sm flex items-center justify-center gap-2"
              >
                <i class="fas fa-briefcase text-amber-400 text-xs"></i>
                Our Services
              </a>
            </div>

            <!-- Trust row -->
            <div class="mt-10 flex flex-wrap gap-5">
              <div v-for="b in trustBadges" :key="b" class="flex items-center gap-1.5 text-xs text-blue-200/75">
                <i class="fas fa-check-circle text-amber-400 text-[11px]"></i>{{ b }}
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- ── Side stats panel ── -->
    <div class="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
      <div
        v-for="stat in sideStats"
        :key="stat.label"
        class="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-4 text-center w-28 hover:bg-white/15 transition-colors duration-300"
      >
        <p class="text-2xl font-black text-amber-400">{{ stat.val }}</p>
        <p class="text-[10px] text-white/60 font-semibold uppercase tracking-wide leading-tight mt-1">{{ stat.label }}</p>
      </div>
    </div>

    <!-- ── Slide indicators ── -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
      <button
        v-for="(slide, i) in slides"
        :key="'dot-' + i"
        @click="goTo(i)"
        class="transition-all duration-300 rounded-full"
        :class="current === i
          ? 'w-8 h-2.5 bg-amber-400'
          : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'"
        :aria-label="'Go to slide ' + (i+1)"
      ></button>
    </div>

    <!-- ── Prev / Next arrows ── -->
    <button
      @click="prev"
      class="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-amber-500/80 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1/2 hover:scale-110"
      aria-label="Previous slide"
    >
      <i class="fas fa-chevron-left text-sm"></i>
    </button>
    <button
      @click="next"
      class="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-amber-500/80 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1/2 hover:scale-110"
      aria-label="Next slide"
    >
      <i class="fas fa-chevron-right text-sm"></i>
    </button>

    <!-- ── Scroll indicator ── -->
    <div class="absolute bottom-10 right-8 hidden md:flex flex-col items-center gap-2 text-white/30 animate-bounce">
      <span class="text-[9px] uppercase tracking-[0.3em] font-semibold writing-mode-vertical">Scroll</span>
      <i class="fas fa-chevron-down text-xs"></i>
    </div>
  </section>
</template>

<script>
import h1 from '@/assets/img/h1.PNG';
import h2 from '@/assets/img/h2.PNG';
import h3 from '@/assets/img/h3.PNG';
import h4 from '@/assets/img/h4.PNG';
import h5 from '@/assets/img/h5.PNG';
import h6 from '@/assets/img/h6.jpg';
export default {
  name: 'HeroCarousel',
  emits: ['open-apply'],

  data() {
    return {
      current: 0,
      timer: null,
      autoplayDelay: 5500,

      slides: [
        {
          id: 1,
          img: h1,
          badge: 'Licensed Foreign Employment Agency · Since 2010',
          heading: 'Your Gateway to',
          highlight: 'Global Opportunities',
          sub: 'Tila Foreign Employment Agency connects skilled Ethiopian professionals with verified employers across the Middle East, Europe, and Asia — safely, legally, and with full support.',
          cta: 'Apply for a Job Abroad',
        },
        {
          id: 2,
          img: h2,
          badge: 'Verified Employers · 15+ Destinations',
          heading: 'Safe. Legal.',
          highlight: 'Life-Changing Work.',
          sub: 'Every placement comes with a legal contract, comprehensive insurance, and pre-departure training. We protect your rights from day one to the last day of your contract.',
          cta: 'View Open Positions',
        },
        {
          id: 3,
          img: h3,
          badge: '5,000+ Workers Successfully Placed',
          heading: 'Build a Better Future',
          highlight: 'for Your Family',
          sub: 'Thousands of Ethiopians have transformed their lives through Tila. Competitive salaries, safe working conditions, and a team that stays with you every step of the way.',
          cta: 'Start Your Application',
        },
        {
          id: 4,
          img: h4,
          badge: 'End-to-End Support · Visa & Documentation',
          heading: 'We Handle the',
          highlight: 'Paperwork. You Fly.',
          sub: 'From visa processing and medical clearance to contract review and airport assistance — our team manages everything so you can focus on your new career abroad.',
          cta: 'Get Free Consultation',
        },
      ],

      trustBadges: [
        'Gov. Licensed',
        'Free Registration',
        'Legal Contracts',
        'Insurance Covered',
        'Pre-departure Training',
      ],

      sideStats: [
        { val: '5K+',  label: 'Workers Placed' },
        { val: '15+',  label: 'Countries' },
        { val: '98%',  label: 'Satisfaction' },
        { val: '12yr', label: 'Experience' },
      ],
    };
  },

  methods: {
    goTo(i) {
      this.current = i;
      this.restartTimer();
    },
    next() {
      this.current = (this.current + 1) % this.slides.length;
      this.restartTimer();
    },
    prev() {
      this.current = (this.current - 1 + this.slides.length) % this.slides.length;
      this.restartTimer();
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.current = (this.current + 1) % this.slides.length;
      }, this.autoplayDelay);
    },
    restartTimer() {
      clearInterval(this.timer);
      this.startTimer();
    },
  },

  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
/* Slide crossfade */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 1s ease, transform 1s ease;
  position: absolute;
  inset: 0;
}
.fade-slide-enter-from { opacity: 0; transform: scale(1.04); }
.fade-slide-enter-to   { opacity: 1; transform: scale(1); }
.fade-slide-leave-from { opacity: 1; }
.fade-slide-leave-to   { opacity: 0; }

/* Content crossfade */
.content-fade-enter-active { transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s; }
.content-fade-leave-active { transition: opacity 0.3s ease; position: absolute; }
.content-fade-enter-from   { opacity: 0; transform: translateY(24px); }
.content-fade-enter-to     { opacity: 1; transform: translateY(0); }
.content-fade-leave-from   { opacity: 1; }
.content-fade-leave-to     { opacity: 0; }

@keyframes ping-slow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.5); }
}
</style>