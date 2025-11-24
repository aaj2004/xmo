<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <!-- Header -->
    <header class="bg-white px-5 py-4 sticky top-0 z-10 shadow-sm">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <h1 class="text-lg font-bold text-gray-900">Hasil Konsultasi</h1>
          <p class="text-xs text-gray-500">{{ currentDate }}</p>
        </div>
        <button class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Content -->
    <main class="px-5 pt-5 space-y-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <svg class="w-12 h-12 text-violet-600 animate-spin mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <p class="text-sm text-gray-600 font-medium">Memuat hasil konsultasi...</p>
        </div>
      </div>

      <!-- Content (show when loaded) -->
      <template v-else>
      <!-- Hasil Diagnosis Card -->
      <div v-if="hasilDiagnosis" class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <!-- Success Header -->
        <div class="bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-white/90 text-xs font-semibold mb-1">Diagnosis Awal</p>
              <p class="text-white text-lg font-bold">{{ hasilDiagnosis.nama }}</p>
            </div>
          </div>
        </div>

        <!-- Content Body -->
        <div class="p-5 space-y-4">
          <!-- Deskripsi -->
          <div>
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-sm font-bold text-gray-900">Deskripsi</h3>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed pl-10">
              {{ hasilDiagnosis.deskripsi }}
            </p>
          </div>

          <div class="border-t border-gray-100"></div>

          <!-- Solusi -->
          <div>
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="text-sm font-bold text-gray-900">Saran & Solusi</h3>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed pl-10">
              {{ hasilDiagnosis.solusi }}
            </p>
          </div>
        </div>
      </div>

      <!-- No Result Card -->
      <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-white text-base font-bold">Tidak Dapat Disimpulkan</p>
            </div>
          </div>
        </div>
        <div class="p-5">
          <p class="text-sm text-gray-600 leading-relaxed">
            Sistem belum dapat menyimpulkan penyakit secara meyakinkan berdasarkan gejala yang Anda berikan. 
            Silakan konsultasi langsung dengan tenaga kesehatan profesional.
          </p>
        </div>
      </div>

      <!-- Jawaban User -->
      <div v-if="userAnswers.length > 0" class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100">
          <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
            <div class="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full"></div>
            Gejala yang Anda Pilih
          </h3>
        </div>
        <div class="divide-y divide-gray-100">
          <div 
            v-for="(answer, index) in userAnswers" 
            :key="index"
            class="px-5 py-3 flex items-start justify-between gap-3"
          >
            <div class="flex-1">
              <p class="text-sm font-semibold text-gray-900">{{ answer.nama }}</p>
              <p v-if="answer.deskripsi" class="text-xs text-gray-500 mt-1">{{ answer.deskripsi }}</p>
            </div>
            <span 
              class="px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 whitespace-nowrap"
              :class="answer.jawab === 'ya' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-red-100 text-red-700'"
            >
              {{ answer.jawab === 'ya' ? '✓ Ya' : '✗ Tidak' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Detail Proses
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100">
          <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
            <div class="w-1 h-5 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
            Detail Proses Sistem Pakar
          </h3>
        </div>
        <div class="divide-y divide-gray-100">
          <div 
            v-for="(item, index) in debugInfo" 
            :key="index"
            class="px-5 py-3 flex items-center justify-between"
          >
            <p class="text-xs text-gray-700 flex-1 pr-3">{{ item.rule }}</p>
            <span 
              class="px-3 py-1 rounded-full text-xs font-bold flex-shrink-0"
              :class="getScoreBadgeClass(item.score)"
            >
              {{ item.score.toFixed(2) }}
            </span>
          </div>
        </div>
        <div class="px-5 py-3 bg-slate-50 border-t border-gray-100">
          <p class="text-xs text-gray-500 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Skor menunjukkan tingkat kecocokan dengan aturan
          </p>
        </div>
      </div> -->

      <!-- Disclaimer -->
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-4">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-gray-900 mb-1">Penting!</p>
            <p class="text-xs text-gray-600 leading-relaxed">
              Hasil diagnosis ini bersifat indikatif dan tidak menggantikan konsultasi dengan tenaga medis profesional. 
              Disarankan untuk berkonsultasi langsung dengan dokter untuk diagnosis dan penanganan yang tepat.
            </p>
          </div>
        </div>
      </div>
      </template>
    </main>

    <!-- Fixed Bottom Actions -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 z-20">
      <div class="flex gap-3">
        <button
          @click="goToHistory"
          class="flex-1 py-3 rounded-xl font-semibold text-sm border-2 border-violet-600 text-violet-600 bg-white active:scale-95 transition-all"
        >
          <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Riwayat
        </button>
        <button
          @click="newConsultation"
          class="flex-1 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-300 active:scale-95 transition-all"
        >
          <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Konsultasi Baru
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getConsultationResult } from '../api/mobile/konsultasi.js'

const router = useRouter()
const route = useRoute()
const debugInfo = ref([])
const userAnswers = ref([])

const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('id-ID', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Load hasil konsultasi
onMounted(async () => {
  try {
    // Check result from sessionStorage (from mobile API response)
    const savedResult = sessionStorage.getItem('consultationResult')
    if (savedResult) {
      try {
        const result = JSON.parse(savedResult)
        if (result && result.hasil_penyakit) {
          hasilDiagnosis.value = result.hasil_penyakit
          // Get user answers from result
          if (result.gejala_jawaban) {
            userAnswers.value = result.gejala_jawaban.filter(a => a.jawaban === 'ya')
          }
          console.log('Loaded consultation result from sessionStorage:', result)
          return
        }
      } catch (e) {
        console.error('Error parsing saved result:', e)
      }
    }
    
    // Get consultation ID from sessionStorage or URL parameter
    let consultationId = sessionStorage.getItem('lastConsultationId')
    if (!consultationId) {
      consultationId = route.query.id
    }
    
    if (consultationId) {
      const data = await getConsultationResult(consultationId)
      console.log('Consultation result:', data)
      
      if (data && data.hasil_penyakit) {
        hasilDiagnosis.value = data.hasil_penyakit
        if (data.gejala_jawaban) {
          userAnswers.value = data.gejala_jawaban.filter(a => a.jawaban === 'ya')
        }
      }
      sessionStorage.removeItem('consultationResult')
      sessionStorage.removeItem('lastConsultationId')
    }
  } catch (error) {
    console.error('Error loading hasil:', error)
  }
})

const getScoreBadgeClass = (score) => {
  if (score >= 0.8) {
    return 'bg-emerald-500 text-white'
  } else if (score >= 0.5) {
    return 'bg-amber-500 text-white'
  } else {
    return 'bg-gray-400 text-white'
  }
}

const goToHistory = () => {
  router.push('/riwayat')
}

const newConsultation = () => {
  if (confirm('Mulai konsultasi baru?')) {
    router.push('/konsultasi')
  }
}
</script>