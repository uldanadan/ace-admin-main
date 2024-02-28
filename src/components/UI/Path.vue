<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
	path: {
		type: Array,
		required: true
	}
});
</script>

<template>
	<ul class="flex items-center space-x-5">
		<li v-for="(item, index) in path" :key="index" class="flex items-center">
			<router-link :to="item.path">{{ item.name }}</router-link>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
ul {
	li {
		@apply text-sm;
	}
}
</style>
