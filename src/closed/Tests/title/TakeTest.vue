<template>
  <div class="min-h-screen bg-gray-50 text-sm text-gray-800">

    <!-- ===================== LOADING ===================== -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <i class="fas fa-spinner animate-spin text-3xl text-green-500 mb-4"></i>
        <p class="text-gray-500">Loading test questions...</p>
      </div>
    </div>

    <!-- ===================== ALREADY COMPLETED ===================== -->
    <div v-else-if="alreadyCompleted" class="flex items-center justify-center min-h-screen p-6">
      <div class="bg-white rounded-2xl border border-gray-200 shadow-lg p-10 max-w-md w-full text-center">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check-double text-blue-500 text-3xl"></i>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Test Already Completed</h2>
        <p class="text-gray-500 mb-6">You have already completed this test. Each test can only be taken once.</p>
        <div class="flex gap-3">
          <button @click="$router.push({ name: 'Test-view' })"
            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg font-medium transition">
            Back to Tests
          </button>
          <button @click="$router.push({ name: 'Result-view' })"
            class="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium transition">
            View Results
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== SUBMITTED ===================== -->
    <div v-else-if="submitted" class="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div class="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 max-w-lg w-full text-center">

        <!-- Time expired banner -->
        <div v-if="timerExpired" class="mb-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3 text-left">
          <i class="fas fa-hourglass-end text-red-500 text-lg shrink-0"></i>
          <div>
            <p class="text-sm font-semibold text-red-700">Time Expired</p>
            <p class="text-xs text-red-500">Your test was automatically submitted when the time ran out.</p>
          </div>
        </div>

        <!-- Success icon -->
        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          :class="timerExpired ? 'bg-amber-100' : 'bg-green-100'">
          <i class="text-3xl" :class="timerExpired ? 'fas fa-clock text-amber-500' : 'fas fa-check-circle text-green-500'"></i>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-1">
          {{ timerExpired ? 'Test Auto-Submitted' : 'Test Submitted!' }}
        </h2>
        <p class="text-gray-500 text-sm mb-6">
          You answered <strong>{{ answeredCount }}</strong> of <strong>{{ questions.length }}</strong> questions.
        </p>

        <!-- MBTI Result Card -->
        <div v-if="mbtiResult" class="mb-6 text-left">
          <div class="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-5">
            <p class="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">Your MBTI Type</p>
            <div class="flex items-center gap-4 mb-4">
              <span class="text-5xl font-black text-indigo-700 tracking-widest">{{ mbtiResult.type }}</span>
              <div class="text-xs text-gray-500 leading-relaxed">
                <div><span class="font-semibold text-indigo-600">{{ mbtiResult.counts.E }}E</span> vs <span class="font-semibold text-gray-600">{{ mbtiResult.counts.I }}I</span></div>
                <div><span class="font-semibold text-indigo-600">{{ mbtiResult.counts.S }}S</span> vs <span class="font-semibold text-gray-600">{{ mbtiResult.counts.N }}N</span></div>
                <div><span class="font-semibold text-indigo-600">{{ mbtiResult.counts.T }}T</span> vs <span class="font-semibold text-gray-600">{{ mbtiResult.counts.F }}F</span></div>
                <div><span class="font-semibold text-indigo-600">{{ mbtiResult.counts.J }}J</span> vs <span class="font-semibold text-gray-600">{{ mbtiResult.counts.P }}P</span></div>
              </div>
            </div>

            <!-- Dimension bars -->
            <div class="space-y-2">
              <div v-for="dim in mbtiDimensions" :key="dim.left" class="flex items-center gap-2 text-xs">
                <span class="w-4 font-bold text-center" :class="mbtiResult.type[dim.pos] === dim.left ? 'text-indigo-700' : 'text-gray-400'">{{ dim.left }}</span>
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-2 rounded-full transition-all"
                    :class="mbtiResult.type[dim.pos] === dim.left ? 'bg-indigo-500' : 'bg-gray-400'"
                    :style="{ width: dimPercent(dim) + '%' }">
                  </div>
                </div>
                <span class="w-4 font-bold text-center" :class="mbtiResult.type[dim.pos] === dim.right ? 'text-indigo-700' : 'text-gray-400'">{{ dim.right }}</span>
              </div>
            </div>

            <p class="text-xs text-gray-500 mt-3 text-center">
              Confidence score: <strong class="text-indigo-600">{{ mbtiResult.score }}%</strong>
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="$router.push({ name: 'Test-view' })"
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition text-sm">
            Back to Tests
          </button>
          <button @click="$router.push({ name: 'Result-view' })"
            class="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium transition text-sm">
            View Results
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== TEST UI ===================== -->
    <div v-else class="flex h-screen overflow-hidden">

      <!-- LEFT: Question Panel -->
      <div class="flex-1 flex flex-col overflow-hidden">

        <!-- Top Bar -->
        <div class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 class="font-bold text-gray-800 text-base">{{ test.title }}</h1>
            <p class="text-xs text-gray-400">{{ test.description }}</p>
          </div>
          <div class="flex items-center gap-4">
            <!-- Timer -->
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm transition-all"
              :class="{
                'border-red-400 bg-red-100 text-red-700 animate-pulse': timerCritical,
                'border-amber-300 bg-amber-50 text-amber-700': timerWarning && !timerCritical,
                'border-gray-200 bg-gray-50 text-gray-600': !timerWarning && !timerCritical,
              }">
              <i class="fas fa-clock text-xs"></i>
              <span>{{ formattedTime }}</span>
              <span v-if="timerCritical" class="text-[10px] font-semibold ml-1">TIME RUNNING OUT</span>
            </div>
            <!-- Progress -->
            <div class="text-xs text-gray-500">
              <span class="font-semibold text-green-600">{{ answeredCount }}</span> / {{ questions.length }} answered
            </div>
          </div>
        </div>

        <!-- Answer Progress Bar -->
        <div class="h-1 bg-gray-100 flex-shrink-0">
          <div class="h-1 bg-green-500 transition-all duration-300"
            :style="{ width: progressPercent + '%' }"></div>
        </div>

        <!-- Time Progress Bar -->
        <div class="h-1 flex-shrink-0"
          :class="timerCritical ? 'bg-red-100' : timerWarning ? 'bg-amber-100' : 'bg-gray-50'">
          <div class="h-1 transition-all duration-1000"
            :class="timerCritical ? 'bg-red-500' : timerWarning ? 'bg-amber-400' : 'bg-blue-400'"
            :style="{ width: timePercent + '%' }"></div>
        </div>

        <!-- Question Content -->
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="currentQuestion" class="max-w-2xl mx-auto">

            <!-- Question Header -->
            <div class="flex items-start gap-3 mb-6">
              <div class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {{ currentIndex + 1 }}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
                    :class="typeBadge(currentQuestion.type)">
                    {{ currentQuestion.type }}
                  </span>
                  <span v-if="isFlagged(currentQuestion.id)" class="text-[10px] text-amber-600 font-semibold">
                    <i class="fas fa-flag mr-1"></i>Flagged
                  </span>
                </div>
                <p class="text-base font-medium text-gray-800 leading-relaxed">
                  {{ currentQuestion.question_text }}
                </p>
              </div>
            </div>

            <!-- Options — Multiple / Likert -->
            <div v-if="currentQuestion.type !== 'open'" class="space-y-3">
              <label
                v-for="opt in sortedOptions(currentQuestion)"
                :key="opt.id"
                class="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
                :class="answers[currentQuestion.id] === opt.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'"
              >
                <input
                  type="radio"
                  :name="'q-' + currentQuestion.id"
                  :value="opt.id"
                  v-model="answers[currentQuestion.id]"
                  class="w-4 h-4 accent-green-500"
                />
                <span class="text-sm text-gray-700">{{ opt.text }}</span>
                <span v-if="answers[currentQuestion.id] === opt.id" class="ml-auto text-green-500">
                  <i class="fas fa-check-circle"></i>
                </span>
              </label>
            </div>

            <!-- Open Text -->
            <div v-else>
              <textarea
                v-model="openAnswers[currentQuestion.id]"
                rows="5"
                placeholder="Write your answer here..."
                class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              ></textarea>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex items-center justify-between mt-8">
              <button
                @click="prevQuestion"
                :disabled="currentIndex === 0"
                class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <i class="fas fa-arrow-left text-xs"></i> Previous
              </button>

              <div class="flex items-center gap-3">
                <!-- Flag -->
                <button
                  @click="toggleFlag(currentQuestion.id)"
                  class="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition"
                  :class="isFlagged(currentQuestion.id)
                    ? 'border-amber-300 bg-amber-50 text-amber-600'
                    : 'border-gray-200 text-gray-500 hover:border-amber-300 hover:text-amber-500'"
                >
                  <i class="fas fa-flag text-xs"></i>
                  {{ isFlagged(currentQuestion.id) ? 'Unflag' : 'Flag' }}
                </button>

                <!-- Clear -->
                <button
                  v-if="answers[currentQuestion.id] || openAnswers[currentQuestion.id]"
                  @click="clearAnswer(currentQuestion.id)"
                  class="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-500 hover:border-red-300 hover:text-red-500 transition"
                >
                  <i class="fas fa-times text-xs"></i> Clear
                </button>
              </div>

              <button
                v-if="currentIndex < questions.length - 1"
                @click="nextQuestion"
                class="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
              >
                Next <i class="fas fa-arrow-right text-xs"></i>
              </button>
              <button
                v-else
                @click="confirmSubmit"
                class="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
              >
                <i class="fas fa-paper-plane text-xs"></i> Submit Test
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- RIGHT: Question Navigator -->
      <div class="w-64 bg-white border-l border-gray-200 flex flex-col flex-shrink-0 hidden lg:flex">
        <div class="px-4 py-3 border-b border-gray-200">
          <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Question Navigator</h3>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <!-- Legend -->
          <div class="flex flex-wrap gap-2 mb-4 text-[10px] text-gray-500">
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-green-500 inline-block"></span> Answered</span>
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-amber-400 inline-block"></span> Flagged</span>
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-gray-200 inline-block"></span> Not answered</span>
          </div>

          <!-- Grid -->
          <div class="grid grid-cols-5 gap-1.5">
            <button
              v-for="(q, i) in questions"
              :key="q.id"
              @click="goToQuestion(i)"
              class="w-9 h-9 rounded-lg text-xs font-bold transition-all border-2"
              :class="navButtonClass(q, i)"
            >
              {{ i + 1 }}
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="p-4 border-t border-gray-200">
          <div class="text-xs text-gray-500 mb-3 text-center">
            {{ answeredCount }} of {{ questions.length }} answered
          </div>
          <button
            @click="confirmSubmit"
            class="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm transition"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== TIME EXPIRED OVERLAY ===================== -->
    <div v-if="timerExpired && submitting"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-[200] p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-hourglass-end text-red-500 text-3xl"></i>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Time's Up!</h2>
        <p class="text-gray-500 text-sm mb-4">
          Your time has expired. Submitting your answers automatically...
        </p>
        <div class="flex items-center justify-center gap-2 text-green-600 font-medium text-sm">
          <i class="fas fa-spinner animate-spin"></i>
          Saving your responses...
        </div>
      </div>
    </div>

    <!-- ===================== CONFIRM SUBMIT MODAL ===================== -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <i class="fas fa-exclamation-triangle text-amber-500"></i>
          </div>
          <h3 class="font-bold text-gray-800">Submit Test?</h3>
        </div>
        <p class="text-sm text-gray-600 mb-2">
          You have answered <strong>{{ answeredCount }}</strong> of <strong>{{ questions.length }}</strong> questions.
        </p>
        <p v-if="unansweredCount > 0" class="text-sm text-amber-600 mb-2">
          <i class="fas fa-exclamation-circle mr-1"></i>
          {{ unansweredCount }} question(s) are unanswered.
        </p>
        <p v-if="flaggedCount > 0" class="text-sm text-amber-600 mb-4">
          <i class="fas fa-flag mr-1"></i>
          {{ flaggedCount }} question(s) are flagged for review.
        </p>
        <div class="flex gap-3 mt-4">
          <button @click="showConfirmModal = false"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            Review
          </button>
          <button @click="submitTest" :disabled="submitting"
            class="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2">
            <i v-if="submitting" class="fas fa-spinner animate-spin text-xs"></i>
            {{ submitting ? 'Submitting...' : 'Confirm Submit' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TakeTest',

  data() {
    return {
      test: {},
      questions: [],
      loading: true,
      submitted: false,
      submitting: false,
      showConfirmModal: false,
      alreadyCompleted: false,

      currentIndex: 0,
      answers: {},       // { questionId: optionId }
      openAnswers: {},   // { questionId: text }
      flagged: new Set(),

      // result
      mbtiResult: null,  // { type, counts, score } — set after submit

      // timer
      totalSeconds: 0,
      remainingSeconds: 0,
      timerInterval: null,
      timerExpired: false,  // true when time ran out (auto-submit)
    };
  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || null;
    },

    mbtiDimensions() {
      return [
        { left: 'E', right: 'I', pos: 0, leftKey: 'E', rightKey: 'I' },
        { left: 'S', right: 'N', pos: 1, leftKey: 'S', rightKey: 'N' },
        { left: 'T', right: 'F', pos: 2, leftKey: 'T', rightKey: 'F' },
        { left: 'J', right: 'P', pos: 3, leftKey: 'J', rightKey: 'P' },
      ];
    },

    answeredCount() {
      return this.questions.filter(q =>
        q.type === 'open'
          ? !!this.openAnswers[q.id]?.trim()
          : this.answers[q.id] != null
      ).length;
    },

    unansweredCount() {
      return this.questions.length - this.answeredCount;
    },

    flaggedCount() {
      return this.flagged.size;
    },

    progressPercent() {
      if (!this.questions.length) return 0;
      return Math.round((this.answeredCount / this.questions.length) * 100);
    },

    timePercent() {
      if (!this.totalSeconds) return 100;
      return Math.round((this.remainingSeconds / this.totalSeconds) * 100);
    },

    formattedTime() {
      const m = Math.floor(this.remainingSeconds / 60);
      const s = this.remainingSeconds % 60;
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    },

    timerWarning() {
      return this.remainingSeconds <= 300 && this.remainingSeconds > 60;
    },

    timerCritical() {
      return this.remainingSeconds <= 60 && this.remainingSeconds > 0;
    },
  },

  methods: {
    async checkIfCompleted() {
      const userId = parseInt(localStorage.getItem('userId'));
      const testId = this.$route.params.id;
      
      try {
        const res = await this.$apiGet('/result', {
          page: 1,
          page_size: 1000,
        });
        
        const userResults = (res.data || []).filter(result => 
          result.user_id === userId && result.test_id === parseInt(testId)
        );
        
        if (userResults.length > 0) {
          this.alreadyCompleted = true;
          return true;
        }
        
        return false;
      } catch (e) {
        console.error('Check completion error:', e);
        return false;
      }
    },

    async fetchTest() {
      const id = this.$route.params.id;
      try {
        const res = await this.$apiGetById('/test', id);
        this.test = res || {};

        // duration is stored as INTEGER (minutes) in the DB
        const durationMinutes = parseInt(this.test.duration) || 30;
        this.totalSeconds     = durationMinutes * 60;
        this.remainingSeconds = this.totalSeconds;
      } catch (e) {
        console.error('Fetch test error:', e);
      }
    },

    async fetchQuestions() {
      const id = this.$route.params.id;
      try {
        const res = await this.$apiGet('/question', { test_id: id, page_size: 200 });
        this.questions = res.data || [];
      } catch (e) {
        console.error('Fetch questions error:', e);
      }
    },

    sortedOptions(question) {
      return [...(question.Options || [])].sort((a, b) => a.position - b.position);
    },

    typeBadge(type) {
      const map = {
        multiple: 'bg-blue-50 text-blue-700',
        likert:   'bg-amber-50 text-amber-700',
        open:     'bg-gray-100 text-gray-600',
      };
      return map[type] || map.open;
    },

    navButtonClass(q, i) {
      const isActive   = i === this.currentIndex;
      const isAnswered = q.type === 'open'
        ? !!this.openAnswers[q.id]?.trim()
        : this.answers[q.id] != null;
      const isFlagged  = this.flagged.has(q.id);

      if (isActive)   return 'border-green-500 bg-green-500 text-white';
      if (isFlagged)  return 'border-amber-400 bg-amber-50 text-amber-700';
      if (isAnswered) return 'border-green-300 bg-green-50 text-green-700';
      return 'border-gray-200 bg-white text-gray-500 hover:border-green-300';
    },

    isFlagged(id) {
      return this.flagged.has(id);
    },

    toggleFlag(id) {
      if (this.flagged.has(id)) {
        this.flagged.delete(id);
      } else {
        this.flagged.add(id);
      }
      this.flagged = new Set(this.flagged);
    },

    clearAnswer(id) {
      delete this.answers[id];
      delete this.openAnswers[id];
      this.answers = { ...this.answers };
      this.openAnswers = { ...this.openAnswers };
    },

    goToQuestion(i) {
      this.currentIndex = i;
    },

    prevQuestion() {
      if (this.currentIndex > 0) this.currentIndex--;
    },

    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) this.currentIndex++;
    },

    confirmSubmit() {
      this.showConfirmModal = true;
    },

    async submitTest() {
      this.submitting = true;
      const userId = parseInt(localStorage.getItem('userId'));
      const now = new Date().toISOString();

      try {
        const payloads = [];

        this.questions.forEach(q => {
          if (q.type === 'open') {
            const text = this.openAnswers[q.id]?.trim();
            if (text) {
              payloads.push({
                user_id:     userId,
                question_id: q.id,
                answer_text: text,
                submited_at: now,
              });
            }
          } else {
            const optionId = this.answers[q.id];
            if (optionId != null) {
              payloads.push({
                user_id:     userId,
                question_id: q.id,
                option_id:   optionId,
                submited_at: now,
              });
            }
          }
        });

        // Submit all answers
        await Promise.all(payloads.map(p => this.$apiPost('/answer', p)));

        // ── MBTI scoring ──────────────────────────────────────────────────
        // Collect indication_letters from selected options
        const letterCounts = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
        let totalWeightedScore = 0;
        let weightedAnswers = 0;

        this.questions.forEach(q => {
          if (q.type === 'open') return;
          const optionId = this.answers[q.id];
          if (optionId == null) return;

          const opt = (q.Options || []).find(o => o.id === optionId);
          if (!opt) return;

          // Accumulate weight for overall score
          if (opt.weight !== undefined && opt.weight !== null) {
            totalWeightedScore += Number(opt.weight);
            weightedAnswers++;
          }

          // Tally MBTI letters
          const letter = (opt.indication_letter || '').trim().toUpperCase();
          if (letter in letterCounts) {
            letterCounts[letter]++;
          }
        });

        // Majority voting per dimension (≥3 of 5 = dominant trait)
        const isMbti = this.isMbtiTest(letterCounts);

        let finalScore, interpretation, recommendations;

        if (isMbti) {
          const E_I = letterCounts.E >= 3 ? 'E' : 'I';
          const S_N = letterCounts.S >= 3 ? 'S' : 'N';
          const T_F = letterCounts.T >= 3 ? 'T' : 'F';
          const J_P = letterCounts.J >= 3 ? 'J' : 'P';
          const mbtiType = `${E_I}${S_N}${T_F}${J_P}`;

          // Score = percentage of "dominant" answers (how strongly they lean)
          const dominantCounts = [
            Math.max(letterCounts.E, letterCounts.I),
            Math.max(letterCounts.S, letterCounts.N),
            Math.max(letterCounts.T, letterCounts.F),
            Math.max(letterCounts.J, letterCounts.P),
          ];
          const totalDominant = dominantCounts.reduce((a, b) => a + b, 0);
          const totalPossible = 20; // 4 dimensions × 5 questions
          finalScore = Math.round((totalDominant / totalPossible) * 100);

          interpretation = this.getMbtiInterpretation(mbtiType, letterCounts);
          recommendations = this.getMbtiRecommendations(mbtiType);

          // Store for display on submitted screen
          this.mbtiResult = { type: mbtiType, counts: letterCounts, score: finalScore };
        } else {
          // Non-MBTI test: use weighted score
          finalScore = weightedAnswers > 0
            ? Math.round(totalWeightedScore)
            : Math.round((this.answeredCount / Math.max(this.questions.length, 1)) * 100);
          interpretation = this.generateInterpretation(finalScore);
          recommendations = this.generateRecommendations(finalScore);
        }

        // Save progress
        await this.$apiPost('/progress', {
          user_id:  userId,
          test_id:  this.test.id,
          score:    finalScore,
          taken_at: now,
        });

        // Save result
        await this.$apiPost('/result', {
          user_id:         userId,
          test_id:         this.test.id,
          score:           finalScore,
          interpretation:  interpretation,
          recommendations: recommendations,
          status:          'pending',
          completed_at:    now,
        });

        this.stopTimer();
        this.showConfirmModal = false;
        this.submitted = true;
        this.$root.$refs.toast?.showToast('Test submitted successfully!', 'success');
      } catch (e) {
        console.error('Submit error:', e);
        this.$root.$refs.toast?.showToast('Failed to submit test', 'error');
      } finally {
        this.submitting = false;
      }
    },

    // Detect if this is an MBTI test by checking if any options carry MBTI letters
    isMbtiTest(letterCounts) {
      const total = Object.values(letterCounts).reduce((a, b) => a + b, 0);
      return total > 0;
    },

    getMbtiInterpretation(type, counts) {
      const descriptions = {
        INTJ: 'INTJ – The Architect: Strategic, independent, and driven by logic. You see the big picture and plan meticulously to achieve long-term goals.',
        INTP: 'INTP – The Thinker: Analytical, inventive, and intellectually curious. You love exploring abstract ideas and solving complex problems.',
        ENTJ: 'ENTJ – The Commander: Bold, decisive, and natural leader. You excel at organizing people and resources to achieve ambitious goals.',
        ENTP: 'ENTP – The Debater: Quick-witted, innovative, and energized by intellectual challenges. You love exploring new ideas and challenging the status quo.',
        INFJ: 'INFJ – The Advocate: Insightful, principled, and deeply empathetic. You are driven by a strong sense of purpose and desire to help others.',
        INFP: 'INFP – The Mediator: Idealistic, empathetic, and guided by strong personal values. You seek meaning and authenticity in everything you do.',
        ENFJ: 'ENFJ – The Protagonist: Charismatic, empathetic, and inspiring. You are a natural leader who motivates others toward a shared vision.',
        ENFP: 'ENFP – The Campaigner: Enthusiastic, creative, and deeply people-oriented. You see life as full of possibilities and inspire others with your energy.',
        ISTJ: 'ISTJ – The Logistician: Reliable, detail-oriented, and deeply committed to duty. You value tradition, order, and follow-through.',
        ISFJ: 'ISFJ – The Defender: Warm, dedicated, and highly observant. You are committed to protecting and supporting those you care about.',
        ESTJ: 'ESTJ – The Executive: Organized, assertive, and committed to upholding rules and standards. You excel at managing people and processes.',
        ESFJ: 'ESFJ – The Consul: Caring, sociable, and eager to help. You thrive in environments where you can support and connect with others.',
        ISTP: 'ISTP – The Virtuoso: Practical, observant, and skilled at understanding how things work. You enjoy hands-on problem solving.',
        ISFP: 'ISFP – The Adventurer: Gentle, flexible, and open to new experiences. You live in the moment and express yourself through action.',
        ESTP: 'ESTP – The Entrepreneur: Energetic, perceptive, and action-oriented. You thrive in fast-paced environments and love taking risks.',
        ESFP: 'ESFP – The Entertainer: Spontaneous, energetic, and enthusiastic. You love being the center of attention and bringing joy to others.',
      };

      const dimDetail = [
        `${counts.E}E / ${counts.I}I`,
        `${counts.S}S / ${counts.N}N`,
        `${counts.T}T / ${counts.F}F`,
        `${counts.J}J / ${counts.P}P`,
      ].join(' · ');

      const base = descriptions[type] || `${type} – Your unique personality type reflects a distinct combination of traits.`;
      return `${base} (Scores: ${dimDetail})`;
    },

    getMbtiRecommendations(type) {
      const recs = {
        INTJ: 'Consider careers in strategy, engineering, science, or architecture. Leverage your planning skills in leadership roles. Work on expressing appreciation to others.',
        INTP: 'Explore fields like mathematics, philosophy, technology, or research. Seek roles that allow independent thinking. Practice following through on projects.',
        ENTJ: 'Excel in executive, entrepreneurial, or management roles. Channel your drive into mentoring others. Be mindful of others\' emotional needs.',
        ENTP: 'Thrive in innovation, entrepreneurship, law, or consulting. Use your debate skills constructively. Work on completing projects before starting new ones.',
        INFJ: 'Consider counseling, writing, teaching, or social work. Your vision can inspire change. Set boundaries to avoid burnout from over-giving.',
        INFP: 'Explore creative fields, counseling, writing, or humanitarian work. Trust your instincts. Work on practical follow-through of your ideals.',
        ENFJ: 'Natural fit for teaching, coaching, HR, or leadership. Your empathy is a strength. Ensure you also attend to your own needs.',
        ENFP: 'Thrive in creative, social, or entrepreneurial roles. Your enthusiasm is contagious. Build systems to stay organized and focused.',
        ISTJ: 'Excel in accounting, law, administration, or military. Your reliability is invaluable. Practice flexibility and openness to new approaches.',
        ISFJ: 'Consider healthcare, education, social work, or administration. Your dedication is a gift. Learn to assert your own needs more confidently.',
        ESTJ: 'Strong fit for management, law, finance, or military. Your organizational skills drive results. Practice active listening and empathy.',
        ESFJ: 'Thrive in healthcare, education, event planning, or HR. Your warmth builds strong teams. Avoid seeking external validation too heavily.',
        ISTP: 'Excel in engineering, mechanics, forensics, or athletics. Your hands-on skills are exceptional. Work on communicating your thoughts more openly.',
        ISFP: 'Consider art, music, healthcare, or design. Your sensitivity is a strength. Build confidence in sharing your ideas with others.',
        ESTP: 'Thrive in sales, entrepreneurship, emergency services, or sports. Your energy drives action. Practice patience and long-term planning.',
        ESFP: 'Excel in entertainment, hospitality, healthcare, or education. Your enthusiasm uplifts others. Work on focusing on long-term goals.',
      };
      return recs[type] || 'Explore roles that align with your unique strengths. Seek environments that value your natural tendencies and allow you to grow.';
    },

    generateInterpretation(score) {
      if (score >= 90) {
        return 'Excellent Performance - You demonstrated exceptional understanding and mastery of the assessment content.';
      } else if (score >= 80) {
        return 'Very Good Performance - You showed strong comprehension and performed well above average.';
      } else if (score >= 70) {
        return 'Good Performance - You demonstrated solid understanding with room for minor improvements.';
      } else if (score >= 60) {
        return 'Satisfactory Performance - You met the basic requirements but could benefit from additional review.';
      } else if (score >= 50) {
        return 'Below Average Performance - Consider reviewing the material and seeking additional support.';
      } else {
        return 'Needs Improvement - Significant gaps identified. Additional training and support recommended.';
      }
    },

    generateRecommendations(score) {
      if (score >= 90) {
        return 'Continue your excellent work. Consider taking on leadership roles or mentoring others. You may be ready for advanced assessments or specialized training programs.';
      } else if (score >= 80) {
        return 'You are performing very well. Focus on maintaining consistency and exploring advanced topics in areas of interest. Consider sharing your knowledge with peers.';
      } else if (score >= 70) {
        return 'Good job overall. Review questions you found challenging and strengthen those areas. Practice regularly to improve retention and application of concepts.';
      } else if (score >= 60) {
        return 'You have a foundation to build on. Dedicate time to reviewing core concepts and practice more frequently. Consider seeking guidance from mentors or additional resources.';
      } else if (score >= 50) {
        return 'Focus on fundamental concepts and seek additional support. Regular practice sessions and structured learning materials will help improve your performance significantly.';
      } else {
        return 'Immediate intervention recommended. Work closely with instructors or mentors to identify knowledge gaps. Consider a structured review program and additional practice assessments.';
      }
    },

    // Percentage bar width for a dimension (dominant side fills the bar)
    dimPercent(dim) {
      if (!this.mbtiResult) return 50;
      const left  = this.mbtiResult.counts[dim.leftKey]  || 0;
      const right = this.mbtiResult.counts[dim.rightKey] || 0;
      const total = left + right;
      if (total === 0) return 50;
      const dominant = this.mbtiResult.type[dim.pos] === dim.left ? left : right;
      return Math.round((dominant / total) * 100);
    },

    startTimer() {
      if (this.totalSeconds <= 0) return; // no duration set — no timer
      this.timerInterval = setInterval(() => {
        if (this.remainingSeconds <= 0) {
          this.stopTimer();
          this.timerExpired = true;
          this.showConfirmModal = false; // close confirm modal if open
          this.submitTest();             // auto-submit with whatever was answered
          return;
        }
        this.remainingSeconds--;
      }, 1000);
    },

    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },
  },

  async mounted() {
    this.loading = true;
    const completed = await this.checkIfCompleted();
    
    if (!completed) {
      await Promise.all([this.fetchTest(), this.fetchQuestions()]);
      this.startTimer();
    }
    this.loading = false;
  },

  beforeUnmount() {
    this.stopTimer();
  },
};
</script>