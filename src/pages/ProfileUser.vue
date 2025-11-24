<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <!-- Header -->
    <header class="bg-gradient-to-r from-violet-600 to-purple-600 px-5 pt-6 pb-6 relative">
      <div class="flex items-center justify-between mb-8">
        <button @click="goBack" class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg font-bold text-white">Profil Saya</h1>
        <button @click="handleEdit" class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>

      <!-- Avatar -->
      <div class="flex flex-col items-center pb-4">
        <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl relative mb-4">
          <svg class="w-12 h-12 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <button class="absolute bottom-0 right-0 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <h2 class="text-xl font-bold text-white mb-1">{{ user.name }}</h2>
        <p class="text-sm text-white/90">{{ user.email }}</p>
      </div>
    </header>

    <!-- Content -->
    <main class="px-5 pt-6 space-y-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <svg class="w-12 h-12 text-violet-600 animate-spin mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <p class="text-sm text-gray-600 font-medium">Memuat profil...</p>
        </div>
      </div>

      <template v-else>
        <!-- Profile Info Card -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="p-5 space-y-4">
            <!-- Name -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-xs text-gray-500 font-medium mb-1">Nama Lengkap</p>
                <p class="text-sm font-bold text-gray-900">{{ user.name }}</p>
              </div>
            </div>

            <div class="border-t border-gray-100"></div>

            <!-- Email -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-xs text-gray-500 font-medium mb-1">Email</p>
                <p class="text-sm font-bold text-gray-900">{{ user.email }}</p>
              </div>
            </div>

            <div class="border-t border-gray-100"></div>

            <!-- Role/Status -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-xs text-gray-500 font-medium mb-1">Status Akun</p>
                <span class="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200">
                  {{ user.role }}
                </span>
              </div>
            </div>

            <div class="border-t border-gray-100"></div>

            <!-- Member Since -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-xs text-gray-500 font-medium mb-1">Bergabung Sejak</p>
                <p class="text-sm font-bold text-gray-900">{{ formatDate(user.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white rounded-xl shadow-md border border-gray-100 p-4 text-center">
            <div class="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p class="text-3xl font-bold text-gray-900 mb-1">{{ stats.total_konsultasi }}</p>
            <p class="text-xs text-gray-600 font-medium">Total Konsultasi</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md border border-gray-100 p-4 text-center">
            <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-3xl font-bold text-gray-900 mb-1">{{ stats.diagnosis_berhasil }}</p>
            <p class="text-xs text-gray-600 font-medium">Berhasil</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <button @click="changePassword" class="w-full flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100">
            <div class="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div class="flex-1 text-left">
              <p class="text-sm font-semibold text-gray-900">Ganti Password</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button @click="handleLogout" class="w-full flex items-center gap-4 p-4 hover:bg-red-50 active:bg-red-100 transition-colors">
            <div class="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div class="flex-1 text-left">
              <p class="text-sm font-semibold text-red-600">Keluar</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </template>
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-xs font-bold text-violet-600">Profil</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout as authLogout, getStoredUser } from '../api/mobile/auth.js'
import { getProfile } from '../api/mobile/profile.js'

const router = useRouter()

const user = ref({
  name: '',
  email: '',
  role: '',
  created_at: ''
})
const isLoading = ref(true)
const stats = ref({
  total_konsultasi: 0
})

// Fetch user profile
onMounted(async () => {
  try {
    // Get stored user from localStorage
    const storedUser = getStoredUser()
    if (storedUser) {
      user.value = storedUser
    }

    // Fetch full profile from API
    const profile = await getProfile()
    if (profile && profile.user) {
      user.value = {
        name: profile.user.name,
        email: profile.user.email,
        created_at: profile.user.created_at
      }
      if (profile.stats) {
        stats.value = profile.stats
      }
    }
  } catch (error) {
    console.error('Error loading profile:', error)
  } finally {
    isLoading.value = false
  }
})

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const goBack = () => {
  window.history.back()
}

const goToDashboard = () => {
  window.location.href = '/'
}

const newConsultation = () => {
  window.location.href = '/konsultasi'
}

const handleEdit = () => {
  alert('Fitur edit profil segera hadir!')
}

const changePassword = () => {
  alert('Navigasi ke halaman ganti password')
}

const handleLogout = async () => {
  if (!confirm('Yakin ingin keluar?')) return
  
  authLogout()
  router.push('/login')
}
</script>