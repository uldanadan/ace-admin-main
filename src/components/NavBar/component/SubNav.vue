<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue"
import { useRoute } from "vue-router"
import { usePartnersStore } from "@/stores/usePartnersStore"
import GameCenter from "@/components/UI/GameCenter.vue"

const route = useRoute()
const partnersStore = usePartnersStore()

const SabNavItems = ref([])

const navItems = {
	"/shop": [
		{ name: "Товары", link: "/shop" },
		{ name: "Движение товаров", link: "" },
		{ name: "Архив", link: "" }
	],
	"/shop/add": [
		{ name: "Товары", link: "/shop/add" },
		{ name: "Движение товаров", link: "" },
		{ name: "Архив", link: "" }
	],
	"/shop/:slug": slug => [
		{ name: "Товары", link: `/shop/${slug}` },
		{ name: "Движение товаров", link: "" },
		{ name: "Архив", link: "" }
	],
	"/users": [
		{ name: "Пользователи", link: "/users" },
		{ name: "История сеансов", link: "" },
		{ name: "История баланса", link: "" },
		{ name: "История пакетов", link: "" },
		{ name: "Роли и доступы", link: "" },
		{ name: "Обращения", link: "" }
	],
	"/cashier": [
		{ name: "Пополнение", link: "" },
		{ name: "Возврат", link: "" },
		{ name: "Магазин", link: "" }
	],
	"/statistics": [
		{ name: "Статистика", link: "/statistics" },
		{ name: "Таблица", link: "/work-shift" }
	],
	"/content": [{ name: "Весь контент", link: "" }],
	"/": [
		{ name: "Режим управления", link: "/control" },
		{ name: "Технический режим", link: "/" }
	],
	"/control": [
		{ name: "Режим управления", link: "/control" },
		{ name: "Технический режим", link: "/" }
	]
}

const gameCenters = computed(() => {
	return partnersStore.getGameCenters?.results || []
})

onMounted(async () => {
	await partnersStore.loadGameCenters()
})

const isActive = (routePath, itemRoute) => {
	return routePath === itemRoute
}

watch(
	() => route.path,
	(newValue, oldValue) => {
		if (newValue.includes("/shop/")) {
			const slug = newValue.split("/").pop()
			SabNavItems.value = navItems["/shop/:slug"](slug)
		} else {
			SabNavItems.value = navItems[newValue] || []
		}
	},
	{ immediate: true }
)
</script>

<template>
	<div class="bg-brand-gray py-4">
		<div class="flex h-full items-center justify-between xl:px-20">
			<ul class="flex items-center space-x-10">
				<li v-for="(item, index) in SabNavItems" :key="index" class="link" :class="{ active: isActive(route.path, item.link) }">
					<router-link :to="item.link">{{ item.name }}</router-link>
				</li>
			</ul>
			<div>
				<GameCenter :options="gameCenters" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.active {
	@apply rounded-xl bg-brand-accent px-5 py-3 text-white;
}
</style>
