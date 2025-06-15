import App from '@/App.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Habits from '@/pages/Habits.vue'
import HabitsForm from '@/components/forms/CreateHabitForm.vue'


export const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      hideSidebar: true,
    },
   
  },
    {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      hideSidebar: true,
    },
   
  },
    {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,   
  },
    {
    path: "/habitsForm",
    name: "habitsForm",
    component: HabitsForm,   
  },
    {
    path: "/habits",
    name: "habits",
    component: Habits,   
  },
    {
      path: "/app",
      name: "App",
      component: App,   
    },
   
]



