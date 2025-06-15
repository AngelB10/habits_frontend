<template>
  <div class="card relative text-gray-300 w-[clamp(260px,80%,300px)] bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950  rounded-lg overflow-hidden transition-all group">
    <div class="px-6 py-2 ">
      <Ellipsis class="float-right m-2" @click="toggleMenu()"/>
      
      <div class="uppercase font-bold text-xl">
        {{ name }}
      </div>
      <div class="text-gray-300 uppercase tracking-widest flex items-center gap-2">
        {{ category }}
        <div
          :class="[iconColor, 'w-3 h-3 rounded-full border border-white']"
          title="Color de categoría"
        ></div>
        </div>
      <div class="text-gray-400 mt-4">
        <p>{{ description }}</p>
      </div>  
    </div>
    
    <div v-if="showMenu" class="absolute right-1 bottom-14 w-36 bg-gray-800 text-white rounded-md shadow-xl z-20">

        <button @click="functionEdit(id)" class="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
          <Pencil class="w-4 h-4" /> Editar
        </button>

        <button @click="functionDelete(id)" class="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
          <Trash2 class="w-4 h-4" /> Eliminar
        </button>

      </div>
      <div class="mt-4 flex items-center gap-2 p-4 ">
      <button
        @click="toggleComplete"
        :class="[
          'w-6 h-6 flex items-center justify-center rounded-full transition-all cursor-pointer',
          isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
        ]"
        title="Cambiar estado de cumplimiento"
      >
        <span v-if="isCompleted">✔️</span>
        <span v-else>❌</span>
      </button>
      <span class="text-sm text-gray-300">
        {{ isCompleted ? 'Completado' : 'No completado' }}
      </span>
      </div>
      <div class="bg-[#030013] w-full h-10 p-2 m-auto text-white text-center cursor-pointer hover:bg-[#0f101f] transition" @click="openHabitDetails()">
      <p class="text-sm font-semibold">ver más</p>
    </div>
     <HabitModal :habit="selectedHabit" :visible="showModal" :close="closeModal" />
     <div class="h-2 w-full bg-gradient-to-l via-green-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
    <div class="h-0.5 group-hover:w-full bg-gradient-to-l via-green-950 group-hover:via-green-500 w-[70%] m-auto transition-all"></div>

    </div>
</template>

<script setup>
import {ref} from 'vue'
import { Trash2, Pencil, Ellipsis, TrendingUp } from 'lucide-vue-next';
import HabitModal from '../../components/modals/HabitModal.vue'
import {useStoreHabit} from "../../store/habits.js"
import { object } from 'yup';
const storehabits = useStoreHabit()
let habits = ref()
const emit = defineEmits(["delete, edit"]);
const showMenu = ref(false)
const props = defineProps({
  id: [String, Number],
  data: Object,
  name: String,
  category: String,
  icon: String,
  progress: Number, 
  completed: Number,
  description: String,
  iconColor: {
    type: String,
    default: 'bg-orange-500'
  }
})

const functionDelete = (id) => {
  emit("delete", id);
};

const functionEdit = (id) => {
  emit("edit", id);
}

const toggleMenu = () => {
  console.log(props.id);
  
  showMenu.value = !showMenu.value
}

const isCompleted = ref(!!props.completed)

const toggleComplete = async () => {
  isCompleted.value = !isCompleted.value;
 if (isCompleted.value) {
    await storehabits.markHabitAsCompleted(props.id);
  }
};

const selectedHabit = ref(null) 

const showModal = ref(false)

const openHabitDetails = async () => {
  selectedHabit.value = props.data
  showModal.value = true;
}

function closeModal() {
  showModal.value = false
}




</script>
