import http from "@/http-common";
import { GetUserParams } from "@/pages/users/types";

class UsersDataService {
	getUsers(params: GetUserParams = {}) {
		return http.get(`/admin_panel/user_account/`, { params })
	}
}
export default new UsersDataService()
