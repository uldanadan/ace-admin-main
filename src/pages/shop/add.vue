<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/useProductsStore";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import InputPrimary from "@/components/UI/InputPrimary.vue";
import Textarea from "@/components/UI/Textarea.vue";
import Button from "@/components/UI/Button.vue";
import VueSelect from "vue-select";
import FileUploader from "@/components/UI/FileUploader.vue"
import Breadcrumbs from "../../components/UI/Breadcrumbs.vue"

const router = useRouter();
const productsStore = useProductsStore();
const partnersStore = usePartnersStore();
const categoryStore = useCategoryStore();

const product = ref({
	name: "",
	description: "",
	article: "",
	price: "",
	amount: "",
	thumbnail: "",
	category: "",
	availability_in_game_centers: []
});

const crumbs = [
	{ label: 'Магазин' },
	{ label: 'Товары', route: '/shop' },
	{ label: 'Добавить товар', route: '/shop/add'}
];

const categories = computed(() => {
	return categoryStore.getCategories?.results || [];
});

const gameCenters = computed(() => {
	return partnersStore.getGameCenters?.results || [];
});

const selectedCategory = ref({uuid: ''});
const selectedGameCenters = ref([]);

onMounted(async () => {
	await categoryStore.loadCategories();
	await partnersStore.loadGameCenters();
});

const postProduct = async () => {
	try {
		await productsStore.postProduct({
			...product.value,
			category: selectedCategory.value.uuid,
			availability_in_game_centers: selectedGameCenters.value.map(center => center?.uuid)
		});

		await router.push("/shop");
	} catch (error) {
		console.error("Ошибка при добавлении продукта:", error);
	}
};
</script>

<template>
	<section>
		<div class="w-container pb-80">
			<div class="flex items-center justify-between">
				<div>
					<h2>Магазин</h2>
					<Breadcrumbs :crumbs="crumbs" />
				</div>
				<div class="flex space-x-7">
					<Button class="btn-back">
						<router-link to="/shop">Назад</router-link>
					</Button>
					<Button @click.prevent="postProduct" class="btn-accent">Сохранить</Button>
				</div>
			</div>
			<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
				<div class="input-wrapper">
					<label for="">Название товара:</label>
					<InputPrimary class="input-primary" type="text" name="name" label="" v-model="product.name" />
				</div>
				<div class="input-wrapper">
					<label for="">Артикул:</label>
					<InputPrimary class="input-primary" type="text" name="article" label="" v-model="product.article" />
				</div>
				<div class="input-wrapper">
					<label for="">Цена:</label>
					<InputPrimary class="input-primary" type="number" name="price" label="" v-model="product.price" />
				</div>
				<div class="input-wrapper">
					<label for="">Количество:</label>
					<InputPrimary class="input-primary" type="number" name="amount" label="" v-model="product.amount" />
				</div>
				<div class="col-span-1 md:col-span-2">
					<label for="">Описание товара:</label>
					<Textarea :cols="20" :rows="5" name="description" label="Введите описание продукта" v-model="product.description" />
				</div>
				<div class="relative w-[300px]">
					<label for="" class="mb-2 block">Категория:</label>
					<VueSelect :options="categories" v-model="selectedCategory" label="name" :clearable="false" />
				</div>
				<div class="relative">
					<label for="" class="mb-2 block">Клуб:</label>
					<div class="flex items-center flex-wrap	">
						<VueSelect :options="gameCenters" v-model="selectedGameCenters" label="name" multiple :getOptionKey="(option) => option.uuid"  />
						<Button  class="btn-plus" aria-expanded="true" >
							<img src="@/assets/img/icons/plus.svg">
						</Button>
					</div>
				</div>
				<div class="input-wrapper">
					<label for="">Изображение:</label>
					<FileUploader @onFileUploaded="product.thumbnail = $event.uuid" />
				</div>
			</div>
		</div>
	</section>
</template>


