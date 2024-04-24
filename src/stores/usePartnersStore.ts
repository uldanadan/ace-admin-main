import { defineStore } from "pinia";
import { ref, computed } from "vue";
import PartnersDataService from "@/services/PartnersDataService.ts";
import { GetParams, Computer } from "@/types/types"

export const usePartnersStore = defineStore("partners", () => {
	const computers = ref([]);
	const gameCenters = ref();

	const loadGameCenters = async () => {
		const response = await PartnersDataService.getGameCenters();
		gameCenters.value = response.data;
	}
	const loadComputers = async (gameCenter: string, zone: string) => {
		const response = await PartnersDataService.getComputersFromZone(gameCenter, zone);
		computers.value = response.data;
	}
	const postComputer = async (data: Computer) => {
		await PartnersDataService.postComputer(data);
	}
	const getComputers = computed(() => {
		return computers.value;
	})
	const getGameCenters = computed(() => {
		return gameCenters.value;
	})
	const getSelectedGameCenter = computed(() => {
		const storage = localStorage.getItem('selectedGameCenter');
		return storage ? JSON.parse(storage) : undefined;
	})
	return { computers, getComputers, getSelectedGameCenter, loadComputers, postComputer, loadGameCenters, gameCenters, getGameCenters }
})
