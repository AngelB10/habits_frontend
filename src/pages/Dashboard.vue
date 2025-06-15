<template>
 <div>
   <h2 class="pb-2">Tus habitos</h2> 
   <p class="p-1">Today</p>
   <div class="card">
      <HabitCard
      v-for="habit in habits"
      :key="habit.id"
      :name="habit.name"
      :category="habit.category"
      :reward="habit.reward"
      :description="habit.description"
      :iconColor="habit.iconColor"
    />
   </div>
 </div>
</template>

<script setup>
import { useStoreAuth } from '../store/Auth.js'
import {ref} from 'vue'
import HabitCard from '../components/cards/HabitCard.vue'

const storeLogin = useStoreAuth()
let infoUser = ref(storeLogin.user)

</script>