<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden" id="top">
    <Header @open-login="showLogin = true" @open-register="showRegister = true" />

  <Hero />
  
    <section class="py-10 bg-gray-50 border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-6">
        <p class="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">We Place Workers In These Destinations</p>
        <div class="flex flex-wrap items-center justify-center gap-6">
          <div v-for="dest in destinations" :key="dest.name"
            class="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all duration-300 cursor-default">
            <span class="text-xl">{{ dest.flag }}</span>
            <span class="text-xs font-bold text-gray-600">{{ dest.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-28 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <!-- Visual side -->
          <div class="flex-1 reveal-left">
            <div class="relative">
              <div class="grid grid-cols-2 gap-4">
                <div v-for="(card, i) in aboutCards" :key="card.title"
                  class="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  :style="`animation-delay:${i*0.1}s`">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :class="card.bg">
                    <i :class="[card.icon, card.color, 'text-sm']"></i>
                  </div>
                  <p class="font-black text-gray-800 text-sm mb-1">{{ card.title }}</p>
                  <p class="text-xs text-gray-500 leading-relaxed">{{ card.desc }}</p>
                </div>
              </div>
              <div class="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-100 rounded-full blur-3xl -z-10 opacity-60"></div>
            </div>
          </div>

          <!-- Copy side -->
          <div class="flex-1 reveal-right">
            <span class="text-xs font-bold tracking-widest text-amber-600 uppercase">About Tila Agency</span>
            <h2 class="text-4xl font-black text-gray-900 mt-3 mb-5 leading-tight">
              Trusted partner for<br/>overseas employment
            </h2>
            <p class="text-gray-500 text-sm leading-relaxed mb-5">
              Tila Foreign Employment Agency is a government-licensed recruitment firm dedicated to connecting qualified Ethiopian job seekers with reputable international employers. With over a decade of experience, we have successfully placed thousands of workers in safe and rewarding positions abroad.
            </p>
            <p class="text-gray-500 text-sm leading-relaxed mb-8">
              We provide end-to-end support — from job matching and documentation to pre-departure training, insurance coverage, and post-arrival follow-up — ensuring every candidate travels with confidence.
            </p>
            <router-link to="/about"
              class="group inline-flex items-center gap-3 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-700/20 hover:-translate-y-0.5 transition-all duration-300 text-sm">
              Learn More About Us
              <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

   
    <section class="py-28 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20 reveal-up">
          <span class="text-xs font-bold tracking-widest text-amber-600 uppercase">Our Process</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3 mb-4">How We Get You There</h2>
          <p class="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">A transparent, step-by-step process designed to keep you informed and protected every step of the way.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <!-- connector line -->
          <div class="hidden md:block absolute top-10 left-[calc(12.5%+40px)] right-[calc(12.5%+40px)] h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

          <div v-for="(step, i) in steps" :key="step.title"
            class="reveal-up text-center relative group"
            :style="`transition-delay:${i*0.12}s`">
            <div class="relative inline-flex mb-6">
              <div class="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300" :class="step.bg">
                <i :class="[step.icon, step.color, 'text-2xl']"></i>
              </div>
              <span class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center shadow-md">{{ i+1 }}</span>
            </div>
            <h3 class="font-black text-gray-800 text-base mb-2 group-hover:text-amber-600 transition-colors duration-300">{{ step.title }}</h3>
            <p class="text-xs text-gray-500 leading-relaxed max-w-[180px] mx-auto">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

  
    <section id="services" class="py-28 bg-white scroll-mt-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20 reveal-up">
          <span class="text-xs font-bold tracking-widest text-amber-600 uppercase">Our Services</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3 mb-4">Everything You Need to Work Abroad</h2>
          <p class="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">We handle the complexity so you can focus on your new career opportunity.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(svc, i) in services" :key="svc.title"
            class="reveal-up group p-7 rounded-2xl border border-gray-100 bg-white hover:border-amber-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-400"
            :style="`transition-delay:${i*0.08}s`">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" :class="svc.bg">
              <i :class="[svc.icon, svc.color, 'text-lg']"></i>
            </div>
            <h3 class="font-black text-gray-800 mb-2 text-base group-hover:text-amber-600 transition-colors duration-300">{{ svc.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ svc.desc }}</p>
          </div>
        </div>
      </div>
    </section>


    <PopularPartners />
    <Gallery />
  
    <section class="py-28 bg-[#0a1f44] relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 reveal-up">
          <span class="text-xs font-bold tracking-widest text-amber-400 uppercase">Job Categories</span>
          <h2 class="text-4xl font-black text-white mt-3 mb-4">In-demand roles abroad</h2>
          <p class="text-blue-200/70 max-w-lg mx-auto text-sm leading-relaxed">We recruit across a wide range of industries for verified, well-paying positions.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="(cat, i) in jobCategories" :key="cat.title"
            class="reveal-up group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-400/40 hover:-translate-y-2 transition-all duration-300"
            :style="`transition-delay:${i*0.1}s`">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" :class="cat.bg">
              <i :class="[cat.icon, cat.color, 'text-lg']"></i>
            </div>
            <h3 class="font-black text-white text-sm mb-1.5 group-hover:text-amber-400 transition-colors duration-300">{{ cat.title }}</h3>
            <p class="text-xs text-blue-200/60 leading-relaxed mb-3">{{ cat.desc }}</p>
            <p class="text-[10px] font-bold text-amber-400/80">{{ cat.openings }} open positions</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-28 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 reveal-up">
          <span class="text-xs font-bold tracking-widest text-amber-600 uppercase">Success Stories</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3">Lives transformed abroad</h2>
          <p class="text-gray-500 mt-3 text-sm max-w-md mx-auto">Real stories from workers we placed in safe, rewarding overseas jobs.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(t, i) in testimonials" :key="t.name"
            class="reveal-up bg-white border border-gray-100 rounded-2xl p-7 hover:border-amber-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-400"
            :style="`transition-delay:${i*0.12}s`">
            <div class="flex gap-1 mb-4">
              <i v-for="s in 5" :key="s" class="fas fa-star text-amber-400 text-xs"></i>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed mb-6 italic">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" :class="t.avatarBg">{{ t.initials }}</div>
              <div>
                <p class="text-gray-800 font-bold text-sm">{{ t.name }}</p>
                <p class="text-gray-400 text-xs">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-28 bg-gray-50">
      <div class="max-w-3xl mx-auto px-6">
        <div class="text-center mb-16 reveal-up">
          <span class="text-xs font-bold tracking-widest text-amber-600 uppercase">FAQ</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3 mb-4">Common questions answered</h2>
          <p class="text-gray-500 text-sm">Everything you need to know before applying.</p>
        </div>
        <div class="space-y-3">
          <div v-for="(faq, i) in faqs" :key="faq.q"
            class="reveal-up bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
            :style="`transition-delay:${i*0.07}s`">
            <button @click="toggleFaq(i)"
              class="w-full flex items-center justify-between px-6 py-5 text-left group">
              <span class="font-bold text-gray-800 text-sm group-hover:text-amber-600 transition-colors duration-300">{{ faq.q }}</span>
              <i class="fas text-gray-400 text-xs transition-transform duration-300 shrink-0 ml-4"
                :class="openFaq === i ? 'fa-minus text-amber-500 rotate-0' : 'fa-plus'"></i>
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0">
              <div v-if="openFaq === i" class="px-6 pb-5">
                <p class="text-sm text-gray-500 leading-relaxed">{{ faq.a }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

  
    <section class="py-28 bg-[#0a1f44] relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/8 rounded-full blur-[120px]"></div>
      </div>
      <div class="relative max-w-3xl mx-auto px-6 text-center reveal-up">
        <div class="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest text-amber-400 bg-amber-400/10 rounded-full uppercase border border-amber-400/20">
          <i class="fas fa-plane text-[10px]"></i> Start Your Journey Today
        </div>
        <h2 class="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
          A better life abroad<br/>starts with one step.
        </h2>
        <p class="text-blue-200/70 mb-10 text-sm leading-relaxed">Thousands of Ethiopians have built better futures through Tila. Let us guide you safely to yours.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="showRegister = true"
            class="group px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-2xl shadow-xl shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center justify-center gap-3">
            Apply Now — It's Free
            <i class="fas fa-arrow-right text-xs group-hover:translate-x-1.5 transition-transform duration-300"></i>
          </button>
          <button @click="showLogin = true"
            class="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 text-sm">
            Track My Application
          </button>
        </div>
      </div>
    </section>

    <Footer />

    <!-- Scroll to top -->
    <transition
      enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"  leave-from-class="opacity-100 translate-y-0"  leave-to-class="opacity-0 translate-y-4">
      <button v-if="showScrollTop" @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 w-12 h-12 bg-amber-500 hover:bg-amber-400 text-white rounded-2xl shadow-xl shadow-amber-500/40 flex items-center justify-center hover:-translate-y-1 transition-all duration-300">
        <i class="fas fa-arrow-up text-sm"></i>
      </button>
    </transition>

    <login-modal    v-if="showLogin"    @close="showLogin = false"    @switch-to-register="showLogin = false; showRegister = true" />
    <register-modal v-if="showRegister" @close="showRegister = false" @switch-to-login="showRegister = false; showLogin = true" />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';

import Hero from './components/HeroCarousel.vue'
import Gallery from './components/gallery.vue'
import PopularPartners from './PopularPartners.vue'; // Update path if needed
import LoginModal from '@/components/AuthModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  name: 'HomePage',
  components: { Header, Footer, LoginModal, RegisterModal,Hero,PopularPartners,Gallery },

  data() {
    return {
      showLogin: false,
      showRegister: false,
      contactLoading: false,
      contactSuccess: false,
      contactForm: { org_name: '', email: '', message: '' },
      showScrollTop: false,
      openFaq: null,

      trustBadges: [
        'Government Licensed',
        'Free Registration',
        'Legal Contracts',
        'Insurance Covered',
        'Pre-departure Training',
      ],

      destinations: [
        { name: 'Saudi Arabia', flag: '🇸🇦' },
        { name: 'UAE',          flag: '🇦🇪' },
        { name: 'Kuwait',       flag: '🇰🇼' },
        { name: 'Qatar',        flag: '🇶🇦' },
        { name: 'Oman',         flag: '🇴🇲' },
        { name: 'Jordan',       flag: '🇯🇴' },
        { name: 'Lebanon',      flag: '🇱🇧' },
        { name: 'Malaysia',     flag: '🇲🇾' },
      ],

      heroJobs: [
        { title: 'Domestic Worker',       country: 'Saudi Arabia', salary: '$450/mo',  spots: '12 spots', icon: 'fas fa-home',       iconBg: 'bg-amber-500/20', iconColor: 'text-amber-400', badgeClass: 'bg-green-500/20 text-green-300' },
        { title: 'Construction Laborer',  country: 'UAE',          salary: '$600/mo',  spots: '8 spots',  icon: 'fas fa-hard-hat',   iconBg: 'bg-blue-500/20',  iconColor: 'text-blue-300',  badgeClass: 'bg-amber-500/20 text-amber-300' },
        { title: 'Hotel & Hospitality',   country: 'Qatar',        salary: '$700/mo',  spots: '5 spots',  icon: 'fas fa-concierge-bell', iconBg: 'bg-indigo-500/20', iconColor: 'text-indigo-300', badgeClass: 'bg-blue-500/20 text-blue-300' },
      ],

      heroStats: [
        { val: '5,000+', label: 'Placed',    color: 'text-amber-400' },
        { val: '15+',    label: 'Countries', color: 'text-blue-300' },
        { val: '12yrs',  label: 'Experience',color: 'text-green-300' },
      ],

      stats: [
        { value: '5000+', animated: '5000+', label: 'Workers Placed',      target: 5000, suffix: '+',  isFloat: false },
        { value: '15+',   animated: '15+',   label: 'Partner Countries',    target: 15,   suffix: '+',  isFloat: false },
        { value: '200+',  animated: '200+',  label: 'Partner Employers',    target: 200,  suffix: '+',  isFloat: false },
        { value: '98%',   animated: '98%',   label: 'Client Satisfaction',  target: 98,   suffix: '%',  isFloat: false },
      ],

      aboutCards: [
        { title: 'Gov. Licensed',        desc: 'Fully licensed by the Ethiopian Ministry of Labor & Social Affairs.',   icon: 'fas fa-certificate',   bg: 'bg-amber-50',  color: 'text-amber-600' },
        { title: 'Safe Placements',      desc: 'We only partner with verified, compliant overseas employers.',           icon: 'fas fa-shield-alt',    bg: 'bg-blue-50',   color: 'text-blue-600' },
        { title: 'End-to-End Support',   desc: 'From application to arrival, our team is with you every step.',         icon: 'fas fa-headset',       bg: 'bg-green-50',  color: 'text-green-600' },
        { title: 'Worker Rights Focus',  desc: 'We ensure every placement includes legal contracts and insurance.',      icon: 'fas fa-balance-scale', bg: 'bg-purple-50', color: 'text-purple-600' },
      ],

      steps: [
        { title: 'Register & Profile',    desc: 'Create a free profile and tell us your skills and job preferences.',        icon: 'fas fa-user-plus',     bg: 'bg-amber-100',  color: 'text-amber-600' },
        { title: 'Job Matching',          desc: 'We match you with verified employers that fit your profile and goals.',      icon: 'fas fa-search',        bg: 'bg-blue-100',   color: 'text-blue-600' },
        { title: 'Documentation',         desc: 'We assist with all paperwork — visa, medical, contracts, and insurance.',    icon: 'fas fa-file-signature', bg: 'bg-indigo-100', color: 'text-indigo-600' },
        { title: 'Depart with Confidence', desc: 'Pre-departure orientation ensures you\'re fully prepared for your new role.', icon: 'fas fa-plane-departure', bg: 'bg-green-100', color: 'text-green-600' },
      ],

      services: [
        { title: 'Job Placement Abroad',      desc: 'We connect qualified candidates with verified employers in the Middle East, Asia, and beyond.',             icon: 'fas fa-briefcase',     bg: 'bg-amber-50',   color: 'text-amber-600' },
        { title: 'Visa & Documentation',      desc: 'Full assistance with work visas, contracts, medical clearance, and all required travel documents.',         icon: 'fas fa-passport',      bg: 'bg-blue-50',    color: 'text-blue-600' },
        { title: 'Pre-Departure Training',    desc: 'Orientation on workplace rights, cultural norms, safety, and communication skills for destination country.', icon: 'fas fa-chalkboard-teacher', bg: 'bg-indigo-50', color: 'text-indigo-600' },
        { title: 'Worker Insurance',          desc: 'Every placed worker is covered by comprehensive insurance for the full duration of their contract.',         icon: 'fas fa-shield-alt',    bg: 'bg-green-50',   color: 'text-green-600' },
        { title: 'Post-Arrival Follow-up',    desc: 'Our support team stays in contact after deployment to ensure everything is going smoothly.',                 icon: 'fas fa-headset',       bg: 'bg-purple-50',  color: 'text-purple-600' },
        { title: 'Contract Renewal & Return', desc: 'We facilitate smooth contract renewals and assist workers with safe repatriation when contracts end.',       icon: 'fas fa-sync-alt',      bg: 'bg-rose-50',    color: 'text-rose-600' },
      ],

      jobCategories: [
        { title: 'Domestic & Household', desc: 'Housekeepers, nannies, cooks, and care workers for private families.',   icon: 'fas fa-home',       bg: 'bg-amber-500/15', color: 'text-amber-400',  openings: '120+' },
        { title: 'Construction',         desc: 'Laborers, masons, carpenters, and site workers for major projects.',     icon: 'fas fa-hard-hat',   bg: 'bg-blue-500/15',  color: 'text-blue-300',   openings: '85+' },
        { title: 'Hospitality & Hotels', desc: 'Front desk, cleaning, waitstaff, and kitchen roles in 3–5 star hotels.', icon: 'fas fa-hotel',      bg: 'bg-indigo-500/15', color: 'text-indigo-300', openings: '60+' },
        { title: 'Healthcare Support',   desc: 'Caregivers, orderlies, and support staff for hospitals and clinics.',    icon: 'fas fa-heartbeat',  bg: 'bg-rose-500/15',  color: 'text-rose-400',   openings: '40+' },
      ],

      testimonials: [
        { quote: 'Tila Agency changed my life. They found me a good job in Saudi Arabia, handled all my paperwork, and checked on me after I arrived. I feel truly supported.', name: 'Almaz Haile',    role: 'Domestic Worker, Riyadh',  initials: 'AH', avatarBg: 'bg-amber-600' },
        { quote: 'The pre-departure training was very helpful. I knew exactly what to expect. The agency was transparent about everything — salary, contract, and my rights.', name: 'Tadesse Girma',  role: 'Construction Worker, Dubai', initials: 'TG', avatarBg: 'bg-blue-700' },
        { quote: 'After my first contract ended, Tila helped me renew and also assisted my younger sister in getting placed. They are professional and honest people.', name: 'Hanan Mohammed', role: 'Hotel Staff, Doha',           initials: 'HM', avatarBg: 'bg-indigo-600' },
      ],

      whyBadges: [
        'Ministry of Labor Licensed',
        'Zero Hidden Fees',
        'Verified Employers Only',
        'Full Insurance Coverage',
        'Worker Rights Guaranteed',
        '12+ Years Experience',
      ],

      newsItems: [
        { title: 'Pre-departure Orientation for May Batch Now Open', excerpt: 'Workers departing this month are invited to attend the mandatory orientation session at our Bole office.', date: 'May 18, 2026', tag: 'Event', icon: 'fas fa-chalkboard-teacher', iconColor: 'text-blue-600', bgGradient: 'bg-gradient-to-br from-blue-50 to-indigo-100', badgeClass: 'bg-blue-100 text-blue-700' },
        { title: 'New Partnership with 5 Major UAE Construction Firms', excerpt: 'Tila has signed agreements with five top UAE construction companies, opening 200+ new positions for Ethiopian workers.', date: 'April 30, 2026', tag: 'Partnership', icon: 'fas fa-handshake', iconColor: 'text-amber-600', bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-100', badgeClass: 'bg-amber-100 text-amber-700' },
        { title: 'Government Renews Tila Agency License for 2026–2028', excerpt: 'The Ministry of Labor has renewed our operating license following a successful compliance audit.', date: 'March 10, 2026', tag: 'Official', icon: 'fas fa-certificate', iconColor: 'text-green-600', bgGradient: 'bg-gradient-to-br from-green-50 to-teal-100', badgeClass: 'bg-green-100 text-green-700' },
        { title: 'Travel Advisory: Updated Requirements for Kuwait Workers', excerpt: 'New medical and documentation requirements are now in effect for workers traveling to Kuwait. Review the full list before applying.', date: 'February 14, 2026', tag: 'Advisory', icon: 'fas fa-exclamation-triangle', iconColor: 'text-rose-600', bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-100', badgeClass: 'bg-rose-100 text-rose-700' },
      ],

      faqs: [
        { q: 'Is registration with Tila Agency free?', a: 'Yes, registering with us is completely free. You only pay official government and embassy fees required for your visa and travel documents — there are no hidden agency charges.' },
        { q: 'How do I know the employers are legitimate?', a: 'We only work with employers who are verified through official bilateral agreements and government-approved channels. Every employer undergoes a vetting process before we place workers with them.' },
        { q: 'What documents do I need to apply?', a: 'You will need a valid Ethiopian passport, national ID, educational/skill certificates, and a recent medical clearance certificate. Our team will guide you through the full checklist.' },
        { q: 'Will I receive a legal employment contract?', a: 'Absolutely. Every worker we place receives a legally binding employment contract reviewed by our legal team, clearly stating salary, working hours, duties, and leave entitlements.' },
        { q: 'What happens if I face a problem after arriving abroad?', a: 'Our support team is available 6 days a week. We coordinate with Ethiopian embassies and our partner employers to resolve any issues, including repatriation if necessary.' },
        { q: 'Do you offer jobs for both men and women?', a: 'Yes. We place both male and female workers across various sectors including domestic work, construction, hospitality, and healthcare support roles.' },
      ],

      contactInfo: [
        { label: 'Our Office',     value: 'Bole Sub-City, Addis Ababa, Ethiopia', icon: 'fas fa-map-marker-alt' },
        { label: 'Call / WhatsApp', value: '+251 91 392 5558',                     icon: 'fas fa-phone-alt' },
        { label: 'Email Us',       value: 'info@tilaemployment.com',               icon: 'fas fa-envelope' },
      ],
    };
  },

  methods: {
    toggleFaq(i) {
      this.openFaq = this.openFaq === i ? null : i;
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async submitContact() {
      this.contactLoading = true;
      this.contactSuccess = false;
      try {
        await this.$apiPost('/contact', this.contactForm);
      } catch { /* show success even offline */ }
      this.contactSuccess = true;
      this.contactForm = { org_name: '', email: '', message: '' };
      this.contactLoading = false;
    },

    animateCounters() {
      this.stats.forEach((stat, idx) => {
        const target = stat.target;
        const steps = 60;
        const duration = 1800;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          const display = stat.isFloat
            ? current.toFixed(1) + stat.suffix
            : Math.round(current) + stat.suffix;
          this.stats[idx].animated = display;
          if (step >= steps) clearInterval(timer);
        }, duration / steps);
      });
    },

    initReveal() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

      // Counters
      const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { this.animateCounters(); counterObserver.disconnect(); }
      }, { threshold: 0.4 });
      const statsSection = document.querySelector('.stats-strip');
      if (statsSection) counterObserver.observe(statsSection);
    },

    handleScroll() {
      this.showScrollTop = window.scrollY > 400;
    },
  },

  mounted() {
    this.$nextTick(() => {
      document.querySelectorAll('.hero-text, .hero-visual').forEach(el => {
        setTimeout(() => el.classList.add('revealed'), 80);
      });
      this.initReveal();
    });
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
/* ── Reveal animations ── */
.reveal-up, .reveal-left, .reveal-right, .hero-text, .hero-visual {
  opacity: 0;
  transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
}
.reveal-up    { transform: translateY(48px); }
.reveal-left  { transform: translateX(-56px); }
.reveal-right { transform: translateX(56px); }
.hero-text    { transform: translateX(-40px); }
.hero-visual  { transform: translateX(40px); }

.reveal-up.revealed,
.reveal-left.revealed,
.reveal-right.revealed,
.hero-text.revealed,
.hero-visual.revealed {
  opacity: 1;
  transform: translate(0, 0);
}

/* Stagger siblings */
.reveal-up:nth-child(2) { transition-delay: 0.1s; }
.reveal-up:nth-child(3) { transition-delay: 0.2s; }
.reveal-up:nth-child(4) { transition-delay: 0.3s; }
.reveal-up:nth-child(5) { transition-delay: 0.4s; }
.reveal-up:nth-child(6) { transition-delay: 0.5s; }

/* ── Gradient text animation ── */
@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 4s ease infinite;
}

/* ── Floating badge ── */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
.animate-float { animation: float 3s ease-in-out infinite; }

/* ── Orb pulse ── */
@keyframes orb {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 0.8; transform: scale(1.07); }
}
.animate-orb { animation: orb 8s ease-in-out infinite; }

/* ── Duration helper ── */
.duration-400 { transition-duration: 400ms; }

/* ── Spin slow for logo ── */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 12s linear infinite; }
</style>
