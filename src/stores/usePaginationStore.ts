import { defineStore } from "pinia";
import { ref } from "vue";

export const usePaginationStore = defineStore("pagination", () => {
	const totalPages = ref();

	const updatePagination = (count: number) => {
		totalPages.value = Math.ceil(count / 12);
	};

	return { totalPages, updatePagination };
});

export default usePaginationStore;
