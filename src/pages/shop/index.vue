<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import { useProductsStore } from "@/stores/useProductsStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import Search from "@/components/UI/SearchBar.vue";
import Category from "@/components/UI/Category.vue";
import { useRouter } from "vue-router";
import { GetProductsParams } from "./types"
import Breadcrumbs from "../../components/UI/Breadcrumbs.vue"

const productsStore = useProductsStore();
const categoryStore = useCategoryStore();
const router = useRouter();

const searchParams = ref<GetProductsParams>({});

const crumbs = [
	{ label: 'Магазин', route: '/shop' },
	{ label: 'Товары' }
];

const categories = computed(() => {
	return categoryStore.getCategories?.results || [];
});

onMounted(async () => {
	try {
		await productsStore.loadProducts();
		await categoryStore.loadCategories();
	} catch (err) {
		console.log("Failed loadProducts", err);
	}
})

const products = computed(() => {
	return productsStore.getProducts?.results || [];
})

const goToSlug = product => {
	router.push({ path: `/shop/${product.uuid}` });
}

watch([searchParams.value], () => {
	productsStore.loadProducts(searchParams.value);
})
</script>

<template>
	<section>
		<div class="w-container">
			<div class="flex items-center justify-between">
				<div>
					<h2>Магазин</h2>
					<Breadcrumbs :crumbs="crumbs" />
				</div>
				<div class="flex items-center space-x-7">
					<Search :searchFunction="($event) => searchParams.search = $event" />
					<div><Category :options="categories" :updateCategory="($event) => searchParams.category = $event?.uuid" /></div>
					<router-link to="/shop/add"><Button class="btn-accent">Добавить товар</Button></router-link>
				</div>
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
