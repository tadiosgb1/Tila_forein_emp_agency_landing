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
            Updates & Insights
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-2xl">
            News & <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Official Announcements</span>
          </h1>
          <p class="text-blue-100/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest updates regarding international labor laws, ethical migration trends, pre-departure schedules, and success stories.
          </p>
        </div>
      </section>
    </div>

    <!-- ── Main Content Area (White Background Context) ── -->
    <main class="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
      
      <!-- ── Featured Post (Always displays latest big announcement) ── -->
      <section v-if="featuredPost" class="mb-16">
        <div class="group relative bg-slate-50 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid lg:grid-cols-2 gap-0">
          <div class="relative min-h-[260px] bg-slate-900 overflow-hidden">
            <img :src="featuredPost.image" :alt="featuredPost.title" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
            <div class="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              {{ featuredPost.category }}
            </div>
          </div>
          <div class="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-4 text-xs text-slate-400 font-semibold mb-3">
                <span class="flex items-center gap-1.5"><i class="far fa-calendar"></i> {{ featuredPost.date }}</span>
                <span class="flex items-center gap-1.5"><i class="far fa-clock"></i> {{ featuredPost.readTime }}</span>
              </div>
              <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-amber-600 transition-colors">
                {{ featuredPost.title }}
              </h2>
              <p class="text-slate-600 text-base leading-relaxed mb-6">
                {{ featuredPost.excerpt }}
              </p>
            </div>
            <div class="flex items-center justify-between border-t border-slate-200/60 pt-6">
              <span class="text-sm font-bold text-slate-700">By {{ featuredPost.author }}</span>
              <button @click="viewPost(featuredPost.id)" class="text-sm font-bold text-amber-600 hover:text-amber-500 inline-flex items-center gap-1 group/btn">
                Read Full Article <i class="fas fa-arrow-right text-xs group-hover/btn:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Filter & Navigation Category Tabs ── -->
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-10">
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200',
              activeCategory === cat 
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/10' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/40'
            ]"
          >
            {{ cat }}
          </button>
        </div>
        <div class="relative w-full sm:w-64">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search news articles..." 
            class="w-full text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
          />
          <i class="fas fa-search absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
        </div>
      </div>

      <!-- ── Articles Grid ── -->
      <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <article 
          v-for="post in filteredPosts" 
          :key="post.id"
          class="group bg-slate-50/50 border border-slate-200/60 hover:border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
        >
          <div>
            <div class="relative h-48 bg-slate-900 overflow-hidden">
              <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-95" />
              <div class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                {{ post.category }}
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 text-[11px] text-slate-400 font-semibold mb-2.5">
                <span class="flex items-center gap-1"><i class="far fa-calendar"></i> {{ post.date }}</span>
                <span>•</span>
                <span>{{ post.readTime }}</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors mb-2">
                {{ post.title }}
              </h3>
              <p class="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                {{ post.excerpt }}
              </p>
            </div>
          </div>
          <div class="px-6 pb-6 pt-4 border-t border-slate-200/40 flex items-center justify-between bg-slate-50/20">
            <span class="text-xs font-semibold text-slate-500">By {{ post.author }}</span>
            <button @click="viewPost(post.id)" class="text-xs font-bold text-amber-600 hover:text-amber-500 flex items-center gap-1">
              Read More <i class="fas fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </article>
      </section>

      <!-- ── Newsletter Catchment Box ── -->
      <section class="bg-gradient-to-r from-amber-500/5 to-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xs">
        <div class="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center text-xl mx-auto mb-4">
          <i class="far fa-envelope-open"></i>
        </div>
        <h3 class="text-xl md:text-2xl font-black tracking-tight text-slate-900 mb-2">Subscribe to Mandatory Briefings</h3>
        <p class="text-slate-600 text-sm md:text-base max-w-lg mx-auto mb-6">
          Get structural changes regarding global labor quotas, direct legal pathway directives, and official interview announcements dropped in your inbox.
        </p>
        <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your professional email address" 
            required
            class="flex-grow text-sm px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 transition-all text-slate-800 placeholder-slate-400"
          />
          <button type="submit" class="bg-amber-500 hover:bg-amber-400 text-white font-black text-sm px-6 py-3 rounded-xl shadow-md shadow-amber-500/10 transition-all duration-300 shrink-0">
            Join List
          </button>
        </form>
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
  name: 'NewsView',
  emits: ['open-apply'],
  
  components: {
    Header,
    Footer
  },
  
  data() {
    return {
      activeCategory: 'All Updates',
      searchQuery: '',
      categories: ['All Updates', 'Announcements', 'Labor Laws', 'Success Stories', 'Guides'],
      
      featuredPost: {
        id: 1,
        category: 'Announcements',
        date: 'June 08, 2026',
        readTime: '4 min read',
        title: 'Tila Partners with Premium European Logistics & Care Networks for 2026 Quotas',
        excerpt: 'We are thrilled to unveil an official collaborative framework linking vetted Ethiopian professional cohorts with premier health and logistics setups in southern and eastern Europe, backed by full insurance parameters.',
        author: 'Management Board',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80'
      },
      
      posts: [
        {
          id: 2,
          category: 'Labor Laws',
          date: 'May 28, 2026',
          readTime: '5 min read',
          title: 'Understanding the New Middle Eastern Labor Protection Directives',
          excerpt: 'A comprehensive structural breakdown of the newly ratified bilateral agreements protecting overseas worker welfare, minimal salaries, and absolute on-site safety assurances.',
          author: 'Legal Dept.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 3,
          category: 'Success Stories',
          date: 'May 15, 2026',
          readTime: '3 min read',
          title: 'From Addis to Europe: How Martha Built a Culinary Legacy Abroad',
          excerpt: 'Martha shares her transformative career path starting from a pre-departure training seat at Tila to managing hospitality groups in international sectors.',
          author: 'Media Team',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 4,
          category: 'Guides',
          date: 'April 30, 2026',
          readTime: '7 min read',
          title: 'Pre-Departure Protocol Checklist: Avoid Standard Document Deficiencies',
          excerpt: 'The absolute step-by-step master checklist mapping digital certificate verification, medical compliance screenings, and local visa alignment practices.',
          author: 'Operations',
          image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 5,
          category: 'Announcements',
          date: 'April 12, 2026',
          readTime: '2 min read',
          title: 'Warning Against Fraudulent Recruiting Intermediaries Using Tila Identity',
          excerpt: 'Official security statement regarding external bad actors attempting to collection illicit administrative processing fees. Tila enforces absolute transparent paths.',
          author: 'Compliance Off.',
          image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 6,
          category: 'Guides',
          date: 'March 24, 2026',
          readTime: '6 min read',
          title: 'Navigating Cultural Adaptability & Working Space Etiquette Across Borders',
          excerpt: 'An overview of what to expect during your initial 90 days inside a foreign workspace framework, curated by our regional deployment trainers.',
          author: 'Training Team',
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
        }
      ]
    };
  },
  
  computed: {
    filteredPosts() {
      return this.posts.filter(post => {
        const matchesCategory = this.activeCategory === 'All Updates' || post.category === this.activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                              post.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }
  },
  
  methods: {
    viewPost(id) {
      console.log(`Navigating to article ID: ${id}`);
      // Integrate vue-router route or emitter logic here
    },
    handleSubscribe() {
      alert('Thank you for subscribing to Tila Updates.');
    }
  }
};
</script>