<script setup>
import moment from "moment"
import { ref, onMounted, computed } from "vue"
import { useMainStore } from "@/stores/useMainStore"
import Pagination from "@/components/Pagination.vue"
import { formatDate } from "@/helpers/format.js"
const mainStore = useMainStore()
onMounted(async () => {
	await loadWorkShiftData()
})
const getTopPanelHeight = computed(() => {
	return mainStore.topPanelHeight
})
const getWorkShift = computed(() => {
	return mainStore.workShiftData?.results
})
const getWorkShiftData = computed(() => {
	return mainStore.workShiftData
})

const activePage = ref(1)

function changePage(page) {
	activePage.value = page
	loadWorkShiftData(page)
}

async function loadWorkShiftData(page = 1) {
	mainStore.isLoading = true
	await mainStore.loadWorkShift(page)
	mainStore.isLoading = false
}
</script>

<template>
	<div :style="`height: calc(100vh - ${getTopPanelHeight}px)`">
		<div class="table-secondary">
			<table>
				<thead>
					<tr>
						<th>Login</th>
						<th>Created at</th>
						<th>Ended at</th>
						<th>Game center</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="(item, index) in getWorkShift" :key="index">
						<tr>
							<td>
								<div class="cell-value">
									<p v-if="item.user.email">{{ item.user?.email }}</p>
								</div>
							</td>
							<td>
								<div class="cell-value">
									<p v-if="item.created">
										{{ formatDate(item.created) }}
									</p>
								</div>
							</td>
							<td>
								<div class="cell-value">
									<p v-if="item.ended">{{ formatDate(item.ended) }}</p>
									<p v-else>-</p>
								</div>
							</td>
							<td>
								<div class="cell-value">
									<p v-if="item.game_center">{{ item.game_center?.name }}</p>
								</div>
							</td>
							<td>
								<div class="cell-value">
									<p v-if="item.operations.total_withdrawal_money">{{ item.operations?.total_withdrawal_money }}</p>
								</div>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>
		<div class="sticky bottom-0 left-0 right-0">
			<div class="box-border flex items-center justify-center gap-3 bg-white px-5 py-4">
				<Pagination v-if="getWorkShiftData.count" @change-page="changePage" :total-items="getWorkShiftData.count" />
				<div class="rounded-md border border-brand-line px-2 py-2 text-sm lg:px-4 lg:text-base">
					<p>
						Сеансов:
						<span class="">{{ getWorkShiftData.count }}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
