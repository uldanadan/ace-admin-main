import http from "@/http-common"

class PartnersDataService {
	getGameCenters() {
		return http.get(`/partners/game-centers/`)
	}
	getComputersFromZone = (gameCenter: string, zone: string) => {
		return http.get(`/partners/game-centers/${gameCenter}/zones/${zone}/computers/`)
	}
}

export default new PartnersDataService()
