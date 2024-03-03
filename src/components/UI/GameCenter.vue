<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue"

const props = defineProps({
	options: {
		type: Array
	}
})

const selectedOption =  ref(null);

const filterByGameCenter = (center?) => {
	selectedOption.value = center;
	if (center) {
		localStorage.setItem('selectedGameCenter', JSON.stringify(center));
	} else {
		localStorage.removeItem('selectedGameCenter');
	}
	window.location.reload();
}

onMounted(() => {
	const storedGameCenter = localStorage.getItem('selectedGameCenter');
	if (storedGameCenter) {
		selectedOption.value = JSON.parse(storedGameCenter);
	}
});
</script>

<template>
	<Listbox>
		<template #default="{ open }">
			<ListboxButton class="flex justify-between items-center px-5 py-3" aria-haspopup="listbox" aria-expanded="true">
				<p class="mr-5 line-clamp-1 inline-block whitespace-nowrap text-sm text-gray-500 lg:text-base">{{ selectedOption ? selectedOption.name : 'Все клубы' }}</p>
				<img src="../../assets/img/icons/down-center.svg">
			</ListboxButton>
			<ListboxOptions class="options">
				<ListboxOption :value="''" class="options__item text-gray-500" @click="filterByGameCenter()" :class="{ 'bg-brand-accent text-white': !selectedOption }">
					Все клубы
				</ListboxOption>
				<ListboxOption v-for="(option, index) in options" :key="index" :value="option" class="options__item text-gray-500" @click="filterByGameCenter(option)" :class="{ 'bg-brand-accent text-white': selectedOption?.uuid === option.uuid }">
					{{ option.name }}
				</ListboxOption>
			</ListboxOptions>
		</template>
	</Listbox>
</template>

<style lang="scss" scoped>
.options {
	@apply absolute mt-1 max-h-60 w-max min-w-40 divide-y divide-brand-line overflow-auto rounded-lg border-[1.5px] border-brand-accent bg-white text-base text-brand-accent shadow-lg;
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
