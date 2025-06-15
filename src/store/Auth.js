import { defineStore } from 'pinia'
import {requestAxios} from "../services/api.js"
import { ref } from 'vue'

export const useStoreAuth = defineStore('usersStore', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)
    const token = ref(localStorage.getItem('token') || null)  

    async function newUsers(data) {
        try {
             return await requestAxios.post(`/register`,data);
            } catch (error) {
            console.log(error.response.data);
          }
      }

    async function login(data) {
        try {
          const response = await requestAxios.post(`/login`,data);
          user.value = response.data.user
          token.value = response.data.token

          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user))
          requestAxios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

          return response
          } catch (error) {
            console.log(error.response.data);
          }
      }

    function logout() {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete requestAxios.defaults.headers.common['Authorization']
      }


    return {newUsers, login, logout, user, token}
  },
  {
    persist: true,
  }
  );