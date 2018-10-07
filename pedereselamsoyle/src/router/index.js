import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Forms from '@/components/Forms'
import People from '@/components/People'
import ReportTemplate from '@/components/ReportTemplate'
import Sessions from '@/components/Sessions'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/dashboard', component: Dashboard, alias: '/' },
    { path: '/forms', component: Forms },
    { path: '/people', component: People },
    { path: '/report-template', component: ReportTemplate },
    { path: '/sessions', component: Sessions },
  ]
})
