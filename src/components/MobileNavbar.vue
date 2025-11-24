<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm flex justify-around items-center py-2 text-sm"
  >
    <!-- Dashboard -->
    <router-link
      to="/"
      class="flex flex-col items-center"
      :class="isActive('/') ? 'text-indigo-600' : 'text-gray-500'"
    >
      <span class="text-xl">🏠</span>
      <span>Dashboard</span>
    </router-link>

    <!-- Konsultasi -->
    <router-link
      to="/konsultasi"
      class="flex flex-col items-center"
      :class="isActive('/konsultasi') ? 'text-indigo-600' : 'text-gray-500'"
    >
      <span class="text-xl">💬</span>
      <span>Konsultasi</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path) => route.path === path
</script>

<style scoped>
nav {
  z-index: 50;
}
</style>
