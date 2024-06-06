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
	emit("closeSidebar", false)
}

</script>

<template>
	<div class="sidebar fixed inset-y-0 right-0 z-30 flex h-full w-full justify-end" :class="{ active: opened }">
		<div @click.prevent="close" class="backdrop"></div>
		<div class="sidebar-wrapper relative z-20 h-full w-[90%] bg-white md:w-[400px]">
			<div>
				<div class="flex items-center justify-between border-b border-brand-line p-4 md:p-6">
					<p class="heading-secondary" >Действия на ПК № {{ selectedComputer?.number }}</p>
					<button @click.prevent="close" class="btn-close">
						<Close />
					</button>
				</div>
				<div class="space-y-4 md:p-6">
					<div class="flex items-center justify-between inline-block border-[1.5px] border-brand-accent rounded-3xl">
						<div class="px-11 py-3">
							<img src="@/assets/img/icons/turn_off.svg">
						</div>
						<div class="px-11 py-3 border-x-[1.5px] border-brand-accent">
							<img src="@/assets/img/icons/back.svg">
						</div>
						<div class="px-11 py-3">
							<img src="@/assets/img/icons/feather_edit.svg">
						</div>
					</div>

					<div class="flex items-center justify-between inline-block border-[1.5px] border-brand-accent rounded-3xl">
						<div class="px-11 py-3">
							<img src="@/assets/img/icons/uiw_login.svg">
						</div>
						<div class="px-11 py-3 border-x-[1.5px] border-brand-accent">
							<img src="@/assets/img/icons/bi_flag.svg">
						</div>
						<div class="px-11 py-3">
							<img src="@/assets/img/icons/fluent_time.svg">
						</div>
					</div>
					<div>
						<Button @click.prevent="" class="btn-accent w-full">Отправить команду</Button>
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
