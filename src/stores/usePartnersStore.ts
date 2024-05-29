import { defineStore } from "pinia";
import { ref, computed } from "vue";
import PartnersDataService from "@/services/PartnersDataService.ts";
import { GetParams, Computer } from "@/types/types"

export const usePartnersStore = defineStore("partners", () => {
	const computers = ref([]);
	const gameCenters = ref([]);

	const loadGameCenters = async () => {
		const response = await PartnersDataService.getGameCenters();
		gameCenters.value = response.data;
	}
	const loadComputers = async () => {
		try {
			const queries = [];
			if (Array.isArray(gameCenters.value.results)) {
				for (const gameCenter of gameCenters.value.results) {
					for (const zone of gameCenter.zones) {
						queries.push(PartnersDataService.getComputersFromZone(gameCenter.uuid, zone.uuid));
					}
				}
				const responses = await Promise.all(queries);
				const allComputers = responses.flatMap(response => response.data);
				computers.value = allComputers;
			} else {
				console.error('gameCenters is not an array:');
			}
		} catch (error) {
			console.error('Failed to load computers:', error);
		}
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
