<script setup lang="ts">
import ComputersMap from "@/components/ComputersMap.vue";
import SidebarAddComputer from "@/components/SidebarAddComputer.vue";
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue"

import { ref } from "vue"
const coordinates = ref({
	x: "",
	y: ""
})
const openedSidebar = ref(false);

const crumbs = [
	{ label: 'Карта клуба', route: '/' },
	{ label: 'Режим управления' }
];

const openSidebar = (x: string, y: string) => {
	coordinates.value.x = x
	coordinates.value.y = y
	openedSidebar.value = true
}
const closeSidebar = () => {
	openedSidebar.value = false
}
</script>

<template>
	<section>
		<SidebarAddComputer @close-sidebar="closeSidebar" :coordinates="coordinates" :opened="openedSidebar" />
		<div class="w-container">
			<div class="flex items-center justify-between">
				<div class="text-second-dark">
					<h2 class="text-4xl font-semibold">Карта клуба</h2>
					<Breadcrumbs :crumbs="crumbs" />
				</div>
				<div class="flex items-center space-x-7">
					<router-link to="/"><Button class="btn-accent">Добавить ПК</Button></router-link>
				</div>
			</div>
			<ComputersMap @open-sidebar="openSidebar" />
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
