import { defineStore } from "pinia"
import { ref, computed } from "vue"
import MainDataService from "@/services/MainDataService"
import type { Statistics } from "@/types/types"

export const useMainStore = defineStore("main", () => {
	const user = ref(null)
	const statistics = ref()
	const workShiftData = ref([])
	const gameCenters = ref([])
	const topPanelHeight = ref(null)
	const openedWorkShift = ref(null)
	const isLoading = ref(false)
	//----------------------------------------------------------------------
	function setOpenedWorkShift(item) {
		openedWorkShift.value = item
	}
	async function loadOpenedWorkShift() {
		return await MainDataService.getOpenedWorkShift()
	}
	const loadUserInfo = async () => {
		const response = await MainDataService.getUserInfo()
		user.value = response.data
		console.log("user info " + JSON.stringify(response))
	}
	const loadStatistics = (data: Statistics) => {
		MainDataService.getStatistics(data).then(response => {
			const blob = new Blob([response.data], {
				type: response.headers["content-type"]
			})
			const url = URL.createObjectURL(blob)
			statistics.value = url
		})

		// MainDataService.getStatistics(data).then(response => {
		// 	const blob = new Blob([response.data], {
		// 		type: response.headers["content-type"]
		// 	})
		// 	const url = URL.createObjectURL(blob)
		// 	const link = document.createElement("a")
		// 	link.href = url
		// 	link.download = "demo.xlsx"
		// 	document.body.appendChild(link)
		// 	link.click()
		// 	document.body.removeChild(link)
		// 	console.log(url)
		// })
	}
	async function loadWorkShift(page) {
		const response = await MainDataService.getWorkShift(page)
		console.log("loadWorkShift", response)
		if (response.status === 200) {
			workShiftData.value = response.data
		}
	}
	async function createWorkShift(data) {
		return await MainDataService.createWorkShift(data)
	}
	async function closeWorkShift(uuid, data) {
		return await MainDataService.closeWorkShift(uuid, data)
	}
	const loadGameCenters = async () => {
		const response = await MainDataService.getGameCenters()
		gameCenters.value = response.data.results
	}
	//----------------------------------------------------------------------
	const getUser = computed(() => {
		return user.value
	})
	const getStatistics = computed(() => {
		return statistics.value
	})
	return { isLoading, topPanelHeight, loadOpenedWorkShift, setOpenedWorkShift, closeWorkShift, openedWorkShift, user, gameCenters, loadGameCenters, createWorkShift, workShiftData, getUser, loadWorkShift, loadUserInfo, loadStatistics, getStatistics, statistics }
})
