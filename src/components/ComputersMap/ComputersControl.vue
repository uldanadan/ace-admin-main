<script setup lang="ts">
import MapItem from "./component/MapItem.vue";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { useAdminPanelsStore } from "@/stores/useAdminPanelsStore";
import { computed, onMounted, ref, watchEffect, watch } from "vue";
import { refDebounced } from "@vueuse/core";

interface MapItem {
	map_x: number;
	map_y: number;
	number: string;
}

const partnersStore = usePartnersStore();
const adminPanelsStore = useAdminPanelsStore();

const searchParams = ref({game_center: partnersStore.getSelectedGameCenter?.uuid});
const selectedGameCenterUuid = ref( partnersStore.getSelectedGameCenter?.uuid);
// const selectedComputers = ref();
const selectedComputers = ref<MapItem[]>([]);
const emit = defineEmits([ "updateSelectedComputers"]);

onMounted(async () => {
	await adminPanelsStore.loadComputers(searchParams.value);
})

const computers = computed(() => {
	return adminPanelsStore.getComputers as MapItem[];
});

const gameCenters = computed(() => (partnersStore.getGameCenters || []));

const map_x = ref();
const map_y = ref();
const debouncedX = refDebounced(map_x, 300);
const debouncedY = refDebounced(map_y, 300);

const coordinates = ref({
	x: "",
	y: ""
})

const handleMap = (e: MouseEvent) => {
	const map = document.getElementById("map");
	if (map) {
		const boxPosition = map.getBoundingClientRect();
		const clickX = e.clientX - boxPosition.left;
		const clickY = e.clientY - boxPosition.top;
		const resultX = Math.ceil((boxPosition.width - (boxPosition.width - clickX)) / 80);
		const resultY = Math.ceil((boxPosition.height - (boxPosition.height - clickY)) / 80);
		map_x.value = resultX;
		map_y.value = resultY;

		const computer = computers.value.find(computer => computer.map_x === resultX && computer.map_y === resultY);
		// if (computer) {
		// 	selectedComputers.value = computer;
		// 	emit("openActionSidebar", selectedComputers.value);
		// }
		if (computer) {
			if (selectedComputers.value.some(c => c.number === computer.number)) {
				selectedComputers.value = selectedComputers.value.filter(c => c.number !== computer.number);
			} else {
				selectedComputers.value.push(computer);
			}
			emit("updateSelectedComputers", selectedComputers.value);
		}
	}
}

watchEffect(() => {
	coordinates.value.x = debouncedX.value;
	coordinates.value.y = debouncedY.value;
})

watch([gameCenters, selectedGameCenterUuid.value], () => {
	if (gameCenters.value.length)  adminPanelsStore.loadComputers(searchParams.value);
})

watch(
	() => selectedGameCenterUuid.value,
	(newValue) => {
		selectedGameCenterUuid.value = newValue;
	}
);
</script>

<template>
	<div class="w-full overflow-x-auto">
		<div @click.prevent="handleMap" id="map" class="map border-px cursor-pointer border-brand-line bg-white">
			<MapItem v-for="(item, index) in computers" :key="index" :item="item" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.map {
	box-sizing: border-box;
	--workstation-size: 80px;
	background-image: var(--g-workstation-map-grid-background);
	background-size: var(--workstation-size) var(--workstation-size);
	display: grid;
	grid-auto-rows: var(--workstation-size);
	grid-gap: 0;
	grid-template-columns: repeat(15, var(--workstation-size));
	width: calc(var(--workstation-size) * 15 + 1px);
	min-height: 100%;
	padding-bottom: calc(15rem + 1px);
	margin: 1rem auto 0;
}
</style>
