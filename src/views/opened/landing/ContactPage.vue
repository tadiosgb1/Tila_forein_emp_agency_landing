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
            Get In Touch
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-2xl">
            We Are Here to <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Support Your Journey</span>
          </h1>
          <p class="text-blue-100/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Have questions about legal pathways, current job quotas, or your ongoing application? Reach out to our offices or leave a direct message below.
          </p>
        </div>
      </section>
    </div>

    <!-- ── Main Content Area (White Background Context) ── -->
    <main class="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
      
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        
        <!-- ── Left Column: Contact Methods ── -->
        <div class="lg:col-span-5 space-y-8">
          <div>
            <h2 class="text-2xl font-black tracking-tight text-slate-900 mb-3">Our Office Headquarters</h2>
            <p class="text-slate-600 text-sm leading-relaxed">
              Drop by our main office for original document authentication, pre-departure contract reviews, or free initial consultations.
            </p>
          </div>

          <div class="space-y-6">
            <!-- Location Details -->
            <div class="flex gap-4 items-start">
              <div class="w-11 h-11 bg-amber-500/10 text-amber-600 border border-amber-500/10 rounded-xl flex items-center justify-center text-sm shrink-0">
                <i class="fas fa-map-marked-alt"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Office Location</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Bole Sub-City, Ward 03, House No. 402<br />
                  Addis Ababa, Ethiopia
                </p>
                <p class="text-xs text-slate-400 mt-1">Adjacent to Cameroon Street, Behind Edna Mall</p>
              </div>
            </div>

            <!-- Communication Lines -->
            <div class="flex gap-4 items-start">
              <div class="w-11 h-11 bg-amber-500/10 text-amber-600 border border-amber-500/10 rounded-xl flex items-center justify-center text-sm shrink-0">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Contact Lines</h3>
                <p class="text-slate-600 text-sm font-semibold">+251 11 6XX XX XX</p>
                <p class="text-slate-600 text-sm font-semibold">+251 91 1XX XX XX</p>
                <p class="text-xs text-slate-400 mt-0.5">Mon – Fri: 8:30 AM – 5:30 PM (EAT)</p>
              </div>
            </div>

            <!-- Electronic Mail -->
            <div class="flex gap-4 items-start">
              <div class="w-11 h-11 bg-amber-500/10 text-amber-600 border border-amber-500/10 rounded-xl flex items-center justify-center text-sm shrink-0">
                <i class="fas fa-envelope"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Electronic Support</h3>
                <p class="text-slate-600 text-sm font-semibold">info@tilaagency.com</p>
                <p class="text-slate-600 text-sm font-semibold">applications@tilaagency.com</p>
              </div>
            </div>
          </div>

          <!-- Licensing Note Bagde -->
          <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3 items-center">
            <i class="fas fa-gavel text-amber-600 text-lg"></i>
            <p class="text-xs text-slate-500 leading-normal">
              Tila Foreign Employment Agency is fully licensed under the Ministry of Labor and Skills, Federal Democratic Republic of Ethiopia. License No: <span class="font-bold text-slate-700">MOLS/FEA/2010/XX</span>.
            </p>
          </div>
        </div>

        <!-- ── Right Column: Interactive Form ── -->
        <div class="lg:col-span-7 bg-slate-50/50 border border-slate-200/60 rounded-3xl p-8 md:p-10 shadow-sm">
          <div class="mb-6">
            <h2 class="text-xl font-black text-slate-900 tracking-tight">Send a Direct Message</h2>
            <p class="text-slate-500 text-xs mt-1">Our customer experience agents typically reply via email within 24 operational hours.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-600">Full Name</label>
                <input v-model="form.name" type="text" required placeholder="e.g., Abebe Kebede"
                  class="w-full text-sm px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 transition-all text-slate-800" />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-600">Phone Number</label>
                <input v-model="form.phone" type="tel" required placeholder="e.g., +251 911..."
                  class="w-full text-sm px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 transition-all text-slate-800" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-600">Email Address</label>
              <input v-model="form.email" type="email" required placeholder="yourname@domain.com"
                class="w-full text-sm px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 transition-all text-slate-800" />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-600">Inquiry Purpose</label>
              <select v-model="form.subject" class="w-full text-sm px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 transition-all text-slate-800">
                <option value="apply">Applying for an Open Position</option>
                <option value="status">Checking Status of Existing Application</option>
                <option value="employer">International Employer Partnership</option>
                <option value="legal">Legal, Licensing & Documentation Queries</option>
                <option value="other">General Inquiries</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-600">Your Detailed Message</label>
              <textarea v-model="form.message" rows="4" required placeholder="Please provide your passport number or candidate ID if applicable..."
                class="w-full text-sm px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 transition-all text-slate-800 resize-none"></textarea>
            </div>

            <button type="submit" 
              class="w-full py-4 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-xl shadow-md shadow-amber-500/10 transition-all duration-300 text-sm flex items-center justify-center gap-2">
              <i class="far fa-paper-plane text-xs"></i>
              Transmit Secure Message
            </button>
          </form>
        </div>

      </div>

      <!-- ── Section: Frequently Asked Questions ── -->
      <section class="pt-12 border-t border-slate-100 max-w-4xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-black tracking-tight text-slate-900 mb-2">Immediate Operational Clarifications</h2>
          <p class="text-slate-500 text-sm">Review baseline protocols prior to logging formal communication channels.</p>
        </div>

        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/30">
            <button @click="toggleFaq(index)" class="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors">
              <span>{{ faq.q }}</span>
              <i :class="['fas text-xs transition-transform duration-200 text-slate-400', activeFaq === index ? 'fa-chevron-up text-amber-600' : 'fa-chevron-down']"></i>
            </button>
            <div v-show="activeFaq === index" class="px-6 pb-5 pt-1 border-t border-slate-200/40 text-slate-600 text-sm leading-relaxed bg-white">
              {{ faq.a }}
            </div>
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
  name: 'ContactView',
  emits: ['open-apply'],
  
  components: {
    Header,
    Footer
  },
  
  data() {
    return {
      activeFaq: 0,
      form: {
        name: '',
        phone: '',
        email: '',
        subject: 'apply',
        message: ''
      },
      faqs: [
        {
          q: "What initial administrative documents are mandatory for registration?",
          a: "Applicants must possess a valid Ethiopian Passport (with at least 6 months validity remaining), an authenticated structural educational degree or vocational certification, and a completely clean medical clearance report from authorized centers."
        },
        {
          q: "Does Tila Agency levy fees for preliminary registration steps?",
          a: "No. Preliminary database enrollment, system registrations, and job matching updates are absolutely free of charge. Tila practices complete transparency to counteract fraudulent intermediary actors."
        },
        {
          q: "How can candidates monitor deployment status parameters?",
          a: "Once registered and successfully matched, updates regarding your biometric timeline, ministry approval, and visa issuance are directly accessible via our internal systems or communicated via automated secure text alerts."
        }
      ]
    };
  },
  
  methods: {
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    },
    handleSubmit() {
      console.log('Transmitting structural form payload data:', this.form);
      alert(`Message successfully captured, ${this.form.name}. Our liaison desk will contact you shortly.`);
      this.form = { name: '', phone: '', email: '', subject: 'apply', message: '' };
    }
  }
};
</script>