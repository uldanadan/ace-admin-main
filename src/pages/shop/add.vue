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
import Breadcrumbs from "@/components/UI/Breadcrumbs.vue";

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
	{ label: 'Магазин', route: '/shop' },
	{ label: 'Товары', route: '/shop' },
	{ label: 'Добавить товар'}
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
		<div class="w-container">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-4xl font-semibold">Магазин</h2>
					<Breadcrumbs :crumbs="crumbs" />
				</div>
				<div class="flex space-x-7">
					<router-link to="/shop">
						<Button class="btn-back">Назад</Button>
					</router-link>
					<Button @click.prevent="postProduct" class="btn-accent">Сохранить</Button>
				</div>
			</div>
			<div class="grid grid-cols-1 gap-5 md:grid-cols-2 py-8">
				<div class="input-wrapper">
					<label for="" class="label">Название товара:</label>
					<InputPrimary v-model="product.name"  class="input-primary" type="text" name="name" label=""/>
				</div>
				<div class="input-wrapper">
					<label for="" class="label">Артикул:</label>
					<InputPrimary v-model="product.article" class="input-primary" type="text" name="article" label="" />
				</div>
				<div class="input-wrapper">
					<label for="" class="label">Цена:</label>
					<InputPrimary v-model="product.price" class="input-primary" type="number" name="price" label="" />
				</div>
				<div class="input-wrapper">
					<label for="" class="label">Количество:</label>
					<InputPrimary v-model="product.amount" class="input-primary" type="number" name="amount" label="" />
				</div>
				<div class="col-span-1 md:col-span-2">
					<label for="" class="label">Описание товара:</label>
					<Textarea v-model="product.description" :cols="20" :rows="5" name="description" label="Введите описание продукта" />
				</div>
				<div class="relative w-[300px]">
					<label for="" class="mb-2 block label">Категория:</label>
					<VueSelect v-model="selectedCategory" :options="categories" label="name" :clearable="false" />
				</div>
				<div class="relative">
					<label for="" class="mb-2 block label">Клуб:</label>
					<div class="flex items-center flex-wrap	">
						<VueSelect v-model="selectedGameCenters" :options="gameCenters" label="name" multiple :getOptionKey="(option) => option.uuid"  />
						<Button  class="btn-plus" aria-expanded="true" >
							<img src="@/assets/img/icons/plus.svg">
						</Button>
					</div>
				</div>
				<div class="input-wrapper">
					<label for="" class="label">Изображение:</label>
					<FileUploader @onFileUploaded="product.thumbnail = $event.uuid" />
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.label {
	@apply text-second-dark font-semibold text-base	;
}
</style>
