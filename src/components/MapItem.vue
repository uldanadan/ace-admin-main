<script setup lang="ts">
import { defineProps, onMounted } from "vue"

const props = defineProps<{
	item: {
		type: object
	}
}>()

const emit = defineEmits(["openSidebar"]);

const handleMove = () => {
	emit("openSidebar", props.item);
	console.log(props.item);
}
onMounted(() => {})
</script>

<template>
	<div :style="'grid-area:' + `${props.item.map_y}` + '/' + `${props.item.map_x}`" class="map-item flex aspect-square h-full w-full items-center justify-center">
		<button @click="handleMove" class="flex h-[70%] w-[70%] items-center justify-center rounded-lg bg-brand-gray">
			{{ item.number }}
		</button>
	</div>
</template>

<style lang="scss" scoped></style>
