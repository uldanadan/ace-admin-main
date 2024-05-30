<script setup lang="ts">
import { computed } from "vue";

interface OrderStatusGroupProps {
	orders: Array<any>;
	title: string;
	text: string;
}

const props = defineProps<OrderStatusGroupProps>();

const groupOrders = (orders) => {
	const grouped = {};

	orders.forEach(order => {
		const key = `${order.computer.uuid}-${order.computer.game_center?.uuid}-${new Date(order.created).toLocaleDateString()}`;

		if (!grouped[key]) {
			grouped[key] = [];
		}

		grouped[key].push(order);
	});

	return grouped;
};

const groupedOrders = computed(() => groupOrders(props.orders));

const formatDate = (dateString) => {
	const options = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	};
	return new Intl.DateTimeFormat('ru-RU', options).format(new Date(dateString));
};

const groupProducts = (orders) => {
	const productMap = new Map();

	orders.forEach(order => {
		order.products.forEach(product => {
			const key = `${order.computer.uuid}-${order.computer.game_center.uuid}-${product.uuid}-${order.status}`;
			if (!productMap.has(key)) {
				productMap.set(key, { ...product, quantity: 0 });
			}
			const productEntry = productMap.get(key);
			productEntry.quantity += 1;
		});
	});

	return Array.from(productMap.values());
};

const totalPrice = (orders) => {
	let total = 0;
	orders.forEach(order => {
		order.products.forEach(product => {
			const quantity = groupProducts([order]).find(p => p.uuid === product.uuid)?.quantity || 1;
			total += product.price * quantity;
		});
	});
	return total;
};

const totalQuantity = (orders) => {
	let totalQuantity = 0;
	const products = groupProducts(orders);
	products.forEach(product => {
		totalQuantity += product.quantity;
	});
	return totalQuantity;
};
</script>

<template>
	<div class="min-w-[340px]">
		<h3 class="title">{{ title }}</h3>
		<div v-if="Object.keys(groupedOrders).length" class="pt-6">
			<div v-for="(orders, key) in groupedOrders" :key="key" class="order-card p-4 mb-4 bg-white rounded shadow">
				<div class="flex items-center justify-between">
					<div>
						<h3 class="text-xl font-semibold">Заказ #{{ (orders[0].uuid).substring(0, 5) }}</h3>
						<p class="text-sm">Компьютер: {{ orders[0].computer.number }}</p>
						<p class="text-sm">Game Center: {{ orders[0].computer.game_center.name }}</p>
					</div>
					<button @click="updateStatus(order, 'Paid')">{{ text }}</button>
				</div>
				<ul class="my-4">
					<li v-for="(item, index) in groupProducts(orders)" :key="index" class="flex justify-between items-center border-b border-brand-line py-2">
						<div v-if="item.thumbnail?.image" class="h-10 w-10">
							<img :src="item.thumbnail.image" class="h-full w-full object-cover" alt="" />
						</div>
						<p class="text-base font-medium w-1/2 text-gray-500">{{ item.name }}</p>
						<p class="text-base text-gray-500">{{ item.quantity }}x</p>
						<p class="text-sm leading-3 font-medium py-2 text-gray-500">{{ item.price }} ₸</p>
					</li>
				</ul>
				<div class="flex items-center justify-between">
					<p class="text-sm">Дата: {{ formatDate(orders[0].created) }}</p>
					<p class="text-sm">{{ totalQuantity(orders) }} единец</p>
					<p class="font-semibold">{{ totalPrice(orders) }} ₸</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.title {
	@apply font-semibold bg-gray-100 p-2 rounded-lg border border-brand-line text-gray-500;
}
</style>
