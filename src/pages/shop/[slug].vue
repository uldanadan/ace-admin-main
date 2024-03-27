<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import { toast } from "vue3-toastify";
import { useProductsStore } from "@/stores/useProductsStore";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import InputPrimary from "@/components/UI/InputPrimary.vue";
import Textarea from "@/components/UI/Textarea.vue";
import Button from "@/components/UI/Button.vue";
import FileUploader from "@/components/UI/FileUploader.vue"
import VueSelect from "vue-select";
import { useRoute, useRouter } from "vue-router";
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue";

const productsStore = useProductsStore();
const partnersStore = usePartnersStore();
const categoryStore = useCategoryStore();

const route = useRoute();
const router = useRouter();
const product = ref()

const crumbs = [
	{ label: 'Магазин', route: '/shop' },
	{ label: 'Товары', route: '/shop' },
	{ label: 'Изменить товар'}
];

const categories = computed(() => {
	return categoryStore.getCategories?.results;
})

const gameCenters = computed(() => {
	return partnersStore.getGameCenters?.results || [];
});

onMounted(async () => {
	await productsStore.loadProduct(route.params.slug as string).then(r => {
		product.value = r.data;
	});
	await categoryStore.loadCategories();
	await partnersStore.loadGameCenters();
})

const credentials = ref({
	name: "",
	description: "",
	article: "",
	price: 0,
	amount: "",
	thumbnail: "",
	category: "",
	availability_in_game_centers: []
})
const selectedCategory = ref(null);
const selectedGameCenters = ref([]);

watchEffect(() => {
	credentials.value.name = product.value?.name
	credentials.value.article = product.value?.article
	credentials.value.price = product.value?.price
	credentials.value.amount = product.value?.amount
	credentials.value.description = product.value?.description
	credentials.value.thumbnail = product.value?.thumbnail?.uuid
	selectedCategory.value = product.value?.category
	selectedGameCenters.value = product.value?.availability_in_game_centers
})


const updateProduct = async () => {
	try {
		if (!selectedCategory.value) {
			toast.error("Выберите категорию перед сохранением");
			return;
		}
		credentials.value.category = selectedCategory.value.uuid;
		credentials.value.availability_in_game_centers = selectedGameCenters.value.map(center => center?.uuid);

		await productsStore.updateProduct(product.value.uuid, credentials.value);
		await router.push("/shop");
	} catch (err) {
		console.log("ERROR WITH UPDATED PRODUCTS", err);
	} finally {
		await productsStore.loadProducts();
		// toast.success("Продукт успешно изменен!");
	}
}

const deletedProduct = async () => {
	try {
		await productsStore.deleteProduct(product.value.uuid);
		await router.push("/shop");
	} catch (err) {
		console.log("ERROR WITH DELETE PRODUCT " + err);
	} finally {
		toast.success("Продукт успешно удален!");
	}
}
</script>

<template>
	<section>
		<div class="w-container">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-4xl font-semibold">Магазин</h2>
					<Breadcrumbs :crumbs="crumbs" />
				</div>
				<div class="flex space-x-7">
					<Button @click.prevent="deletedProduct" class="btn-delete">Удалить</Button>
					<Button @click.prevent="updateProduct" class="btn-accent">Сохранить</Button>
				</div>
			</div>
			<div v-if="product" class="grid grid-cols-1 gap-5 md:grid-cols-2 py-8">
				<div v-if="product.name" class="input-wrapper">
					<label for="" class="label">Название товара:</label>
					<InputPrimary v-model="credentials.name" class="input-primary" type="text" name="name" label="" />
				</div>
				<div v-if="product.article" class="input-wrapper">
					<label for="" class="label">Артикул:</label>
					<InputPrimary v-model="credentials.article" class="input-primary" type="text" name="name" label="" />
				</div>
				<div v-if="product.price != null" class="input-wrapper">
					<label for="" class="label">Цена:</label>
					<InputPrimary v-model="credentials.price" class="input-primary" type="number" name="name" label="" />
				</div>
				<div v-if="product.amount" class="input-wrapper">
					<label for="" class="label">Кол-во:</label>
					<InputPrimary v-model="credentials.amount" class="input-primary" type="text" name="name" label="" />
				</div>
				<div class="col-span-1 md:col-span-2">
					<Textarea v-model="credentials.description" :cols="20" :rows="5" name="description" label="Введите описание продукта" />
				</div>
				<div v-if="product.category" class="relative w-[300px]">
					<label for="" class="mb-2 block label">Категория:</label>
					<VueSelect :options="categories" v-model="selectedCategory" label="name" :clearable="false" />
				</div>
				<div class="relative">
					<label for="" class="mb-2 block label">Клуб:</label>
					<div class="flex items-center flex-wrap	">
						<VueSelect :options="gameCenters" v-model="selectedGameCenters" label="name" multiple :getOptionKey="(option) => option.uuid"  />
						<Button class="btn-plus">
							<img src="@/assets/img/icons/plus.svg">
						</Button>
					</div>
				</div>
				<div class="input-wrapper">
					<label for="" class="label">Изображение:</label>
					<FileUploader :initialImage="product.thumbnail.image" @onFileUploaded="product.thumbnail = $event.uuid" />
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
