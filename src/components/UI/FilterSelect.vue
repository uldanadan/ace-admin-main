<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue"

const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
	updateCategory: {
		type: Function,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
})

const selectedCategory = ref('');
const selectedOption =  ref(null);

const defaultLabel = computed(() => {
	return props.type === "category" ? "Все категории" : "Все заказы";
});

const filterByCategory = (category) => {
	selectedCategory.value = category;
	selectedOption.value = category;
	props.updateCategory(category);
}
</script>

<template>
	<Listbox>
		<template #default="{ open }">
			<ListboxButton class="flex justify-between min-w-48 items-center rounded-2xl border-[1.5px] border-brand-accent bg-white px-5 py-2" aria-haspopup="listbox" aria-expanded="true">
				<p class="mr-5 line-clamp-1 inline-block whitespace-nowrap text-sm text-brand-accent lg:text-base">
					{{ selectedOption ? type === category ? selectedOption.name : 'компьютер №' + selectedOption.number : defaultLabel }}
				</p>
				<img src="../../assets/img/icons/down.svg">
			</ListboxButton>
			<ListboxOptions class="options">
				<ListboxOption :value="null" class="options__item text-gray-500" @click="filterByCategory(null)" :class="{ 'bg-brand-accent text-white': selectedCategory === null || selectedOption === null }">
					{{ defaultLabel }}
				</ListboxOption>
				<ListboxOption v-for="(option, index) in options" :key="index" :value="option" class="options__item text-gray-500" @click="filterByCategory(option)" :class="{ 'bg-brand-accent text-white': selectedOption === option }">
					{{ type === "category" ?  option.name : 'компьютер №' + option.number }}
				</ListboxOption>
			</ListboxOptions>
		</template>
	</Listbox>
</template>

<style lang="scss" scoped>
.options {
	@apply absolute mt-1 max-h-60 w-max min-w-48 divide-y divide-brand-line overflow-auto rounded-lg border-[1.5px] border-brand-accent bg-white text-base text-brand-accent shadow-lg;
	&__item {
		@apply cursor-pointer whitespace-nowrap px-6 py-3 transition-all duration-300 ease-in-out;
		&:hover {
			@apply bg-brand-gray text-gray-500;
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
