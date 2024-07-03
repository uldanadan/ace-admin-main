<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useOrderStore } from "@/stores/useOrderStore";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { useRouter } from "vue-router";
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import FilterSelect from "@/components/UI/FilterSelect.vue";
import Pagination from '@/components/UI/Pagination.vue';
import OrderStatusGroup from "./component/OrderStatusGroup.vue";
import { GetOrdersParams } from "./types";

const orderStore = useOrderStore();
const partnersStore = usePartnersStore();
const router = useRouter();

const searchParams = ref<GetOrdersParams>({ page: 1 });
const today = new Date();
const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
startDate.setDate(startDate.getDate() - 7);
const dates = ref<[Date, Date]>([startDate, today]);

const crumbs = [
	{ label: 'Магазин', route: '/shop' },
	{ label: 'Заказы' }
];

const order = computed(() => orderStore.getOrders);
const computers = computed(() => partnersStore.getComputers);

const newProducts = computed(() => order.value?.filter(item => item.status === 'FOR_WAITING' && item.products.length > 0) ?? []);
const inProgressProducts = computed(() => order.value?.filter(item => item.status === 'PAID' && item.products.length > 0) ?? []);
const completedProducts = computed(() => order.value?.filter(item => item.status === 'COMPLETED' && item.products.length > 0) ?? []);
const canceledProducts = computed(() => order.value?.filter(item => item.status === 'CANCELED' && item.products.length > 0) ?? []);

const updateProductStatus = async (productUuids: string[], status: string) => {
	try {
		await Promise.all(productUuids.map(async (uuid) => {
			const currentOrder = order.value!.find(item => item.uuid === uuid);

			if (currentOrder) {
				const updateData = {
					...currentOrder,
					status,
					computer: currentOrder.computer.uuid,
					products: currentOrder.products.map(product => product.uuid)
				};

				await orderStore.updateOrder(uuid, updateData);
			}
		}));
	} catch (error) {
		console.error('Failed to update product status:', error);
	}
};

const updateOrders = (computer: { uuid: string }) => {
	const computerUUID = computer ? computer.uuid : '';
	searchParams.value = { ...searchParams.value, computer: computerUUID, page: 1, created_from: dates.value[0]?.toISOString() || null, created_to: dates.value[1]?.toISOString() || null };
};

const updatePage = (page: number) => {
	searchParams.value = { ...searchParams.value, page };
};

onMounted(async () => {
	try {
		await orderStore.loadOrders(searchParams.value);
		await partnersStore.loadComputers();
	} catch (err) {
		console.log("Failed loadOrders", err);
	}
});

watch(searchParams, async () => {
	await orderStore.loadOrders(searchParams.value);
}, { deep: true });
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
							:multiCalendars="2"
							:clearable="false"
							:range="true"
							locale="ru"
							:format="'dd.MM.yyyy HH:mm'"
							@change="updateOrders"
						></VueDatePicker>
						<button class="btn-accent ml-2" @click="updateOrders({ uuid: '' })">Показать</button>
					</div>
				</div>
			</div>
			<div v-if="order.length" class="flex justify-between pt-8">
				<OrderStatusGroup
					:orders="newProducts"
					title="В ожидании"
					text="Взять в работу"
					@update-status="(uuid) => updateProductStatus(uuid, 'PAID')"
					:buttonClass="'text-yellow-500'"
				/>
				<OrderStatusGroup
					:orders="inProgressProducts"
					title="Новые"
					text="Выполнить"
					@update-status="(uuid) => updateProductStatus(uuid, 'COMPLETED')"
					:buttonClass="'text-green-500'"
				/>
				<OrderStatusGroup
					:orders="completedProducts"
					title="Выполнены"
					text="Отменить"
					@update-status="(uuid) => updateProductStatus(uuid, 'CANCELED')"
					:buttonClass="'text-red-500'"
				/>
				<OrderStatusGroup
					:orders="canceledProducts"
					title="Отменены"
					text=""
					buttonClass=""
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

