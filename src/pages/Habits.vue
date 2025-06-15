<template>
    <div>
     <div class="flex justify-between items-center py-8">
     <h2> Habitos </h2>
     <div>
      <router-link to="/habitsForm">
        <Button nameButton="CREA UN HABITO" />
      </router-link>
     </div>
     </div>
     <div v-show="res == null" class="text-center justify-center content-center py-52 ">
      <h2>No hay habitos registrados</h2>
     </div>
     <div class="flex gap-4">
      <HabitCard v-for="habit in habits"
        :key="habit.id"
        :id="habit.id"
        :name="habit.name"
        :category="habit.category.name"
        :description="habit.description"
        :iconColor="getColorByCategory(habit.category.name)"
        :progress="habit.progress"
        :completed="habit.completed"
        @delete="deleteHabits"
        @edit="goInfo"
        :data="habit"
         />
    </div>
    
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import Button from "../components/button.vue" 
import HabitCard from "../components/cards/HabitCard.vue";
import {useStoreHabit} from "../store/habits.js"
import {sweetDelete} from "../services/notify.js"
import { useRouter } from 'vue-router'


const router = useRouter()
const storehabits = useStoreHabit()
let res = ref()
let habits = ref()




const getHabits = async () => {
res.value = await storehabits.listHabit();
if (res.value.status < 299) {
  habits.value = res.value.data  
}
}

const goInfo = async (id) => {
  const habit = habits.value.find(h => h.id === id)
  console.log(habit);
  
  if (habit) {
    storehabits.setHabitToEdit(habit) 
    router.push('/habitsForm')       
  }
}

const deleteHabits = async (id) => {
const TextDele = "el habito"
let dataName = ""
habits.value.forEach(element => {
  if (element.id == id) {
   dataName = element.name
  }
  
});

sweetDelete( TextDele, dataName, async () => { 
try { 
 const habitDelete = await storehabits.deleteHabit(id);
  getHabits(); 
} catch (error) {
  console.error("Error al eliminar el habito:", error); 
}})
}

const getColorByCategory = (category) => {
  switch (category.toLowerCase()) {
    case 'salud':
      return 'bg-green-600';
    case 'productividad':
      return 'bg-blue-600';
    case 'personal':
      return 'bg-purple-600';
    default:
      return 'bg-orange-600';
  }
}

onMounted(async () => {
  getHabits()
})

</script>