<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-2xl">
    <h1 class="font-bold mb-4">Registro</h1>
    <AuthForm mode="register" @submit="handleRegister" />
    <router-link to="/" class="p-4 cursor-pointer">Iniciar sesión</router-link>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStoreAuth } from '../store/Auth.js'
import { toast } from 'vue3-toastify'
import AuthForm from '@/components/forms/AuthForm.vue'

const storeRegister = useStoreAuth()
const router = useRouter()

const handleRegister = async (data) => {
  data.password_confirmation = data.password
  const userRegister = await storeRegister.newUsers(data);
  if(userRegister.status < 299){
    toast.success('Se registró exitosamente')
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
  else{
    toast.error('Registro fallido')
  }

};

</script>