import { defineStore } from "pinia";
import { ref, computed } from "vue";
import OrderDataService from "@/services/OrderDataService";
import { Product } from "@/types/types";

export const useOrderStore = defineStore("orders", () => {
	const orders = ref([]);
	const count = ref(0);

	const loadOrders = async (params: Record<string, any> = {}) => {
		const response = await OrderDataService.getOrders(params);
		orders.value = response.data.results;
		count.value = response.data.count;
	};
	const updateOrder = async (uuid: string, data: Product) => {
		await OrderDataService.updateOrders(uuid, data);
		await loadOrders();
	};
	const getOrders = computed(() => {
		return orders.value
	});

	return { orders, count, loadOrders, updateOrder, getOrders }
})
