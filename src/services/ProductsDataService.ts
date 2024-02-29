import http from "@/http-common"
import type { Product } from "@/types/types";
import type { GetProductsParams } from "@/types/types";

class ProductsDataService {
	getProducts(params: GetProductsParams = {}) {
		return http.get("/admin_panel/products/", { params });
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
}

export default new ProductsDataService()
