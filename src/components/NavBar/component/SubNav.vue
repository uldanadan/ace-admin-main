<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue"
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/useProductsStore";
import { usePartnersStore } from "@/stores/usePartnersStore";
import GameCenter from "@/components/UI/GameCenter.vue";

const route = useRoute();
const productsStore = useProductsStore();
const partnersStore = usePartnersStore();

const currentPath = ref("");
const SabNavItems = ref([]);
const selectedGameCenter = ref(null);

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
		{name: "Возврат", link: ""},
		{name: "Магазин", link: ""}
	],
	"/statistics": [
		{ name: "Статистика", link: "/statistics" }
	],
	"/content": [
		{ name: "Весь контент", link: "" }
	],
	"/": [
		{ name: "Технический режим", link: "/" }
	]
};

const gameCenters = computed(() => {
	return partnersStore.getGameCenters?.results || [];
});

onMounted(async () => {
	await partnersStore.loadGameCenters();
});

const updateGameCenter = (center) => {
	selectedGameCenter.value = center;
}

watch(() => route.path, (newPath) => {
	currentPath.value = newPath;
	SabNavItems.value = navItems[newPath] || [];
}, { immediate: true });
</script>

<template>
	<div class="bg-brand-gray py-4">
		<div class="flex justify-between items-center h-full xl:px-20">
			<ul class="flex items-center space-x-10">
				<li v-for="(item, index) in SabNavItems" :key="index" class="link" :class="{ 'active': index === 0 && currentPath === item.link }">
					<router-link :to="item.link">{{ item.name }}</router-link>
				</li>
			</ul>
			<div>
				<GameCenter :options="gameCenters" :updateGameCenter="updateGameCenter" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.active {
	@apply bg-brand-accent text-white px-5 py-3 rounded-xl;
}
</style>
