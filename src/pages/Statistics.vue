<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import type { Statistics } from "@/types/types"
import { useMainStore } from "@/stores/useMainStore"
import Button from "@/components/UI/Button.vue"
import { toast } from "vue3-toastify"
const mainStore = useMainStore()

onMounted(() => {})

const data = ref({
	other_expenses: 0,
	cash_paid_for_taxes: 0,
	total_cash_expenditure: 0
})
const statisticsLink = computed(() => {
	return mainStore.getStatistics
})
const downloadStatistics = async () => {
	try {
		await mainStore.loadStatistics(data.value)
		const link = document.createElement("a")
		link.href = statisticsLink.value
		link.download = "demo.xlsx"
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	} catch (err) {
		console.log("ERROR WITH DOWNLOAD STATISTICS" + err)
	} finally {
	}
}
</script>

<template>
	<section>
		<div class="w-container">
			<div class="space-y-3">
				<div class="input-wrapper">
					<label for="">Other Expenses</label>
					<input v-model="data.other_expenses" type="text" class="input-primary" placeholder="Other Expenses" />
				</div>
				<div class="input-wrapper">
					<label for="">Cash paid for taxes</label>
					<input v-model="data.cash_paid_for_taxes" type="text" class="input-primary" placeholder="Cash paid for taxes" />
				</div>
				<div class="input-wrapper">
					<label for="">Total cash expenditure</label>
					<input v-model="data.total_cash_expenditure" type="text" class="input-primary" placeholder="Total cash expenditure" />
				</div>
				<div class="flex justify-end">
					<Button @click.prevent="downloadStatistics" class="btn-accent">Скачать статистику</Button>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
