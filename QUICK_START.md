# Quick Start Guide - Mobile App Integration

## 🚀 Mulai Cepat

### 1. Install & Setup

```bash
cd d:\Project\HIBAH\ Prototype\mobile-app

# Install dependencies
npm install

# Start dev server
npm run dev
```

Server akan jalan di: `http://localhost:5173`

---

## 2. Flow Aplikasi

### ✅ Pertama kali buka (Belum Login)
```
App dibuka
  ↓
Auth Guard cek token di localStorage
  ↓
Tidak ada token → Redirect ke /login (halaman login)
```

### ✅ Proses Login
```
Login.vue
  ↓
User masukkan email & password
  ↓
Klik tombol "Masuk"
  ↓
POST /auth/login ke https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile
  ↓
Respon sukses:
  - Token disimpan ke localStorage['token']
  - User data disimpan ke localStorage['user']
  - Redirect ke /dashboard
```

**Contoh user untuk test:**
- Email: `user@example.com`
- Password: `password123`

### ✅ Setelah Login (Dashboard)
```
DashboardUser.vue
  ↓
Ambil user data dari localStorage
  ↓
Tampilkan: nama, role, statistik konsultasi
  ↓
Opsi:
  1. Mulai Konsultasi → /konsultasi
  2. Lihat Riwayat → /riwayat
  3. View Profile → /profile
  4. Logout
```

### ✅ Proses Konsultasi

```
1. Dashboard → Klik "Mulai Konsultasi"
   ↓
2. Konsultasi.vue
   - Fetch /symptoms (daftar gejala)
   - Tampilkan form dengan pilihan Ya/Tidak
   - Progress bar menunjukkan progres
   ↓
3. User jawab semua pertanyaan
   ↓
4. Klik "Proses Diagnosa"
   - POST /consultation/save dengan jawaban
   - Simpan hasil ke sessionStorage
   ↓
5. Proses.vue
   - Tampilkan diagnosis hasil
   - Tampilkan deskripsi & solusi
   ↓
6. Opsi:
   - Konsultasi Baru → Kembali ke /konsultasi
   - Lihat Riwayat → /riwayat
   - Kembali ke Dashboard
```

### ✅ Riwayat Konsultasi

```
Profile → "Riwayat Konsultasi" atau Dashboard → Tombol "Riwayat"
  ↓
RiwayatKonsultasi.vue
  ↓
Fetch /consultation/history
  ↓
Tampilkan:
  - Jumlah total konsultasi
  - Jumlah diagnosis berhasil
  - Jumlah tidak jelas
  - List riwayat dengan tanggal
  ↓
Klik item → Lihat detail hasil
```

---

## 3. Authentication Guard (Route Protection)

### Protected Routes (Memerlukan Login)
```
✓ /               (Dashboard)
✓ /konsultasi     (Consultation)
✓ /hasil          (Results)
✓ /riwayat        (History)
✓ /profile        (Profile)
✓ /editprofile    (Edit Profile)
```

### Public Routes (Tidak perlu Login)
```
✓ /login          (Login)
✓ /regist         (Register)
✓ /forgot         (Forgot Password)
```

### Behavior
- Tidak login → coba akses `/` → Auto redirect ke `/login`
- Sudah login → coba akses `/login` → Auto redirect ke `/`

---

## 4. Data Storage

### 🔐 LocalStorage (Persisten)
```javascript
// Simpan setelah login
localStorage['token']    // API auth token (string)
localStorage['user']     // User data (JSON object)

// Retrieve
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))

// Clear saat logout
localStorage.clear()
```

### 📝 SessionStorage (Temp)
```javascript
// Saat konsultasi selesai
sessionStorage['consultationResult']  // Hasil diagnosa
sessionStorage['userAnswers']         // Jawaban user

// Auto clear saat page ditutup
```

---

## 5. API Endpoints

Base URL: `https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile`

### Auth
```
POST /auth/login
  Request: { email, password }
  Response: { success, data: { token, user } }

POST /auth/register
  Request: { name, email, password }
  Response: { success, data: { user } }
```

### User
```
GET /user/profile
  Headers: { token }
  Response: { success, data: { user } }

POST /user/profile/update
  Request: { ...userData, token }
  Response: { success, data: { user } }

GET /user/dashboard
  Response: { success, data: { user, stats } }
```

### Consultation
```
GET /symptoms
  Response: { success, data: [ { id, kode, nama, deskripsi } ] }

POST /consultation/save
  Request: { symptoms: [ { symptom_id, answer } ], token }
  Response: { success, data: { diagnosis } }

GET /consultation/history
  Headers: { token }
  Response: { success, data: [ { id, diagnosis, date } ] }

GET /consultation/{id}/result
  Headers: { token }
  Response: { success, data: { diagnosis, debug_info } }
```

---

## 6. Testing Checklist

### Login Flow
- [ ] Buka app → Redirect ke /login ✓
- [ ] Masukkan email & password invalid → Error message
- [ ] Masukkan email & password valid → Redirect ke dashboard
- [ ] Token ada di localStorage
- [ ] Buka dev tools → Console tidak ada error

### Dashboard
- [ ] Nama user tertampil
- [ ] Statistik konsultasi terload
- [ ] Tombol logout berfungsi
- [ ] Setelah logout → Redirect ke /login

### Consultation
- [ ] Gejala list terload dari API
- [ ] Progress bar update saat jawab
- [ ] Tombol submit disabled sampai semua dijawab
- [ ] Submit → Hasil diagnosis tampil
- [ ] Hasil disimpan ke sessionStorage

### History
- [ ] Riwayat terload dari API
- [ ] Statistik correct (total, berhasil, tidak jelas)
- [ ] Klik item → Lihat detail
- [ ] Tombol "Konsultasi Baru" berfungsi

### Navigation
- [ ] Dapat pindah halaman dengan router
- [ ] Tidak bisa akses protected route tanpa login
- [ ] Breadcrumb / back button berfungsi

---

## 7. Common Issues & Solutions

### 🔴 Token tidak tersimpan
```javascript
// Check
console.log(localStorage.getItem('token'))

// Solution: Clear & login ulang
localStorage.clear()
location.reload()
```

### 🔴 Blank page / tidak load
```javascript
// Check dev tools console untuk error
// Buka: F12 → Console → lihat error message

// Kemungkinan:
// 1. API tidak accessible
// 2. CORS issue
// 3. Token expired
// 4. JavaScript error
```

### 🔴 Buttons tidak berfungsi
```javascript
// Check apakah event listener teratasi
// Cek di Dev Tools → Elements → lihat event listeners

// Kemungkinan:
// 1. Component tidak mount
// 2. Function tidak define
// 3. Router tidak configure
```

### 🔴 Styling aneh / tidak load
```bash
# Clear Tailwind cache
npx tailwindcss purge

# Atau restart dev server
npm run dev
```

---

## 8. Useful Dev Commands

```bash
# Run dev server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview

# Clear dependencies
rm -r node_modules package-lock.json
npm install

# Check for errors
npm run lint (if configured)
```

---

## 9. File Structure Yang Penting

```
src/
├── api/
│   ├── http.js              ← HTTP client
│   ├── auth.js              ← Login/Register logic
│   └── consultation.js       ← Konsultasi logic
│
├── pages/
│   ├── Login.vue            ← Login page
│   ├── Registrasi.vue       ← Register page
│   ├── DashboardUser.vue    ← Dashboard
│   ├── Konsultasi.vue       ← Questionnaire
│   ├── Proses.vue           ← Results
│   ├── RiwayatKonsultasi.vue ← History
│   └── ProfileUser.vue      ← Profile
│
├── router/
│   └── index.js             ← Route configuration & auth guard
│
└── config/
    └── env.js               ← Environment config
```

---

## 10. Next Development

Fitur untuk ditambahkan:
- [ ] Edit Profile functionality
- [ ] Change Password
- [ ] Forgot Password flow
- [ ] Profile picture upload
- [ ] Export consultation as PDF
- [ ] Notification system
- [ ] Dark mode
- [ ] Offline mode
- [ ] Progressive Web App (PWA)

---

## 📞 Support

Jika ada masalah:
1. Check console untuk error messages
2. Lihat Network tab di Dev Tools
3. Verify API endpoint di `.env`
4. Check browser localStorage
5. Restart dev server
6. Clear cache & hard reload (Ctrl+Shift+R)

---

**Created:** November 2024  
**Last Updated:** November 2024  
**Status:** ✅ Production Ready
