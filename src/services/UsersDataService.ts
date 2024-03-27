import http from "@/http-common";
import type { GetUserParams } from "@/types/types";

class UsersDataService {
	getUsers(params: GetUserParams = {}) {
		return http.get(`/admin_panel/user_account/`, { params })
	}
}
export default new UsersDataService()
