<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import { useOrderStore } from "@/stores/useOrderStore";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { useRouter } from "vue-router";
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import VueSelect from "vue-select";
import FilterSelect from "@/components/UI/FilterSelect.vue";

const orderStore = useOrderStore();
const partnersStore = usePartnersStore();
const router = useRouter();

const searchParams = ref({});
const today = new Date();
const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
const dates = ref([startDate, today]);

const crumbs = [
	{ label: 'Магазин', route: '/shop' },
	{ label: 'Заказы' }
];

const order = computed(() => orderStore.getOrders?.results);
const computers = computed(() => partnersStore.getComputers);

const newProducts = computed(() => {
	return order.value?.filter(item => item.status === 'PAID') ?? [];
});
const inProgressProducts = computed(() => {
	return order.value?.filter(item => item.status === 'FOR_WAITING') ?? [];
});
const completedProducts = computed(() => {
	return order.value?.filter(item => item.status === 'COMPLETED') ?? [];
});
const canceledProducts = computed(() => {
	return order.value?.filter(item => item.status === 'CANCELED') ?? [];
});

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
			<div v-if="order.length"  class="flex justify-between py-8">
				<div class="min-w-[300px]">
					<h3 class="title">Новые</h3>
					<ul class="list tariffs-wrapper overflow-y-auto">
						<li v-for="(item, index) in newProducts" :key="index" class="flex justify-between items-center border-b border-brand-line py-5">
							<div v-if="item.products[0].thumbnail?.image" class="h-20 w-20">
								<img :src="item.products[0].thumbnail.image" class="h-full w-full object-cover" alt="" />
							</div>
							<div>
								<p class="text-base font-medium">{{ item.products[0].name }}</p>
								<p class="text-sm leading-3 font-medium py-2">{{ item.products[0].price }} ₸</p>
								<p class="text-xs font-medium">компьютер: {{ item.computer?.number }}</p>
							</div>
							<button @click="updateProductStatus(item.uuid, 'FOR_WAITING')" class="text-yellow-500 hover:text-yellow-700">В работе</button>
						</li>
					</ul>
				</div>

				<div class="min-w-[300px]">
					<h3 class="title">В работе</h3>
					<ul>
						<li v-for="(item, index) in inProgressProducts" :key="index"  class="flex justify-between items-center border-b border-brand-line py-5">
							<div v-if="item.products[0].thumbnail?.image" class="h-20 w-20">
								<img :src="item.products[0].thumbnail.image" class="h-full w-full object-cover" alt="" />
							</div>
							<div>
								<p class="text-base font-medium">{{ item.products[0].name }}</p>
								<p class="text-sm leading-3 font-medium py-2">{{ item.products[0].price }} ₸</p>
								<p class="text-xs font-medium">компьютер: {{ item.computer?.number }}</p>
							</div>
							<button  @click="updateProductStatus(item.uuid, 'COMPLETED')"  class="text-green-500 hover:text-green-700">Выполнить</button>
						</li>
					</ul>
				</div>

				<div class="min-w-[300px]">
					<h3 class="title">Выполнены</h3>
					<ul>
						<li v-for="(item, index) in completedProducts" :key="index" class="flex justify-between items-center border-b border-brand-line py-5">
							<div v-if="item.products[0].thumbnail?.image" class="h-20 w-20">
								<img :src="item.products[0].thumbnail.image" class="h-full w-full object-cover" alt="" />
							</div>
							<div>
								<p class="text-base font-medium">{{ item.products[0].name }}</p>
								<p class="text-sm leading-3 py-2 font-medium">{{ item.products[0].price }} ₸</p>
								<p class="text-xs font-medium">компьютер: {{ item.computer?.number }}</p>
							</div>
							<button @click="updateProductStatus(item.uuid, 'CANCELED')" class="text-red-500 hover:text-red-700">Отменить</button>
						</li>
					</ul>
				</div>

				<div class="min-w-[300px]">
					<h3 class="title">Отменены</h3>
					<ul>
						<li v-for="(item, index) in canceledProducts" :key="index" class="flex justify-between items-center border-b border-brand-line py-5">
							<div v-if="item.products[0].thumbnail?.image" class="h-20 w-20">
								<img :src="item.products[0].thumbnail.image" class="h-full w-full object-cover" alt="" />
							</div>
							<div>
								<p class="text-base font-medium">{{ item.products[0].name }}</p>
								<p class="text-sm leading-3 font-medium py-2">{{ item.products[0].price }} ₸</p>
								<p class="text-xs font-medium">компьютер: {{ item.computer?.number }}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div v-else style="height: 100vh; padding-top: 2rem">
				<div class="flex">
<!--					<img src="@/assets/img/icons/basket.png">-->
					<h2 class="text-xl pl-4"> На данный момент нет текущих заказов</h2>
				</div>
			</div>
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
