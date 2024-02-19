<script setup lang="ts">
import { onMounted } from "vue"
import Nav from "@/components/Nav.vue"

onMounted(() => {
	console.log("APP MOUNTED")

	// partnersStore.loadGameCenters()
})
</script>

<template>
	<div v-if="$route.meta.requiresAuth">
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
