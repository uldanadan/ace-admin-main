import http from "@/http-common"

class AuthDataService {
	authLogin = async (email: string, password: string) => {
		return http.post("/accounts/login/", { email, password })
	}
}
export default new AuthDataService()
