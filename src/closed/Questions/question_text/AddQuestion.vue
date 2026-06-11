<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 text-sm max-h-[90vh] overflow-y-auto">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Add Question</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
      </div>

      <!-- ── Tab switcher ── -->
      <div class="flex gap-2 mb-5">
        <button
          type="button"
          @click="activeTab = 'manual'"
          :class="activeTab === 'manual'
            ? 'bg-green-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          class="flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition"
        >
          <i class="fas fa-pen mr-1"></i> Manual Entry
        </button>
        <button
          type="button"
          @click="activeTab = 'excel'"
          :class="activeTab === 'excel'
            ? 'bg-green-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          class="flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition"
        >
          <i class="fas fa-file-excel mr-1"></i> Bulk Upload (Excel)
        </button>
      </div>

      <!-- ══════════════════════════════════════════ -->
      <!--  TAB 1 – MANUAL ENTRY (existing form)     -->
      <!-- ══════════════════════════════════════════ -->
      <form v-if="activeTab === 'manual'" @submit.prevent="submitForm" class="space-y-4">

        <!-- Question -->
        <div>
          <label class="block mb-1 font-medium">Question</label>
          <textarea v-model="form.question_text" required rows="3"
            class="w-full border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"></textarea>
        </div>

        <!-- Category -->
        <div>
          <label class="block mb-1 font-medium">Category</label>
          <select v-model="form.category_id" @change="onCategoryChange" required
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
            <option disabled value="">Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>

        <!-- Test — locked when opened from TestView, selectable otherwise -->
        <div>
          <label class="block mb-1 font-medium">Test</label>
          <!-- Pre-selected from TestView: show read-only badge -->
          <div v-if="testId" class="flex items-center gap-2 px-3 py-2 border border-green-300 bg-green-50 rounded-lg">
            <i class="fas fa-link text-green-500 text-xs"></i>
            <span class="text-sm font-medium text-green-700">
              {{ lockedTestTitle || `Test #${testId}` }}
            </span>
            <span class="ml-auto text-[10px] text-green-500 uppercase tracking-wide font-semibold">Auto-linked</span>
          </div>
          <!-- Normal flow: dropdown -->
          <select v-else v-model="form.test_id" required
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
            <option disabled value="">Select Test</option>
            <option v-for="test in tests" :key="test.id" :value="test.id">{{ test.title }}</option>
          </select>
        </div>

        <!-- Type -->
        <div>
          <label class="block mb-1 font-medium">Type</label>
          <select v-model="form.type" required
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="multiple">Multiple Choice</option>
            <option value="likert">Likert Scale</option>
            <option value="open">Open</option>
          </select>
        </div>

        <!-- MCQ + LIKERT OPTIONS -->
        <div v-if="form.type !== 'open'">
          <label class="block mb-2 font-medium">Options</label>

          <div v-for="(opt, i) in options" :key="i" class="border p-3 rounded-lg mb-3 bg-gray-50 space-y-2">
            <div class="flex gap-2 items-center">
              <select v-if="form.type === 'multiple'" v-model="opt.content_type" @change="clearOptionSource(opt)"
                class="w-1/4 border rounded px-2 py-1 bg-white">
                <option value="text">Text</option>
                <option value="image">Image</option>
              </select>

              <div class="flex-1 flex items-center gap-2">
                <template v-if="opt.content_type === 'text' || form.type === 'likert'">
                  <input v-model="opt.text" placeholder="Option text" required
                    class="w-full border rounded px-2 py-1 bg-white" />
                </template>
                <template v-else>
                  <div class="flex items-center gap-3 w-full">
                    <input type="file" accept="image/*" @change="handleFileChange($event, opt)" class="text-xs max-w-xs" required />
                    <img v-if="opt.previewUrl" :src="opt.previewUrl" class="w-8 h-8 object-cover rounded border" />
                  </div>
                </template>
              </div>

              <input v-model="opt.indication_letter" placeholder="A/B…" maxlength="3"
                class="w-1/6 border rounded px-2 py-1 text-center bg-white font-semibold uppercase" />
            </div>

            <div class="flex gap-2 items-center text-xs">
              <div class="w-2/5">
                <select v-model="opt.triat_id" class="w-full border rounded px-2 py-1 bg-white">
                  <option disabled value="">Trait</option>
                  <option v-for="t in triats" :key="t.id" :value="t.id">{{ t.name }}</option>
                </select>
              </div>
              <div class="w-1/4 flex items-center gap-1">
                <span class="text-gray-500">W:</span>
                <input v-model.number="opt.weight" type="number" step="any" placeholder="Weight"
                  class="w-full border rounded px-2 py-1 bg-white" />
              </div>
              <div class="w-1/4 flex items-center gap-1">
                <span class="text-gray-500">Pos:</span>
                <input v-model.number="opt.position" type="number"
                  class="w-full border rounded px-2 py-1 bg-white" />
              </div>
              <button type="button" @click="removeOption(i)" class="text-red-500 px-1 text-base hover:text-red-700">✖</button>
            </div>
          </div>

          <button type="button" @click="addOption" class="text-green-600 text-sm font-medium mt-1">
            + Add Option
          </button>
        </div>

        <!-- OPEN QUESTION weight -->
        <div v-if="form.type === 'open'">
          <label class="block mb-1 font-medium">Weight</label>
          <input v-model.number="form.weight" type="number" step="any"
            class="w-full border rounded px-3 py-2" />
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
          <button type="submit" :disabled="saving"
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-60 flex items-center gap-2">
            <i v-if="saving" class="fas fa-spinner fa-spin"></i>
            {{ saving ? 'Saving…' : 'Save' }}
          </button>
        </div>
      </form>

      <!-- ══════════════════════════════════════════ -->
      <!--  TAB 2 – BULK EXCEL UPLOAD                -->
      <!-- ══════════════════════════════════════════ -->
      <div v-if="activeTab === 'excel'" class="space-y-5">

        <!-- Step 1 – download template -->
        <div class="border rounded-xl p-4 bg-gray-50">
          <p class="font-semibold text-gray-700 mb-1">Step 1 — Download the template</p>
          <p class="text-gray-500 text-xs mb-3">
            Fill in the Excel file and upload it below. Each row = one question.
            Options are columns <code class="bg-gray-200 px-1 rounded">opt1_text … opt6_text</code> etc.
          </p>
          <button type="button" @click="downloadTemplate"
            class="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition">
            <i class="fas fa-download"></i> Download Template (.xlsx)
          </button>
        </div>

        <!-- Step 2 – pick file -->
        <div class="border rounded-xl p-4 bg-gray-50">
          <p class="font-semibold text-gray-700 mb-3">Step 2 — Upload filled file</p>

          <!-- Drop zone -->
          <label
            class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-300 rounded-xl cursor-pointer hover:bg-green-50 transition"
            @dragover.prevent
            @drop.prevent="onDrop"
          >
            <i class="fas fa-file-excel text-3xl text-green-400 mb-2"></i>
            <span class="text-xs text-gray-500">
              {{ excelFile ? excelFile.name : 'Drag & drop or click to select .xlsx / .xls' }}
            </span>
            <input type="file" accept=".xlsx,.xls" class="hidden" @change="onExcelFileChange" />
          </label>
        </div>

        <!-- Preview parsed rows -->
        <div v-if="parsedRows.length" class="border rounded-xl p-4 bg-gray-50">
          <p class="font-semibold text-gray-700 mb-2">
            Preview — {{ parsedRows.length }} question(s) found
          </p>
          <div class="overflow-x-auto max-h-48 overflow-y-auto">
            <table class="w-full text-xs border-collapse">
              <thead class="bg-gray-200 sticky top-0">
                <tr>
                  <th class="border px-2 py-1 text-left">#</th>
                  <th class="border px-2 py-1 text-left">Question</th>
                  <th class="border px-2 py-1 text-left">Type</th>
                  <th class="border px-2 py-1 text-left">Test ID</th>
                  <th class="border px-2 py-1 text-left">Cat ID</th>
                  <th class="border px-2 py-1 text-left">Options</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in parsedRows" :key="i" class="even:bg-white odd:bg-gray-50">
                  <td class="border px-2 py-1">{{ i + 1 }}</td>
                  <td class="border px-2 py-1 max-w-[180px] truncate">{{ row.question_text }}</td>
                  <td class="border px-2 py-1">{{ row.type }}</td>
                  <td class="border px-2 py-1">{{ row.test_id }}</td>
                  <td class="border px-2 py-1">{{ row.category_id }}</td>
                  <td class="border px-2 py-1">{{ row.options.length }} opt(s)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Upload errors -->
        <div v-if="uploadErrors.length" class="border border-red-200 rounded-xl p-4 bg-red-50">
          <p class="font-semibold text-red-600 mb-2">Errors during upload</p>
          <ul class="list-disc list-inside text-xs text-red-500 space-y-1">
            <li v-for="(err, i) in uploadErrors" :key="i">{{ err }}</li>
          </ul>
        </div>

        <!-- Upload progress -->
        <div v-if="uploadProgress.total > 0" class="space-y-1">
          <div class="flex justify-between text-xs text-gray-600">
            <span>Uploading {{ uploadProgress.done }} / {{ uploadProgress.total }}</span>
            <span>{{ Math.round((uploadProgress.done / uploadProgress.total) * 100) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-green-500 h-2 rounded-full transition-all"
              :style="{ width: (uploadProgress.done / uploadProgress.total * 100) + '%' }"
            ></div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
          <button
            type="button"
            @click="submitBulk"
            :disabled="!parsedRows.length || bulkSaving"
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-60 flex items-center gap-2"
          >
            <i v-if="bulkSaving" class="fas fa-spinner fa-spin"></i>
            {{ bulkSaving ? `Uploading… (${uploadProgress.done}/${uploadProgress.total})` : `Upload ${parsedRows.length || ''} Questions` }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

// Max options columns supported in the template
const MAX_OPTS = 6;

export default {
  name: 'AddQuestion',

  props: {
    // When opened from TestView, the test is pre-selected and locked
    testId: {
      type: [String, Number],
      default: null,
    },
  },

  emits: ['close', 'saved'],

  data() {
    return {
      activeTab: 'manual',   // 'manual' | 'excel'
      saving: false,

      // ── Manual form ──
      tests: [],
      categories: [],
      triats: [],

      form: {
        question_text: '',
        type: 'multiple',
        category_id: '',
        test_id: '',
        weight: 0
      },

      options: [
        { text: '', file: null, previewUrl: '', content_type: 'text', indication_letter: '', triat_id: '', weight: 1, position: 1 },
        { text: '', file: null, previewUrl: '', content_type: 'text', indication_letter: '', triat_id: '', weight: 1, position: 2 }
      ],

      // ── Excel upload ──
      excelFile: null,
      parsedRows: [],
      uploadErrors: [],
      bulkSaving: false,
      uploadProgress: { done: 0, total: 0 }
    };
  },

  computed: {
    // Resolves the display title for the locked test (when testId prop is passed)
    lockedTestTitle() {
      if (!this.testId) return '';
      const found = this.tests.find(t => String(t.id) === String(this.testId));
      return found ? found.title : '';
    },
  },

  methods: {
    // ─────────────────────────────────────────────
    //  MANUAL FORM helpers (unchanged logic)
    // ─────────────────────────────────────────────
    async fetchTests() {
      const res = await this.$apiGet('/test', { page: 1, page_size: 100 });
      this.tests = res.data;
    },

    async fetchCategories() {
      const res = await this.$apiGet('/category', { page: 1, page_size: 100 });
      this.categories = res.data;
    },

    onCategoryChange() {
      const selected = this.categories.find(c => c.id === this.form.category_id);
      this.triats = selected?.Triats || [];
    },

    clearOptionSource(opt) {
      opt.text = '';
      opt.file = null;
      if (opt.previewUrl) { URL.revokeObjectURL(opt.previewUrl); opt.previewUrl = ''; }
    },

    handleFileChange(event, opt) {
      const f = event.target.files[0];
      if (f) {
        opt.file = f;
        opt.text = f.name;
        opt.previewUrl = URL.createObjectURL(f);
      }
    },

    addOption() {
      this.options.push({
        text: '', file: null, previewUrl: '', content_type: 'text',
        indication_letter: '', triat_id: '', weight: 1,
        position: this.options.length + 1
      });
    },

    removeOption(i) {
      const removed = this.options.splice(i, 1)[0];
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      this.options.forEach((o, idx) => (o.position = idx + 1));
    },

    async submitForm() {
      this.saving = true;
      try {
        const formData = new FormData();
        formData.append('question_text', this.form.question_text);
        formData.append('type', this.form.type);
        formData.append('category_id', this.form.category_id);
        formData.append('test_id', this.form.test_id);
        formData.append('weight', this.form.weight);

        if (this.form.type !== 'open') {
          const processOptions = this.options.map((opt, idx) => {
            if (opt.content_type === 'image' && opt.file) {
              formData.append(`option_file_${idx}`, opt.file);
            }
            return {
              text: opt.text,
              content_type: this.form.type === 'likert' ? 'text' : opt.content_type,
              indication_letter: opt.indication_letter ? opt.indication_letter.toUpperCase().trim() : null,
              triat_id: opt.triat_id,
              weight: opt.weight,
              position: opt.position,
              file_key: opt.content_type === 'image' ? `option_file_${idx}` : null
            };
          });
          formData.append('options', JSON.stringify(processOptions));
        }

        const res = await this.$apiPost('/question', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (res) this.$root.$refs.toast.showToast('Question added successfully', 'success');
        this.$emit('saved');
        this.$emit('close');
      } catch (e) {
        console.error(e);
      } finally {
        this.saving = false;
      }
    },

    // ─────────────────────────────────────────────
    //  EXCEL TEMPLATE DOWNLOAD
    // ─────────────────────────────────────────────
    downloadTemplate() {
      // Build header row
      const headers = [
        'question_text',
        'type',          // multiple | likert | open
        'test_id',
        'category_id',
        'weight'
      ];

      for (let i = 1; i <= MAX_OPTS; i++) {
        headers.push(
          `opt${i}_text`,
          `opt${i}_letter`,   // indication_letter  e.g. A, B, E, I
          `opt${i}_triat_id`,
          `opt${i}_weight`,
          `opt${i}_position`
        );
      }

      // Example rows
      const example1 = [
        'What best describes your energy source?',
        'multiple',
        '1',   // test_id
        '1',   // category_id
        '0',   // question weight (used for open type)
        // opt1
        'Energized by social interaction', 'E', '1', '1', '1',
        // opt2
        'Energized by solitude',           'I', '2', '1', '2',
        // opt3..6 empty
        '', '', '', '', '',
        '', '', '', '', '',
        '', '', '', '', '',
        '', '', '', '', ''
      ];

      const example2 = [
        'I enjoy working in teams.',
        'likert',
        '1', '1', '0',
        'Strongly Agree',    '', '1', '5', '1',
        'Agree',             '', '1', '4', '2',
        'Neutral',           '', '1', '3', '3',
        'Disagree',          '', '1', '2', '4',
        'Strongly Disagree', '', '1', '1', '5',
        '', '', '', '', ''
      ];

      const ws = XLSX.utils.aoa_to_sheet([headers, example1, example2]);

      // Column widths
      ws['!cols'] = [
        { wch: 40 }, { wch: 10 }, { wch: 8 }, { wch: 10 }, { wch: 8 },
        ...Array(MAX_OPTS * 5).fill({ wch: 18 })
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Questions');
      XLSX.writeFile(wb, 'questions_template.xlsx');
    },

    // ─────────────────────────────────────────────
    //  EXCEL FILE SELECTION / DROP
    // ─────────────────────────────────────────────
    onExcelFileChange(e) {
      const f = e.target.files[0];
      if (f) { this.excelFile = f; this.parseExcel(f); }
    },

    onDrop(e) {
      const f = e.dataTransfer.files[0];
      if (f) { this.excelFile = f; this.parseExcel(f); }
    },

    parseExcel(file) {
      this.parsedRows = [];
      this.uploadErrors = [];

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const wb = XLSX.read(e.target.result, { type: 'array' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

          this.parsedRows = rows
            .filter(r => r.question_text && r.type && r.category_id && (r.test_id || this.testId))
            .map(r => {
              const options = [];
              for (let i = 1; i <= MAX_OPTS; i++) {
                const text = String(r[`opt${i}_text`] || '').trim();
                if (!text) continue;
                options.push({
                  text,
                  content_type: 'text',
                  indication_letter: String(r[`opt${i}_letter`] || '').toUpperCase().trim() || null,
                  triat_id: r[`opt${i}_triat_id`] ? Number(r[`opt${i}_triat_id`]) : null,
                  weight: r[`opt${i}_weight`] !== '' ? Number(r[`opt${i}_weight`]) : 1,
                  position: r[`opt${i}_position`] !== '' ? Number(r[`opt${i}_position`]) : i,
                  file_key: null
                });
              }
              return {
                question_text: String(r.question_text).trim(),
                type: String(r.type).trim(),
                test_id: Number(r.test_id),
                category_id: Number(r.category_id),
                weight: r.weight !== '' ? Number(r.weight) : 0,
                options
              };
            });
        } catch (err) {
          this.uploadErrors.push('Failed to parse file: ' + err.message);
        }
      };
      reader.readAsArrayBuffer(file);
    },

    // ─────────────────────────────────────────────
    //  BULK SUBMIT  (same FormData logic as manual)
    // ─────────────────────────────────────────────
    async submitBulk() {
      if (!this.parsedRows.length) return;

      this.bulkSaving = true;
      this.uploadErrors = [];
      this.uploadProgress = { done: 0, total: this.parsedRows.length };

      for (const row of this.parsedRows) {
        try {
          const formData = new FormData();
          formData.append('question_text', row.question_text);
          formData.append('type', row.type);
          formData.append('category_id', row.category_id);
          formData.append('test_id', this.testId ? this.testId : row.test_id);
          formData.append('weight', row.weight);

          if (row.type !== 'open' && row.options.length) {
            formData.append('options', JSON.stringify(row.options));
          }

          await this.$apiPost('/question', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } catch (e) {
          this.uploadErrors.push(`Row "${row.question_text.slice(0, 40)}…": ${e.message || e}`);
        } finally {
          this.uploadProgress.done++;
        }
      }

      this.bulkSaving = false;

      if (!this.uploadErrors.length) {
        this.$root.$refs.toast.showToast(
          `${this.parsedRows.length} question(s) uploaded successfully`, 'success'
        );
        this.$emit('saved');
        this.$emit('close');
      } else {
        this.$root.$refs.toast.showToast(
          `Uploaded with ${this.uploadErrors.length} error(s)`, 'error'
        );
      }
    }
  },

  mounted() {
    this.fetchTests();
    this.fetchCategories();
    // If a testId prop was passed, pre-fill and lock the test field
    if (this.testId) {
      this.form.test_id = this.testId;
    }
  },

  beforeUnmount() {
    this.options.forEach(opt => {
      if (opt.previewUrl) URL.revokeObjectURL(opt.previewUrl);
    });
  }
};
</script>
