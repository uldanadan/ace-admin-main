import http from "@/http-common"

class UsersDataService {
	getUsers() {
		return http.get(`/admin_panel/user_account/`)
	}
}
export default new UsersDataService()
