import { defineStore } from "pinia"
import { ref, computed } from "vue"
import UsersDataService from "@/services/UsersDataService.ts"

export const useUsersStore = defineStore("users", () => {
	const users = ref()
	//------------------------------------------------------------------------------
	const loadUsers = async () => {
		const response = await UsersDataService.getUsers()
		users.value = response.data
	}
	//------------------------------------------------------------------------------
	const getUsers = computed(() => {
		return users.value
	})
	return { users, getUsers, loadUsers }
})
