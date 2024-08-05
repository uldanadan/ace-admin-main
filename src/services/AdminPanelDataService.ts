import http from "@/http-common";

class AdminPanelDataService {
	getZone() {
		return http.get("/admin_panel/zone/");
	}
	getComputers = (params) => {
		return http.get(`/admin_panel/computers/`, { params })
	}
	getCommands = (params) => {
		return http.get(`/admin_panel/commands/`, { params })
	}
	sendCommand = (commandType: string, uuid: string) => {
		return http.get(`/admin_panel/commands/`, {
			params: { command_type: commandType, uuid: uuid }
		});
	}
}

export default new AdminPanelDataService();
