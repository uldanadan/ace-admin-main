<script setup lang="ts">
import { ref, defineProps, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import Close from "@/components/icons/Close.vue";
import Button from "@/components/UI/Button.vue";
import { useAdminPanelsStore } from "@/stores/useAdminPanelsStore";

const props = defineProps({
	opened: Boolean,
	selectedComputer: Object
});

const router = useRouter();
const adminPanelsStore = useAdminPanelsStore();

const emit = defineEmits(["closeSidebar"]);

const close = () => {
	emit("closeSidebar", false);
	window.location.reload();
}

const swapComputers = () => {
	window.location.reload();
}

</script>

<template>
	<div class="sidebar fixed inset-y-0 right-0 z-30 flex h-full w-full justify-end" :class="{ active: opened }">
		<div @click.prevent="close" class="backdrop"></div>
		<div class="sidebar-wrapper relative z-20 h-full w-[90%] bg-white md:w-[400px]">
			<div>
				<div class="flex items-center justify-between border-b border-brand-line p-4 md:p-6">
					<p class="heading-secondary">Действие на ПК</p>
					<button @click.prevent="close" class="btn-close">
						<Close />
					</button>
				</div>
				<div class="space-y-4 p-4 md:p-6">
					<div v-for="(computer, index) in selectedComputer" :key="index">
						<label>Номер</label>
						<p>{{ computer.number }}</p>
					</div>
					<div>
						<Button @click.prevent="swapComputers" class="btn-accent w-full">
							<span class="refresh flex justify-center"><img src="@/assets/img/icons/refresh.svg"> Пересадка</span>
						</Button>
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
.refresh img:first-child {
	margin-right: 10px;
}
</style>
