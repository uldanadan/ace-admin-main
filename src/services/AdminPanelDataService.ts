import http from "@/http-common";

class AdminPanelDataService {
	getZone() {
		return http.get("/admin_panel/zone/");
	}
}

export default new AdminPanelDataService();
