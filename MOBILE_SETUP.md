# Mobile App - Setup & Deployment

## 🚀 Quick Start

### 1. Environment Configuration

Copy `.env.example` ke `.env.local`:

```bash
cp .env.example .env.local
```

Update `VITE_API_URL` dengan URL backend Anda:

```env
# For local development
VITE_API_URL=http://localhost/sp-faringitis/api/mobile

# For InfinityFree deployment
VITE_API_URL=https://yourdomain.infinityfree.app/sp-faringitis/api/mobile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Server

```bash
npm run dev
```

Akses via `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
mobile-app/
├── src/
│   ├── api/
│   │   ├── http.js                    # HTTP client base
│   │   └── mobile/
│   │       ├── auth.js                # Authentication API
│   │       ├── konsultasi.js          # Consultation API
│   │       └── profile.js             # Profile API
│   ├── pages/
│   │   ├── Login.vue                  # Login page
│   │   ├── Registrasi.vue             # Registration page
│   │   ├── DashboardUser.vue          # User dashboard
│   │   ├── Konsultasi.vue             # Consultation form
│   │   ├── Proses.vue                 # Consultation result
│   │   ├── ProfileUser.vue            # User profile
│   │   ├── RiwayatKonsultasi.vue      # Consultation history
│   │   └── EditProfile.vue            # Edit profile
│   ├── components/
│   ├── router/
│   │   └── index.js                   # Vue Router config
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .env.example                       # Environment template
├── .env.local                         # Local config (gitignore)
├── vite.config.js                     # Vite configuration
├── tailwind.config.js                 # Tailwind CSS config
└── package.json
```

---

## 🔐 Authentication Flow

### Auto Session Management

Session dikelola otomatis:
- Login → Session tersimpan di server (cookie)
- Request berikutnya → Cookie otomatis dikirim
- Logout → Session dihapus

**Kode:**
```javascript
// src/api/http.js - credentials: 'include' sudah set
const response = await fetch(url, {
  method: 'GET',
  credentials: 'include'  // Send cookies with requests
})
```

### Login Page (`src/pages/Login.vue`)

```javascript
import { login } from '@/api/mobile/auth.js'

const handleLogin = async () => {
  try {
    const user = await login(email, password)
    // Auto login → redirect to dashboard
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message
  }
}
```

Data user disimpan di localStorage untuk akses lokal:
```javascript
// src/api/mobile/auth.js
localStorage.setItem('user', JSON.stringify(response.data))
```

---

## 📝 Pages Overview

### 1. **Login.vue** 
- User login dengan email & password
- Redirect ke dashboard jika berhasil
- Validasi email & password required

### 2. **Registrasi.vue**
- User registration dengan validasi
- Password strength indicator
- Auto login setelah registrasi

### 3. **DashboardUser.vue**
- Home page dengan user greeting
- Stats: Total konsultasi, status akun
- Quick actions: Mulai konsultasi, lihat riwayat

### 4. **Konsultasi.vue**
- Form diagnosis dengan 8 gejala
- Radio button Ya/Tidak untuk tiap gejala
- Progress bar
- Submit → Call `/konsultasi.php?action=start`

### 5. **Proses.vue**
- Display hasil diagnosis
- Nama penyakit + deskripsi + solusi
- List gejala yang dipilih (jawab ya)
- Buttons: Riwayat, Konsultasi Baru

### 6. **RiwayatKonsultasi.vue**
- List semua konsultasi user
- Tanggal, penyakit, status
- Click → View detail hasil

### 7. **ProfileUser.vue**
- User profile info
- Stats: Total konsultasi
- Buttons: Edit, Ganti Password, Logout

---

## 🌐 API Integration Points

### Available API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/auth.php?action=login` | ❌ | Login |
| POST | `/auth.php?action=register` | ❌ | Register |
| POST | `/auth.php?action=logout` | ✅ | Logout |
| GET | `/auth.php?action=me` | ✅ | Get current user |
| GET | `/gejala.php` | ❌ | List symptoms |
| POST | `/konsultasi.php?action=start` | ✅ | Submit consultation |
| GET | `/konsultasi.php?action=history` | ✅ | Get history |
| GET | `/konsultasi.php?action=result&id=X` | ✅ | Get result |
| GET | `/profile.php?action=get` | ✅ | Get profile |
| PUT | `/profile.php?action=update` | ✅ | Update profile |
| POST | `/profile.php?action=change_password` | ✅ | Change password |

---

## ✅ Production Checklist

### Before Deployment:

- [ ] Update `.env.local` dengan production URL
- [ ] Set `VITE_API_URL` ke domain InfinityFree
- [ ] Run `npm run build`
- [ ] Test login/register flow
- [ ] Test consultation flow end-to-end
- [ ] Test profile update
- [ ] Check CORS headers (should work)
- [ ] Verify session persistence
- [ ] Test on mobile browser

### InfinityFree Deployment:

1. **Upload Files:**
   - Build output (`dist/`) ke public folder
   - Or use GitHub Actions for auto-deploy

2. **Configure Base URL:**
   - Update `.env` sesuai InfinityFree domain
   - Example: `https://faringitis.infinityfree.app/sp-faringitis/api/mobile`

3. **Test Connectivity:**
   ```bash
   curl https://yourdomain.infinityfree.app/sp-faringitis/api/mobile/gejala.php
   ```

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution:**
- Backend `_mobile_init.php` sudah set CORS headers
- Pastikan API URL benar di `.env.local`
- Clear browser cache

### Issue: Session Not Persisting
**Solution:**
- Cookies harus enable di browser
- Backend session must be configured correctly
- Check `credentials: 'include'` di http.js

### Issue: Login Works, But API Calls Fail
**Solution:**
- Verify session is created (check browser cookies)
- Ensure `require_user_login()` middleware di backend
- Check user role is 'user'

### Issue: Build Fails
**Solution:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📱 Mobile Browser Testing

### Test Locally:
```bash
npm run dev
# Open on mobile using local network IP:
# http://192.168.1.X:5173
```

### Debug in Browser:
- Open DevTools (F12)
- Check Network tab for API calls
- Check Console for errors
- Check Storage tab for localStorage

---

## 🔄 Updating API Services

When backend API changes:

1. Update relevant file in `src/api/mobile/`
2. Update function parameters/return types
3. Test with all dependent pages
4. Update this documentation

Example: Update auth.js
```javascript
// src/api/mobile/auth.js
export async function login(email, password) {
  const response = await post('/auth.php?action=login', {
    email,
    password
  })
  // ... handle response
}
```

---

## 📚 Related Documentation

- Backend API: `/sp-faringitis/api/mobile/README_MOBILE_API.md`
- Architecture: See mobile-app README
- Vue.js: https://vuejs.org
- Vite: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com

