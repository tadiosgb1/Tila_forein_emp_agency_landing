<template>
  <section id="gallery" class="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
    <!-- Ambient Backdrop Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Title -->
      <div class="text-center mb-12">
        <span class="text-xs font-bold tracking-widest text-amber-600 uppercase">Media Spotlight</span>
        <h2 class="text-4xl font-black text-gray-900 mt-2 mb-4">Our Gallery & Operations</h2>
        <div class="w-12 h-1 bg-gradient-to-r from-blue-700 to-amber-500 mx-auto rounded-full"></div>
      </div>

      <!-- Main Carousel Arena -->
      <div 
        class="relative h-[300px] sm:h-[450px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl bg-gray-950 group border border-gray-800/10"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
      >
        <!-- Slides Wrapper -->
        <div class="w-full h-full relative">
          <transition-group name="fade">
            <div 
              v-for="(slide, index) in slides" 
              v-show="currentIndex === index" 
              :key="slide.title"
              class="absolute inset-0 w-full h-full"
            >
              <!-- Dynamic Image Filter Layers -->
              <div class="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-black/20 z-10"></div>
              
              <img 
                :src="slide.src" 
                :alt="slide.alt"
                class="w-full h-full object-cover transform scale-100 group-hover:scale-102 transition-transform duration-[6000ms] ease-out"
                @error="handleImgError(index)"
              />

              <!-- Caption Card Info Overlay -->
              <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
                <span class="px-3 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-md shadow-amber-500/20">
                  {{ slide.tag }}
                </span>
                <h3 class="text-xl sm:text-2xl font-black text-white mt-3 mb-1 sm:mb-2">
                  {{ slide.title }}
                </h3>
                <p class="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed font-medium">
                  {{ slide.desc }}
                </p>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- Left Navigation Arrow -->
        <button 
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-amber-500 hover:border-amber-400 hover:scale-105 transition-all duration-300 z-30"
          aria-label="Previous image"
        >
          <i class="fas fa-chevron-left text-sm"></i>
        </button>

        <!-- Right Navigation Arrow -->
        <button 
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-amber-500 hover:border-amber-400 hover:scale-105 transition-all duration-300 z-30"
          aria-label="Next image"
        >
          <i class="fas fa-chevron-right text-sm"></i>
        </button>

        <!-- Top Timeline Linear Progress Bar Indicator -->
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
          <div 
            class="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all ease-linear duration-100"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Thumbnails Selector Bar Grid Matrix -->
      <div class="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-4">
        <button 
          v-for="(slide, index) in slides" 
          :key="'thumb-' + index"
          @click="setSlide(index)"
          class="relative h-16 sm:h-20 rounded-xl overflow-hidden border-2 bg-gray-900 shadow transition-all duration-300 focus:outline-none"
          :class="currentIndex === index ? 'border-amber-500 ring-2 ring-amber-500/20 scale-[0.98]' : 'border-transparent opacity-60 hover:opacity-100'"
        >
          <img 
            :src="slide.src" 
            :alt="'Thumbnail ' + (index + 1)"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black/10 transition-opacity" :class="currentIndex === index ? 'opacity-0' : 'opacity-40'"></div>
          <div v-if="currentIndex === index" class="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"></div>
        </button>
      </div>

    </div>
  </section>
</template>

<script>
import g1 from '../../../../assets/img/g1.jpg';
import g2 from '../../../../assets/img/g2.jpg';
import g3 from '../../../../assets/img/g3.jpg';
import g4 from '../../../../assets/img/g4.jpg';
import g5 from '../../../../assets/img/g5.jpg';
import g6 from '../../../../assets/img/g6.jpg';
import g7 from '../../../../assets/img/g7.jpg';
export default {
  name: 'ProfessionalGallery',
  data() {
    return {
      currentIndex: 0,
      autoplayTimer: null,
      progressTimer: null,
      progress: 0,
      autoplayDuration: 6000,
      progressInterval: 100,
      slides: [
        {
          src: g1,
          alt: 'Gallery Image 1',
          tag: 'Headquarters',
          title: 'Applicant Briefing Sessions',
          desc: 'Orientation schedules mapping process paths, safety expectations, and deployment checkmarks.'
        },
        {
          src: g2,
          alt: 'Gallery Image 2',
          tag: 'Verification',
          title: 'Document Credential Checks',
          desc: 'Ensuring absolute clarity and transparency on document legalities without individual hidden system costs.'
        },
        {
          src: g3,
          alt: 'Gallery Image 3',
          tag: 'Interviews',
          title: 'Delegation Review Arrays',
          desc: 'Direct interaction corridors connecting local talent pools with visiting regional enterprise evaluators.'
        },
        {
          src: g4,
          alt: 'Gallery Image 4',
          tag: 'Training',
          title: 'Onboarding Foundation Layout',
          desc: 'Pre-departure skill standard alignments tailored for strict sector compliance workflows.'
        },
        {
          src: g5,
          alt: 'Gallery Image 5',
          tag: 'Departures',
          title: 'Travel Preparation Portals',
          desc: 'Finalizing applicant-covered routing ticketing itineraries before standard departure groups.'
        },
            {
              src: g6,
              alt: 'Gallery Image 6',
              tag: 'Partnerships',
              title: 'International Network Summits',
              desc: 'Expanding overseas lines to open secured job markets across fully certified channels.'
        },
            {
              src: g7,
              alt: 'Gallery Image 7',
              tag: 'Innovation',
              title: 'Research & Development Labs',
              desc: 'Pioneering cutting-edge solutions through collaborative scientific exploration and technological advancement.'
        }
      ]
    };
  },
  methods: {
    nextSlide() {
      this.resetProgress();
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.resetProgress();
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
    setSlide(index) {
      this.resetProgress();
      this.currentIndex = index;
    },
    startAutoplay() {
      this.autoplayTimer = setInterval(this.nextSlide, this.autoplayDuration);
      
      const incrementStep = (this.progressInterval / this.autoplayDuration) * 100;
      this.progressTimer = setInterval(() => {
        if (this.progress < 100) {
          this.progress += incrementStep;
        }
      }, this.progressInterval);
    },
    stopAutoplay() {
      if (this.autoplayTimer) clearInterval(this.autoplayTimer);
      if (this.progressTimer) clearInterval(this.progressTimer);
    },
    resetProgress() {
      this.progress = 0;
      this.stopAutoplay();
      this.startAutoplay();
    },
    handleImgError(index) {
      this.slides[index].src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
    },
    handleKeyDown(e) {
      if (e.key === 'ArrowRight') this.nextSlide();
      if (e.key === 'ArrowLeft') this.prevSlide();
    }
  },
  mounted() {
    this.startAutoplay();
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    this.stopAutoplay();
    window.removeEventListener('keydown', this.handleKeyDown);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-102 {
  transform: scale(1.025);
}
</style>