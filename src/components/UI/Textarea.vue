<script setup lang="ts">
import { defineProps } from "vue"
defineProps({
	modelValue: {
		type: String
	},
	cols: {
		type: Number
	},
	rows: {
		type: Number
	},
	name: {
		type: String
	},
	label: {
		type: String
	}
})

const emit = defineEmits<{
	(event: "update:modelValue", payload: string): void
}>()

function updateValue(value: string) {
	emit("update:modelValue", value)
}
</script>

<template>
	<textarea @input="updateValue(($event.target as HTMLInputElement).value)" :value="modelValue" :name="name" id="" :cols="cols" :rows="rows" :placeholder="label" class="w-full rounded-lg border border-brand-line p-4 focus:outline-none"></textarea>
</template>

<style lang="scss" scoped></style>
