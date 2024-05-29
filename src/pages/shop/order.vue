<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import { useOrderStore } from "@/stores/useOrderStore";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { useRouter } from "vue-router";
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue";

const orderStore = useOrderStore();
const partnersStore = usePartnersStore();
const router = useRouter();

// const searchParams = ref({game_center: partnersStore.getSelectedGameCenter?.uuid});

const crumbs = [
	{ label: 'Магазин', route: '/shop' },
	{ label: 'Заказы' }
];

const order = computed(() => orderStore.getOrders?.results);

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
	await orderStore.updateOrder(uuid, { status });
};

onMounted(async () => {
	try {
		await orderStore.loadOrders();
	} catch (err) {
		console.log("Failed loadOrders", err);
	}
})
</script>

<template>
	<section>
		<div class="w-container">
			<div class="flex items-center justify-between">
				<div class="text-second-dark">
					<h2 class="text-4xl font-semibold">Магазин</h2>
					<Breadcrumbs :crumbs="crumbs" />
				</div>
			</div>

			<div class="flex justify-between py-8">
				<div class="min-w-[300px]">
					<h3 class="font-semibold ">Новые</h3>
					<ul class="list tariffs-wrapper overflow-y-auto">
						<li v-for="(item, index) in newProducts" :key="index" class="flex justify-between items-center border-b border-brand-line py-5">
							<div v-if="item.products[0].thumbnail?.image" class="h-20 w-30">
								<img :src="item.products[0].thumbnail.image" class="h-full w-full object-cover" alt="" />
							</div>
							<div>
								<p class="text-base font-semibold">{{ item.products[0].name }}</p>
								<p class="text-sm font-semibold leading-3 font-bold py-2">{{ item.products[0].price }} ₸</p>
								<p class="text-xs font-medium">компьютер: {{ item.computer?.number }}</p>
							</div>
							<button @click="updateProductStatus(item.uuid, 'FOR_WAITING')" class="text-yellow-500 hover:text-yellow-700">В работе</button>
						</li>
					</ul>
				</div>

				<div class="min-w-[300px]">
					<h3 class="font-semibold ">В работе</h3>
					<ul>
						<li v-for="(item, index) in inProgressProducts" :key="index"  class="flex justify-between items-center border-b border-brand-line py-5">
							<div v-if="item.products[0].thumbnail?.image" class="h-20 w-30">
								<img :src="item.products[0].thumbnail.image" class="h-full w-full object-cover" alt="" />
							</div>
							<div>
								<p class="text-base font-semibold">{{ item.products[0].name }}</p>
								<p class="text-sm font-semibold leading-3 font-bold py-2">{{ item.products[0].price }} ₸</p>
								<p class="text-xs font-medium">компьютер: {{ item.computer?.number }}</p>
							</div>
							<button  @click="updateProductStatus(item.uuid, 'COMPLETED')"  class="text-green-500 hover:text-green-700">Выполнить</button>
						</li>
					</ul>
				</div>

				<div class="min-w-[300px]">
					<h3 class="font-semibold ">Выполнены</h3>
					<ul>
						<li v-for="(item, index) in completedProducts" :key="index" class="flex justify-between items-center border-b border-brand-line py-5">
							<div v-if="item.products[0].thumbnail?.image" class="h-20 w-30">
								<img :src="item.products[0].thumbnail.image" class="h-full w-full object-cover" alt="" />
							</div>
							<div>
								<p class="text-base font-semibold">{{ item.products[0].name }}</p>
								<p class="text-sm font-semibold leading-3 font-bold py-2">{{ item.products[0].price }} ₸</p>
								<p class="text-xs font-medium">компьютер: {{ item.computer?.number }}</p>
							</div>
							<button @click="updateProductStatus(item.uuid, 'CANCELED')" class="text-red-500 hover:text-red-700">Отменить</button>
						</li>
					</ul>
				</div>

				<div class="min-w-[300px]">
					<h3 class="font-semibold ">Отменены</h3>
					<ul>
						<li v-for="(item, index) in canceledProducts" :key="index" class="flex justify-between items-center border-b border-brand-line py-5">
							<div v-if="item.products[0].thumbnail?.image" class="h-20 w-20">
								<img :src="item.products[0].thumbnail.image" class="h-full w-full object-cover" alt="" />
							</div>
							<div>
								<p class="text-base font-semibold">{{ item.products[0].name }}</p>
								<p class="text-sm font-semibold leading-3 font-bold py-2">{{ item.products[0].price }} ₸</p>
								<p class="text-xs font-medium">компьютер: {{ item.computer?.number }}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>
