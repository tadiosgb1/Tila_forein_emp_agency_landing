<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800 relative">
    <Loading :visible="loading" message="Processing tracking matrix..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <div>
        <h1 class="text-lg font-bold text-gray-800">Results Management Matrix</h1>
        <p class="text-xs text-gray-400 mt-0.5">
          <span v-if="isAdmin">All psychometric assessment results in the system</span>
          <span v-else-if="isOrganization">Assessment results for your organization's users</span>
          <span v-else>Your completed psychometric assessment results</span>
        </p>
      </div>
    </div>

    <!-- Search + Page Size Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <input v-model="searchQuery" @input="fetchItems(1)" type="text" placeholder="Search by interpretation..."
        class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" />
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchItems(1)" class="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white focus:ring-green-500 focus:border-green-500">
          <option v-for="size in [5, 10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Desktop Table Layout -->
    <div class="bg-white overflow-hidden rounded-xl border border-gray-200 hidden md:block">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th class="px-6 py-3 text-left">#</th>
              <th class="px-6 py-3 text-left">Tester</th>
              <th class="px-6 py-3 text-left">Test Identity</th>
              <th class="px-6 py-3 text-center">Score</th>
              <th class="px-6 py-3 text-center">Status</th>
              <th class="px-6 py-3 text-left">Interpretation</th>
              <th class="px-6 py-3 text-left">Completed</th>
              <th class="px-6 py-3 text-center">Details & Calibration Panels</th>
              <th class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="(item, index) in items" :key="item.id">

              <!-- Base Result Item Row -->
              <tr class="hover:bg-green-50 transition duration-150">
                <td class="px-6 py-4">{{ (currentPage - 1) * pageSize + index + 1 }}</td>

                <!-- Tester Metadata -->
                <td class="px-6 py-4">
                  <p class="font-medium text-gray-700">
                    {{ item.User ? item.User.first_name + ' ' + item.User.last_name : '—' }}
                  </p>
                  <p class="text-xs text-gray-400">{{ item.User?.email || '' }}</p>
                </td>

                <!-- Test Reference Metadata -->
                <td class="px-6 py-4 font-medium text-gray-700">
                  <span class="block">{{ item.Test?.title || '—' }}</span>
                  <span class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.2 rounded font-mono">ID: {{ item.test_id }}</span>
                </td>

                <!-- Scores Badge Context -->
                <td class="px-6 py-4 text-center">
                  <span :class="scoreBadge(item.score)">{{ item.score ?? '—' }}</span>
                </td>

                <!-- Verification Status Flag -->
                <td class="px-6 py-4 text-center">
                  <span :class="statusBadge(item.status)">
                    {{ item.status === 'confirmed' ? 'Confirmed' : 'Pending' }}
                  </span>
                </td>

                <!-- Narrative Summary Interpretation Output -->
                <td class="px-6 py-4 max-w-xs">
                  <p class="text-gray-700 font-medium truncate" :title="item.interpretation">{{ item.interpretation || '—' }}</p>
                </td>

                <!-- Table Timestamp Completion Stamp -->
                <td class="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {{ formatDate(item.completed_at) }}
                </td>

                <!-- Row Inspection Operations -->
                <td class="px-6 py-4 text-center space-x-2 whitespace-nowrap">
                  <button
                    @click="lazyLoadMatrixToggle(item, 'answers')"
                    class="text-xs px-2.5 py-1 rounded-full border transition"
                    :class="activePanels[item.id] === 'answers'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'"
                  >
                    <i class="fas fa-network-wired mr-1"></i> Question Matrix
                  </button>
                  <button
                    @click="lazyLoadMatrixToggle(item, 'recommendations')"
                    class="text-xs px-2.5 py-1 rounded-full border transition"
                    :class="activePanels[item.id] === 'recommendations'
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'"
                  >
                    <i class="fas fa-lightbulb mr-1"></i> Recommendations
                  </button>
                </td>

                <!-- Core Lifecycle Direct Operations -->
                <td class="px-6 py-4 text-center space-x-3">
                  <button 
                    v-if="(isAdmin || isOrganization) && item.status === 'pending'"
                    @click="confirmResultMatrixWorkflow(item)" 
                    title="Confirm Metric Profile" 
                    class="text-green-500 hover:text-green-700 text-base">
                    <i class="fas fa-check-circle"></i>
                  </button>
                  <button 
                    v-if="isAdmin"
                    @click="openDeleteModal(item.id)" 
                    title="Delete Record" 
                    class="text-red-500 hover:text-red-700 text-base">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>

              <!-- Nested Sub-Row Dynamic Inspection Array View -->
              <tr v-if="activePanels[item.id]" :key="'panel-' + item.id">
                <td colspan="9" class="px-8 py-5 bg-gray-50 border-l-4 shadow-inner" :class="activePanels[item.id] === 'answers' ? 'border-emerald-500' : 'border-indigo-500'">
                  
                  <!-- Key Matrix Panel -->
                  <div v-if="activePanels[item.id] === 'answers'">
                    <div class="mb-3 flex items-center justify-between border-b pb-2">
                      <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                        <i class="fas fa-database"></i> Answers Matrix Tracker (Test Reference ID: {{ answersMatrix[item.id]?.test_id || item.test_id }})
                      </h3>
                      <span class="text-[11px] bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded shadow-sm">
                        Total Questions: {{ answersMatrix[item.id]?.total_questions || '—' }} | Grade: {{ answersMatrix[item.id]?.score_percentage ?? '—' }}%
                      </span>
                    </div>
                    
                    <div v-if="answersMatrix[item.id] && Object.keys(answersMatrix[item.id].questions).length > 0" class="space-y-3 max-w-4xl">
                      <div v-for="(qDetails, qId) in answersMatrix[item.id].questions" :key="'q-key-' + qId" class="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div class="flex items-start justify-between gap-4">
                          <div>
                            <span class="text-[11px] bg-gray-200 text-gray-700 font-mono px-1.5 py-0.5 rounded">Question Ref ID Key: {{ qId }}</span>
                            <p class="font-medium text-gray-800 mt-1.5 block">{{ qDetails.question_text }}</p>
                            <span class="mt-1 inline-block text-[10px] uppercase font-bold px-1.5 py-0.2 rounded" :class="qDetails.is_correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                              {{ qDetails.is_correct ? 'Correct Choice' : 'Incorrect Choice' }}
                            </span>
                          </div>
                        </div>

                        <!-- User Selection Value Text Matrix Content Row -->
                        <div class="mt-2 pl-4 border-l-2 bg-gray-50/50 p-2 rounded" :class="qDetails.is_correct ? 'border-green-400' : 'border-red-400'">
                          <span class="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Submitting Tester Choice Value:</span>
                          <p class="text-sm font-serif italic text-gray-700 mt-0.5">
                            "{{ qDetails.selected_option_text || 'Empty response record returned' }}"
                          </p>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-xs text-gray-400 italic py-4 pl-2">No structural submission matrix available for this workspace target identity.</div>
                  </div>

                  <!-- Panel B: Content Management Recommendations Canvas -->
                  <div v-if="activePanels[item.id] === 'recommendations'">
                    <div class="flex items-center justify-between mb-3 border-b pb-2">
                      <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
                        <i class="fas fa-lightbulb"></i> Strategic Performance Recommendation Text
                      </h3>
                    </div>

                    <div v-if="isAdmin || isOrganization" class="space-y-3 max-w-3xl">
                      <textarea 
                        v-model="item.recommendations" 
                        rows="4" 
                        placeholder="Input detailed recommendation reports directly..."
                        class="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white shadow-inner leading-relaxed"
                      ></textarea>
                      <div class="flex justify-end">
                        <button 
                          @click="updateRecommendations(item)"
                          class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition flex items-center gap-1.5 shadow-sm"
                        >
                          <i class="fas fa-save"></i> Commit Report Text Changes
                        </button>
                      </div>
                    </div>
                    <div v-else class="max-w-3xl">
                      <p class="text-sm text-gray-700 leading-relaxed bg-white p-4 border rounded-lg shadow-sm font-light italic">
                        {{ item.recommendations || 'No explicit developmental narrative recommendations generated.' }}
                      </p>
                    </div>
                  </div>

                </td>
              </tr>
            </template>

            <tr v-if="items.length === 0">
              <td colspan="9" class="text-center py-6 text-gray-400 italic">No validation profiles match your filter options.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Inspection Component Cards -->
    <div class="md:hidden space-y-4">
      <div v-for="item in items" :key="'mob-' + item.id" class="bg-white border border-gray-200 rounded-xl shadow p-4">
        <div class="flex justify-between mb-2">
          <div>
            <p class="font-bold text-gray-800">
              {{ item.User ? item.User.first_name + ' ' + item.User.last_name : 'User Key ID: ' + item.user_id }}
            </p>
            <p class="text-xs text-gray-500 font-medium">{{ item.Test?.title || 'Test Identity Key: ' + item.test_id }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span :class="scoreBadge(item.score)">{{ item.score ?? '—' }}</span>
            <button v-if="isAdmin" @click="openDeleteModal(item.id)" class="text-red-500 hover:text-red-700 text-sm">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <p class="text-sm font-medium text-gray-700 mb-1">{{ item.interpretation || '—' }}</p>
        <p class="text-xs text-gray-400 mb-3">{{ formatDate(item.completed_at) }}</p>

        <div class="flex gap-3 border-t pt-3 mt-2">
          <button @click="lazyLoadMatrixToggle(item, 'answers')" class="text-xs text-emerald-600 font-medium">
            <i class="fas fa-network-wired"></i> {{ activePanels[item.id] === 'answers' ? 'Hide Lookup' : 'Open Matrix' }}
          </button>
          <button @click="lazyLoadMatrixToggle(item, 'recommendations')" class="text-xs text-indigo-600 font-medium">
            <i class="fas fa-edit"></i> {{ activePanels[item.id] === 'recommendations' ? 'Close Recs' : 'Edit Recs' }}
          </button>
        </div>

        <!-- Mobile Inner Expanded Panels -->
        <div v-if="activePanels[item.id] === 'answers'" class="mt-3 bg-emerald-50/60 rounded-lg p-3 space-y-3 text-xs">
          <template v-if="answersMatrix[item.id]">
            <div v-for="(qDetails, qId) in answersMatrix[item.id].questions" :key="'mob-q-'+qId" class="bg-white p-2 border rounded shadow-sm">
              <span class="text-[9px] text-gray-400 font-mono">Q_ID: {{ qId }}</span>
              <p class="font-medium text-gray-800 mt-0.5">{{ qDetails.question_text }}</p>
              <p class="text-gray-600 italic mt-1 font-serif">"{{ qDetails.selected_option_text || 'Empty response record returned' }}"</p>
            </div>
          </template>
        </div>

        <div v-if="activePanels[item.id] === 'recommendations'" class="mt-3 bg-indigo-50 rounded-lg p-3 text-xs">
          <textarea v-if="isAdmin || isOrganization" v-model="item.recommendations" rows="3" class="w-full border p-2 rounded bg-white text-xs"></textarea>
          <button v-if="isAdmin || isOrganization" @click="updateRecommendations(item)" class="mt-2 w-full bg-indigo-600 text-white text-[11px] py-1.5 rounded font-medium shadow-sm">Update Report Details</button>
          <p v-else class="text-gray-700 leading-relaxed font-serif italic bg-white p-2 border rounded">"{{ item.recommendations || 'No narrative assigned.' }}"</p>
        </div>

        <div v-if="(isAdmin || isOrganization) && item.status === 'pending'" class="mt-3 pt-3 border-t">
          <button @click="confirmResultMatrixWorkflow(item)" class="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-xs py-2 rounded-lg transition shadow-sm">
            Save Modifications & Verify State
          </button>
        </div>
      </div>
      <p v-if="items.length === 0" class="text-center text-gray-400 py-6 italic">No results data found.</p>
    </div>

    <!-- Pagination Footer -->
    <div class="flex items-center justify-between mt-6 text-sm text-gray-600">
      <span>
        Showing {{ count === 0 ? 0 : (currentPage - 1) * pageSize + 1 }}
        to {{ Math.min(currentPage * pageSize, count) }}
        of {{ count }} total entries
      </span>
      <div class="flex items-center gap-2">
        <button @click="fetchItems(currentPage - 1)" :disabled="currentPage <= 1"
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">← Previous</button>
        <span class="px-3 py-1 bg-green-600 text-white rounded-lg font-medium">{{ currentPage }}</span>
        <button @click="fetchItems(currentPage + 1)" :disabled="currentPage * pageSize >= count"
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">Next →</button>
      </div>
    </div>

    <delete-confirm-modal
      :visible="deleteModalVisible"
      title="Delete Result"
      message="Are you sure you want to delete this result?"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible = false"
    />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";

export default {
  components: { Loading, DeleteConfirmModal },

  data() {
    return {
      items: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",
      loading: false,
      deleteModalVisible: false,
      deleteId: null,
      activePanels: {},
      answersMatrix: {}
    };
  },

  computed: {
    userRoles() {
      try {
        const raw = localStorage.getItem('roles');
        return raw ? JSON.parse(raw).map(r => (typeof r === 'string' ? r : r.name || '').toLowerCase()) : [];
      } catch {
        return [];
      }
    },
    isAdmin() { return this.userRoles.includes('admin'); },
    isOrganization() { return this.userRoles.includes('organization'); },
    userId() { return localStorage.getItem('userId'); },
    organizationId() { return localStorage.getItem('organizationId'); },
  },

  methods: {
    async fetchItems(page = 1) {
      this.loading = true;
      this.currentPage = page;
      const params = { page: 1, page_size: 1000, search: this.searchQuery };
      
      try {
        const res = await this.$apiGet('/result', params);
        let allResults = res.data || [];
        let filteredResults = [];
        
        const orgId = parseInt(this.organizationId);
        const uId = parseInt(this.userId);
        
        if (this.isAdmin) {
          filteredResults = allResults;
        } else if (this.isOrganization) {
          filteredResults = allResults.filter(result => result.User && result.User.organization_id === orgId);
        } else {
          filteredResults = allResults.filter(result => result.user_id === uId || result.User?.id === uId);
        }
        
        this.count = filteredResults.length;
        const startIndex = (this.currentPage - 1) * this.pageSize;
        this.items = filteredResults.slice(startIndex, startIndex + this.pageSize);
        
      } catch (e) {
        console.error(e);
        this.items = [];
        this.count = 0;
      } finally {
        this.loading = false;
      }
    },

    async lazyLoadMatrixToggle(item, panelSelection) {
      const resultId = item.id;

      if (this.activePanels[resultId] === panelSelection) {
        delete this.activePanels[resultId];
        return;
      }

      if (panelSelection === 'answers' && !this.answersMatrix[resultId]) {
        this.loading = true;
        try {
          const res = await this.$apiGet(`/result/user/${item.user_id}/test/${item.test_id}/answers-matrix`);
          if (res && res.success) {
            this.answersMatrix[resultId] = res;
          }
        } catch (error) {
          console.error('Failed to construct data retrieval loop sequence map:', error);
          this.$root.$refs.toast?.showToast('Error downloading assessment matrix structural records.', 'error');
        } finally {
          this.loading = false;
        }
      }

      this.activePanels[resultId] = panelSelection;
    },

    async updateRecommendations(item) {
      this.loading = true;
      try {
        const payload = { recommendations: item.recommendations };
        await this.$apiPut(`/result/${item.id}`, '', payload);
        this.$root.$refs.toast?.showToast('Recommendations update saved.', 'success');
      } catch (e) {
        console.error(e);
        this.$root.$refs.toast?.showToast('Failed to update recommendation details.', 'error');
      } finally {
        this.loading = false;
      }
    },

    async confirmResultMatrixWorkflow(item) {
      this.loading = true;
      const submissionPayload = {
        status: 'confirmed',
        recommendations: item.recommendations,
        test_id: item.test_id
      };

      try {
        await this.$apiPut(`/result/${item.id}/status`, '', submissionPayload);
        this.$root.$refs.toast?.showToast('Calculations mapped successfully.', 'success');
        delete this.activePanels[item.id];
        this.fetchItems(this.currentPage);
      } catch (e) {
        console.error('Execution pipeline verification issue:', e);
        this.$root.$refs.toast?.showToast('Failed to lock data array state configurations downstream.', 'error');
      } finally {
        this.loading = false;
      }
    },

    openDeleteModal(id) { this.deleteId = id; this.deleteModalVisible = true; },

    async confirmDelete() {
      const res = await this.$apiDelete('/result', this.deleteId);
      if (res) this.$root.$refs.toast.showToast('Result deleted successfully', 'success');
      this.deleteModalVisible = false;
      this.fetchItems(this.currentPage);
    },

    scoreBadge(score) {
      if (score === null || score === undefined) return 'px-2 py-0.5 rounded text-gray-400 bg-gray-100 text-xs font-medium';
      if (score >= 80) return 'px-2 py-0.5 rounded text-green-700 bg-green-100 text-xs font-medium';
      if (score >= 60) return 'px-2 py-0.5 rounded text-amber-700 bg-amber-100 text-xs font-medium';
      return 'px-2 py-0.5 rounded text-red-700 bg-red-100 text-xs font-medium';
    },

    statusBadge(status) {
      if (status === 'confirmed') return 'px-2 py-0.5 rounded-full text-green-700 bg-green-100 text-xs font-semibold';
      return 'px-2 py-0.5 rounded-full text-amber-700 bg-amber-100 text-xs font-semibold';
    },

    formatDate(date) {
      if (!date) return '—';
      return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    },
  },

  mounted() { this.fetchItems(); },
};
</script>