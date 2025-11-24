<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-5">
    <div class="w-full max-w-md">
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-indigo-300">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Daftar Akun Baru
        </h1>
        <p class="text-sm text-gray-600">Bergabung dengan XMO</p>
      </div>

      <!-- Register Card -->
      <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div class="p-6 space-y-5">
          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p class="text-sm font-semibold text-red-900">Gagal Mendaftar</p>
              <p class="text-xs text-red-700 mt-0.5">{{ errorMessage }}</p>
            </div>
          </div>

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
                class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Email Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                v-model="formData.email"
                type="email"
                placeholder="nama@email.com"
                class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimal 6 karakter"
                @keyup.enter="handleRegister"
                class="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Password harus minimal 6 karakter
            </p>
          </div>

          <!-- Password Strength Indicator -->
          <div v-if="formData.password" class="space-y-2">
            <div class="flex gap-1">
              <div 
                v-for="n in 4" 
                :key="n"
                class="h-1 flex-1 rounded-full transition-colors"
                :class="passwordStrength >= n ? getStrengthColor(passwordStrength) : 'bg-gray-200'"
              ></div>
            </div>
            <p class="text-xs font-medium" :class="getStrengthTextColor(passwordStrength)">
              {{ getStrengthText(passwordStrength) }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            @click="handleRegister"
            :disabled="isLoading"
            class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-300 hover:shadow-xl hover:shadow-indigo-400 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="isLoading" class="w-5 h-5 inline-block mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <svg v-else class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            {{ isLoading ? 'Mendaftar...' : 'Daftar Sekarang' }}
          </button>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500 font-medium">atau</span>
            </div>
          </div>

          <!-- Login Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Sudah punya akun?
              <a href="/login" class="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80">
                Login di sini
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Terms -->
      <div class="mt-6 text-center">
        <p class="text-xs text-gray-500 leading-relaxed">
          Dengan mendaftar, Anda menyetujui
          <a href="#" class="text-indigo-600 font-semibold">Syarat & Ketentuan</a>
          dan
          <a href="#" class="text-indigo-600 font-semibold">Kebijakan Privasi</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/mobile/auth.js'

const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// Password strength calculator
const passwordStrength = computed(() => {
  const pwd = formData.value.password
  if (!pwd) return 0
  
  let strength = 0
  if (pwd.length >= 6) strength++
  if (pwd.length >= 8) strength++
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
  if (/[0-9]/.test(pwd) && /[^a-zA-Z0-9]/.test(pwd)) strength++
  
  return strength
})

const getStrengthColor = (strength) => {
  if (strength <= 1) return 'bg-red-500'
  if (strength === 2) return 'bg-amber-500'
  if (strength === 3) return 'bg-blue-500'
  return 'bg-green-500'
}

const getStrengthTextColor = (strength) => {
  if (strength <= 1) return 'text-red-600'
  if (strength === 2) return 'text-amber-600'
  if (strength === 3) return 'text-blue-600'
  return 'text-green-600'
}

const getStrengthText = (strength) => {
  if (strength <= 1) return 'Password lemah'
  if (strength === 2) return 'Password cukup'
  if (strength === 3) return 'Password kuat'
  return 'Password sangat kuat'
}

const handleRegister = async () => {
  if (isLoading.value) return
  
  // Validate
  if (!formData.value.name || !formData.value.email || !formData.value.password) {
    errorMessage.value = 'Semua field harus diisi'
    return
  }
  
  if (formData.value.password.length < 6) {
    errorMessage.value = 'Password minimal 6 karakter'
    return
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    errorMessage.value = 'Format email tidak valid'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''

  try {
    await register(
      formData.value.name,
      formData.value.email,
      formData.value.password,
      formData.value.password
    )
    
    console.log('Registration successful')
    // Redirect to dashboard after successful registration
    router.push('/')
  } catch (error) {
    console.error('Registration error:', error)
    errorMessage.value = error.message || 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}
</script>