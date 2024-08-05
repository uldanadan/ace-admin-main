import http from "@/http-common";

class AdminPanelDataService {
	getZone() {
		return http.get("/admin_panel/zone/");
	}
	getComputers = (params) => {
		return http.get(`/admin_panel/computers/`, { params })
	}
	sendCommand(commandType: string, uuid: string, email: string, password: string) {
		return http.get(`/admin_panel/commands/`, {
			params: { command_type: commandType, uuid: uuid, email: email, password: password },
		});
	}
	postBalance(data) {
		return http.post(`/admin_panel/balance/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export default new AdminPanelDataService();
