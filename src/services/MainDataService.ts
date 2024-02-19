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
}

export default new MainDataService()
