# Sistem Pakar Diagnosis - Mobile App

Mobile application untuk diagnosa kesehatan berbasis AI menggunakan Vue 3 + Vite, terintegrasi dengan API emrest.ct.ws.

## Features

✅ **Authentication**
- Login & Register
- Token-based authentication
- Protected routes

✅ **User Management**
- View profile
- Edit profile (coming soon)
- Change password (coming soon)
- Logout

✅ **Consultation**
- Dynamic symptoms questionnaire
- Real-time diagnosis processing
- Consultation history
- Detailed results with recommendations

✅ **UI/UX**
- Modern gradient design
- Responsive mobile-first layout
- Loading states
- Error handling

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env if needed

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/              # API services
│   ├── http.js       # HTTP client
│   ├── auth.js       # Authentication
│   └── consultation.js # Consultation operations
├── pages/            # Vue components (pages)
│   ├── Login.vue
│   ├── Registrasi.vue
│   ├── DashboardUser.vue
│   ├── Konsultasi.vue
│   ├── Proses.vue
│   └── ...
├── components/       # Reusable components
├── router/           # Vue Router config
├── config/           # App configuration
├── App.vue
└── main.js
```

## Configuration

Edit `.env` untuk mengubah API endpoint:

```env
VITE_API_URL=http://emrest.ct.ws/api
VITE_DEBUG=false
```

## API Integration

Aplikasi terintegrasi dengan emrest.ct.ws API. Lihat `API_INTEGRATION.md` untuk dokumentasi lengkap endpoint.

## Authentication Flow

```
1. User belum login → Redirect ke /login
2. User login → Token & user data disimpan ke localStorage
3. User dapat akses dashboard & konsultasi
4. User logout → Clear token & redirect ke /login
```

## Consultation Flow

```
1. User klik "Mulai Konsultasi"
2. Fill questionnaire dengan jawab Ya/Tidak
3. Submit → Proses diagnosis
4. View hasil diagnosis dengan rekomendasi
5. Opsi: save to history, konsultasi baru, atau kembali
```

## Key Technologies

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Vue Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS
- **Fetch API** - Native HTTP requests

## Documentation

- `IMPLEMENTATION.md` - Detailed implementation flow
- `API_INTEGRATION.md` - API documentation
- `.env.example` - Environment configuration

## Development

### Debug Mode

Set `VITE_DEBUG=true` di `.env` untuk verbose logging:

```javascript
import ENV from '@/config/env.js'

if (ENV.DEBUG_MODE) {
  console.log('Debug info...') 
}
```

### Common Tasks

```bash
# Format code
npm run lint

# Type checking (if using TypeScript)
npm run type-check

# Run tests (if configured)
npm run test
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Optimization

- Code splitting via Vue Router
- Component lazy loading
- Image optimization
- CSS minification via Tailwind
- API response caching (future)

## Troubleshooting

### Blank page after login
- Clear localStorage: `localStorage.clear()`
- Check browser console for errors
- Verify token is saved: `localStorage.getItem('token')`

### API not responding
- Verify emrest.ct.ws is accessible
- Check VITE_API_URL in .env
- Check browser Network tab for CORS issues

### Styling issues
- Rebuild Tailwind: `npm run build`
- Clear `.next` folder if exists
- Restart dev server

## License

Private - Not for public distribution

## Support

For issues & questions, contact the development team.

---

Last Updated: November 2024

