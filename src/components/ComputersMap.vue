<script setup lang="ts">
import MapItem from "@/components/MapItem.vue";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { computed, onMounted, ref, watchEffect, watch } from "vue";
import { refDebounced } from "@vueuse/core";

const partnersStore = usePartnersStore();
const emit = defineEmits(["openSidebar"]);
onMounted(async () => {
	await partnersStore.loadComputers("f49dcc25-9428-4e6b-984e-879b618c32e5", "7e39c974-960e-4581-b78c-e17719e24a4b");
	computers.value.forEach(item => {
		loadedCoordinates.value.push({ x: item.map_x, y: item.map_y });
	})
})

const computers = computed(() => {
	return partnersStore.getComputers.data;
})
const loadedCoordinates = ref([]);

const map_x = ref();
const map_y = ref();
const debouncedX = refDebounced(map_x, 300);
const debouncedY = refDebounced(map_y, 300);

const coordinates = ref({
	x: "",
	y: ""
})
watchEffect(() => {
	coordinates.value.x = debouncedX.value;
	coordinates.value.y = debouncedY.value;
})
const handleMap = e => {
	const map = document.getElementById("map")
	if (map) {
		const boxPosition = map.getBoundingClientRect();
		const clickX = e.clientX - boxPosition.left;
		const clickY = e.clientY - boxPosition.top;
		const resultX = Math.ceil((boxPosition.width - (boxPosition.width - clickX)) / 80);
		const resultY = Math.ceil((boxPosition.height - (boxPosition.height - clickY)) / 80);
		map_x.value = resultX;
		map_y.value = resultY;
		emit("openSidebar", coordinates.value.x, coordinates.value.y);
	}
}
const moveMap = e => {
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
}

const removeMapItem = () => {
	const createdItems = document.querySelectorAll(".created-map-item");
	if (createdItems) {
		[...createdItems].forEach(item => {
			if (item) {
				item.remove();
				coordinates.value.x = "";
				coordinates.value.y = "";
			}
		})
	}
}

watch(
	coordinates,
	newValue => {
		const matchingCoordinate = loadedCoordinates.value.find(item => {
			return item.x === newValue.x && item.y === newValue.y;
		})
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
						createDiv.style.gridRow = newValue.y;
						createDiv.style.gridColumn = newValue.x;
					}
				}
			}
		} else {
			removeMapItem();
		}
	},
	{ deep: true }
)
</script>

<template>
	<div class="w-full overflow-x-auto">
		<div @click.prevent="handleMap" @mouseleave="removeMapItem" @mousemove="moveMap" id="map" class="map border-px cursor-pointer border-brand-line bg-white">
			<MapItem v-for="(item, index) in computers" :key="index" :item="item" />
			<!-- <div class="map-box" :style="'grid-area:' + `${map_y}` + '/' + `${map_x}`"></div> -->
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
	position: relative;
	--g-workstation-map-grid-background: linear-gradient(90deg, #d1d5db, transparent 1px), linear-gradient(180deg, #d1d5db, transparent 1px);
}
</style>
