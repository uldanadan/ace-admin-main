<script setup lang="ts">
import { ref, watch, defineProps } from "vue"
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue"

const props = defineProps({
	options: {
		type: Array
	}
})
const emits = defineEmits(["update:modelValue"])
const selectedOption = ref(props?.options?.[0])

watch(
	selectedOption,
	newValue => {
		emits("update:modelValue", newValue)
	},
	{ immediate: true }
)
</script>

<template>
	<Listbox v-model="selectedOption">
		<template #default="{ open }">
			<ListboxButton class="flex rounded-lg border border-brand-line bg-white px-5 py-4" aria-haspopup="listbox" aria-expanded="true">
				<p class="mr-5 line-clamp-1 inline-block whitespace-nowrap text-sm text-brand-dark lg:text-base">{{ selectedOption ? selectedOption.name : '' }}</p>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
				</svg>
			</ListboxButton>
			<ListboxOptions class="options">
				<ListboxOption v-for="(option, index) in options" :value="option" :key="index" class="options__item">
					{{ option.name }}
				</ListboxOption>
			</ListboxOptions>
		</template>
	</Listbox>
</template>

<style lang="scss" scoped>
.options {
	@apply absolute mt-2 max-h-60 w-full divide-y divide-brand-line overflow-auto rounded-lg border border-brand-line bg-white text-base text-brand-dark shadow-lg;
	&__item {
		@apply cursor-pointer whitespace-nowrap px-6 py-3 text-gray-500 transition-all duration-300 ease-in-out;
		&:hover {
			@apply bg-brand-gray;
		}
		&:last-child {
			@apply border-transparent;
		}
		&.active {
			@apply text-white;
		}
	}
	&::-webkit-scrollbar-thumb {
		@apply rounded-full bg-brand-accent/60;
	}
	&::-webkit-scrollbar {
		@apply w-[1px] bg-transparent;
	}
}
</style>
