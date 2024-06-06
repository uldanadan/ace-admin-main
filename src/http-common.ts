import axios from "axios"
import { useAuthStore } from "@/stores/useAuthStore"

const instance = axios.create({
	// baseURL: "http://10.10.100.110:8080/api/v1",
	baseURL: "https://sea-lion-app-n4saj.ondigitalocean.app/api/v1",
	// baseURL: "https://service.acegaming.gg/api/v1",

	headers: {
		"Content-type": "application/json"
	}
})
instance.interceptors.request.use(config => {
	const authStore = useAuthStore()
	const token = authStore.getToken ? `Token ${authStore.getToken}` : localStorage.getItem("token") ? `Token ${localStorage.getItem("token")}` : null
	if (typeof token === "string") {
		if (config.headers && token) {
			config.headers.Authorization = token
		}
	}
	return config
})
export default instance
