<script setup lang="ts">
import { ref } from "vue";
import ComputersControl from "@/components/ComputersMap/ComputersControl.vue";
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue";
import Actions from "@/components/ComputersMap/component/Actions.vue";
import Button from "@/components/UI/Button.vue"

interface MapItem {
	map_x: number;
	map_y: number;
	number: string;
}

const openedActionSidebar = ref(false);
const selectedComputers = ref<MapItem[]>([]);

const crumbs = [
	{ label: 'Карта клуба', route: '/' },
	{ label: 'Режим управления' }
];

const openActionSidebar = (computers: MapItem[]) => {
	selectedComputers.value = computers;
}

</script>

<template>
	<section>
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
			<div class="grid grid-cols-4 gap-4">
				<div class="col-span-3">
					<ComputersControl @updateSelectedComputers="openActionSidebar" />
				</div>
				<div class="col-span-1">
					<Actions :selectedComputers="selectedComputers" />
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
