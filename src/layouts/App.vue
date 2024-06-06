<script setup>
import { onMounted, ref } from "vue"
import Nav from "@/components/NavBar/Nav.vue"
import { useMainStore } from "@/stores/useMainStore"
import PageLoader from "@/components/PageLoader.vue"
const mainStore = useMainStore()
onMounted(async () => {
	await mainStore.loadUserInfo()
	if (topPanelRef.value) {
		mainStore.topPanelHeight = topPanelRef.value.getBoundingClientRect().height
	}
})
const topPanelRef = ref(null)
</script>

<template>
	<PageLoader />
	<div v-if="$route.meta.requiresAuth" ref="topPanelRef">
		<Nav />
	</div>
	<main>
		<router-view v-slot="{ Component }">
			<transition>
				<component :is="Component" />
			</transition>
		</router-view>
	</main>
</template>

<style scoped></style>
