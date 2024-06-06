import http from "@/http-common"

class CategoriesDataService {
	getCategories() {
		return http.get("/admin_panel/category/")
	}
}

export default new CategoriesDataService()
