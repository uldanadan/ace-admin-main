<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
	totalCount: {
		type: Number,
		required: true
	},
	limit: {
		type: Number,
		default: 12
	},
})

const emits = defineEmits(['onChangePage']);
const currentPage = ref(1);

const totalPages = computed(() => {
	return Math.ceil(props.totalCount / props.limit);
});

const handleChangePage = async (type: 'next' | 'prev' | 'goTo', page?: number) => {
	if (type === 'next' && currentPage.value < totalPages.value) {
		currentPage.value++;
	} else if (type === 'prev' && currentPage.value > 1) {
		currentPage.value--;
	} else if (type === 'goTo') {
		currentPage.value = page || 1;
	} else {
		return;
	}
	emits("onChangePage", currentPage.value);
}

const displayedPages = computed(() => {
	const total = totalPages.value;
	const current = currentPage.value;
	const delta = 1;
	const range = [];

	let start = Math.max(1, current - delta);
	let end = Math.min(total - 1, current + delta);

	if (current === 1) {
		end = Math.min(3, total - 1);
	} else if (current === total) {
		start = Math.max(1, total - 2);
	}

	for (let i = start; i <= end; i++) {
		range.push(i);
	}

	return range;
});
</script>

<template>
	<div class="pagination mt-6 flex justify-center">
		<button @click="handleChangePage('prev')" :disabled="currentPage === 1" class="btn-paginate mx-1.5 border border-brand-line px-2" :style="{ opacity: currentPage === 1 ? 0.36 : 1 }">
			<img src="@/assets/img/icons/next.svg" class="rotate-180">
		</button>

		<button v-if="currentPage > 2" @click="handleChangePage('goTo', 1)" class="btn-paginate mx-1 px-3 py-1 text-sm font-semibold">1</button>
		<span v-if="currentPage > 3">...</span>

		<template v-for="page in displayedPages" :key="page">
			<button @click="handleChangePage('goTo', page)" :class="{ active: currentPage === page, 'bg-brand-accent text-white': currentPage === page }" class="btn-paginate mx-1 px-3 py-1 text-sm border border-brand-line font-semibold">
				{{ page }}
			</button>
		</template>

		<span v-if="currentPage < totalPages - 2 && totalPages > 3">...</span>
		<button @click="handleChangePage('goTo', totalPages)" :class="{ active: currentPage === totalPages, 'bg-brand-accent text-white': currentPage === totalPages }" class="btn-paginate mx-1 px-3 py-1 text-sm border border-brand-line font-semibold" v-if="currentPage <= totalPages">{{ totalPages }}</button>

		<button @click="handleChangePage('next')" :disabled="currentPage >= totalPages" class="btn-paginate mx-1.5 border border-brand-line px-2" :style="{ opacity: currentPage >= totalPages ? 0.36 : 1 }">
			<img src="@/assets/img/icons/next.svg">
		</button>
	</div>
</template>

<style lang="scss"></style>
