import { defineStore } from "pinia";
import { ref, computed } from "vue";
import AdminPanelDataService from "@/services/AdminPanelDataService.ts";

export const useAdminPanelsStore = defineStore("admin_panel", () => {
	const zone = ref();
	const computers = ref([]);

	const loadZones = async () => {
		try {
			const response = await AdminPanelDataService.getZone();
			zone.value = response.data.results;
		} catch (error) {
			console.error("Error loading zones:", error);
		}
	}
	const loadComputers = async () => {
		try {
			const response = await AdminPanelDataService.getComputers();
			computers.value = response.data;
		} catch (error) {
			console.error('Failed to load computers:', error);
		}
	}
	const getZone = computed(() => {
		return zone.value;
	})
	const getComputers = computed(() => {
		return computers.value;
	})
	return { zone, computers, getZone, getComputers, loadZones, loadComputers }
})
