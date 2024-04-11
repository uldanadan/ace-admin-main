<script setup lang="ts">
import { defineProps, onMounted } from "vue"

const props = defineProps<{
	item: {
		type: object
	}
}>()

const handleMove = () => {
	console.log("asdasd");
}
onMounted(() => {})
</script>

<template>
	<div :style="'grid-area:' + `${props.item.map_x}` + '/' + `${props.item.map_y}`" class="map-item flex aspect-square h-full w-full items-center justify-center">
		<button @mouseover="handleMove" class="flex h-[70%] w-[70%] items-center justify-center rounded-lg bg-brand-gray">
			{{ item.number }}
		</button>
	</div>
</template>

<style lang="scss" scoped></style>
