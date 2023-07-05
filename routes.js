import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import Mail from './views/Mail.js'
import Notes from './views/Notes.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/mail',
			component: Mail,
		},
		{
			path: '/notes',
			component: Notes,
		},
	],
}

export const router = createRouter(routerOptions)
