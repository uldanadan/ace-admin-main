<script setup lang="ts">
import { ref, defineProps } from "vue"
import FileTransferDataService from "@/services/FiletransferDataService"
import { FileInfo } from "@/types/types"

const emit = defineEmits<{
	(event: "onFileUploaded", payload: FileInfo): void
}>()

const props = defineProps<{
	initialImage?: string;
}>()

const imageName = ref<string>('');

const onFileChange = async (e) => {
	const formData = new FormData();
	formData.append('is_active', true);
	formData.append('image', e.target.files[0]);

	FileTransferDataService.postImage(formData).then((r) => {
		emit("onFileUploaded", r.data);
		imageName.value = e.target.files[0].name;
	})
}
</script>

<template>
	<div class="file-uploader bg-white flex justify-center items-center py-14 border border-slate-300 rounded-md">
		<label for="fileInput" class="upload-icon">
			<img src="@/assets/img/icons/load.svg" alt="Upload" class="upload-icon" >
		</label>
		<input id="fileInput" type="file" accept="image/*" @change="onFileChange">
		<span v-if="imageName" class="file-name ml-2">{{ imageName }}</span>
<!--		<img v-if="imageName" :src="imageName" alt="Uploaded Image" class="ml-2" style="max-width: 100px;">-->
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
