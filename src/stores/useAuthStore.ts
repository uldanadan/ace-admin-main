import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useStorage } from "@vueuse/core"
import AuthDataService from "@/services/AuthDataService.ts"

export const useAuthStore = defineStore("auth", () => {
	const token = ref(useStorage("token", "", localStorage))
	//------------------------------------------------------------------------------
	const setToken = (value: string) => {
		token.value = value
	}
	const login = async (email: string, password: string) => {
		try {
			const response = await AuthDataService.authLogin(email, password)
			if (response.status === 200) {
				setToken(response.data)
				localStorage.setItem("token", response.data)
			} else {
				console.log("ERROR AUTH ", response.status)
			}
		} catch (err) {
			console.log("FAILED LOGIN ", err)
		}
	}
	const removeToken = () => {
		token.value = ""
	}
	//------------------------------------------------------------------------------
	const getToken = computed(() => {
		return token.value
	})
	return { token, getToken, login, setToken, removeToken }
})
