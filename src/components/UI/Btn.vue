<script setup>
import Loader from "@/components/UI/Loader.vue"
const props = defineProps({
	loader: {
		type: Boolean,
		default: false
	}
})
</script>

<template>
	<button>
		<span v-if="!loader">
			<slot />
		</span>
		<span v-else class="loader"><Loader /></span>
	</button>
</template>

<style lang="scss" scoped></style>
