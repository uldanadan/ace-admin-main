<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentPath = ref("");
const SabNavItems = ref([]);

const navItems = {
	"/shop": [
		{ name: "Товары", link: "/shop" },
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

watch(() => route.path, (newPath) => {
	currentPath.value = newPath;
	SabNavItems.value = navItems[newPath] || [];
}, { immediate: true });
</script>

<template>
	<div class="bg-brand-gray py-4">
		<ul class="flex items-center space-x-10 h-full xl:px-20">
			<li v-for="(item, index) in SabNavItems" :key="index" class="link" :class="{ 'active': index === 0 && currentPath === item.link }">
				<router-link :to="item.link">{{ item.name }}</router-link>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.active {
	@apply bg-brand-accent text-white px-5 py-3 rounded-xl;
}
</style>
