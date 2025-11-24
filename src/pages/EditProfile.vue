<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <!-- Header -->
    <header class="bg-white px-5 py-4 sticky top-0 z-10 shadow-sm border-b border-gray-200">
      <div class="flex items-center justify-between">
        <button @click="goBack" class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-base font-bold text-gray-900">Edit Profil</h1>
        <div class="w-10"></div>
      </div>
    </header>

    <!-- Content -->
    <main class="px-5 pt-6 space-y-6">
      <!-- Avatar Section -->
      <div class="flex flex-col items-center">
        <div class="relative">
          <div class="w-28 h-28 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
            <svg class="w-14 h-14 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <button @click="changeAvatar" class="absolute bottom-0 right-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-3">Tap untuk ubah foto profil</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p class="text-sm font-semibold text-red-900">Error</p>
          <p class="text-xs text-red-700 mt-0.5">{{ errorMessage }}</p>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
        <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="text-sm font-semibold text-green-900">Berhasil!</p>
          <p class="text-xs text-green-700 mt-0.5">{{ successMessage }}</p>
        </div>
      </div>

      <!-- Form -->
      <div class="space-y-4">
        <!-- Name Input -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              v-model="formData.name"
              type="text"
              placeholder="Masukkan nama lengkap"
              class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <!-- Email Input (Read Only) -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              v-model="formData.email"
              type="email"
              disabled
              class="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
            />
          </div>
          <p class="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Email tidak dapat diubah
          </p>
        </div>

        <!-- Phone Input (Optional) -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon <span class="text-gray-400 text-xs">(Opsional)</span></label>
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="08xx xxxx xxxx"
              class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <!-- Address Input (Optional) -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Alamat <span class="text-gray-400 text-xs">(Opsional)</span></label>
          <div class="relative">
            <div class="absolute left-4 top-4">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <textarea
              v-model="formData.address"
              rows="3"
              placeholder="Masukkan alamat lengkap"
              class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Info Card -->
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="text-xs font-semibold text-blue-900 mb-1">Informasi</p>
            <p class="text-xs text-blue-700 leading-relaxed">
              Pastikan data yang Anda masukkan sudah benar. Email tidak dapat diubah setelah registrasi.
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3">
        <button
          @click="goBack"
          class="flex-1 py-3.5 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl active:scale-95 transition-all"
        >
          Batal
        </button>
        <button
          @click="handleSave"
          :disabled="isLoading || isFetchingProfile"
          class="flex-1 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-violet-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="isLoading" class="w-5 h-5 inline-block mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {{ isLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProfile, updateProfile as updateProfileApi } from '../api/mobile/profile.js'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

const isLoading = ref(false)
const isFetchingProfile = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const loadProfile = async () => {
  isFetchingProfile.value = true
  try {
    const data = await getProfile()
    const user = data?.user || data
    
    formData.value.name = user?.name || ''
    formData.value.email = user?.email || ''
    formData.value.phone = user?.phone || ''
    formData.value.address = user?.address || ''
    
    errorMessage.value = ''
  } catch (error) {
    console.error('Error loading profile:', error)
    errorMessage.value = error.message || 'Gagal memuat data profil.'
  } finally {
    isFetchingProfile.value = false
  }
}

// Load current user data
onMounted(loadProfile)

const changeAvatar = () => {
  alert('Fitur upload foto profil segera hadir!')
  // TODO: Implement image upload
}

const handleSave = async () => {
  if (isLoading.value) return
  
  // Validate
  if (!formData.value.name) {
    errorMessage.value = 'Nama lengkap harus diisi'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await updateProfileApi(formData.value.name)
    successMessage.value = 'Profil berhasil diperbarui!'
    
    // Refresh profile data
    await loadProfile()

    // Redirect after 1.5 seconds
    setTimeout(() => {
      window.history.back()
    }, 1500)
  } catch (error) {
    console.error('Update error:', error)
    errorMessage.value = error.message || 'Terjadi kesalahan. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  if (confirm('Batalkan perubahan?')) {
    window.history.back()
  }
}
</script>
