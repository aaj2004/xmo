# Integrasi API blueviolet-dinosaur-678797.hostingersite.com

## Konfigurasi

Base URL: `https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile`

## Authentication

Semua request ke endpoint yang memerlukan authentication harus mengirimkan `token` di parameter atau header.

Token disimpan di `localStorage` setelah login berhasil.

## Available Services

### Auth Service (`src/api/auth.js`)

- **login(email, password)** - Login user
- **register(userData)** - Register user baru
- **getCurrentUser()** - Ambil info user saat ini
- **updateProfile(userData)** - Update profil user
- **logout()** - Logout dan hapus token
- **isAuthenticated()** - Check apakah user sudah login
- **getStoredUser()** - Ambil data user dari localStorage
- **getToken()** - Ambil token dari localStorage

### Consultation Service (`src/api/consultation.js`)

- **startConsultation(symptoms)** - Mulai konsultasi baru
- **getConsultationResult(consultationId)** - Ambil hasil konsultasi
- **getConsultationHistory()** - Ambil riwayat konsultasi
- **getSymptoms()** - Ambil daftar gejala
- **getDiseases()** - Ambil daftar penyakit
- **saveConsultation(consultationData)** - Simpan konsultasi

### HTTP Client (`src/api/http.js`)

- **get(endpoint, params)** - HTTP GET request
- **post(endpoint, data)** - HTTP POST request
- **put(endpoint, data)** - HTTP PUT request
- **del(endpoint)** - HTTP DELETE request

## Usage Example

```javascript
import { login, logout, isAuthenticated } from '@/api/auth'
import { startConsultation, getConsultationHistory } from '@/api/consultation'

// Login
const user = await login('user@example.com', 'password')

// Check authentication
if (isAuthenticated()) {
  // Get consultation history
  const history = await getConsultationHistory()
  
  // Start new consultation
  const result = await startConsultation(['gejala1', 'gejala2'])
}

// Logout
logout()
```

## Response Format

Semua response dari API mengikuti format:

```json
{
  "success": true/false,
  "message": "Status message",
  "data": { ... }
}
```

## Error Handling

Semua service functions menampilkan error melalui console.error dan throw Exception.

Tangani di component dengan try-catch:

```javascript
try {
  const result = await login(email, password)
} catch (error) {
  console.error('Login failed:', error.message)
  // Show error to user
}
```

## Development vs Production

### Development (.env)
```
VITE_API_URL=http://localhost:8000/api/mobile
VITE_DEBUG=true
```

### Production (.env.production)
```
VITE_API_URL=https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile
VITE_DEBUG=false
```
