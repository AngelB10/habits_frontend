<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-2xl m-auto bg-[#01040e]">
    <h1 class=" font-bold mb-4">Iniciar sesión</h1>
    <AuthForm mode="login" @submit="handleLogin" />
    <router-link to="/register" class="p-4 cursor-pointer">Crear cuenta</router-link>
    <div class="mt-10">
       <img src="https://www.leanquality.com.br/wp-content/uploads/2022/01/Gestao-de-Metas-OKR.jpg" alt="Logo" class="w-20 h-20 rounded-full " />
    </div>
  </div>
</template>

<script setup>
import { useStoreAuth } from '../store/Auth.js'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import AuthForm from '@/components/forms/AuthForm.vue'

const storeLogin = useStoreAuth()
const router = useRouter()


const handleLogin = async (data) => {
  try {
    const userLogin = await storeLogin.login(data)
    if (userLogin.status && userLogin.status < 299) {
      toast.success('Has iniciado sesión correctamente')
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } 
     else {
      toast.error('Registro fallido');
    }
  } catch (error) {
    toast.error('Inicio de sesión fallido datos incorrectos')
    console.error(error)
  }
}


</script>

