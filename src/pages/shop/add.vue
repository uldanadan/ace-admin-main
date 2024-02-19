<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/useProductsStore";
import InputPrimary from "@/components/UI/InputPrimary.vue";
import Textarea from "@/components/UI/Textarea.vue";
import Button from "@/components/UI/Button.vue";
import Select from "@/components/UI/Select.vue";
import FileUploader from "@/components/UI/FileUploader.vue"
const router = useRouter();
const productsStore = useProductsStore();

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

const categories = computed(() => {
	return productsStore.getCategories?.results || [];
});

const gameCenters = computed(() => {
	return productsStore.getGameCenters?.results || [];
});

const selectedCategory = ref({uuid: ''});
const selectedGameCenter = ref({uuid: ''});
const selectedGameCenters = ref([]);

onMounted(async () => {
	await productsStore.loadGameCenters();
	await productsStore.loadCategories();
})

const addGameCenter = () => {
	selectedGameCenters.value.push('');
};

const updateGameCenterOptions = (index) => {
	const selectedGameCenterUUIDs = selectedGameCenters.value.map(center => center.uuid);
	return gameCenters.value.filter(center => !selectedGameCenterUUIDs.includes(center.uuid));
};

const postProduct = async () => {
	try {
		await productsStore.postProduct({
			...product.value,
			category: selectedCategory.value.uuid,
			availability_in_game_centers: selectedGameCenters.value.map(center => center.uuid)
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
					<Textarea  :cols="20" :rows="5" name="description" label="Введите описание продукта" v-model="product.description" />
				</div>
				<div class="relative w-[300px]">
					<label for="" class="mb-2 block">Категория:</label>
					<Select :options="categories" v-model="selectedCategory" />
				</div>
				<div class="relative w-[300px]">
					<label for="" class="mb-2 block">Клуб:</label>
					<div class="flex items-center">
						<div v-for="(center, index) in selectedGameCenters" :key="index">
							<Select :options="updateGameCenterOptions(index)" v-model="selectedGameCenters[index]" />
						</div>
						<Button @click.prevent="addGameCenter" class="btn-plus"><img src="@/assets/img/icons/plus.svg"></Button>
					</div>
				</div>
				<div class="input-wrapper">
					<label for="">Изображение:</label>
					<FileUploader @onFileUploaded="product.thumbnail = $event.uuid" />
				</div>
			</div>
			<div class="mt-4 flex justify-end gap-4">
				<Button class="btn-back">
					<router-link to="/shop">Назад</router-link>
				</Button>
				<Button @click.prevent="postProduct" class="btn-accent">Сохранить</Button>
			</div>
		</div>
	</section>
</template>
