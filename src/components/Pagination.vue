<script setup>
import { computed, ref, watchEffect } from "vue"
import ChevronIcon from "@/components/icons/Chevron.vue"
const props = defineProps({
	totalItems: {
		type: Number
	},
	maxButtons: {
		type: Number,
		default: 3
	}
})
const emit = defineEmits(["changePage"])
const activePage = ref(1)
const pages = computed(() => {
	const arrayPages = []
	if (total.value) {
		let count = Math.ceil(total.value / 12)
		for (let i = 1; i <= count; i++) {
			arrayPages.push(i)
		}
	}
	return arrayPages
})
const totalPages = computed(() => {
	return Math.ceil(total.value / 12)
})
const filteredPages = computed(() => {
	return pages.value.slice(activePage.value === 1 ? activePage.value - 1 : activePage.value - 2, activePage.value + 1)
})
const firstPage = computed(() => {
	return 1
})
const endPage = computed(() => {
	return pages.value.length
})
const total = ref(null)
watchEffect(() => {
	total.value = props.totalItems
})
function clickPage(page) {
	if (page) {
		activePage.value = page
		emit("changePage", page)
	}
}
</script>

<template>
	<div>
		<ul class="flex items-center justify-center space-x-1 lg:space-x-3">
			<li>
				<button class="btn" @click.prevent="clickPage(activePage - 1)" :class="{ disabled: activePage === 1 }">
					<ChevronIcon />
				</button>
			</li>

			<li>
				<button class="btn-pagination" @click.prevent="clickPage(firstPage)" :class="{ active: activePage === firstPage }">
					{{ firstPage }}
				</button>
			</li>
			<li v-if="activePage >= maxButtons">...</li>
			<template v-for="(page, index) in filteredPages" :key="index">
				<li v-if="page != firstPage && page != endPage">
					<button class="btn-pagination" @click.prevent="clickPage(page)" :class="{ active: activePage === page }">
						{{ page }}
					</button>
				</li>
			</template>
			<li v-if="activePage <= totalPages - maxButtons">...</li>
			<li>
				<button class="btn-pagination" @click.prevent="clickPage(endPage)" :class="{ active: activePage === endPage }">
					{{ endPage }}
				</button>
			</li>
			<li>
				<button class="btn" @click.prevent="clickPage(activePage + 1)" :class="{ disabled: activePage === pages }">
					<ChevronIcon class="rotate-180" />
				</button>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
ul {
	li {
		.btn {
			@apply flex h-7 w-7 items-center justify-center rounded-full border border-transparent transition-all duration-300 ease-in-out lg:h-10 lg:w-10;
			svg {
				@apply h-4 w-4;
			}
			&:hover {
				@apply border-brand-line bg-brand-gray;
			}
			&.disabled {
				@apply pointer-events-none opacity-50;
			}
		}
		.btn-pagination {
			@apply h-7 w-7 rounded-full border border-transparent text-sm lg:h-10 lg:w-10;
			&.active {
				@apply border-brand-line bg-brand-gray;
			}
		}
	}
}
</style>
