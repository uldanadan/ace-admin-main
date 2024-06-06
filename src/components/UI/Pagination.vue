<script setup lang="ts">
import { ref, watch } from 'vue';
import usePaginationStore from '@/stores/usePaginationStore';
import { useProductsStore } from '@/stores/useProductsStore';

const currentPage = ref(1);
const paginationStore = usePaginationStore();
const { totalPages } = paginationStore;
const { loadProducts } = useProductsStore();

const updatePage = async () => {
	await loadProducts({ page: currentPage.value });
};

const nextPage = async () => {
	currentPage.value++;
	await updatePage();
};


const prevPage = async () => {
	currentPage.value--;
	await updatePage();
};

// const hasNext = currentPage.value < totalPages;
// const hasPrev = currentPage.value > 1;

watch(currentPage, updatePage, { immediate: true });

</script>

<template>
	<div>
		<button @click="prevPage" class="btn-back" >Prev</button>
		<span>{{ currentPage }}</span>
		<button @click="nextPage" class="btn-back" >Next</button>
	</div>
</template>

<style lang="scss" scoped>

</style>
