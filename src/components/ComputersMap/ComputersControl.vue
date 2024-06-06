<script setup lang="ts">
import MapItem from "./component/MapItem.vue";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { computed, onMounted, ref, watchEffect, watch } from "vue";
import { refDebounced } from "@vueuse/core";
import http from "@/http-common";

const partnersStore = usePartnersStore();
const selectedGameCenterUuid = ref( partnersStore.getSelectedGameCenter?.uuid);
const selectedComputers = ref();
const emit = defineEmits([ "openActionSidebar"]);


onMounted(async () => {
	await loadComputers()
})

const loadComputers = async () => {
	const queries = [];
	const allComputers = [];
	for (const gameCenter of gameCenters.value) {
		const shouldLoad = !selectedGameCenterUuid.value || gameCenter.uuid === selectedGameCenterUuid.value;
		if (shouldLoad) {
			for (const zone of gameCenter.zones) {
				queries.push(http.get(`/partners/game-centers/${gameCenter.uuid}/zones/${zone.uuid}/computers/`));
			}
		}
	}
	if (queries?.length) {
		await Promise.all(queries).then(r => {
			r.forEach(comp => {
				allComputers.push(...comp.data);
				comp.data?.forEach(d => {
					loadedCoordinates.value.push({ x: d.map_x, y: d.map_y });
				})
			})
			partnersStore.computers = allComputers;
		})
	}
}

const computers = computed(() => {
	return partnersStore.getComputers;
});

const gameCenters = computed(() => {
	return partnersStore.getGameCenters?.results || [];
});

const loadedCoordinates = ref([]);

const map_x = ref();
const map_y = ref();
const debouncedX = refDebounced(map_x, 300);
const debouncedY = refDebounced(map_y, 300);

const coordinates = ref({
	x: "",
	y: ""
})

const handleMap = e => {
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
		if (computer) {
			selectedComputers.value = computer;
			emit("openActionSidebar", selectedComputers.value);
		}
	}
}
watchEffect(() => {
	coordinates.value.x = debouncedX.value;
	coordinates.value.y = debouncedY.value;
})

watch([gameCenters, selectedGameCenterUuid.value], () => {
	if (gameCenters.value.length)  loadComputers();
})

watch(
	() => selectedGameCenterUuid.value,
	(newValue, oldValue) => {
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
