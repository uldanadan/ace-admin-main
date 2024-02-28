<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useProductsStore } from "@/stores/useProductsStore";
import Search from "@/components/UI/SearchBar.vue";
import Category from "@/components/UI/Category.vue";
import Path from "@/components/UI/Path.vue";
import { useRouter } from "vue-router";

const productsStore = useProductsStore();
const router = useRouter();

const searchQuery = ref('');
const selectedCategory = ref(null);

const categories = computed(() => {
	return productsStore.getCategories?.results || [];
});

onMounted(async () => {
	try {
		await productsStore.loadProducts();
		await productsStore.loadCategories();
	} catch (err) {
		console.log("Failed loadProducts", err);
	}
})

const products = computed(() => {
	return productsStore.getProducts?.results?.filter(product => {
		const matchesSearch = Object.entries(product).some(([key, value]) =>
			typeof value === 'string' && key !== 'uuid' && value.toLowerCase().includes(searchQuery.value.toLowerCase())
		);
		const matchesCategory = !selectedCategory.value || product.category.name === selectedCategory.value.name;
		return matchesSearch && matchesCategory;
	});
})

const goToSlug = product => {
	router.push({ path: `/shop/${product.uuid}` });
}

const search = (query: string) => {
	searchQuery.value = query;
}

const updateCategory = (category) => {
	selectedCategory.value = category;
}
</script>

<template>
	<section>
		<div class="w-container">
			<Path />
			<div class="flex items-center">
				<Search :searchFunction="search" />
				<div><Category :options="categories" :updateCategory="updateCategory" /></div>
				<router-link to="/shop/add"><Button class="btn-accent">Добавить товар</Button></router-link>
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
