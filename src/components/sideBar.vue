<template>
  <aside class="w-80 h-screen bg-[#0f131b] text-white flex flex-col justify-between p-4">
    <div>
      <div class="flex items-center gap-2 mb-8">
        <img src="https://www.leanquality.com.br/wp-content/uploads/2022/01/Gestao-de-Metas-OKR.jpg" alt="Logo" class="w-10 h-10 rounded-3xl" />
        <h1 class=" font-bold">TATAKAE</h1>
      </div>

      <div class="mb-6 bg-[#030013] rounded-2xl p-6">
        <p class="text-xs text-gray-400">{{ currentDate  }}</p>
        <p class="font-semibold">Welcome back,<br />{{ infoUser.name }}!</p>
      </div>

      <nav class="space-y-1 mb-6 bg-[#030013] rounded-2xl p-6">
        <router-link v-for="(link, i) in links" :key="i":to="link.to" class="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
        :class="{ 'bg-gray-700 font-semibold': router.path === link.to }">
        <component :is="link.icon" class="w-5 h-5" />
        <span>{{ link.label }}</span>
      </router-link>
      </nav>
    </div>

    <div class="bg-blue-800 text-white text-center p-6 rounded-lg cursor-pointer hover:bg-blue-900 transition" @click="logOut()">
      <p class="text-sm font-semibold">Cerrar sesión</p>
    </div>
  </aside>
</template>

<script setup>
import { useStoreAuth } from '../store/Auth.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {Grid, Brain, ListTodo, Folder , BarChart3} from 'lucide-vue-next'

const router = useRouter()
const storeLogin = useStoreAuth()
const currentDate = ref('')
let infoUser = ref(storeLogin.user)

function getFormattedDate() {
  const now = new Date()
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }
  return now.toLocaleDateString('es-CO', options).toUpperCase()
}


const links = [
  { icon: Grid, label: 'Dashboard', to: '/dashboard' },
  { icon: Brain, label: 'Hábitos', to: '/habits' },
  { icon: ListTodo, label: 'Tareas', to: '/tasks' },
  { icon: Folder , label: 'Categorías', to: '/category' },
  { icon: BarChart3, label: 'Reports', to: '/reports' }
]

 function logOut() {
    storeLogin.logout()
    router.push('/')
 }

onMounted(() => {
  currentDate.value = getFormattedDate()
})
</script>
