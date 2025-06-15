<template>
  <div class="w-full max-w-sm space-y-4">
    <form @submit.prevent="handleSubmit()">
      <div class="p-2"> 
        <input v-show="props.mode === 'mode'" v-model="name" type="text" placeholder="Nombre" autocomplete="on" class="border p-2 rounded w-full"/>
      </div>
      <div class="p-2">
        <input v-model="email" type="email" placeholder="Email" autocomplete="on" class="border p-2 rounded w-full"/>
      </div>
      <div class="p-2">
        <input v-model="password" name="password" placeholder="Password" autocomplete="on" type="password" class="border p-2 rounded w-full"/>
      </div>
      <button type="submit" :class="['w-full text-white pt-4 rounded', mode === 'register' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700']">
        {{ mode === 'register' ? 'Registrarse' : 'Entrar' }}
      </button> 
     <p v-show="showPError" class="text-red-500 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { toast } from 'vue3-toastify'
const props = defineProps({
  mode: {
    type: String,
    default: 'login' // o 'register'
  }
})
const emit = defineEmits(['submit'])
let name = ref("")
let email = ref("")
let password = ref("")
let error = ref("")
let showPError = ref(false)

function handleSubmit() {
  toast.success('Sus datos se estan validando, espere unos minutos')
  error.value = ""
  showPError.value = false

  const isRegister = props.mode === 'register'
  const isNameEmpty = isRegister && !name.value.trim()
  const isEmailEmpty = !email.value.trim()
  const isPasswordEmpty = !password.value.trim()

  if (
    (isRegister && !name.value.trim() && !email.value.trim() && !password.value.trim()) ||
    (!isRegister && !email.value.trim() && !password.value.trim())
  ) {
    error.value = 'Por favor, llena todos los campos'
    showPError.value = true
  } else if (isNameEmpty) {
    error.value = 'El nombre es requerido'
    showPError.value = true
  } else if (isEmailEmpty) {
    error.value = 'El email es requerido'
    showPError.value = true
  } else if (isPasswordEmpty) {
    error.value = 'La contraseña es requerida'
    showPError.value = true
  }
   else if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    showPError.value = true
  }

  if (showPError.value) {
    setTimeout(() => {
      showPError.value = false
      error.value = ''
    }, 2500)
    return
  }


  emit('submit', {
    ...(props.mode === 'register' && { name: name.value }),
    email: email.value,
    password: password.value
  })
}
</script>