<script setup>
import { ref, onMounted, computed, watchEffect, watch } from "vue"
import { refDebounced } from "@vueuse/core"
import { onClickOutside } from "@vueuse/core"

const props = defineProps({
	items: {
		type: Array
	},
	item: {
		type: String
	},
	searchValue: {
		type: String
	},
	selectedId: {
		type: Number
	},
	col: {
		type: Object,
		required: false
	},
	clear: {
		type: Function
	},
	disabled: {
		type: Boolean
	},
	error: {
		type: Boolean,
		default: false
	},
	errorMessage: {
		type: String
	}
})
const selectedValue = computed(() => {
	return props.items.find((item, index) => {
		return item?.uuid === selected?.value
	})
})

const emit = defineEmits(["selectedValue"])
const filteredItems = ref([])
const search = ref("")
const searchDebounced = refDebounced(search, 1000)
const dropdown = ref(null)
const opened = ref(false)
const selected = ref(null)
const refDropdownContent = ref(null)
const refDropdownToggle = ref(null)
const positionLeft = ref(null)
const positionTop = ref(null)

watchEffect(() => {
	filteredItems.value = props.items
	selected.value = props.selectedId
})

watch(
	selectedValue,
	newValue => {
		if (newValue) {
			emit("selectedValue", newValue, props?.col)
		}
	},
	{ immediate: true }
)
watch(opened, newValue => {
	if (!newValue) {
		search.value = ""
	} else {
		getPosition()
	}
})
onClickOutside(refDropdownContent, event => {
	if (!refDropdownToggle.value.contains(event.target)) {
		opened.value = false
	}
})

function getPosition() {
	const el = refDropdownToggle.value.getBoundingClientRect()
	const left = el.left
	const bottom = window.screen.height - el.top
	const top = window.screen.height - bottom + el.height

	positionLeft.value = left
	positionTop.value = top
}
const toggle = () => {
	opened.value = !opened.value
}
const changeSelectedItem = (item, index) => {
	selected.value = item.uuid
	opened.value = false
}

watch(
	searchDebounced,
	newValue => {
		if (newValue != "" && props.searchValue && props.items.length > 0) {
			const filtered = props.items.filter(item => {
				return item[props.searchValue].toLowerCase().includes(newValue.toLowerCase())
			})
			if (filtered) {
				filteredItems.value = filtered
			}
		} else {
			if (props.items.length > 0) {
				filteredItems.value = props.items
			}
		}
	},
	{ immediate: true }
)

onMounted(() => {
	;[...document.querySelectorAll(".scroll-area")].forEach(item => {
		item.addEventListener("scroll", e => {
			if (opened.value) {
				opened.value = false
			}
		})
	})
})
</script>

<template>
	<div ref="dropdown" :class="[{ active: opened }, { disabled: disabled }]" class="dropdown">
		<div ref="refDropdownToggle" @click.prevent="toggle" class="dropdown-toggle">
			<!-- <input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" type="text" /> -->
			<slot v-if="selectedValue" name="head" :selected="selectedValue" />
			<div v-else class="text-xs font-medium">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-3">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
				</svg>
			</div>
			<div class="h-4 w-4">
				<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
				</svg>
			</div>
		</div>
		<teleport to="body">
			<transition name="dropdown">
				<div v-if="opened" ref="refDropdownContent" :style="`left: ${positionLeft}px; top: ${positionTop}px`" :class="{ active: opened }" class="dropdown-content">
					<div>
						<div class="dropdown-content__search mb-1">
							<div class="input-search">
								<input v-model="search" type="text" class="h-full w-full bg-transparent outline-none" />
								<div class="h-5 w-5">
									<svg class="h-full w-full text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
									</svg>
								</div>
							</div>
						</div>
						<ul class="space-y-[2px]">
							<template v-if="filteredItems.length > 0">
								<li v-for="(item, index) in filteredItems" :key="index">
									<button @click.prevent="changeSelectedItem(item, index)" class="dropdown-btn" :class="{ active: item?.uuid === selectedValue?.uuid }">
										<slot name="content" :filtered-item="item" />
									</button>
								</li>
							</template>
							<template v-else>
								<div class="text-center font-semibold">Не найдено</div>
							</template>
						</ul>
					</div>
				</div>
			</transition>
		</teleport>
	</div>
</template>

<style lang="scss">
.dropdown {
	@apply relative h-full w-full;
	&-toggle {
		@apply flex h-12 cursor-pointer items-center justify-between rounded-lg border border-brand-line px-3 font-medium transition-all duration-300 ease-in-out;
	}

	&.active {
		.dropdown-toggle {
			@apply border-brand-accent;
			outline: 0 none;
			outline-offset: 0;
			box-shadow: 0 0 0 0.1rem #819cff;
		}
		.dropdown-content {
			@apply pointer-events-auto visible h-auto opacity-100;
		}
	}
	&.disabled {
		@apply pointer-events-none;
		.dropdown-toggle {
			@apply pointer-events-none bg-transparent text-gray-400;
		}
	}
	&.error {
		.dropdown-toggle {
			@apply border-red-500;
			outline: 0 none;
			outline-offset: 0;
			box-shadow: 0 0 0 0.1rem theme("colors.brand-red");
		}
	}
}
.dropdown-content {
	@apply absolute z-50 mt-[2px] max-h-[300px] min-w-[200px] max-w-[300px] overflow-auto rounded border bg-white px-2 py-2 drop-shadow-lg transition-all duration-300 ease-in-out;
	ul {
		li {
			.dropdown-btn {
				@apply w-full rounded px-2 py-1.5 text-left font-medium text-brand-dark transition-all duration-300 ease-in-out;
				&:hover {
					@apply bg-brand-gray;
				}
				&.active {
					@apply bg-brand-gray text-brand-accent;
				}
			}
		}
	}
}
</style>
