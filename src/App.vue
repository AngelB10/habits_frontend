<template>
  <div class="flex h-screen">
  <Sidebar v-if="isLoggedIn && !route.meta.hideSidebar" />
   <main class="flex-1 overflow-auto p-10">
       <router-view></router-view> 
   </main>
  </div>
</template>

<script setup>
import Sidebar from './components/sideBar.vue'
import { useStoreAuth } from './store/Auth.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

const store = useStoreAuth()

const isLoggedIn = computed(() => store.user !== null)

</script>