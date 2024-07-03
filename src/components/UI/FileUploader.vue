<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import FileTransferDataService from "@/services/FiletransferDataService";
import { FileInfo } from "@/types/types";

const props = defineProps<{
	initialImage?: string;
}>()

const emit = defineEmits<{
	(event: "onFileUploaded", payload: FileInfo): void;
}>()

const imageName = ref<string>('');

const onFileChange = async (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (!target.files) return;

	const formData = new FormData();
	formData.append('is_active', 'true');
	formData.append('image', target.files[0]);

	try {
		const response = await FileTransferDataService.postImage(formData);
		emit("onFileUploaded", response.data);
		imageName.value = target.files[0].name;
	} catch (error) {
		console.error('Error uploading image:', error);
	}
}
</script>

<template>
	<div class="file-uploader bg-white flex justify-center items-center py-14 border border-slate-300 rounded-md">
		<label for="fileInput" class="upload-icon">
			<img src="@/assets/img/icons/load.svg" alt="Upload" class="upload-icon" >
		</label>
		<input id="fileInput" type="file" accept="image/*" @change="onFileChange">
		<span v-if="imageName" class="file-name ml-2">{{ imageName }}</span>
		<img v-if="props.initialImage" :src="props.initialImage" alt="Uploaded Image" class="ml-2" style="max-width: 100px;">
	</div>
</template>

<style lang="scss" scoped>
.upload-icon {
	cursor: pointer;
}
#fileInput {
	display: none;
}
</style>
