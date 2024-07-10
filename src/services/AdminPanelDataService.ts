import http from "@/http-common";

class AdminPanelDataService {
	getZone() {
		return http.get("/admin_panel/zone/");
	}
	getComputers = (params) => {
		return http.get(`/admin_panel/computers/`, { params })
	}
}

export default new AdminPanelDataService();
