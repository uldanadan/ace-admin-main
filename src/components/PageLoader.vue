<script setup>
import { useMainStore } from "@/stores/useMainStore"
import Loader from "@/components/UI/Loader.vue"
import { computed, watch, ref } from "vue"
const mainStore = useMainStore()

const isLoading = computed(() => {
	return mainStore.isLoading
})

watch(
	() => isLoading,
	() => {
		if (isLoading.value) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = null
		}
	}
)
</script>

<template>
	<div :class="{ active: isLoading }" class="page-loader">
		<div class="flex h-20 w-20 items-center justify-center rounded-xl bg-white md:h-24 md:w-24">
			<Loader class="dark-style h-16 w-16 md:h-20 md:w-20" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page-loader {
	@apply pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-gray-500/50 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out;
	&.active {
		@apply pointer-events-auto visible opacity-100;
	}
}
</style>
