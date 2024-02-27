<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useProductsStore } from "@/stores/useProductsStore";
import Search from "@/components/UI/SearchBar.vue"
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

const searchQuery = ref('');

const products = computed(() => {
	return productsStore.getProducts?.results?.filter(product =>
		Object.entries(product).some(([key, value]) =>
			typeof value === 'string' && key !== 'uuid' && value.toLowerCase().includes(searchQuery.value.toLowerCase())
		)
	);
})

const goToSlug = product => {
	router.push({ path: `/shop/${product.uuid}` });
}

const search = (query: string) => {
	searchQuery.value = query;
}
</script>

<template>
	<section>
		<div class="w-container">
			<div>
				<Search :searchFunction="search" />
				<Button class="btn-accent">
					<router-link to="/shop/add">Добавить товар</router-link>
				</Button>
			</div>
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
