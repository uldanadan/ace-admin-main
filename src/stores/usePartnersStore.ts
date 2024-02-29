import { defineStore } from "pinia";
import { ref, computed } from "vue";
import PartnersDataService from "@/services/PartnersDataService.ts";

export const usePartnersStore = defineStore("partners", () => {
	const computers = ref([])
	const gameCenters = ref()
	//---------------------------------------------------------------------------------------
	const loadGameCenters = async () => {
		const response = await PartnersDataService.getGameCenters();
		gameCenters.value = response.data;
	}
	const loadComputers = async (gameCenter: string, zone: string) => {
		const response = await PartnersDataService.getComputersFromZone(gameCenter, zone)
		computers.value = response
		console.log("COMPUTERS " + JSON.stringify(response))
	}
	//---------------------------------------------------------------------------------------
	const getComputers = computed(() => {
		return computers.value
	})
	const getGameCenters = computed(() => {
		return gameCenters.value
	})
	return { computers, getComputers, loadComputers, loadGameCenters, gameCenters, getGameCenters }
})
