<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useProductsStore } from "@/stores/useProductsStore";
const productsStore = useProductsStore();
import { useRouter } from "vue-router";

const router = useRouter();
onMounted(async () => {
	try {
		await productsStore.loadProducts();
	} catch (err) {
		console.log("Failed loadProducts", err);
	}
})

const products = computed(() => {
	return productsStore.getProducts?.results;
})

const goToSlug = product => {
	router.push({ path: `/shop/${product.uuid}` });
}
</script>

<template>
	<section>
		<div class="w-container">
			<Button class="btn-accent">
				<router-link to="/shop/add">Добавить товар</router-link>
			</Button>
			<div class="mx-auto py-8">
				<div class="table-primary">
					<table>
						<thead>
							<tr class="">
								<th class="">Вид</th>
								<th class="">Название</th>
								<th class="">Описание товара</th>
								<th class="">Категория</th>
								<th class="">Артикул</th>
								<th class="">Цена продажи, ₸</th>
								<th class="">Количество, шт</th>
								<th class="">Доступность в клубах</th>
							</tr>
						</thead>
						<tbody>
							<tr @click.prevent="goToSlug(product)" v-for="(product, index) in products" :key="index" class="cursor-pointer">
								<td>
									<div v-if="product.thumbnail?.image" class="h-10 w-10">
										<img :src="product.thumbnail.image" class="h-full w-full object-cover" alt="" />
									</div>
								</td>
								<td>
									<div>
										<p>{{ product.name }}</p>
									</div>
								</td>
								<td>
									<div class="">
										<p class="line-clamp-1">{{ product.description }}</p>
									</div>
								</td>
								<td>
									<div>
										<p>{{ product.category.name }}</p>
									</div>
								</td>
								<td>
									<div>
										<p>{{ product.article }}</p>
									</div>
								</td>
								<td>
									<div>
										<p>{{ product.price }}</p>
									</div>
								</td>
								<td>
									<div>
										<p>{{ product.amount }}</p>
									</div>
								</td>
								<td>
									<div>
										<p>{{ product.availability_in_game_centers.length }}</p>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
