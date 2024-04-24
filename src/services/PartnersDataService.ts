import http from "@/http-common";
import type { Computer } from "@/types/types";

class PartnersDataService {
	getGameCenters() {
		return http.get("/partners/game-centers/");
	}
	getComputersFromZone = (gameCenter: string, zone: string) => {
		return http.get(`/partners/game-centers/${gameCenter}/zones/${zone}/computers/`);
	}
	postComputer(data: Computer) {
		return http.post(`/partners/computers/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export default new PartnersDataService();
