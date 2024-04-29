<script setup lang="ts">
import { defineProps, ref } from "vue"

const props = defineProps<{
	item: {
		type: object
	}
}>()

const emit = defineEmits(["openChangeSidebar"]);
const selected = ref(false);

const handleMove = () => {
	emit("openChangeSidebar", props.item);
	selected.value = !selected.value;
}
</script>

<template>
	<div :style="'grid-area:' + `${props.item.map_y}` + '/' + `${props.item.map_x}`" class="map-item flex aspect-square h-full w-full items-center justify-center">
		<button @click="handleMove" :class="{ 'bg-brand-gray': selected }" class="flex h-[70%] w-[70%] items-center justify-center rounded-2xl border-2 border-brand-accent">
			{{ item.number }}
		</button>
	</div>
</template>

<style lang="scss" scoped></style>
