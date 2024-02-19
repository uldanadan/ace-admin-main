import { defineStore } from "pinia"
import { ref, computed } from "vue"
import MainDataService from "@/services/MainDataService"
import type { Statistics } from "@/types/types"

export const useMainStore = defineStore("main", () => {
	const user = ref(null)
	const statistics = ref()
	//----------------------------------------------------------------------
	const loadUserInfo = async () => {
		const response = await MainDataService.getUserInfo()
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
	//----------------------------------------------------------------------
	const getUser = computed(() => {
		return user.value
	})
	const getStatistics = computed(() => {
		return statistics.value
	})
	return { user, getUser, loadUserInfo, loadStatistics, getStatistics, statistics }
})
