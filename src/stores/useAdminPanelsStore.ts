import { defineStore } from "pinia";
import { ref, computed } from "vue";
import AdminPanelDataService from "@/services/AdminPanelDataService.ts";

export const useAdminPanelsStore = defineStore("admin_panel", () => {
	const zone = ref();

	const loadZones = async () => {
		try {
			const response = await AdminPanelDataService.getZone();
			zone.value = response.data.results;
		} catch (error) {
			console.error("Error loading zones:", error);
		}
	}
	const getZone = computed(() => {
		return zone.value;
	})
	return { zone, getZone, loadZones }
})
