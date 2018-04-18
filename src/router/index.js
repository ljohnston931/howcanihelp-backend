import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import WhichDay from '@/components/WhichDay'
import Add from '@/components/Add.vue'
import Monday from '@/components/Monday.vue'
import Tuesday from '@/components/Tuesday.vue'
import Wednesday from '@/components/Wednesday.vue'
import Thursday from '@/components/Thursday.vue'
import Friday from '@/components/Friday.vue'
import Saturday from '@/components/Saturday.vue'
import Sunday from '@/components/Sunday.vue'
import NewActivities from '@/components/NewActivities.vue'
import LogIn from '@/components/LogIn.vue'
import Register from '@/components/Register.vue'
import AH from '@/components/AH.vue'
import AHAdmin from '@/components/AHAdmin.vue'
import Delete from '@/components/Delete.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/which_day',
      name: 'WhichDay',
      component: WhichDay
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/monday',
      name: 'Monday',
      component: Monday
    },
    {
      path: '/tuesday',
      name: 'Tuesday',
      component: Tuesday
    },    
    {
      path: '/wednesday',
      name: 'Wednesday',
      component: Wednesday
    },
    {
      path: '/thursday',
      name: 'Thursday',
      component: Thursday
    },
    {
      path: '/friday',
      name: 'Friday',
      component: Friday
    },
    {
      path: '/saturday',
      name: 'Saturday',
      component: Saturday
    },
    {
      path: '/sunday',
      name: 'Sunday',
      component: Sunday
    },
    {
      path: '/new-activities',
      name: 'NewActivities',
      component: NewActivities,
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/a-h',
      name: 'AH',
      component: AH,
    },
    {
      path: '/a-h-admin',
      name: 'AHAdmin',
      component: AHAdmin,
    },
    {
      path: '/delete',
      name: 'Delete',
      component: Delete,
    }
  ]
})
