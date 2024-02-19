import http from "@/http-common"
import type { Product } from "@/types/types"

class ProductsDataService {
	getProducts() {
		return http.get(`/admin_panel/products/`)
	}
	getProduct(id: string) {
		return http.get(`/admin_panel/products/${id}/`)
	}
	updateProduct(slug: string, data: Product) {
		return http.patch(`/admin_panel/products/${slug}/`, data, {
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
	deleteProduct(slug: string) {
		return http.delete(`/admin_panel/products/${slug}/`)
	}
	postProduct(data: Product) {
		return http.post(`/admin_panel/products/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	getCategories() {
		return http.get("/admin_panel/category/")
	}
	getGameCenters() {
		return http.get("/partners/game-centers/")
	}
}

export default new ProductsDataService()
