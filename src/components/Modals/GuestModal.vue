<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Modal from "@/components/Modals/Modal.vue";
import Dropdown from "@/components/Dropdown.vue"
import { usePartnersStore } from "@/stores/usePartnersStore";
import { useAdminPanelsStore } from "@/stores/useAdminPanelsStore";

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

const partnersStore = usePartnersStore();
const adminPanelsStore = useAdminPanelsStore();

const amount = ref("");
const data = ref({
	user: "",
	game_center: ""
})
const activeButton = ref(null);
const paymentType = ref("");
const errors = ref([]);

const gameCenters = computed(() => {
	return partnersStore.getGameCenters || [];
});

const toggleActive = (button) => {
	if (activeButton.value === button) {
		activeButton.value = null;
		paymentType.value = "";
	} else {
		activeButton.value = button;
		paymentType.value = button;
	}
};

const resetState = () => {
	amount.value = "";
	paymentType.value = "";
	activeButton.value = null;
}

const close = () => {
	emit("close");
	resetState();
};

function selectedGameCenter(item) {
	data.value.game_center = item.slug
}

const postUser = async () => {
	try {
		await adminPanelsStore.postUser({
			"tariff_pk": null,
			"game_center_slug": data.value.game_center,
			"balance_amount": amount.value,
			"payment_type": paymentType.value,
		})
		close();
	} catch (err) {
		console.error("Ошибка при cоздание временных пользователей:", err)
	}
}
</script>

<template>
	<Modal :show="show" :max-width="maxWidth" :closeable="closeable" @close="close">
		<div class="mx-auto w-full overflow-hidden rounded-xl bg-white p-9 md:w-[450px]">
			<div>
				<p class="mb-1">Клуб</p>
				<Dropdown :class="{ error: errors.includes('game_center') }" :items="gameCenters" @selected-value="selectedGameCenter" :search-value="'name'">
					<template v-slot:head="{ selected }">
						{{ selected.slug }}
					</template>
					<template v-slot:content="{ filteredItem }">
						{{ filteredItem.slug }}
					</template>
				</Dropdown>
			</div>
			<div>
				<p class="mb-1">Сумма</p>
				<input v-model="amount" type="number" class="input-primary" />
			</div>
			<div class="flex items-center justify-end pt-2 text-brand-accent">
				<button
					class="px-1 border-b border-dashed border-brand-accent hover:brightness-50"
					:class="{ 'brightness-50': activeButton === 'cash' }"
					@click="toggleActive('cash')"
				>cash</button>
				<button
					class="px-1 mx-5 border-b border-dashed border-brand-accent hover:brightness-50"
					:class="{ 'brightness-50': activeButton === 'kaspi' }"
					@click="toggleActive('kaspi')"
				>kaspi</button>
				<button
					class="px-1 border-b border-dashed border-brand-accent hover:brightness-50"
					:class="{ 'brightness-50': activeButton === 'gift' }"
					@click="toggleActive('gift')"
				>gift</button>
			</div>
			<div class="flex items-center justify-center pt-6 text-right">
				<button @click.prevent="postUser" class="btn-accent">Пополнить</button>
			</div>
		</div>
	</Modal>
</template>
