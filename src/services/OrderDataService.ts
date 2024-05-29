import http from "@/http-common"

class OrderDataService {
	getOrders() {
		return http.get("/admin_panel/cart/");
	}
	updateOrders(uuid: string, data) {
		return http.patch(`/admin_panel/cart/${uuid}/`, data, {
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}

export default new OrderDataService()
