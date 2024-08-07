<script setup lang="ts">
import MapItem from "./component/MapItem.vue";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { useAdminPanelsStore } from "@/stores/useAdminPanelsStore";
import { computed, onMounted, ref, watchEffect, watch } from "vue";
import { refDebounced } from "@vueuse/core";

interface Computer {
	map_x: number;
	map_y: number;
	number: string;
}

const partnersStore = usePartnersStore();
const adminPanelsStore = useAdminPanelsStore();

const searchParams = ref({game_center: partnersStore.getSelectedGameCenter?.uuid});
const selectedComputers = ref<Computer[]>([]);
const selectedGameCenterUuid = ref(partnersStore.getSelectedGameCenter?.uuid);
const emit = defineEmits(["openSidebar", "openChangeSidebar"]);

const loadComputers = async () => {
	await adminPanelsStore.loadComputers(searchParams.value);
	computers.value.forEach(d => {
		loadedCoordinates.value.push({ x: d.map_x, y: d.map_y });
	});
};

onMounted(async () => {
	await loadComputers();
});

const computers = computed(() => {
	return adminPanelsStore.getComputers as Computer[];
});

const gameCenters = computed(() => (partnersStore.getGameCenters || []));

const loadedCoordinates = ref<{ x: number, y: number }[]>([]);

const map_x = ref<number>();
const map_y = ref<number>();
const debouncedX = refDebounced(map_x, 300);
const debouncedY = refDebounced(map_y, 300);

const coordinates = ref<{ x: number | string; y: number | string }>({
	x: "",
	y: ""
});

watchEffect(() => {
	coordinates.value.x = debouncedX.value ?? "";
	coordinates.value.y = debouncedY.value ?? "";
});

watch([gameCenters, selectedGameCenterUuid.value], () => {
	if (gameCenters.value.length) loadComputers();
});

watch(
	() => selectedGameCenterUuid.value,
	newValue => {
		selectedGameCenterUuid.value = newValue;
	}
);

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

		if (!computer) {
			map_x.value = resultX;
			map_y.value = resultY;
			emit("openSidebar", resultX, resultY, computers);
		} else {
			const isSelected = selectedComputers.value.some(selected => selected.number === computer.number);
			if (!isSelected && selectedComputers.value.length < 2) {
				selectedComputers.value.push(computer);
			} else {
				selectedComputers.value = [computer];
			}

			if (selectedComputers.value.length === 2) {
				emit("openChangeSidebar", selectedComputers.value);
			}
		}
	}
};

const moveMap = (e: MouseEvent) => {
	const map = document.getElementById("map");
	if (map) {
		const boxPosition = map.getBoundingClientRect();
		const clickX = e.clientX - boxPosition.left;
		const clickY = e.clientY - boxPosition.top;
		const resultX = Math.ceil((boxPosition.width - (boxPosition.width - clickX)) / 80);
		const resultY = Math.ceil((boxPosition.height - (boxPosition.height - clickY)) / 80);
		map_x.value = resultX;
		map_y.value = resultY;
	}
};

const removeMapItem = () => {
	const createdItems = document.querySelectorAll(".created-map-item");
	if (createdItems) {
		[...createdItems].forEach(item => {
			if (item) {
				item.remove();
				coordinates.value.x = "";
				coordinates.value.y = "";
			}
		});
	}
};

watch(
	coordinates,
	newValue => {
		const matchingCoordinate = loadedCoordinates.value.find(item => {
			return item.x === Number(newValue.x) && item.y === Number(newValue.y);
		});
		if (!matchingCoordinate) {
			if (newValue.x != "" && newValue.y != "") {
				const map = document.getElementById("map");
				if (map) {
					const createDiv = document.createElement("div");
					const createdItem = document.querySelector(".created-map-item");
					if (createdItem) {
						createdItem.remove();
					}
					if (createDiv) {
						map.appendChild(createDiv);
						createDiv.classList.add("created-map-item");
						createDiv.style.gridRow = newValue.y.toString();
						createDiv.style.gridColumn = newValue.x.toString();
					}
				}
			}
		} else {
			removeMapItem();
		}
	},
	{ deep: true }
);
</script>

<template>
	<div class="w-full overflow-x-auto">
		<div @click.prevent="handleMap" @mouseleave="removeMapItem" @mousemove="moveMap" id="map" class="map border-px cursor-pointer border-brand-line bg-white">
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
	--g-workstation-map-grid-background: linear-gradient(90deg, #d1d5db, transparent 1px), linear-gradient(180deg, #d1d5db, transparent 1px);
}
</style>
