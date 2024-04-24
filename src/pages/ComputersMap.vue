<script setup lang="ts">
import ComputersMap from "@/components/ComputersMap.vue";
import SidebarAddComputer from "@/components/SidebarAddComputer.vue";
import MapItem from "@/components/MapItem.vue";
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue"

import { ref } from "vue"
import Button from "../components/UI/Button.vue"
const coordinates = ref({
	x: "",
	y: ""
});
const openedSidebar = ref(false);
const selectedComputer = ref(null);

const crumbs = [
	{ label: 'Карта клуба', route: '/' },
	{ label: 'Технический режим' }
];

const openSidebar = (x: string, y: string, computer) => {
	coordinates.value.x = x;
	coordinates.value.y = y;
	selectedComputer.value = computer;
	openedSidebar.value = true;
	console.log(coordinates.value)
}

const closeSidebar = () => {
	openedSidebar.value = false;
}
</script>

<template>
	<section>
		<SidebarAddComputer @close-sidebar="closeSidebar" :coordinates="coordinates" :selectedComputer="selectedComputer" :opened="openedSidebar" />
		<div class="w-container">
			<div class="flex items-center justify-between">
				<div class="text-second-dark">
					<h2 class="text-4xl font-semibold">Карта клуба</h2>
					<Breadcrumbs :crumbs="crumbs" />
				</div>
				<div class="flex items-center space-x-7">
					<router-link to=""><Button class="btn-back">Выбрать все</Button></router-link>
<!--					<router-link to="/"><Button class="btn-accent" @click="openSidebar('', '')">Добавить ПК</Button></router-link>-->
				</div>
			</div>
			<ComputersMap @openSidebar="openSidebar" />
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
