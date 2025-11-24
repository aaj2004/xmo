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
          <h1 class="text-base font-bold text-gray-900">Riwayat Konsultasi</h1>
          <p class="text-xs text-gray-500">{{ totalKonsultasi }} Konsultasi</p>
        </div>
        <button class="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center" @click="newConsultation">
          <svg class="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="text-center">
        <svg class="w-12 h-12 text-violet-600 animate-spin mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <p class="text-sm text-gray-600 font-medium">Memuat riwayat...</p>
      </div>
    </div>

    <!-- Content -->
    <main v-else class="px-5 pt-5 space-y-4">
      <!-- Summary Cards -->
      <div class="grid grid-cols-3 gap-3">
        <div class="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl p-3 text-white shadow-lg">
          <p class="text-2xl font-bold mb-1">{{ totalKonsultasi }}</p>
          <p class="text-xs opacity-90">Total</p>
        </div>
        <div class="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-3 text-white shadow-lg">
          <p class="text-2xl font-bold mb-1">{{ diagnosisBerhasil }}</p>
          <p class="text-xs opacity-90">Berhasil</p>
        </div>
        <div class="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-3 text-white shadow-lg">
          <p class="text-2xl font-bold mb-1">{{ tidakJelas }}</p>
          <p class="text-xs opacity-90">Tidak Jelas</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="riwayatList.length === 0" class="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Belum Ada Riwayat</h3>
        <p class="text-sm text-gray-500 mb-6">Anda belum melakukan konsultasi dengan sistem pakar</p>
        <button
          @click="newConsultation"
          class="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-violet-300 active:scale-95 transition-all"
        >
          <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Mulai Konsultasi Pertama
        </button>
      </div>

      <!-- Riwayat List -->
      <div v-else class="space-y-3">
        <div
          v-for="item in riwayatList"
          :key="item.id"
          @click="viewDetail(item.id)"
          class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden active:scale-98 transition-transform"
        >
          <div class="p-4">
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <span class="text-white text-xs font-bold">#{{ item.id }}</span>
                </div>
                <div>
                  <p class="text-xs text-gray-500 font-medium">{{ formatDate(item.created_at) }}</p>
                  <p class="text-xs text-gray-400">{{ formatTime(item.created_at) }}</p>
                </div>
              </div>
              <span 
                v-if="item.hasil"
                class="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200"
              >
                <svg class="w-3 h-3 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Selesai
              </span>
              <span 
                v-else
                class="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200"
              >
                <svg class="w-3 h-3 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Tidak Jelas
              </span>
            </div>

            <!-- Hasil -->
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-xs text-gray-500 font-medium mb-1">Hasil Diagnosis</p>
                <p v-if="item.hasil" class="text-sm font-bold text-gray-900">
                  {{ item.hasil }}
                </p>
                <p v-else class="text-sm text-gray-400 italic">
                  Tidak dapat disimpulkan
                </p>
              </div>
              <svg class="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-20 px-2 py-2">
      <div class="flex items-center justify-around">
        <button @click="goToDashboard" class="flex flex-col items-center gap-1 px-3 py-2">
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs font-medium text-gray-400">Home</span>
        </button>
        
        <button @click="newConsultation" class="flex flex-col items-center gap-1 px-3 py-2 -mt-8">
          <div class="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl shadow-xl shadow-violet-300 flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </button>
        
        <button class="flex flex-col items-center gap-1 px-3 py-2 relative">
          <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-violet-600 rounded-full"></div>
          <svg class="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs font-medium text-gray-400">Riwayat</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getConsultationHistory } from '../api/consultation.js'

const router = useRouter()
const isLoading = ref(true)

// Computed statistics
const totalKonsultasi = computed(() => riwayatList.value.length)
const diagnosisBerhasil = computed(() => 
  riwayatList.value.filter(item => item.hasil).length
)
const tidakJelas = computed(() => 
  riwayatList.value.filter(item => !item.hasil).length
)

// Fetch riwayat from API
onMounted(async () => {
  try {
    const data = await getConsultationHistory()
    console.log('Riwayat data:', data)
    
    if (Array.isArray(data)) {
      riwayatList.value = data
    } else if (data && data.data && Array.isArray(data.data)) {
      riwayatList.value = data.data
    }
  } catch (error) {
    console.error('Error loading riwayat:', error)
    riwayatList.value = []
  } finally {
    isLoading.value = false
  }
})

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

// Format time
const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Navigation functions
const goBack = () => {
  router.back()
}

const goToDashboard = () => {
  router.push('/')
}

const newConsultation = () => {
  router.push('/konsultasi')
}

const viewDetail = (id) => {
  router.push({ name: 'Proses', query: { id } })
}
</script>