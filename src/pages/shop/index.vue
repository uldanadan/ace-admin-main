<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import { useProductsStore } from "@/stores/useProductsStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import Search from "@/components/UI/SearchBar.vue";
import FilterSelect from "@/components/UI/FilterSelect.vue";
import { useRouter } from "vue-router";
import { GetProductsParams } from "./types";
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue";
import { usePartnersStore } from "@/stores/usePartnersStore";
import Pagination from '@/components/UI/Pagination.vue';

const productsStore = useProductsStore();
const categoryStore = useCategoryStore();
const partnersStore = usePartnersStore();
const router = useRouter();

const searchParams = ref<GetProductsParams>({availability_in_game_centers: partnersStore.getSelectedGameCenter?.uuid, page: 1});

const crumbs = [
	{ label: 'Магазин', route: '/shop' },
	{ label: 'Товары' }
];

const categories = computed(() => categoryStore.getCategories?.results || []);

const products = computed(() => productsStore.getProducts?.results || []);

const goToSlug = product => {
	router.push({ path: `/shop/${product.uuid}` });
}

const updatePage = (page: number) => {
	searchParams.value = { ...searchParams.value, page: page };
};

const updateSearch = (search: string) => {
	searchParams.value = { ...searchParams.value, search: search, page: 1 };
};

const updateCategory = (category: { uuid: string }) => {
	const categoryUuid = category ? category.uuid : '';
	searchParams.value = { ...searchParams.value, category: categoryUuid, page: 1 };
};

onMounted(async () => {
	try {
		await productsStore.loadProducts(searchParams.value);
		await categoryStore.loadCategories();
	} catch (err) {
		console.log("Failed loadProducts", err);
	}
})

watch(searchParams, async () => {
	await productsStore.loadProducts(searchParams.value);
}, {deep: true});
</script>

<template>
	<section>
		<div class="w-container">
			<div class="flex items-center justify-between">
				<div class="text-second-dark">
					<h2 class="text-4xl font-semibold">Магазин</h2>
					<Breadcrumbs :crumbs="crumbs" />
				</div>
				<div class="flex items-center space-x-7">
					<Search :searchFunction="updateSearch" />
					<div><FilterSelect :options="categories" :updateCategory="updateCategory" type="category" /></div>
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
									<div class="flex items-center">
										<template v-for="(center, index) in product.availability_in_game_centers">
											<p v-if="index < 2" class="rounded-full h-10 w-10 flex items-center justify-center text-white text-sm font-bold border-[1.5px] border-brand-border" :class="index < 1 ? 'bg-brand-yellow' : 'bg-brand-blue right-[8px]'">{{ center.name[0].toUpperCase() }}</p>
											<p v-else-if="index === 2" class="right-[16px] rounded-full h-10 w-10 flex items-center justify-center bg-brand-dark-blue text-white text-sm font-bold border-[1.5px] border-brand-border">+{{product.availability_in_game_centers.length - 2}}</p>
										</template>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<Pagination v-if="products.length" :totalCount="productsStore.count" @onChangePage="updatePage" />
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
