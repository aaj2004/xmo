# Implementasi Flow Aplikasi Mobile

## Overview

Aplikasi mobile sudah terintegrasi penuh dengan blueviolet-dinosaur-678797.hostingersite.com dengan flow sebagai berikut:

### 1. **Landing & Auth Flow**

#### Belum Login (First Visit)
- User langsung diarahkan ke halaman **Login** (`/login`)
- Auth guard mencegak akses ke dashboard/konsultasi jika belum login

#### Login Flow
```
Login.vue → (POST /auth/login) → Token & User data di localStorage → Dashboard
```

**File:** `src/pages/Login.vue`
- Menggunakan `login()` dari `src/api/auth.js`
- Token disimpan ke localStorage dengan key `token`
- User data disimpan ke localStorage dengan key `user`
- Redirect ke dashboard setelah berhasil login

#### Register Flow
```
Registrasi.vue → (POST /auth/register) → Redirect ke Login
```

**File:** `src/pages/Registrasi.vue`
- Menggunakan `register()` dari `src/api/auth.js`
- Setelah registrasi berhasil, user diarahkan ke login

---

### 2. **Dashboard Flow (After Login)**

#### Dashboard User
```
DashboardUser.vue → Fetch user data dari API → Display profile & statistics
```

**File:** `src/pages/DashboardUser.vue`
- Mengambil user data dari localStorage (via `getStoredUser()`)
- Fetch fresh data dari API `/user/dashboard`
- Menampilkan nama user, statistik konsultasi
- Tombol **Logout** untuk keluar

**Features:**
- View konsultasi history
- Lihat artikel
- Lihat bantuan
- Start new consultation

---

### 3. **Consultation Flow**

#### Step 1: Konsultasi Form
```
Konsultasi.vue → (GET /symptoms) → Display gejala list → User jawab Y/T
```

**File:** `src/pages/Konsultasi.vue`
- Fetch symptoms dari API
- User menjawab Ya/Tidak untuk setiap gejala
- Progress bar menunjukkan progres pengisian
- Tombol submit disabled sampai semua pertanyaan dijawab

#### Step 2: Process Consultation
```
→ (POST /consultation/save) → Simpan konsultasi ke database
→ Simpan result ke sessionStorage
→ Redirect ke Proses.vue
```

#### Step 3: View Results
```
Proses.vue → Fetch hasil dari sessionStorage atau API → Display diagnosis
```

**File:** `src/pages/Proses.vue`
- Ambil hasil konsultasi dari sessionStorage (dari page sebelumnya)
- Atau fetch dari API jika dibuka ulang dengan consultation ID
- Tampilkan diagnosis, deskripsi, dan solusi
- Tombol untuk konsultasi baru atau lihat riwayat

---

### 4. **User Profile & History**

#### Profile Page
```
ProfileUser.vue → Ambil user data dari localStorage → Display profile & stats
```

**File:** `src/pages/ProfileUser.vue`
- Mengambil user data dari localStorage
- Tombol Edit Profile (untuk implementasi berikutnya)
- Tombol Ganti Password (untuk implementasi berikutnya)
- Tombol Logout

#### Consultation History
```
RiwayatKonsultasi.vue → (GET /consultation/history) → Display list riwayat
```

**File:** `src/pages/RiwayatKonsultasi.vue`
- Fetch consultation history dari API
- Menampilkan statistik: total, berhasil, tidak jelas
- Klik item untuk lihat detail hasil

---

## API Endpoints Required

### Authentication
- `POST /auth/login` - Login user
- `POST /auth/register` - Register user

### User
- `GET /user/profile` - Ambil profile user (dengan token)
- `POST /user/profile/update` - Update profile
- `GET /user/dashboard` - Dashboard stats

### Consultation
- `GET /symptoms` - Daftar gejala
- `GET /diseases` - Daftar penyakit
- `POST /consultation/start` - Mulai konsultasi
- `POST /consultation/save` - Simpan jawaban & proses
- `GET /consultation/{id}/result` - Ambil hasil konsultasi
- `GET /consultation/history` - Riwayat konsultasi user

---

## Authentication Guard (Router)

**File:** `src/router/index.js`

Routes yang memerlukan login:
- `/` (dashboard)
- `/konsultasi`
- `/hasil`
- `/riwayat`
- `/profile`
- `/editprofile`

Routes yang public:
- `/login`
- `/regist` (register)
- `/forgot` (forgot password)

**Behavior:**
- Jika tidak login → akses `/` akan redirect ke `/login`
- Jika sudah login → akses `/login` akan redirect ke `/`

---

## Data Storage

### LocalStorage (Persistent)
```javascript
// Token untuk API calls
localStorage.getItem('token') // API auth token

// User data
localStorage.getItem('user') // JSON user object
```

### SessionStorage (Temporary, cleared on page close)
```javascript
// Consultation results
sessionStorage.getItem('consultationResult')
sessionStorage.getItem('userAnswers')
```

---

## Key Helper Functions

### Auth Service (`src/api/auth.js`)
```javascript
login(email, password)              // Login & save token
register(userData)                  // Register user
logout()                            // Clear token & user
isAuthenticated()                   // Check login status
getStoredUser()                     // Get user from localStorage
getToken()                          // Get token from localStorage
```

### Consultation Service (`src/api/consultation.js`)
```javascript
getSymptoms()                       // Fetch symptoms list
saveConsultation(symptoms)          // Save consultation & get result
getConsultationHistory()            // Fetch user's consultation history
getConsultationResult(id)           // Fetch specific consultation result
```

### HTTP Client (`src/api/http.js`)
```javascript
get(endpoint, params)               // GET request
post(endpoint, data)                // POST request
put(endpoint, data)                 // PUT request
del(endpoint)                       // DELETE request
```

---

## Error Handling

Semua API calls menggunakan try-catch:
```javascript
try {
  const result = await login(email, password)
  // Success
} catch (error) {
  // Error ditampilkan ke user via alert atau error message
  console.error(error.message)
}
```

---

## Development vs Production

Ubah di `.env`:
```bash
# Development
VITE_API_URL=https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile
VITE_DEBUG=true

# Production
VITE_API_URL=https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile
VITE_DEBUG=false
```

---

## Next Steps / TODO

- [ ] Implement Edit Profile page
- [ ] Implement Change Password page
- [ ] Implement Forgot Password flow
- [ ] Add profile picture upload
- [ ] Add consultation PDF export
- [ ] Add notification system
- [ ] Add dark mode
- [ ] Optimize API calls (caching)
- [ ] Add offline mode support

---

## Testing Checklist

- [ ] Login dengan credential valid
- [ ] Login dengan credential invalid
- [ ] Register user baru
- [ ] Logout & verify redirect to login
- [ ] Access protected route tanpa login
- [ ] Fill consultation form & submit
- [ ] View consultation results
- [ ] View consultation history
- [ ] Update profile
- [ ] Navigate between pages
