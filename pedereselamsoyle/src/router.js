import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Forms from '@/components/Forms'
import Groups from '@/components/Groups'
import ReportTemplate from '@/components/ReportTemplate'
import Sessions from '@/components/Sessions'
import EditForm from '@/components/EditForm'
import EditGui from '@/components/EditGui'

import LoginPage from '@/components/authentication/LoginPage'
import RegisterPage from '@/components/authentication/RegisterPage'

Vue.use(Router)

export const router = new Router({
	routes: [
		{ path: '/login', component: LoginPage, name: "login" },
		{ path: '/register', component: RegisterPage, name: "register" },

		{ path: '/dashboard', component: Dashboard, alias: '/' },
		{ path: '/forms', component: Forms },
		{ path: '/groups', component: Groups },
		{ path: '/report-template', component: ReportTemplate },
		{ path: '/sessions', component: Sessions },
		{ path: '/edit', component: EditForm },
		{ path: '/editGui', component: EditGui },

		// otherwise redirect to dashboard
		{ path: '*', redirect: '/dashboard' },
	]
})

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/login', '/register'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem('user');

	if (authRequired && !loggedIn) {
		return next('/login');
	}

	next();
})
