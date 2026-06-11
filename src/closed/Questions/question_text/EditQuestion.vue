<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 text-sm max-h-[90vh] overflow-y-auto">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Edit Question</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <div v-if="loadingInitialData" class="py-12 text-center text-gray-500 font-medium">
        Loading question profile data context...
      </div>

      <form v-else @submit.prevent="submitForm" class="space-y-4">

        <!-- Question -->
        <div>
          <label class="block mb-1 font-medium">Question</label>
          <textarea v-model="form.question_text" required
            class="w-full border rounded-lg px-3 py-2"></textarea>
        </div>

        <!-- Category -->
        <div>
          <label class="block mb-1 font-medium">Category</label>
          <select v-model="form.category_id" @change="onCategoryChange" required
            class="w-full border rounded-lg px-3 py-2">
            <option disabled value="">Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Test -->
        <div>
          <label class="block mb-1 font-medium">Test</label>
          <select v-model="form.test_id" required
            class="w-full border rounded-lg px-3 py-2">
            <option disabled value="">Select Test</option>
            <option v-for="test in tests" :key="test.id" :value="test.id">
              {{ test.title }}
            </option>
          </select>
        </div>

        <!-- Type -->
        <div>
          <label class="block mb-1 font-medium">Type</label>
          <select v-model="form.type" required
            class="w-full border rounded-lg px-3 py-2">
            <option value="multiple">Multiple Choice</option>
            <option value="likert">Likert Scale</option>
            <option value="open">Open</option>
          </select>
        </div>

        <!-- ===================== -->
        <!-- MCQ + LIKERT OPTIONS -->
        <!-- ===================== -->
        <div v-if="form.type !== 'open'">
          <label class="block mb-2 font-medium">Options</label>

          <div v-for="(opt, i) in options" :key="i" class="border p-3 rounded-lg mb-3 bg-gray-50 space-y-2">
            
            <!-- Row 1: Content configuration -->
            <div class="flex gap-2 items-center">
              <!-- Content Type Picker (Only for multiple choice) -->
              <select v-if="form.type === 'multiple'" v-model="opt.content_type" @change="clearOptionSource(opt)" class="w-1/4 border rounded px-2 py-1 bg-white">
                <option value="text">Text Option</option>
                <option value="image">Image File</option>
              </select>

              <!-- Conditionally render text input OR upload button -->
              <div class="flex-1 flex items-center gap-2">
                <template v-if="opt.content_type === 'text' || form.type === 'likert'">
                  <input v-model="opt.text"
                    placeholder="Option Text (e.g. Strongly Agree)"
                    class="w-full border rounded px-2 py-1 bg-white" required />
                </template>
                
                <template v-else>
                  <div class="flex items-center gap-3 w-full">
                    <input type="file" accept="image/*" @change="handleFileChange($event, opt)" class="text-xs max-w-xs" :required="!opt.existing_image" />
                    <!-- Visual preview thumbnail (Prioritizes new file stream blob, then old disk reference path) -->
                    <img v-if="opt.previewUrl || opt.existing_image" 
                         :src="opt.previewUrl || getImageUrl(opt.existing_image)" 
                         class="w-8 h-8 object-cover rounded border" />
                  </div>
                </template>
              </div>

              <!-- Letter Indication Input -->
              <input v-model="opt.indication_letter"
                placeholder="Letter (e.g. E/I)"
                maxLength="3"
                class="w-1/6 border rounded px-2 py-1 text-center bg-white font-semibold uppercase" />
            </div>

            <!-- Row 2: Metadata Mapping -->
            <div class="flex gap-2 items-center text-xs">
              <!-- Trait Mapping Selection -->
              <div class="w-2/5">
                <select v-model="opt.triat_id" class="w-full border rounded px-2 py-1 bg-white">
                  <option value="">Select Trait (None)</option>
                  <option v-for="t in triats" :key="t.id" :value="t.id">
                    {{ t.name }}
                  </option>
                </select>
              </div>

              <!-- Weight Value -->
              <div class="w-1/4 flex items-center gap-1">
                <span class="text-gray-500">W:</span>
                <input v-model.number="opt.weight" type="number" step="any" placeholder="Weight" class="w-full border rounded px-2 py-1 bg-white" />
              </div>

              <!-- Index Position -->
              <div class="w-1/4 flex items-center gap-1">
                <span class="text-gray-500">Pos:</span>
                <input v-model.number="opt.position" type="number" class="w-full border rounded px-2 py-1 bg-white" />
              </div>

              <!-- Delete Action Button -->
              <button type="button" @click="removeOption(i, opt)" class="text-red-500 px-1 text-base hover:text-red-700">✖</button>
            </div>

          </div>

          <button type="button" @click="addOption" class="text-green-600 text-sm font-medium mt-1">
            + Add Option
          </button>
        </div>

        <!-- ===================== -->
        <!-- OPEN QUESTION -->
        <!-- ===================== -->
        <div v-if="form.type === 'open'">
          <label class="block mb-1 font-medium">Weight</label>
          <input v-model.number="form.weight" type="number" step="any"
            class="w-full border rounded px-3 py-2" />
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-lg">
            Save Changes
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      tests: [],
      categories: [],
      triats: [],
      loadingInitialData: true,
      removedOptionIds: [], // Keeps track of option database rows marked for deletion

      form: {
        question_text: "",
        type: "multiple",
        category_id: "",
        test_id: "",
        weight: 0
      },

      options: []
    };
  },

  methods: {
    async fetchLookupData() {

      const params={
        page: 1, page_size: 10000 
      }
    
      try {
        const [testRes, catRes] = await Promise.all([
          this.$apiGet("/test", params),
          this.$apiGet("/category",params)
        ]);
        this.tests = testRes.data || [];
        this.categories = catRes.data || [];

        console.log("Fetched tests and categories for question context:", this.tests, this.categories);
      } catch (e) {
        console.error("Failed loading lookup dependencies:", e);
      }
    },

    async fetchQuestionProfile() {
      try {
        this.loadingInitialData = true;
        
        // 1️⃣ Pull down structural details for the question, including its nested options structure
        const res = await this.$apiGetById(`/question`, this.questionId);

        console.log("res category detail",res);

        if (res) {
          this.form.question_text = res.question_text || "";
          this.form.type = res.type || "multiple";
          this.form.category_id = res.category_id || "";
          this.form.test_id = res.test_id || "";
          this.form.weight = res.weight || 0;

          // 2️⃣ Sync Category Mapped Traits list instantly based on loaded category value
          if (this.form.category_id) {
            const selected = this.categories.find(c => c.id === this.form.category_id);
            if (selected) {
              this.triats = selected.Triats || [];
            } else {
              // Alternative breakdown payload call if relationships are not deep fetched
              const traitsRes = await this.$apiGet(`/category/${this.form.category_id}/traits`);
              this.triats = traitsRes?.data || [];
            }
          }

          // 3️⃣ Map existing option rows back to input schemas perfectly
          if (res.Options && res.Options.length > 0) {
            this.options = res.Options.map(opt => ({
              id: opt.id, // Store database key safely
              text: opt.text || "",
              file: null,
              previewUrl: "",
              content_type: opt.content_type || "text",
              indication_letter: opt.indication_letter || "",
              triat_id: opt.triat_id || "",
              weight: opt.weight !== undefined ? opt.weight : 1,
              position: opt.position || 1,
              existing_image: opt.content_type === 'image' ? opt.text : null
            }));
            
            // Ensure option entries are rendered chronologically by position index sorting
            this.options.sort((a, b) => a.position - b.position);
          }
        }
      } catch (e) {
        console.error("Failed parsing question payload properties:", e);
      } finally {
        this.loadingInitialData = false;
      }
    },

    onCategoryChange() {
      const selected = this.categories.find(c => c.id === this.form.category_id);
      this.triats = selected?.Triats || [];
      // Wipe invalid context trait allocations down the stack across all variants
      this.options.forEach(opt => { opt.triat_id = ""; });
    },

    clearOptionSource(opt) {
      opt.text = "";
      opt.file = null;
      opt.existing_image = null;
      if (opt.previewUrl) {
        URL.revokeObjectURL(opt.previewUrl);
        opt.previewUrl = "";
      }
    },

    handleFileChange(event, opt) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        opt.file = selectedFile;
        opt.text = selectedFile.name; 
        opt.previewUrl = URL.createObjectURL(selectedFile);
      }
    },

    getImageUrl(filename) {
      if (!filename) return '';
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      return `${baseUrl}/uploads/${filename}`;
    },

    addOption() {
      this.options.push({
        text: "",
        file: null,
        previewUrl: "",
        content_type: "text",
        indication_letter: "",
        triat_id: "",
        weight: 1,
        position: this.options.length + 1,
        existing_image: null
      });
    },

    removeOption(i, opt) {
      // Record historical row database tracking identifiers for backend cleanups
      if (opt.id) {
        this.removedOptionIds.push(opt.id);
      }

      const removed = this.options.splice(i, 1)[0];
      if (removed && removed.previewUrl) {
        URL.revokeObjectURL(removed.previewUrl);
      }
      
      // Re-index remaining fields sequentially
      this.options.forEach((o, idx) => o.position = idx + 1);
    },

    async submitForm() {
      try {
        const formData = new FormData();

        // Append base root entities
        formData.append("question_text", this.form.question_text);
        formData.append("type", this.form.type);
        formData.append("category_id", this.form.category_id);
        formData.append("test_id", this.form.test_id);
        formData.append("weight", this.form.weight);
        
        // Append historical deletion row information
        formData.append("removed_option_ids", JSON.stringify(this.removedOptionIds));

        if (this.form.type !== "open") {
          const processOptions = this.options.map((opt, idx) => {
            
            // 💡 Handle newly chosen local image binary uploads via structural stream indicators
            if (opt.content_type === 'image' && opt.file) {
              formData.append(`option_file_${idx}`, opt.file);
            }

            return {
              id: opt.id || null, // If present, updates existing row; if missing, creates a new one
              text: opt.text,
              content_type: this.form.type === 'likert' ? 'text' : opt.content_type,
              indication_letter: opt.indication_letter ? opt.indication_letter.toUpperCase().trim() : null,
              triat_id: opt.triat_id || null,
              weight: opt.weight,
              position: opt.position,
              existing_image: opt.content_type === 'image' ? opt.existing_image : null,
              file_key: opt.content_type === 'image' && opt.file ? `option_file_${idx}` : null
            };
          });

          formData.append("options", JSON.stringify(processOptions));
        }

        console.log("SUBMITTING MODIFIED QUESTION MULTI-PART FORMDATA PIPELINE");

        // Execute changes down using a custom PUT/PATCH request container mapping
        const res = await this.$apiPut(`/question`, this.questionId, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (res) {
          this.$root.$refs.toast.showToast("Question profile updated successfully", "success");
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error("Failed executing patch workflow:", e);
      }
    }
  },

  async mounted() {
    // Sequentially evaluate asynchronous requirements to prevent missing key state dependencies
    await this.fetchLookupData();
    await this.fetchQuestionProfile();
  },

  beforeDestroy() {
    this.options.forEach(opt => {
      if (opt.previewUrl) URL.revokeObjectURL(opt.previewUrl);
    });
  }
};
</script>