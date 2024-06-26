import axios from "axios"
import { useAuthStore } from "@/stores/useAuthStore"

const instance = axios.create({
	baseURL: "https://service.acegaming.gg/api/v1",
	headers: {
		"Content-type": "application/json"
	}
})
instance.interceptors.request.use(config => {
	const authStore = useAuthStore();
	const token = authStore.getToken ? `Token ${authStore.getToken}` : localStorage.getItem("token") ? `Token ${localStorage.getItem("token")}` : null;
	if (typeof token === "string") {
		if (config.headers && token) {
			config.headers.Authorization = token;
		}
	}
	return config;
})
export default instance;
