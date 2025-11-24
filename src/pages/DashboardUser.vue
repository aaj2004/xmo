<template>
  <div class="min-h-screen bg-slate-50 pb-20">
    <!-- Header Minimalist -->
    <header class="bg-white px-5 py-4 sticky top-0 z-10 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p class="text-xs text-gray-500 font-medium">Welcome back</p>
            <h1 class="text-base font-bold text-gray-900" v-if="user">{{ user.name }}</h1>
          </div>
        </div>
      <!-- Logout Button -->
      <button 
        @click="handleLogout"
        class="w-10 h-10 bg-red-100 hover:bg-red-200 rounded-xl flex items-center justify-center transition-colors">
        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
      </div>
      
      <!-- Status Badge -->
      <div class="flex items-center gap-2" v-if="user">
        <div class="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl px-3 py-2 flex items-center gap-2">
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-semibold text-emerald-700">{{ user.role }} - {{ stat.status_akun }}</span>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="px-5 pt-5 space-y-5">
      <!-- Main Action Card -->
      <button
        @click="startConsultation"
        class="w-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-6 shadow-2xl shadow-violet-300/50 active:scale-95 transition-transform relative overflow-hidden"
      >
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        
        <div class="relative flex items-center gap-4">
          <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="text-left flex-1">
            <p class="text-white font-bold text-lg mb-1">Mulai Konsultasi</p>
            <p class="text-white/80 text-sm">Diagnosa cepat & akurat dengan AI</p>
          </div>
          <svg class="w-6 h-6 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </button>

      <!-- Stats Overview -->
      <div class="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
        <h2 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div class="w-1 h-5 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
          Overview Anda
        </h2>
        
        <div class="space-y-4">
          <!-- Total Konsultasi -->
          <div class="flex items-center justify-between p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-500 font-medium">Total Konsultasi</p>
                <p class="text-2xl font-bold text-gray-900">{{ stat.total_konsultasi }}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-xs font-semibold text-violet-600 bg-violet-100 px-2 py-1 rounded-lg">Aktif</span>
            </div>
          </div>

          <!-- Last Consultation -->
          <div class="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-xs text-gray-500 font-medium">Konsultasi Terakhir</p>
              <p class="text-base font-bold text-gray-900">{{ stat.last_label }}</p>
              <p class="text-xs text-gray-400 mt-0.5" v-if="stat.last_time">{{ stat.last_time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Menu Grid -->
      <div class="grid grid-cols-3 gap-3">
        <button @click="viewHistory" class="bg-white rounded-2xl p-4 shadow-md border border-gray-100 active:scale-95 transition-transform">
          <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-xs font-bold text-gray-900">Riwayat</p>
        </button>

        <button class="bg-white rounded-2xl p-4 shadow-md border border-gray-100 active:scale-95 transition-transform">
          <div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p class="text-xs font-bold text-gray-900">Artikel</p>
        </button>

        <button class="bg-white rounded-2xl p-4 shadow-md border border-gray-100 active:scale-95 transition-transform">
          <div class="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-xs font-bold text-gray-900">Bantuan</p>
        </button>
      </div>

      <!-- Tips Card -->
      <div class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div class="relative flex items-start gap-3">
          <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p class="text-white font-bold text-sm mb-1">💡 Tips Kesehatan</p>
            <p class="text-white/90 text-xs leading-relaxed">
              Jaga kesehatan tenggorokan dengan minum air putih minimal 8 gelas per hari
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-20 px-2 py-2">
      <div class="flex items-center justify-around">
        <button class="flex flex-col items-center gap-1 px-3 py-2 relative">
          <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-violet-600 rounded-full"></div>
          <svg class="w-6 h-6 text-violet-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 00.707-1.707l-9-9a.999.999 0 00-1.414 0l-9 9A1 1 0 003 13z"/>
          </svg>
          <span class="text-xs font-bold text-violet-600">Home</span>
        </button>
        
        <button @click="startConsultation" class="flex flex-col items-center gap-1 px-3 py-2 -mt-8">
          <div class="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl shadow-xl shadow-violet-300 flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </button>
        
        <button class="flex flex-col items-center gap-1 px-3 py-2">
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-xs font-medium text-gray-400">Profil</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout, getStoredUser } from '../api/mobile/auth.js'
import { getProfile } from '../api/mobile/profile.js'

const router = useRouter()

const user = ref(null)
const stat = ref({
  total_konsultasi: 0,
  last_label: '-',
  last_time: '',
  status_akun: 'Aktif',
})
const isLoading = ref(true)

onMounted(async () => {
  try {
    // Get stored user from localStorage
    const storedUser = getStoredUser()
    user.value = storedUser
    
    // Fetch profile data from mobile API
    try {
      const profileData = await getProfile()
      if (profileData && profileData.user) {
        user.value = profileData.user
        if (profileData.stats) {
          stat.value = {
            total_konsultasi: profileData.stats.total_konsultasi || 0,
            last_label: '-',
            last_time: '',
            status_akun: 'Aktif',
          }
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      // Use stored user data
      user.value = storedUser
    }
  } catch (error) {
    console.error('Error loading dashboard:', error)
  } finally {
    isLoading.value = false
  }
})

const handleLogout = async () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    await logout()
    router.push('/login')
  }
}

const startConsultation = () => {
  router.push('/konsultasi')
}

const viewHistory = () => {
  router.push('/riwayat')
}
</script>