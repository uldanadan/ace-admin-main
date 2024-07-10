import { defineStore } from "pinia";
import { ref, computed } from "vue";
import PartnersDataService from "@/services/PartnersDataService.ts";
import { Computer } from "@/types/types"

export const usePartnersStore = defineStore("partners", () => {
	const gameCenters = ref([]);

	const loadGameCenters = async () => {
		const response = await PartnersDataService.getGameCenters();
		gameCenters.value = response.data.results;
	}
	const postComputer = async (data: Computer) => {
		await PartnersDataService.postComputer(data);
	}
	const getGameCenters = computed(() => {
		return gameCenters.value;
	})
	const getSelectedGameCenter = computed(() => {
		const storage = localStorage.getItem('selectedGameCenter');
		return storage ? JSON.parse(storage) : undefined;
	})
	return { getSelectedGameCenter, postComputer, loadGameCenters, gameCenters, getGameCenters }
})
