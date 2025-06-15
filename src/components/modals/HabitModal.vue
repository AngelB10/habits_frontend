<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-gray-900 text-white p-6 rounded-lg w-[90%] max-w-lg shadow-xl">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Detalles del Hábito</h2>
        <button @click="close" class="text-red-400 hover:text-red-600 text-2xl">&times;</button>
      </div>

      <div>
        <p><strong>Nombre:</strong> {{ habit.name }}</p>
        <p><strong>Descripción:</strong> {{ habit.description }}</p>
        <p><strong>Tipo:</strong> {{ habit.type }}</p>
        <p><strong>Frecuencia:</strong> {{ habit.frequency }}</p>
        <p><strong>Días de la semana:</strong> {{ habit.days_of_week?.join(', ') || 'No aplica' }}</p>
        <p><strong>Fecha de inicio:</strong> {{ habit.start_date }}</p>
        <p><strong>Fecha de fin:</strong> {{ habit.end_date || 'Sin fecha de fin' }}</p>
        <p><strong>Objetivo:</strong> {{ habit.target || 'Sin objetivo' }}</p>
        <p><strong>Progreso:</strong> {{ habit.progress }}%</p>

        <div class="mt-4">
          <h3 class="text-lg font-semibold">Categoría</h3>
          <p><strong>Nombre:</strong> {{ habit.category?.name }}</p>
          <p><strong>Descripción:</strong> {{ habit.category?.description }}</p>
        </div>

      <div class="mt-4">
        <h3 class="text-lg font-semibold">Subtareas</h3>
        <ul v-if="habit.sub_items && habit.sub_items.length">
          <li
            v-for="(item, index) in habit.sub_items"
            :key="item.id"
            class="flex items-center gap-2 text-sm mt-1"
          >
            <span>{{ index + 1 }}. {{ item.title }}</span>
            <span :class="item.done ? 'text-green-400' : 'text-yellow-400'">
              {{ item.done ? 'Completado' : 'Pendiente' }}
            </span>
        <div class="flex items-center p-2">
        <button
          @click="toggleCompleteSubitem(item)"
          :class="[
            'w-6 h-6 flex items-center justify-center rounded-full transition-all cursor-pointer',
            item.done ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
          ]"
          title="Cambiar estado de cumplimiento"
        >
          <span v-if="item.done">✔️</span>
          <span v-else>❌</span>
        </button>
      </div>
          </li>
        </ul>
        <p v-else class="text-sm text-gray-400">No hay subtareas</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useStoreHabit} from "../../store/habits.js"
const storehabits = useStoreHabit()
const props = defineProps({
  habit: Object,
  visible: Boolean,
  close: Function
});


const toggleCompleteSubitem = async (item) => {
  console.log(item.id);
  
  const res = await storehabits.toggleSubitem(item.id);
  console.log(res);
  
  if (res?.subitem) {
    item.done = res.subitem.done; // actualiza en el frontend
  }

};


</script>

<style scoped>
/* Puedes agregar animaciones o estilos personalizados aquí si deseas */
</style>
