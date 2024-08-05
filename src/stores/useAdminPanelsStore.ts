import { defineStore } from "pinia";
import { ref, computed } from "vue";
import AdminPanelDataService from "@/services/AdminPanelDataService.ts";

export const useAdminPanelsStore = defineStore("admin_panel", () => {
	const zone = ref();
	const computers = ref([]);
	const commandResult = ref(null);

	const loadZones = async () => {
		try {
			const response = await AdminPanelDataService.getZone();
			zone.value = response.data.results;
		} catch (error) {
			console.error("Error loading zones:", error);
		}
	};

	const loadComputers = async (params: Record<string, any> = {}) => {
		try {
			const response = await AdminPanelDataService.getComputers(params);
			computers.value = response.data;
		} catch (error) {
			console.error("Failed to load computers:", error);
		}
	};

	const sendCommand = async (commandType: string, uuid: string) => {
		try {
			const response = await AdminPanelDataService.sendCommand(commandType, uuid);
			commandResult.value = response.data;
		} catch (error) {
			console.error("Failed to send command:", error);
		}
	};

	const getZone = computed(() => zone.value);
	const getComputers = computed(() => computers.value);
	const getCommandResult = computed(() => commandResult.value);

	return {
		zone,
		computers,
		getZone,
		getComputers,
		loadZones,
		loadComputers,
		sendCommand,
		getCommandResult,
	};
});
