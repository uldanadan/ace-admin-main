<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface OrderStatusGroupProps {
	orders: Array<any>;
	title: string;
	text: string;
	buttonClass: string;
}

const props = defineProps<OrderStatusGroupProps>();
const emit = defineEmits(['update-status']);

const formatDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	};
	return new Intl.DateTimeFormat('ru-RU', options).format(new Date(dateString));
};

const totalPrice = (order: any) => order.products.reduce((total: number, product: any) => total + product.price * (product.quantity || 1), 0);

const totalQuantity = (order: any) => {
	return order.products.reduce((total: number, product: any) => total + (product.quantity || 1), 0);
};

const handleClick = (order: any) => {
	const productUuids = order.products.map((product: any) => product.uuid);
	emit('update-status', [order.uuid]);
};

</script>

<template>
	<div class="min-w-[340px]">
		<h3 class="title">{{ title }}</h3>
		<div v-if="props.orders.length" class="pt-6">
			<div v-for="order in props.orders" :key="order.uuid" class="order-card p-4 mb-4 bg-white rounded shadow">
				<div class="flex items-center justify-between">
					<div>
						<h3 class="text-xl font-semibold flex items-center">Заказ #{{ (order.uuid).substring(0, 5) }}</h3>
						<p class="text-sm">Компьютер: {{ order.computer.number }}</p>
						<p class="text-sm">Game Center: {{ order.computer.game_center.name }}</p>
					</div>
					<div>
						<button @click="handleClick(order)" :class="buttonClass">{{ text }}</button>
						<div class="h-6 w-6 ml-[70%]">
							<img v-if="order.payment_type === 'CASH'" src="@/assets/img/icons/tenge.png" alt="Tenge" />
							<img v-else-if="order.payment_type === 'KASPI'" src="@/assets/img/icons/qr.png" alt="Kaspi QR" />
						</div>
					</div>
				</div>
				<ul class="my-4">
					<li v-for="(item, index) in order.products" :key="index" class="flex justify-between items-center border-b border-brand-line py-2">
						<div v-if="item.product.thumbnail?.image" class="h-10 w-10">
							<img :src="item.product.thumbnail.image" class="h-full w-full object-cover" alt="" />
						</div>
						<p class="text-base font-medium w-1/2 text-gray-500">{{ item.product.name }}</p>
						<p class="text-base text-gray-500">{{ item.count }}x</p>
						<p class="text-sm leading-3 font-medium py-2 text-gray-500">{{ item.product.price }} ₸</p>
					</li>
				</ul>
				<div class="flex items-center justify-between">
					<p class="text-sm">Дата: {{ formatDate(order.created) }}</p>
					<p class="text-sm">{{ totalQuantity(order) }} единиц</p>
					<p class="font-semibold">{{ order.price }} ₸</p>
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
