import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import WhichDay from '@/components/WhichDay'
import Submit from '@/components/Submit.vue'
import Monday from '@/components/Monday.vue'
import Tuesday from '@/components/Tuesday.vue'
import Wednesday from '@/components/Wednesday.vue'
import Thursday from '@/components/Thursday.vue'
import Friday from '@/components/Friday.vue'
import Saturday from '@/components/Saturday.vue'
import Sunday from '@/components/Sunday.vue'

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
      path: '/submit',
      name: 'Submit',
      component: Submit
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
  ]
})
