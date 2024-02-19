import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { Product } from "@/types/types"
import ProductsDataService from "@/services/ProductsDataService"
export const useProductsStore = defineStore("products", () => {
	const products = ref()
	const product = ref()
	const categories = ref()
	const gameCenters = ref()
	//----------------------------------------------------------------------
	const loadProducts = async () => {
		const response = await ProductsDataService.getProducts()
		products.value = response.data
	}
	const loadProduct = async (id: string) => {
		return await ProductsDataService.getProduct(id);
	}
	const loadCategories = async () => {
		const response = await ProductsDataService.getCategories()
		categories.value = response.data
	}
	const loadGameCenters = async () => {
		const response = await ProductsDataService.getGameCenters();
		gameCenters.value = response.data;
	}
	const updateProduct = async (slug: string, data: Product) => {
		await ProductsDataService.updateProduct(slug, data)
	}
	const deleteProduct = async (slug: string) => {
		await ProductsDataService.deleteProduct(slug)
	}
	const postProduct = async (data: Product) => {
		await ProductsDataService.postProduct(data)
	}
	//----------------------------------------------------------------------
	const getProducts = computed(() => {
		return products.value
	})
	const getProduct = computed(() => {
		return product.value
	})
	const getCategories = computed(() => {
		return categories.value
	})
	const getGameCenters = computed(() => {
		return gameCenters.value
	})
	return { products, getProducts, getProduct, getGameCenters, loadProducts, loadProduct, updateProduct, loadCategories, loadGameCenters, categories, getCategories, deleteProduct, postProduct }
})
