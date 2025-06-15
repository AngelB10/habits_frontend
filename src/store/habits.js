import { defineStore } from 'pinia'
import {requestAxios} from "../services/api.js"
import { toast } from 'vue3-toastify'
import {ref} from "vue"

export const useStoreHabit = defineStore('habitStore', () => {
   const habitToEdit = ref(null)
    async function newHabit(data) {
        console.log(data);
      try {
             return await requestAxios.post(`/habits`,data);
            } catch (error) {
            console.log(error.response.data);
          }
      }

    async function listHabit() {
        try {
          const response = await requestAxios.get(`/habits`);
          return response
          } catch (error) {
            console.log(error.response.data);
          }
      }
  async function deleteHabit(id) {
    try {
      const response = await requestAxios.delete(`/habits/${id}`);
      toast.success('Habito eliminada correctamente')
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el Habito:', error);
      return error;
    }
  }
  async function updateHabit(id, data) {
    try {
      const response = await requestAxios.put(`/habits/${id}`, data)
      toast.success('Hábito editado correctamente')
      return response.data
    } catch (error) {
      console.error('Error al actualizar el hábito:', error)
      return error
    }
  }

  async function markHabitAsCompleted(id) {
  try {
    const response = await requestAxios.post(`/habits/${id}/complete`);
    toast.success('Hábito marcado como completado');
    return response.data;
  } catch (error) {
    console.error('Error al completar el hábito:', error);
    toast.error('Error al marcar como completado');
    return error;
  }
}

  async function toggleSubitem(id) {
  try {
    const response = await requestAxios.put(`/subitems/${id}/toggle`);
    toast.success("Estado del subitem actualizado");
    return response.data;
  } catch (error) {
    console.error("Error al actualizar subitem:", error);
    toast.error("Error al actualizar el estado del subitem");
  }
}

    function setHabitToEdit(habit) {
    habitToEdit.value = habit
  }

  function clearHabitToEdit() {
    habitToEdit.value = null
  }


    return { habitToEdit, newHabit, listHabit, deleteHabit, updateHabit,setHabitToEdit,clearHabitToEdit, markHabitAsCompleted, toggleSubitem}
  },
  {
    persist: true,
  }
  );