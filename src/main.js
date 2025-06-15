import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { routes } from "../router/index.js";
import {createRouter, createWebHashHistory} from 'vue-router'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useStoreAuth } from '../src/store/Auth.js' 

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); 
app.use(pinia);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const auth = useStoreAuth()
  const isAuthenticated = !!auth.token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

app.use(Vue3Toastify, {
  autoClose: 2000,
  position: "bottom-center"
})

app.use(router);
app.mount('#app')
