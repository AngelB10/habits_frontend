<template>
  <div class="p-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Tus Categorías</h2>
      <div class="w-65">
        <Button nameButton="CREA UNA CATEGORÍA" @click="openModal" />
      </div>
    </div>
    <ul class="mt-10">
      <li
        v-for="cat in categories"
        :key="cat.id"
        class="flex justify-between items-center bg-gray-100 p-4 text-black rounded-xl mb-3 shadow-md"
      >
        <div>
          <strong>{{ cat.name }}</strong><br />
          <small>{{ cat.description }}</small>
        </div>
        <div class="flex gap-2">

          <button @click="deleteCategory(cat.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">
            Eliminar
          </button>
        </div>
      </li>
    </ul>

    <!-- Modal -->
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white text-black rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative animate-fade-in">
        <h3 class="text-xl font-semibold mb-4">{{ editing ? 'Editar Categoría' : 'Nueva Categoría' }}</h3>
        <form @submit.prevent="postProduct" class="space-y-4">
        <label for="">nombre</label>
          <input
            v-model="form.name"
            placeholder="Nombre"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <label for="">description</label>
          <textarea
            v-model="form.description"
            placeholder="Descripción"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded bg-red-400 hover:bg-gray-300 text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 text-sm"
            >
              {{ editing ? 'Actualizar' : 'Crear' }}
            </button>
          </div>
        </form>

        <button
          @click="closeModal"
          class="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useStoreCategory } from "../store/category.js"
import Button from "../components/button.vue"
import { sweetDelete } from "../services/notify.js"

const storeCategory = useStoreCategory()
const categories = ref([])
const visible = ref(false)

const form = ref({
  name: '',
  description: ''
})

const editing = ref(false)
const editId = ref(null)

const getCategory = async () => {
  const res = await storeCategory.listCategory()
  if (res?.status < 299) {
    categories.value = res.data
  }
}

const deleteCategory = async (id) => {
  const category = categories.value.find(c => c.id === id)
  if (!category) return

  sweetDelete("la Categoría", category.name, async () => {
    await storeCategory.deleteCategory(id)
    getCategory()
  })
}

const postProduct = async () => {

    await storeCategory.newCategory({
      name: form.value.name,
      description: form.value.description
    })
  
  closeModal()
  getCategory()
}


const openModal = () => {
  editing.value = false
  editId.value = null
  form.value.name = ''
  form.value.description = ''
  visible.value = true
}

const closeModal = () => {
  visible.value = false
}
onMounted(getCategory)
</script>


