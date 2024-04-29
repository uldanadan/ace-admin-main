<script setup lang="ts">
import { ref } from "vue";
import ComputersControl from "@/components/ComputersMap/ComputersControl.vue";
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue";
import SidebarActions from "@/components/ComputersMap/component/SidebarActions.vue";
import Button from "@/components/UI/Button.vue"

const openedActionSidebar = ref(false);
const selectedComputer = ref();

const crumbs = [
	{ label: 'Карта клуба', route: '/' },
	{ label: 'Режим управления' }
];

const openActionSidebar = (computers) => {
	openedActionSidebar.value = true;
	selectedComputer.value = computers;
}

const closeSidebar = () => {
	openedActionSidebar.value = false;
}

</script>

<template>
	<section>
		<SidebarActions @close-sidebar="closeSidebar" :selectedComputer="selectedComputer" :opened="openedActionSidebar"  />
		<div class="w-container">
			<div class="flex items-center justify-between">
				<div class="text-second-dark">
					<h2 class="text-4xl font-semibold">Карта клуба</h2>
					<Breadcrumbs :crumbs="crumbs" />
				</div>
				<div class="flex items-center space-x-7">
					<router-link to=""><Button class="btn-back">Выбрать все</Button></router-link>
				</div>
			</div>
			<ComputersControl @openActionSidebar="openActionSidebar" />
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
