import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../api/auth.js'
import DashboardUser from '../pages/DashboardUser.vue'
import Konsultasi from '../pages/Konsultasi.vue'
import Proses from '../pages/Proses.vue'
import RiwayatKonsultasi from '../pages/RiwayatKonsultasi.vue'
import Login from '../pages/Login.vue'
import ForgotPass from '../pages/ForgotPass.vue'
import ProfileUser from '../pages/ProfileUser.vue'
import Registrasi from '../pages/Registrasi.vue'
import EditProfile from '../pages/EditProfile.vue'

const routes = [
  { path: '/', name: 'dashboard', component: DashboardUser, meta: { requiresAuth: true } },
  { path: '/konsultasi', name: 'konsultasi', component: Konsultasi, meta: { requiresAuth: true } },
  { path: '/hasil', name: 'Proses', component: Proses, meta: { requiresAuth: true } },
  { path: '/riwayat', name: 'HasilKonsultasi', component: RiwayatKonsultasi, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: ProfileUser, meta: { requiresAuth: true } },
  { path: '/editprofile', name: 'EditProfile', component: EditProfile, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login, meta: { requiresAuth: false } },
  { path: '/register', name: 'Daftar', component: Registrasi, meta: { requiresAuth: false } },
  { path: '/forgot', name: 'ForgotPass', component: ForgotPass, meta: { requiresAuth: false } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Authentication Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuth = isAuthenticated()

  if (requiresAuth && !isAuth) {
    // Redirect to login if not authenticated
    next('/login')
  } else if (!requiresAuth && isAuth && (to.path === '/login' || to.path === '/regist')) {
    // Redirect to dashboard if already authenticated
    next('/')
  } else {
    next()
  }
})

export default router
