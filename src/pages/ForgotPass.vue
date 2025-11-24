<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-5">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-300">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Lupa Kata Sandi?
        </h1>
        <p class="text-sm text-gray-600 leading-relaxed">
          Masukkan email akun Anda. Kami akan mengirim tautan untuk menyetel ulang kata sandi
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="p-6 space-y-5">
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
          <div v-if="successMessage" class="space-y-4">
            <div class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="text-sm font-semibold text-green-900">Email Terkirim!</p>
                <p class="text-xs text-green-700 mt-0.5">{{ successMessage }}</p>
              </div>
            </div>

            <!-- Dev Reset Link -->
            <div v-if="devResetLink" class="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div class="flex items-start gap-2 mb-2">
                <svg class="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p class="text-xs font-semibold text-amber-900">Mode Pengembangan</p>
              </div>
              <a 
                :href="devResetLink"
                class="block text-xs text-blue-600 font-medium hover:text-blue-700 underline break-all"
              >
                Buka tautan reset password
              </a>
            </div>
          </div>

          <!-- Form -->
          <div v-else>
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
                  v-model="email"
                  type="email"
                  placeholder="nama@email.com"
                  @keyup.enter="handleSubmit"
                  class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button
              @click="handleSubmit"
              :disabled="isLoading"
              class="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-300 hover:shadow-xl hover:shadow-blue-400 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isLoading" class="w-5 h-5 inline-block mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <svg v-else class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ isLoading ? 'Mengirim...' : 'Kirim Tautan Reset' }}
            </button>
          </div>

          <!-- Back to Login -->
          <div class="pt-2 border-t border-gray-100">
            <a 
              href="/login" 
              class="flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Login
            </a>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="text-xs font-semibold text-blue-900 mb-1">Perhatian</p>
            <p class="text-xs text-blue-700 leading-relaxed">
              Tautan reset password hanya berlaku selama 1 jam. Jika tidak menerima email, periksa folder spam atau coba kirim ulang.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const DEFAULT_API_BASE = 'https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile'
const apiBaseUrl = import.meta.env.VITE_API_URL || DEFAULT_API_BASE

let forgotPasswordUrl = 'https://blueviolet-dinosaur-678797.hostingersite.com/forgot.php'
try {
  const parsed = new URL(apiBaseUrl)
  forgotPasswordUrl = `${parsed.origin}/forgot.php`
} catch (error) {
  console.warn('Invalid API base URL, falling back to default forgot password endpoint.', error)
}

const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const devResetLink = ref('')

const handleSubmit = async () => {
  if (isLoading.value) return
  
  // Validate email
  if (!email.value) {
    errorMessage.value = 'Email harus diisi'
    return
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Masukkan email yang valid'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  devResetLink.value = ''

  try {
    // Prepare form data
    const data = new FormData()
    data.append('email', email.value)

    console.log('Sending forgot password request...', email.value)

    // Send to backend
    const response = await fetch(forgotPasswordUrl, {
      method: 'POST',
      credentials: 'include',
      body: data
    })

    console.log('Response status:', response.status)

    if (response.ok) {
      const text = await response.text()
      
      // Check for success message
      if (text.includes('tautan reset telah dikirim') || text.includes('Jika email terdaftar')) {
        successMessage.value = 'Jika email terdaftar, tautan reset telah dikirim. Periksa inbox/spam Anda.'
        
        // Check for dev reset link
        const linkMatch = text.match(/href="([^"]*reset\.php[^"]*)"/i)
        if (linkMatch && linkMatch[1]) {
          // Decode HTML entities
          const link = linkMatch[1]
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
          
          devResetLink.value = link
          console.log('Dev reset link found:', link)
        }
      } else if (text.includes('Masukkan email yang valid')) {
        errorMessage.value = 'Masukkan email yang valid'
      } else {
        successMessage.value = 'Jika email terdaftar, tautan reset telah dikirim. Periksa inbox/spam Anda.'
      }
    } else {
      errorMessage.value = 'Terjadi kesalahan. Silakan coba lagi.'
    }

  } catch (error) {
    console.error('Forgot password error:', error)
    errorMessage.value = 'Terjadi kesalahan koneksi. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}
</script>
