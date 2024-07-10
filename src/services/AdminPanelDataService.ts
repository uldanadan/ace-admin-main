import http from "@/http-common";

class AdminPanelDataService {
	getZone() {
		return http.get("/admin_panel/zone/");
	}
	getComputers = () => {
		return http.get(`/admin_panel/computers/`)
	}
}

export default new AdminPanelDataService();
