<script setup lang="ts">
import ComputersMap from "@/components/ComputersMap.vue"
import SidebarAddComputer from "@/components/SidebarAddComputer.vue"
import { ref } from "vue"
const coordinates = ref({
	x: "",
	y: ""
})
const openedSidebar = ref(false)
const openSidebar = (x: string, y: string) => {
	coordinates.value.x = x
	coordinates.value.y = y
	openedSidebar.value = true
}
const closeSidebar = () => {
	openedSidebar.value = false
}
</script>

<template>
	<section>
		<SidebarAddComputer @close-sidebar="closeSidebar" :coordinates="coordinates" :opened="openedSidebar" />
		<div>
			<ComputersMap @open-sidebar="openSidebar" />
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
