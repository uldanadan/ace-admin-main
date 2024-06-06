<script setup>
import { ref, onMounted, watch, computed } from "vue"
import { useMainStore } from "@/stores/useMainStore"
import Dropdown from "@/components/Dropdown.vue"
import { toast } from "vue3-toastify"
import { validate } from "@/helpers/validate.js"
import { inputNumber } from "@/helpers/input-mask"
const mainStore = useMainStore()

const getWorkShiftData = computed(() => {
	return mainStore.workShiftData
})
const data = ref({
	user: "",
	game_center: ""
})
const errors = ref([])
const loader = ref(false)
const isChecked = ref(false)
const gameCenters = computed(() => {
	return mainStore.gameCenters
})
const getOpenedWorkShift = computed(() => {
	return mainStore.openedWorkShift
})
const user = computed(() => {
	return mainStore.user
})

onMounted(async () => {
	mainStore.isLoading = true
	await mainStore.loadGameCenters()
	await setDefaultData()
	await checkOpenedWorkShift()
	mainStore.isLoading = false
})
function setDefaultData() {
	data.value.user = user.value?.uuid
	data.value.game_center = ""
}
async function checkOpenedWorkShift() {
	try {
		const response = await mainStore.loadOpenedWorkShift()
		if (response.status === 200) {
			const workShift = response.data.results[0]
			if (workShift.ended === null) {
				mainStore.setOpenedWorkShift(workShift.uuid)
			} else {
				mainStore.setOpenedWorkShift(null)
				console.log("Нет активных смен")
			}
		}
	} catch (err) {
		console.log("ERROR WITH LOAD_OPENED_WORKSHIFT", err)
	} finally {
		isChecked.value = true
	}
}
async function createWorkShift() {
	errors.value = validate(data.value)
	if (errors.value.length === 0) {
		data.value.user = user.value?.uuid
		try {
			loader.value = true
			const response = await mainStore.createWorkShift(data.value)
			if (response.status === 201 || response.status === 200) {
				loader.value = false
				await checkOpenedWorkShift()
				mainStore.setOpenedWorkShift(response?.data?.uuid)
				toast("Смена открыта!", {
					type: "info",
					pauseOnFocusLoss: false,
					position: "top-center",
					pauseOnHover: false
				})
			}
		} catch (err) {
			console.log("ERROR")
			loader.value = false
			if (err.response.status === 400) {
				toast("Ошибка", {
					type: "error",
					pauseOnFocusLoss: false,
					position: "top-center",
					pauseOnHover: false
				})
			}
		} finally {
			loader.value = false
		}
	}
}
async function closeWorkShift() {
	try {
		loader.value = true
		const response = await mainStore.closeWorkShift(getOpenedWorkShift.value, { is_active: false })
		console.log("response close", response)
		if (response.status === 200) {
			toast("Смена закрыта!", {
				type: "info",
				pauseOnFocusLoss: false,
				position: "top-center",
				pauseOnHover: false
			})
		}
	} catch (err) {
		loader.value = false
		console.log("ERROR WITH CLOSE WORKSHIFT", err)
	} finally {
		await checkOpenedWorkShift()
		setDefaultData()
		loader.value = false
	}
}
function selectedGameCenter(item) {
	data.value.game_center = item.uuid
	errors.value = validate(data.value)
}
</script>

<template>
	<div class="w-container pb-10">
		<div class="flex w-full items-center justify-center">
			<div v-if="isChecked" class="w-full rounded-xl border border-brand-line bg-white px-5 py-8 shadow-lg md:w-[400px]">
				<div class="space-y-4" v-if="getOpenedWorkShift === null">
					<p class="text-xl font-medium">Открытие новой смены</p>
					<div v-if="user">
						<p class="mb-1">Пользователь</p>
						<div class="flex h-12 items-center rounded-lg border border-brand-line bg-brand-gray px-3">
							{{ user.email }}
						</div>
					</div>
					<div>
						<p class="mb-1">Клуб</p>
						<Dropdown :class="{ error: errors.includes('game_center') }" :items="gameCenters" @selected-value="selectedGameCenter" :search-value="'name'">
							<template v-slot:head="{ selected }">
								{{ selected.name }}
							</template>
							<template v-slot:content="{ filteredItem }">
								{{ filteredItem.name }}
							</template>
						</Dropdown>
					</div>

					<div>
						<p class="mb-1">Баланс кассы</p>
						<input @keypress="inputNumber()" type="text" class="input-primary" />
					</div>
					<Btn :loader="loader" class="btn-primary w-full" @click.prevent="createWorkShift">Открыть кассу</Btn>
				</div>
				<div v-else class="space-y-4">
					<p class="text-xl font-medium">Смена открыта</p>
					<div v-if="user">
						<p class="mb-1">Пользователь</p>
						<div class="flex h-12 items-center rounded-lg border border-brand-line bg-brand-gray px-3">
							{{ user.email }}
						</div>
					</div>
					<div>
						<p class="mb-1">UUID смены:</p>
						<div class="flex h-12 items-center rounded-lg border border-brand-line bg-brand-gray px-3 text-sm">
							{{ getOpenedWorkShift }}
						</div>
					</div>
					<Btn :loader="loader" class="btn-primary w-full" @click.prevent="closeWorkShift">Закрыть текущую кассу</Btn>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
