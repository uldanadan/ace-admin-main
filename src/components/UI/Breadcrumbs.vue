<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
	crumbs: []
});
</script>

<template>
	<ul class="flex items-center space-x-5">
		<li v-for="(item, index) in props.crumbs" :key="index" class="flex items-center">
			<span v-if="index && index < props.crumbs?.length"> / </span>
			<router-link v-if="item.route" :to="item.route">{{ item.label }}</router-link>
			<span v-if="!item.route">{{item.label}}</span>
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
