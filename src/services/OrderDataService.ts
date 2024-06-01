import http from "@/http-common"

class OrderDataService {
	getOrders(params) {
		return http.get("/admin_panel/cart/", { params });
	}
	updateOrders(uuid: string, data) {
		return http.put(`/admin_panel/cart/${uuid}/`, data, {
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}

export default new OrderDataService()
