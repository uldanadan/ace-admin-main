<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps({
	searchFunction: Function
});

const searchQuery = ref('');

const search = () => {
	props.searchFunction(searchQuery.value);
}
</script>

<template>
	<div class="relative flex items-center justify-end rounded">
		<input type="text" v-model="searchQuery" @input="search" class="focus:outline-none rounded-3xl border-[1.5px] border-brand-accent py-3 pl-6 pr-10" />
		<div class="cursor-pointer">
			<img src="@/assets/img/icons/search.svg" @click="search" class="absolute right-3 top-1/2 transform -translate-y-1/2 pr-1">
		</div>
	</div>
</template>

<style lang="scss" scoped>
</style>
