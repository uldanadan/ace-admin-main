<script setup lang="ts">
import { ref, defineProps } from "vue";
import InputPrimary from "@/components/UI/InputPrimary.vue";
import Close from "@/components/icons/Close.vue";
import Button from "@/components/UI/Button.vue";

defineProps({
	opened: {
		type: Boolean,
		default: false
	},
	coordinates: {
		type: String
	}
})
const emit = defineEmits(["closeSidebar"])

const close = () => {
	emit("closeSidebar", false)
}
const place_number = ref()
const zone = ref()
const ip_address = ref()
const mac_address = ref()

const data = ref({
	place_number: place_number.value,
	zone: zone.value,
	ip_address: ip_address,
	mac_address: mac_address.value
})
</script>

<template>
	<div class="sidebar fixed inset-y-0 right-0 z-30 flex h-full w-full justify-end" :class="{ active: opened }">
		<div @click.prevent="close" class="backdrop"></div>
		<div class="sidebar-wrapper relative z-20 h-full w-[90%] bg-white md:w-[400px]">
			<div>
				<div class="flex items-center justify-between border-b border-brand-line p-4 md:p-6">
					<p class="heading-secondary">Добавление нового ПК</p>
					<button @click.prevent="close" class="btn-close">
						<Close />
					</button>
				</div>
				<div class="space-y-4 p-4 md:p-6">
					<div class="input-wrapper">
						<label for="">Номер места</label>
						<InputPrimary class="input-primary" type="text" name="place" v-model="place_number" />
					</div>
					<div class="input-wrapper">
						<label for="">Зона</label>
						<InputPrimary class="input-primary" type="text" name="zone" v-model="zone" />
					</div>
					<div class="input-wrapper">
						<label for="">IP адрес</label>
						<InputPrimary class="input-primary" type="text" name="ip_address" v-model="ip_address" />
					</div>
					<div class="input-wrapper">
						<label for="">MAC адрес</label>
						<InputPrimary class="input-primary" type="text" name="mac_address" v-model="mac_address" />
					</div>
					<div>
						<Button class="btn-accent w-full">Сохранить</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.sidebar {
	@apply invisible opacity-0 transition-all duration-300 ease-in-out;
	.sidebar-wrapper {
		@apply invisible translate-x-20 opacity-0 transition-all duration-500 ease-in-out;
	}
	&.active {
		@apply visible opacity-100;
		.sidebar-wrapper {
			@apply visible translate-x-0 opacity-100;
		}
	}
}
</style>
