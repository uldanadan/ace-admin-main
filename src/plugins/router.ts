import { createRouter, createWebHistory } from "vue-router"
// import { useMainStore } from "@/stores/useMainStore"
import Login from "@/pages/Login.vue"
import ComputersMap from "@/pages/ComputersMap.vue"
import Shop from "@/pages/shop/index.vue"
import ShopItemDetail from "@/pages/shop/[slug].vue"
import ShopAdd from "@/pages/shop/add.vue";
import Users from "@/pages/users/index.vue"
import Statistics from "@/pages/Statistics.vue"

const routes = [
	{
		path: "/login",
		component: Login,
		name: "Логин",
		meta: {
			requiresAuth: false
		}
	},
	{
		path: "/",
		component: ComputersMap,
		name: "Карта клуба",
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/shop",
		component: Shop,
		name: "Магазин",
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/shop/:slug",
		name: "Детали товара",
		component: ShopItemDetail,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/shop/add",
		name: "Добавить товар",
		component: ShopAdd,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/users",
		component: Users,
		name: "Пользователи",
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/statistics",
		component: Statistics,
		name: "Статистика",
		meta: {
			requiresAuth: true
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})
router.beforeEach((to, from, next) => {
	console.log("beforeEach start")
	// const mainStore = useMainStore()

	if (to.meta.requiresAuth) {
		const token = localStorage.getItem("token")
		if (token) {
			next()

			// mainStore.loadUserInfo()
		} else {
			next("/login")
		}
	} else {
		next()
	}
})
// router.beforeResolve(to => {
// 	if (to.meta.requiresAuth && !isAuthenticated) return false
// })
export default router
