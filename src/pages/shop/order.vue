<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import { useOrderStore } from "@/stores/useOrderStore";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { useRouter } from "vue-router";
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import VueSelect from "vue-select";
import { GetOrdersParams } from "./types";
import FilterSelect from "@/components/UI/FilterSelect.vue";
import Pagination from '@/components/UI/Pagination.vue';
import OrderStatusGroup from "./component/OrderStatusGroup.vue";

const orderStore = useOrderStore();
const partnersStore = usePartnersStore();
const router = useRouter();

const searchParams = ref<GetOrdersParams>({page: 1});
const today = new Date();
const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
const dates = ref([startDate, today]);

const crumbs = [
	{ label: 'Магазин', route: '/shop' },
	{ label: 'Заказы' }
];

const order = computed(() => orderStore.getOrders?.results);
const computers = computed(() => partnersStore.getComputers);

const newProducts = computed(() => order.value?.filter(item => item.status === 'FOR_WAITING') ?? []);
const inProgressProducts = computed(() => order.value?.filter(item => item.status === 'PAID') ?? []);
const completedProducts = computed(() => order.value?.filter(item => item.status === 'COMPLETED') ?? []);
const canceledProducts = computed(() => order.value?.filter(item => item.status === 'CANCELED') ?? []);

const updateProductStatus = async (uuid, status) => {
	try {
		await orderStore.updateOrder(uuid, { status });
	} catch (error) {
		console.error('Failed to update product status:', error);
	}
};

const updateOrders = (computer: { uuid: string }) => {
	const computerUUID = computer ? computer.uuid : '';
	searchParams.value = { ...searchParams.value, computer: computerUUID, page: 1 };
};

const updatePage = (page: number) => {
	searchParams.value = { ...searchParams.value, page: page };
};

onMounted(async () => {
	try {
		await orderStore.loadOrders(searchParams.value);
		await partnersStore.loadComputers();
	} catch (err) {
		console.log("Failed loadOrders", err);
	}
})

watch(searchParams, async () => {
	await orderStore.loadOrders(searchParams.value);
}, {deep: true});

</script>

<template>
	<section>
		<div v-if="order" class="w-container h-[80vh]">
			<div class="flex items-center justify-between">
				<div class="text-second-dark">
					<h2 class="text-4xl font-semibold">Магазин</h2>
					<Breadcrumbs :crumbs="crumbs" />
				</div>
				<div class="flex items-center space-x-7">
					<div><FilterSelect :options="computers" :updateCategory="updateOrders" type="computer" /></div>
					<div class="flex items-center">
						<VueDatePicker
							v-model="dates"
							:clearable="false"
							:range="true"
							locale="ru"
							:format="'dd.MM.yyyy HH:mm'"
							@change="updateOrders"
						></VueDatePicker>
						<button class="btn-accent ml-2" @click="updateOrders">Показать</button>
					</div>
				</div>
			</div>
			<div v-if="order.length" class="flex justify-between pt-8">
				<OrderStatusGroup
					:orders="newProducts"
					title="Новые"
					text="Взять в работу"
				/>
				<OrderStatusGroup
					:orders="inProgressProducts"
					title="В работе"
					text="Выполнить"
				/>
				<OrderStatusGroup
					:orders="completedProducts"
					title="Выполнены"
					text="Отменить"
				/>
				<OrderStatusGroup
					:orders="canceledProducts"
					title="Отменены"
				/>
			</div>
			<div v-else style="height: 100vh; padding-top: 2rem">
				<div class="flex">
					<h2 class="text-xl pl-4">На данный момент нет текущих заказов</h2>
				</div>
			</div>
			<Pagination v-if="order.length" :totalCount="orderStore.count" @onChangePage="updatePage" />
		</div>
	</section>
</template>

<style lang="scss" scoped>
.btn-accent {
	padding-inline: 24px !important;
}
.title {
	@apply font-semibold bg-gray-100 p-2 rounded-lg border border-brand-line text-gray-500;
}
</style>
