<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue"
import Button from "@/components/UI/Button.vue";
import { useAdminPanelsStore } from "@/stores/useAdminPanelsStore";
import { useAuthStore } from "@/stores/useAuthStore";
import CashModal from "@/components/Modals/CashModal.vue";
import GuestModal from "@/components/Modals/GuestModal.vue";

const props = defineProps({
	selectedComputers: Array
});

const adminPanelsStore = useAdminPanelsStore();
const authStore = useAuthStore()

const showCashModal = ref(false)
const showGuestModal = ref(false)

const isActive = ref(false);

const toggleActive = () => {
	isActive.value = !isActive.value;
	if (isActive.value) {
		openCashModal();
	}
};

const closeCashModal = () => {
	showCashModal.value = false;
	isActive.value = false;
}
const openCashModal = () => {
	showCashModal.value = true;
}

const closeGuestModal = () => {
	showGuestModal.value = false;
	// isActive.value = false;
}
const openGuestModal = () => {
	showGuestModal.value = true;
}

const selectedAction = ref<string | null>(null);

const selectAction = (action: string) => {
	if (props.selectedComputers.length) {
		selectedAction.value = action;
	}
}

const sendCommand = async () => {
	if (!selectedAction.value || !props.selectedComputers.length) {
		return;
	}

	for (const computer of props.selectedComputers) {
		let commandType = '';
		let email = '';
		let password = '';

		switch (selectedAction.value) {
			case 'turn_off':
				commandType = computer.state=== 'turned_off' ? 'power_on' : 'power_off';
				break;
			case 'refresh':
				commandType = 'reboot';
				break;
			case 'edit':
				commandType = 'alert';
				break;
			case 'start':
				commandType = 'start_session';
				break;
			case 'flag':
				commandType = 'technical_work';
				break;
			case 'stop':
				commandType = 'stop_session';
				break;
			case 'cash':
				openCashModal()
				break;
			default:
				break;
		}

		if (commandType) {
			await adminPanelsStore.sendCommand(commandType, computer.uuid, email, password);
		}
	}
	selectedAction.value = null;
}

onMounted(async () => {
	await sendCommand();
});
</script>

<template>
	<div class="h-full w-full">
		<div>
			<div class="flex items-center justify-between border-b border-brand-line py-4">
				<p v-if="props.selectedComputers.length" class="heading-secondary">
					Действия на ПК № {{ props.selectedComputers.map(computer => computer.number).join(', ') }}
				</p>
				<p v-else class="heading-secondary">Сначала выберите нужный ПК</p>
			</div>
			<div class="space-y-4">
				<div class="flex items-center justify-between inline-block border-[1.5px] border-brand-accent rounded-3xl">
					<div
						class="flex items-center justify-center py-3 w-full cursor-pointer"
						:class="{ 'bg-brand-accent rounded-l-3xl': selectedAction === 'turn_off' }"
						 @click="selectAction('turn_off')"
					>
						<img v-if="selectedAction === 'turn_off'" src="@/assets/img/icons/power_on.svg">
						<img v-else src="@/assets/img/icons/turn_off.svg">
					</div>
					<div
						class="flex items-center justify-center py-3 border-x-[1.5px] border-brand-accent w-full cursor-pointer"
						:class="{ 'bg-brand-accent': selectedAction === 'refresh' }"
						@click="selectAction('refresh')"
					>
						<img v-if="selectedAction === 'refresh'" src="../../../assets/img/icons/refresh2.svg">
						<img v-else src="@/assets/img/icons/back.svg">
					</div>
					<div
						class="flex items-center justify-center py-3 w-full cursor-pointer"
						:class="{ 'bg-brand-accent rounded-r-3xl': selectedAction === 'edit' }"
						@click="selectAction('edit')"
					>
						<img v-if="selectedAction === 'edit'" src="@/assets/img/icons/feather_edit2.svg">
						<img v-else src="@/assets/img/icons/feather_edit.svg">
					</div>
				</div>

				<div class="flex items-center justify-between inline-block border-[1.5px] border-brand-accent rounded-3xl">
					<div
						class="flex items-center justify-center py-3 w-full cursor-pointer"
						:class="{ 'bg-brand-accent rounded-l-3xl': selectedAction === 'start' }"
						@click="selectAction('start')"
					>
						<img v-if="selectedAction === 'start'" src="@/assets/img/icons/uiw_login2.svg">
						<img v-else src="@/assets/img/icons/uiw_login.svg">
					</div>
					<div
						class="flex items-center justify-center py-3 border-l-[1.5px] border-brand-accent w-full cursor-pointer"
						:class="{ 'bg-brand-accent': selectedAction === 'flag' }"
						@click="selectAction('flag')"
					>
						<img v-if="selectedAction === 'flag'" src="@/assets/img/icons/bi_flag2.svg" alt="BI Flag">
						<img v-else src="@/assets/img/icons/bi_flag.svg" alt="BI Flag">
					</div>
					<div
						class="flex items-center justify-center py-3 border-l-[1.5px] border-brand-accent w-full cursor-pointer"
						:class="{ 'bg-brand-accent rounded-r-3xl': selectedAction === 'stop' }"
						@click="selectAction('stop')"
					>
						<img v-if="selectedAction === 'stop'" src="@/assets/img/icons/stop_session2.svg">
						<img v-else src="@/assets/img/icons/stop_session.svg">
					</div>
				</div>
				<div class="flex items-center justify-between inline-block border-[1.5px] border-brand-accent rounded-3xl">
					<div
						class="flex items-center justify-center py-3 w-full cursor-pointer"
						:class="{ 'bg-brand-accent rounded-3xl': isActive }"
						@click.prevent="toggleActive"
					>
						<img v-if="isActive" src="@/assets/img/icons/cash2.svg">
						<img v-else src="@/assets/img/icons/cash.svg">
					</div>
				</div>
				<div class="flex items-center justify-between inline-block border-[1.5px] border-brand-accent rounded-3xl">
					<div
						class="flex items-center justify-center py-3 w-full cursor-pointer"
						@click.prevent="openGuestModal"
					>
						<p>guest</p>
					</div>
				</div>
				<div>
					<Button v-if="selectedAction" @click.prevent="sendCommand" class="btn-accent w-full">Отправить команду</Button>
					<Button v-else @click.prevent="" class="btn-disabled w-full">Выберите действие</Button>
				</div>
			</div>
		</div>
	</div>
	<CashModal :show="showCashModal" max-width="lg" @close="closeCashModal" />
	<GuestModal :show="showGuestModal" max-width="lg" @close="closeGuestModal" />
</template>
