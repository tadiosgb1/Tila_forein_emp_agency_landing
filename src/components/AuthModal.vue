<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" @click="$emit('close')"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

      <!-- Green top bar -->
      <div class="h-1.5 w-full bg-gradient-to-r from-green-400 to-green-600"></div>

      <!-- Close -->
      <button @click="$emit('close')"
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition z-10">
        <i class="fas fa-times text-xs"></i>
      </button>

      <div class="p-8">
        <h2 class="text-2xl font-black text-slate-900 mb-1">Welcome back</h2>
        <p class="text-sm text-gray-400 mb-8">Sign in to your account to continue</p>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="you@organization.com"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Password</label>
              <a href="/forgot-password" class="text-xs text-green-600 hover:text-green-700 font-medium">Forgot?</a>
            </div>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition pr-11"
              />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
              </button>
            </div>
          </div>

          <div v-if="error" class="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-medium">
            <i class="fas fa-exclamation-circle"></i>
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <i v-if="loading" class="fas fa-spinner animate-spin text-xs"></i>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="text-center text-xs text-gray-400 mt-6">
          Don't have an account?
          <button @click="$emit('switch-to-register')" class="text-green-600 hover:text-green-700 font-semibold ml-1">
            Create one
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  emits: ['close', 'switch-to-register'],
  data() {
    return {
      form: { email: '', password: '' },
      error: '',
      loading: false,
      showPassword: false,
    };
  },
  methods: {
    async login() {
      this.error = '';
      this.loading = true;
      try {
        const response = await this.$apiPost('/auth/login', this.form);
        localStorage.setItem('refresh',     response.refreshToken);
        localStorage.setItem('access',      response.accessToken);
        localStorage.setItem('userId',      response.id);
        localStorage.setItem('organizationId', response.organization_id || '');
        localStorage.setItem('email',       response.email);
        localStorage.setItem('name',        response.email);
        const roleNames = (response.roles || []).map(r => r.name || r);
        localStorage.setItem('roles',       JSON.stringify(roleNames));
        localStorage.setItem('permissions', JSON.stringify(response.permissions || []));
        this.$emit('close');
        this.$router.push({ path: '/dashboard/first-dash' });
      } catch (err) {
        this.error = err?.message || 'Invalid credentials. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
