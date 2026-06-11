<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden" id="top">
    <Header @open-login="showLogin = true" @open-register="showRegister = true" />

    <!-- ══════════════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════════════ -->
    <section class="relative min-h-[96vh] flex items-center overflow-hidden bg-hero">
      <!-- Background layers -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a1f44] via-[#0d2d6b] to-[#112d7a]"></div>
      <div class="absolute inset-0 opacity-20"
        style="background-image:radial-gradient(circle at 20% 50%, #f59e0b44 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1d4ed855 0%, transparent 50%); "></div>
      <!-- Animated orbs -->
      <div class="absolute -top-32 -left-32 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] animate-orb"></div>
      <div class="absolute -bottom-32 -right-32 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[140px] animate-orb" style="animation-delay:3s"></div>
      <!-- Grid overlay -->
      <div class="absolute inset-0 opacity-[0.04]"
        style="background-image:linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px);background-size:64px 64px"></div>
      <!-- World map faint overlay -->
      <div class="absolute right-0 top-0 bottom-0 w-1/2 opacity-5 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1000 600" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="150" r="80" stroke="white" stroke-width="1"/>
          <circle cx="500" cy="300" r="120" stroke="white" stroke-width="1"/>
          <circle cx="800" cy="200" r="60" stroke="white" stroke-width="1"/>
          <line x1="200" y1="150" x2="500" y2="300" stroke="white" stroke-width="0.5" stroke-dasharray="8 4"/>
          <line x1="500" y1="300" x2="800" y2="200" stroke="white" stroke-width="0.5" stroke-dasharray="8 4"/>
          <line x1="200" y1="150" x2="800" y2="200" stroke="white" stroke-width="0.5" stroke-dasharray="8 4"/>
        </svg>
      </div>

      <div class="relative max-w-7xl mx-auto px-6 py-24 lg:py-0 w-full">
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <!-- Left: Copy -->
          <div class="flex-1 text-center lg:text-left hero-text">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 mb-7 text-xs font-bold tracking-widest text-amber-400 bg-amber-400/10 rounded-full uppercase border border-amber-400/25">
              <span class="relative flex h-2 w-2 shrink-0">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              Licensed Foreign Employment Agency · Since 2010
            </div>

            <h1 class="text-5xl sm:text-6xl lg:text-[4.2rem] font-black text-white leading-[1.08] mb-6 tracking-tight">
              Your Gateway to<br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-gradient">
                Global Opportunities
              </span>
            </h1>

            <p class="text-blue-100/80 text-lg leading-relaxed mb-9 max-w-xl mx-auto lg:mx-0">
              Tila Foreign Employment Agency bridges skilled Ethiopian professionals with verified employers across the Middle East, Europe, and Asia — safely, legally, and with full support from start to finish.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button @click="showRegister = true"
                class="group px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-2xl shadow-xl shadow-amber-500/30 hover:shadow-amber-400/40 hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center justify-center gap-3">
                <i class="fas fa-globe text-xs"></i>
                Apply for a Job Abroad
                <i class="fas fa-arrow-right text-xs group-hover:translate-x-1.5 transition-transform duration-300"></i>
              </button>
              <a href="#services"
                class="group px-8 py-4 bg-white/8 hover:bg-white/14 text-white font-semibold rounded-2xl border border-white/15 hover:border-amber-400/40 transition-all duration-300 text-sm flex items-center justify-center gap-2">
                <i class="fas fa-briefcase text-amber-400 text-xs"></i>
                Our Services
              </a>
            </div>

            <!-- Trust badges -->
            <div class="mt-10 flex flex-wrap items-center gap-5 justify-center lg:justify-start">
              <div v-for="b in trustBadges" :key="b" class="flex items-center gap-1.5 text-xs text-blue-200/70">
                <i class="fas fa-check-circle text-amber-400 text-[11px]"></i>{{ b }}
              </div>
            </div>
          </div>

          <!-- Right: Hero Visual Card -->
          <div class="flex-1 w-full max-w-md hero-visual">
            <div class="relative">
              <!-- Card -->
              <div class="bg-white/8 border border-white/15 rounded-3xl p-7 backdrop-blur-md shadow-2xl">
                <!-- Header -->
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <i class="fas fa-plane-departure text-amber-400 text-sm"></i>
                    </div>
                    <div>
                      <p class="text-white text-sm font-black">Live Job Openings</p>
                      <p class="text-white/40 text-[11px]">Verified employers worldwide</p>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 bg-green-500/25 text-green-300 text-[10px] font-bold rounded-full uppercase">Active Now</span>
                </div>

                <!-- Job listings preview -->
                <div class="space-y-3 mb-6">
                  <div v-for="(job, i) in heroJobs" :key="job.title"
                    class="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-200">
                    <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :class="job.iconBg">
                      <i :class="[job.icon, job.iconColor, 'text-sm']"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-white text-xs font-bold truncate">{{ job.title }}</p>
                      <p class="text-white/50 text-[10px]">{{ job.country }} &bull; {{ job.salary }}</p>
                    </div>
                    <span class="px-2 py-0.5 text-[9px] font-bold rounded-full shrink-0" :class="job.badgeClass">{{ job.spots }}</span>
                  </div>
                </div>

                <!-- Stats row -->
                <div class="grid grid-cols-3 gap-3">
                  <div v-for="s in heroStats" :key="s.label" class="bg-white/5 rounded-xl p-3 text-center">
                    <p class="text-base font-black" :class="s.color">{{ s.val }}</p>
                    <p class="text-[10px] text-white/40 font-medium leading-tight mt-0.5">{{ s.label }}</p>
                  </div>
                </div>
              </div>

              <!-- Floating badges -->
              <div class="absolute -top-4 -right-4 bg-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-amber-500/40 animate-float">
                <i class="fas fa-shield-check mr-1"></i>Gov. Licensed
              </div>
              <div class="absolute -bottom-4 -left-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-blue-600/40 animate-float" style="animation-delay:1.2s">
                <i class="fas fa-globe-africa mr-1"></i>15+ Countries
              </div>

              <!-- Glow -->
              <div class="absolute inset-0 rounded-3xl bg-amber-500/5 blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span class="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        <i class="fas fa-chevron-down text-xs"></i>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         TRUSTED DESTINATIONS STRIP
    ══════════════════════════════════════════════════════════ -->
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

    <!-- ══════════════════════════════════════════════════════════
         ABOUT SECTION
    ══════════════════════════════════════════════════════════ -->
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

    <!-- ══════════════════════════════════════════════════════════
         HOW IT WORKS
    ══════════════════════════════════════════════════════════ -->
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

    <!-- ══════════════════════════════════════════════════════════
         SERVICES (id="services" for nav)
    ══════════════════════════════════════════════════════════ -->
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

    <!-- ══════════════════════════════════════════════════════════
         JOB CATEGORIES (dark section)
    ══════════════════════════════════════════════════════════ -->
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

    <!-- ══════════════════════════════════════════════════════════
         STATS COUNTER STRIP
    ══════════════════════════════════════════════════════════ -->
    <section class="stats-strip py-20 bg-gradient-to-r from-blue-800 via-blue-700 to-[#0d2d6b] relative overflow-hidden">
      <div class="absolute inset-0 opacity-10"
        style="background-image:linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px);background-size:40px 40px"></div>
      <div class="relative max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(stat, i) in stats" :key="stat.label"
            class="text-center reveal-up"
            :style="`transition-delay:${i*0.1}s`">
            <p class="text-4xl font-black text-white mb-1">{{ stat.animated }}</p>
            <p class="text-blue-200 text-xs font-semibold uppercase tracking-wide">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         TESTIMONIALS
    ══════════════════════════════════════════════════════════ -->
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

    <!-- ══════════════════════════════════════════════════════════
         WHY CHOOSE US CTA BANNER
    ══════════════════════════════════════════════════════════ -->
    <section class="py-24 bg-[#0a1f44] relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/8 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div class="text-center lg:text-left reveal-left">
          <span class="text-xs font-bold tracking-widest text-amber-400 uppercase">Why Choose Tila</span>
          <h2 class="text-3xl lg:text-4xl font-black text-white leading-tight mt-3 mb-3">A partner you can trust<br/>for your overseas journey.</h2>
          <p class="text-blue-200/70 text-sm max-w-lg">Government licensed, transparent, and committed to your safety, rights, and success from day one.</p>
        </div>
        <div class="flex flex-col items-center lg:items-end gap-5 shrink-0 reveal-right">
          <div class="flex flex-wrap gap-3 justify-center lg:justify-end">
            <div v-for="badge in whyBadges" :key="badge"
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/80 font-semibold flex items-center gap-2">
              <i class="fas fa-check text-amber-400 text-[10px]"></i>{{ badge }}
            </div>
          </div>
          <button @click="showRegister = true"
            class="group inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-2xl shadow-xl shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm">
            Start Your Application
            <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         NEWS & EVENTS
    ══════════════════════════════════════════════════════════ -->
    <section id="news" class="py-28 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 reveal-up">
          <div>
            <span class="text-xs font-bold tracking-widest text-amber-600 uppercase">News &amp; Updates</span>
            <h2 class="text-4xl font-black text-gray-900 mt-3">Stay informed</h2>
            <p class="text-gray-500 mt-2 text-sm max-w-lg">Latest job openings, travel advisories, and agency news.</p>
          </div>
          <router-link to="/news-events"
            class="group inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold text-sm shrink-0">
            All News <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Featured news -->
          <div class="md:col-span-1 bg-[#0a1f44] rounded-2xl overflow-hidden flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 reveal-left">
            <div class="h-48 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center relative overflow-hidden">
              <i class="fas fa-newspaper text-white text-5xl relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400"></i>
              <span class="absolute top-4 left-4 px-3 py-1 bg-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-wide z-10">Announcement</span>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <p class="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2">May 20, 2026</p>
              <h3 class="text-white font-black text-base leading-snug mb-3 group-hover:text-amber-400 transition-colors duration-300">New Batch of Verified Job Openings in Saudi Arabia & UAE</h3>
              <p class="text-white/50 text-xs leading-relaxed flex-1">Over 200 new positions are now available for domestic workers, construction laborers, and hospitality staff with competitive packages.</p>
              <router-link to="/news-events" class="mt-5 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors">
                Read More <i class="fas fa-arrow-right text-[10px]"></i>
              </router-link>
            </div>
          </div>

          <!-- News grid -->
          <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div v-for="(item, i) in newsItems" :key="item.title"
              class="reveal-up bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-400 group flex flex-col overflow-hidden"
              :style="`transition-delay:${i*0.1}s`">
              <div class="h-32 flex items-center justify-center relative overflow-hidden" :class="item.bgGradient">
                <i :class="[item.icon, 'text-3xl relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400', item.iconColor]"></i>
                <span class="absolute top-3 left-3 px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wide" :class="item.badgeClass">{{ item.tag }}</span>
              </div>
              <div class="p-5 flex flex-col flex-1">
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">{{ item.date }}</p>
                <h3 class="font-black text-gray-800 text-sm leading-snug mb-2 group-hover:text-amber-600 transition-colors duration-300">{{ item.title }}</h3>
                <p class="text-xs text-gray-500 leading-relaxed flex-1">{{ item.excerpt }}</p>
                <router-link to="/news-events" class="mt-4 inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 text-xs font-bold transition-colors">
                  Read More <i class="fas fa-arrow-right text-[10px]"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         FAQ
    ══════════════════════════════════════════════════════════ -->
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

    <!-- ══════════════════════════════════════════════════════════
         CONTACT
    ══════════════════════════════════════════════════════════ -->
    <section id="contact" class="py-28 bg-white relative overflow-hidden scroll-mt-24">
      <div class="absolute inset-0 opacity-[0.02] pointer-events-none"
        style="background-image:linear-gradient(#1d4ed8 1px,transparent 1px),linear-gradient(90deg,#1d4ed8 1px,transparent 1px);background-size:50px 50px"></div>
      <div class="relative max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 reveal-up">
          <span class="text-xs font-bold tracking-widest text-amber-600 uppercase">Contact Us</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3 mb-4">Ready to start your journey?</h2>
          <p class="text-gray-500 max-w-xl mx-auto text-sm">Reach out to our team for job inquiries, applications, or partnership opportunities.</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <!-- Contact info -->
          <div class="lg:col-span-4 space-y-4 reveal-left">
            <div v-for="info in contactInfo" :key="info.label"
              class="group p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-blue-700 hover:border-blue-700 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <i :class="info.icon" class="text-lg"></i>
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white/60 mb-0.5">{{ info.label }}</p>
                <p class="text-sm font-bold text-gray-800 group-hover:text-white">{{ info.value }}</p>
              </div>
            </div>
            <!-- Status box -->
            <div class="p-5 rounded-2xl bg-[#0a1f44] text-white relative overflow-hidden">
              <div class="absolute top-4 right-4">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
              </div>
              <p class="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Office Status</p>
              <p class="text-sm font-bold">Open · Mon – Sat, 8am – 6pm</p>
            </div>
            <router-link to="/contact"
              class="flex items-center justify-center gap-3 w-full py-4 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-2xl hover:-translate-y-0.5 transition-all duration-300 text-sm shadow-lg shadow-amber-500/20">
              Open Full Contact Page <i class="fas fa-external-link-alt text-xs"></i>
            </router-link>
          </div>

          <!-- Contact form -->
          <div class="lg:col-span-8 reveal-right">
            <div class="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100">
              <form @submit.prevent="submitContact" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                    <input type="text" v-model="contactForm.org_name" required placeholder="Your full name"
                      class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all text-sm font-medium text-gray-800 placeholder:text-gray-300" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone / Email</label>
                    <input type="text" v-model="contactForm.email" required placeholder="+251 or email address"
                      class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all text-sm font-medium text-gray-800 placeholder:text-gray-300" />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message / Inquiry</label>
                  <textarea v-model="contactForm.message" rows="4" placeholder="Tell us about the job you're looking for, or ask us anything..."
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all text-sm font-medium text-gray-800 resize-none placeholder:text-gray-300"></textarea>
                </div>
                <div v-if="contactSuccess" class="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-3 text-sm font-semibold">
                  <i class="fas fa-check-circle"></i> Message sent! Our team will reach out within 24 hours.
                </div>
                <button type="submit" :disabled="contactLoading"
                  class="w-full py-4 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all duration-300 text-sm shadow-lg shadow-blue-700/20 flex items-center justify-center gap-3 group">
                  <i v-if="contactLoading" class="fas fa-spinner animate-spin"></i>
                  {{ contactLoading ? 'Sending...' : 'Send Inquiry' }}
                  <i v-if="!contactLoading" class="fas fa-paper-plane group-hover:translate-x-1 transition-transform duration-300 text-xs"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         FINAL CTA
    ══════════════════════════════════════════════════════════ -->
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
import LoginModal from '@/components/AuthModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  name: 'HomePage',
  components: { Header, Footer, LoginModal, RegisterModal },

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
