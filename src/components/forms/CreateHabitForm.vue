<template>
  <div class="w-[80%]">
    <div v-if="step === 1">
      <h2>1. Elige una categoría</h2>
      <h2 class="text-xl font-bold mt-8">Selecciona una categoría</h2>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div v-for="cat in categories" :key="cat.id" @click="habit.category_id = cat.id" :class="[
          'cursor-pointer p-4 rounded-lg border shadow transition-all duration-200',
          habit.category_id === cat.id
            ? 'bg-blue-500 text-white border-blue-700'
            : 'bg-white hover:bg-gray-100 border-gray-300'
        ]"
      >
        <h3 class="font-semibold text-black">{{ cat.name }}</h3>
        <p class="text-sm text-gray-600">{{ cat.description }}</p>
      </div>
    </div>
      <button  class="mt-10 bg-green-700 rounded-[10px] p-2 cursor-pointer" @click="nextStep" :disabled="!habit.category_id">Siguiente </button> 
    </div>
 <div v-else-if="step === 2" class="p-4">
  <h2 class="text-xl font-bold mb-6">2. Información del hábito</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="block mb-1 font-medium">Nombre</label>
      <input class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="habit.name" placeholder="Nombre del hábito"
        required/>
    </div>
    <div>
      <label class="block mb-1 font-medium">Tipo</label>
      <select class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="habit.type">
        <option value="diaria">Diaria</option>
        <option value="semanal">Semanal</option>
        <option value="mensual">Mensual</option>
        <option value="anual">Anual</option>
        <option value="única">Única</option>
        <option value="recurrente">Recurrente</option>
      </select>
    </div>

    <!-- Frecuencia -->
    <div>
      <label class="block mb-1 font-medium">Frecuencia</label>
      <input type="number" min="1" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="habit.frequency"
        placeholder="Número de veces"/>
    </div>
    <!-- Meta -->
    <div>
      <label class="block mb-1 font-medium">Meta (opcional)</label>
      <input type="number" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="habit.target" placeholder="Ej: 30 repeticiones"
      />
    </div>
    <!-- Descripción (ocupa toda la fila) -->
    <div class="md:col-span-2">
      <label class="block mb-1 font-medium">Descripción</label>
      <textarea class="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="habit.description" placeholder="Describe tu hábito"
      ></textarea>
    </div>
  </div>
     <div class="md:col-span-2 mt-4">
      <label class="block mb-1 font-medium">Subtareas  (opcional)</label>
      <div v-for="(item, index) in habit.subItems" :key="index" class="flex items-center mb-2 gap-2">
        <input type="text" v-model="habit.subItems[index].title" class="flex-1 p-2 border rounded-md" placeholder="Título de la subtarea"/>
        <button @click="habit.subItems.splice(index, 1)" class="text-red-600">Eliminar</button>
      </div>
      <button @click="habit.subItems.push({ title: '', done: false })" class="mt-2 text-blue-600">+ Agregar subtarea</button>
    </div>
  <!-- Botones -->
  <div class="mt-8 flex justify-between">
    <button class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition" @click="prevStep" >
      Atrás
    </button>

    <button class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition" @click="nextStep" :disabled="!habit.name || !habit.type"    >
      Siguiente
    </button>
  </div>
</div>

<div v-else-if="step === 3" class="p-4">
  <h2 class="text-xl font-bold mb-6">3. Fechas y horario</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Fecha de inicio -->
    <div>
      <label class="block mb-1 font-medium">Fecha de inicio</label>
      <input type="date" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="habit.start_date" required/>
    </div>
    <!-- Fecha de fin -->
    <div>
      <label class="block mb-1 font-medium">Fecha de fin  (opcional)</label>
      <input type="date" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="habit.end_date"  required   :min="habit.start_date"/>
    </div>
    <!-- Hora -->
    <div class="md:col-span-2">
      <label class="block mb-1 font-medium">Hora (opcional)</label>
      <input type="time" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="habit.time"/>
    </div>
    <!-- Días de la semana (si aplica) -->
    <div v-if="habit.type === 'semanal' || habit.type === 'recurrente'" class="md:col-span-2">
      <label class="block mb-2 font-medium">Días de la semana</label>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <div v-for="day in days" :key="day" class="flex items-center">
          <input type="checkbox" :id="`day-${day}`" :value="day" v-model="habit.days_of_week" class="mr-2"/>
          <label :for="`day-${day}`" class="capitalize">{{ day }}</label>
        </div>
      </div>
    </div>
  </div>

  <!-- Botones -->
  <div class="mt-8 flex justify-between">
    <button class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition" @click="prevStep">
      Atrás
    </button>

    <button class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition" @click="submitForm" :disabled="!habit.start_date ">
      Guardar hábito
    </button>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useStoreHabit } from "../../store/habits.js"
import { useStoreCategory } from "../../store/category.js"
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
const storeCategory = useStoreCategory()
const storeHabit = useStoreHabit()

const step = ref(1)
const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
let categories = ref([])

const resetHabit = () => {
  Object.assign(habit, {
    subItems: [],
    name: '',
    description: '',
    type: 'diaria',
    frequency: 1,
    days_of_week: [],
    start_date: '',
    end_date: '',
    time: '',
    category_id: null,
    target: null,
  })
}

const habit = reactive({
  subItems: [],
  name: '',
  description: '',
  type: 'diaria',
  frequency: 1,
  days_of_week: [],
  start_date: '',
  end_date: '',
  time: '',
  category_id: null,
  target: null,
})

const getCategory = async () => {
  const res = await storeCategory.listCategory()
  if (res.status < 299) {
    categories.value = res.data
  }
}

const nextStep = () => step.value++
const prevStep = () => step.value--

const submitForm = async () => {
  try {
    const payload = {
      ...habit,
      days_of_week: habit.days_of_week,
    }

    if (storeHabit.habitToEdit) {
      await storeHabit.updateHabit(habit.id, payload)
      toast.success('Has editado un hábito exitosamente')
    } else {
      await storeHabit.newHabit(payload)
      toast.success('Has creado un hábito exitosamente')
      resetHabit() 
      step.value = 1 
    }

    storeHabit.clearHabitToEdit()
    router.push('/habits')

  } catch (err) {
    console.error(err)
    toast.error('Hubo un error al crear el hábito')
  }
}

onMounted(() => {
  getCategory()
  step.value = 1   
  if (storeHabit.habitToEdit) {
    Object.assign(habit, storeHabit.habitToEdit)
  } else {
    resetHabit()
  }
})

onBeforeRouteLeave(() => {
  storeHabit.habitToEdit = null
})
</script>
