import { defineStore } from "pinia"
import { ref, computed } from "vue"
import CategoriesDataService from "@/services/CategoriesDataService.ts"

export const useCategoryStore = defineStore("categories", () => {
	const categories = ref();

	const loadCategories = async () => {
		const response = await CategoriesDataService.getCategories();
		categories.value = response.data;
	}

	const getCategories = computed(() => {
		return categories.value;
	})

	return { loadCategories, getCategories }
})
