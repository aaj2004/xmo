<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <!-- Header -->
    <header class="bg-white px-5 py-4 sticky top-0 z-10 shadow-sm">
      <div class="flex items-center justify-between">
        <button @click="goBack" class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="flex-1 text-center">
          <h1 class="text-base font-bold text-gray-900">Konsultasi</h1>
          <p class="text-xs text-gray-500">Form Diagnosa</p>
        </div>
        <div class="w-10"></div>
      </div>
    </header>

    <!-- Progress Bar -->
    <div class="bg-white border-b border-gray-200 px-5 py-3">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold text-gray-700">Progress</span>
        <span class="text-xs font-bold text-violet-600">{{ answeredCount }}/{{ gejalaList.length }}</span>
      </div>
      <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-violet-600 to-purple-600 rounded-full transition-all duration-300"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>

    <!-- Content -->
    <main class="px-5 pt-4 space-y-3">
      <!-- Info Card -->
      <div class="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-4">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-bold text-gray-900 mb-1">Petunjuk Pengisian</p>
            <p class="text-xs text-gray-600 leading-relaxed">
              Jawab "Ya" atau "Tidak" untuk setiap gejala yang Anda alami saat ini
            </p>
          </div>
        </div>
      </div>

      <!-- Gejala List -->
      <div class="space-y-3">
        <div 
          v-for="(gejala, index) in gejalaList" 
          :key="gejala.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          :class="{ 'ring-2 ring-violet-500': answers[gejala.id] }"
        >
          <div class="p-3">
            <!-- Gejala Header -->
            <div class="flex items-start justify-between gap-3 mb-2">
              <div class="flex-1">
                <p class="text-sm font-bold text-gray-900 mb-1">
                  {{ gejala.nama }}
                </p>
                <p v-if="gejala.deskripsi" class="text-xs text-gray-500 leading-relaxed">
                  {{ gejala.deskripsi }}
                </p>
              </div>
              <div class="flex flex-col items-end gap-1 flex-shrink-0">
                <span class="text-xs text-violet-600 font-bold">{{ gejala.kode }}</span>
                <span class="text-xs text-gray-400 font-semibold">#{{ index + 1 }}</span>
              </div>
            </div>

            <!-- Radio Buttons -->
            <div class="flex gap-2">
              <button
                @click="setAnswer(gejala.id, 'ya')"
                class="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all"
                :class="answers[gejala.id] === 'ya' 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              >
                <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Ya
              </button>
              <button
                @click="setAnswer(gejala.id, 'tidak')"
                class="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all"
                :class="answers[gejala.id] === 'tidak' 
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              >
                <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Tidak
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Fixed Bottom Button -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 z-20">
      <button
        @click="submitForm"
        :disabled="!isFormComplete"
        class="w-full py-4 rounded-2xl font-bold text-base shadow-xl transition-all active:scale-95"
        :class="isFormComplete 
          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-violet-300' 
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
      >
        <svg v-if="isFormComplete" class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <svg v-else class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        {{ isFormComplete ? 'Proses Diagnosa' : `Jawab ${gejalaList.length - answeredCount} Lagi` }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSymptoms, startConsultation } from '../api/mobile/konsultasi.js'

const router = useRouter()

const gejalaList = ref([])
const answers = ref({})
const isLoading = ref(true)
const isSubmitting = ref(false)

onMounted(async () => {
  try {
    // Fetch symptoms dari mobile API
    const symptoms = await getSymptoms()
    console.log('Symptoms:', symptoms)
    
    if (Array.isArray(symptoms)) {
      gejalaList.value = symptoms
    } else if (symptoms && symbols.data) {
      gejalaList.value = symptoms.data
    }
  } catch (error) {
    console.error('Error loading symptoms:', error)
    // Fallback ke data dummy untuk development
    gejalaList.value = [
      {
        id: 1,
        kode: 'G01',
        nama: 'Nyeri tenggorokan',
        deskripsi: 'Rasa sakit atau tidak nyaman di tenggorokan'
      },
      {
        id: 2,
        kode: 'G02',
        nama: 'Demam',
        deskripsi: 'Suhu tubuh di atas 37.5°C'
      },
      {
        id: 3,
        kode: 'G03',
        nama: 'Kesulitan menelan',
        deskripsi: 'Nyeri atau hambatan saat menelan makanan/minuman'
      },
      {
        id: 4,
        kode: 'G04',
        nama: 'Batuk kering',
        deskripsi: 'Batuk tanpa dahak atau lendir'
      },
      {
        id: 5,
        kode: 'G05',
        nama: 'Suara serak',
        deskripsi: 'Perubahan kualitas suara menjadi parau'
      },
      {
        id: 6,
        kode: 'G06',
        nama: 'Pembengkakan kelenjar',
        deskripsi: 'Benjolan di leher akibat kelenjar getah bening membesar'
      },
      {
        id: 7,
        kode: 'G07',
        nama: 'Pilek atau hidung tersumbat',
        deskripsi: 'Keluarnya lendir dari hidung atau kesulitan bernapas'
      },
      {
        id: 8,
        kode: 'G08',
        nama: 'Sakit kepala',
        deskripsi: 'Rasa nyeri di kepala dengan intensitas ringan hingga berat'
      }
    ]
  } finally {
    isLoading.value = false
  }
})

const setAnswer = (gejalaId, value) => {
  answers.value[gejalaId] = value
}

const answeredCount = computed(() => {
  return Object.keys(answers.value).length
})

const progressPercentage = computed(() => {
  if (gejalaList.value.length === 0) return 0
  return (answeredCount.value / gejalaList.value.length) * 100
})

const isFormComplete = computed(() => {
  return answeredCount.value === gejalaList.value.length
})

const submitForm = async () => {
  if (!isFormComplete.value) {
    alert(`Harap jawab semua ${gejalaList.value.length} pertanyaan sebelum melanjutkan!`)
    return
  }

  if (isSubmitting.value) return
  isSubmitting.value = true

  try {
    // Prepare answers for mobile API
    const gejalaJawaban = gejalaList.value.map(gejala => ({
      gejala_id: gejala.id,
      jawaban: answers.value[gejala.id] === 'ya' ? 'ya' : 'tidak'
    }))

    // Submit to mobile API
    const result = await startConsultation(gejalaJawaban)
    console.log('Consultation submitted:', result)

    // Store result and redirect
    sessionStorage.setItem('lastConsultationId', result.konsultasi_id)
    sessionStorage.setItem('consultationResult', JSON.stringify(result))
    
    // Navigate ke hasil/proses
    router.push('/proses')
  } catch (error) {
    console.error('Error submitting consultation:', error)
    alert('Terjadi kesalahan saat memproses konsultasi. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  if (confirm('Yakin ingin kembali? Progress akan hilang.')) {
    router.back()
  }
}
</script>
