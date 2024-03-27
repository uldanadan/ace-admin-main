<script setup lang="ts">
import { defineProps } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
	crumbs: []
});

</script>

<template>
	<ul class="flex items-center space-x-2 mt-3">
		<li v-for="(item, index) in props.crumbs" :key="index" class="flex items-center text-sm">
			<span v-if="index && index < props.crumbs?.length" class="mr-2"> / </span>
			<router-link v-if="item.route" :to="item.route" >{{ item.label }}</router-link>
			<span v-if="!item.route" class="active">{{item.label}}</span>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
.active {
	@apply font-medium;
}
</style>
