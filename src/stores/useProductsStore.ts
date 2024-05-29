import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "@/types/types";
import ProductsDataService from "@/services/ProductsDataService";

export const useProductsStore = defineStore("products", () => {
	const products = ref<Product[]>([]);
	const product = ref();
	const count = ref(0);
	//----------------------------------------------------------------------
	const loadProducts = async (params: Record<string, any> = {}) => {
		const response = await ProductsDataService.getProducts(params);
		products.value = response.data;
		count.value = response.data.count;
	};
	const loadProduct = async (id: string) => {
		return await ProductsDataService.getProduct(id);
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

	return { products, count, getProducts, getProduct, loadProducts, loadProduct, updateProduct, deleteProduct, postProduct }
})
