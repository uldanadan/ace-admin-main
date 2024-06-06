import http from "@/http-common"
import type { Statistics } from "@/types/types"
class MainDataService {
	getUserInfo() {
		return http.get("/accounts/me/")
	}
	getStatistics(data: Statistics) {
		return http.post("/admin_panel/statistics/", {
			body: JSON.stringify(data)
		})
	}
	getWorkShift(page) {
		return http.get(`/admin_panel/work_shift/?page=${page}`)
	}
	createWorkShift(data) {
		return http.post(`/admin_panel/work_shift/`, JSON.stringify(data))
	}
	getGameCenters() {
		return http.get("/partners/game-centers/")
	}
	closeWorkShift(uuid, data) {
		return http.put(`/admin_panel/work_shift/${uuid}/`, JSON.stringify(data))
	}
	getOpenedWorkShift() {
		return http.get(`/admin_panel/work_shift/me/`)
	}
}

export default new MainDataService()
