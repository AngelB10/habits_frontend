import { defineStore } from 'pinia'
import {requestAxios} from "../services/api.js"

export const useStoreCategory = defineStore('categoryStore', () => {
    async function newCategory(data) {
        try {
             return await requestAxios.post(`/categories`,data);
            } catch (error) {
            console.log(error.response.data);
          }
      }

    async function listCategory() {
        try {
          const response = await requestAxios.get(`/categories`);
          return response
          } catch (error) {
            console.log(error.response.data);
          }
      }
  async function deleteCategory(id) {
    try {
      const response = await requestAxios.delete(`/categories/${id}`);
      toast.success('Categoria eliminada correctamente')
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      return error;
    }
  }


    return {deleteCategory, newCategory, listCategory}
  },
  {
    persist: true,
  }
  );