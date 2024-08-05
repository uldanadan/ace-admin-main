<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Modal from "@/components/Modals/Modal.vue";
import { inputNumber } from "@/helpers/input-mask";
import { useAdminPanelsStore } from "@/stores/useAdminPanelsStore";
import { useMainStore } from "@/stores/useMainStore";

const emit = defineEmits(["close"]);

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	maxWidth: {
		type: String,
		default: "2xl"
	},
	closeable: {
		type: Boolean,
		default: true
	}
});

const adminPanelsStore = useAdminPanelsStore();
const mainStore = useMainStore();

const resetState = () => {
	amount.value = "";
	email.value = "";
}

const close = () => {
	emit("close");
	resetState();
};

const email = ref("");
const amount = ref("");
const gameCenterSlug = ref("");

const getWorkShifts = computed(() => mainStore.workShiftData?.results || []);

const fetchGameCenterSlug = () => {
	const currentWorkShift = getWorkShifts.value.find(shift => shift.user.email === email.value);

	if (currentWorkShift) {
		gameCenterSlug.value = currentWorkShift.game_center.slug;
	} else {
		console.error("Не удалось найти информацию о текущем администраторе.");
	}
};

const postBalance = async () => {
	try {
		if (gameCenterSlug.value) {
			await adminPanelsStore.postBalance({
				pk: `${email.value}$${gameCenterSlug.value}`,
				amount: amount.value,
			});
			close();
		} else {
			console.error("Не удалось определить slug для game_center.");
		}
	} catch (error) {
		console.error("Ошибка при пополнении баланса:", error);
	}
};

const loadWorkShiftData = async (page = 1) => {
	await mainStore.loadWorkShift(page);
};

onMounted(async () => {
	await loadWorkShiftData();
});

watch(email, () => {
	if (email.value) {
		fetchGameCenterSlug();
	}
});
</script>

<template>
	<Modal :show="show" :max-width="maxWidth" :closeable="closeable" @close="close">
		<div class="mx-auto w-full overflow-hidden rounded-xl bg-white p-9 md:w-[450px]">
			<p class="text-xl font-medium pb-9">Пополнение наличными</p>
			<div>
				<p class="mb-1">Email</p>
				<input v-model="email" type="email" class="input-primary" />
			</div>
			<div>
				<p class="mb-1">Сумма</p>
				<input v-model="amount" @keypress="inputNumber()" type="text" class="input-primary" />
			</div>
			<div class="flex items-center justify-center pt-6 text-right">
				<button @click.prevent="postBalance" class="btn-accent">Пополнить</button>
			</div>
		</div>
	</Modal>
</template>
