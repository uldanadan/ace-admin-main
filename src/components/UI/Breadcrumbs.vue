<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
	crumbs: {
		type: Array as () => { route?: string; label: string }[],
		default: () => []
	}
});

</script>

<template>
	<ul class="flex items-center space-x-2 mt-3">
		<li v-for="(item, index) in props.crumbs" :key="index" class="flex items-center text-sm">
			<span v-if="index && index < props.crumbs.length" class="mr-2"> / </span>
			<router-link v-if="item.route" :to="item.route">{{ item.label }}</router-link>
			<span v-else class="active">{{ item.label }}</span>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
.active {
	@apply font-medium;
}
</style>
