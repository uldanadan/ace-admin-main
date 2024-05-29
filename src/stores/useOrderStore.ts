import { defineStore } from "pinia";
import { ref, computed } from "vue";
import OrderDataService from "@/services/OrderDataService";

export const useOrderStore = defineStore("orders", () => {
	const orders = ref([]);

	const loadOrders = async (params: Record<string, any> = {}) => {
		const response = await OrderDataService.getOrders(params);
		orders.value = response.data;
	};
	const updateOrder = async (uuid: string, data: Product) => {
		await OrderDataService.updateOrders(uuid, data);
		await loadOrders();
	}
	const getOrders = computed(() => {
		return orders.value
	});

	return { orders, loadOrders, updateOrder, getOrders }
})
