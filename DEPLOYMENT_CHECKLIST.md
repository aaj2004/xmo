# ✅ DEPLOYMENT CHECKLIST - Vercel

## Pre-Deployment

### Environment Check
- [x] `.env.local` updated: `VITE_API_URL=https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile`
- [x] `vercel.json` created (for SPA routing)
- [x] `.gitignore` configured properly
- [x] `http.js` updated with correct comments

### Backend Verification
```bash
# Test backend endpoint
curl https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile/gejala.php
# Expected: {"success":true,"message":"Symptoms list retrieved","data":[...]}
```

### Local Build Test
```bash
# Build locally to verify
npm run build

# Preview build
npx vite preview
# Should work at: http://localhost:4173
# Test: Login → Register → Konsultasi
```

## Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Mobile app - ready for Vercel deployment"
git remote add origin https://github.com/YOUR_USERNAME/hibah-faringitis-mobile.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel
1. Go: https://vercel.com
2. New Project → Import Git Repository
3. Select: `hibah-faringitis-mobile`
4. Click: Import

### Step 3: Configure Environment
1. Settings → Environment Variables
2. Add:
   ```
   Name: VITE_API_URL
   Value: https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile
   ```
3. Save

### Step 4: Deploy
1. Click: Deploy
2. Wait: 1-2 minutes
3. Get URL: `https://your-project.vercel.app`

## Post-Deployment

### Verify Working
- [ ] Frontend loads: `https://your-project.vercel.app`
- [ ] Login page displays
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Dashboard shows correctly
- [ ] Can submit consultation
- [ ] Can view results
- [ ] Can view history
- [ ] Profile works
- [ ] Logout works

### Monitor
- Check browser console for errors
- Check Vercel deployment logs
- Monitor API response times
- Check database logs on blueviolet-dinosaur-678797.hostingersite.com

## Files Changed

```
✅ .env.local                    - Updated API URL
✅ .env.example                  - Updated with production example
✅ src/api/http.js              - Updated comments
✅ vercel.json                   - Created for SPA routing
```

## Status

🚀 **Ready for Deployment!**

All files are configured correctly:
- Environment variables set
- SPA routing configured
- Backend URL pointing to blueviolet-dinosaur-678797.hostingersite.com
- Build configuration ready
