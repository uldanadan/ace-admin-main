<script setup lang="ts">
import FileTransferDataService from "@/services/FiletransferDataService"
import { FileInfo } from "@/types/types"

const emit = defineEmits<{
	(event: "onFileUploaded", payload: FileInfo): void
}>()

const onFileChange = async (e) => {
	const formData = new FormData();
	formData.append('is_active', true);
	formData.append('image', e.target.files[0]);
	FileTransferDataService.postImage(formData).then((r) => emit("onFileUploaded", r.data))
}
</script>

<template>
	<div class="file-uploader bg-white flex justify-center items-center py-14 border border-slate-300 rounded-md">
		<label for="fileInput" class="upload-icon" >
			<img src="@/assets/img/icons/load.svg" alt="Upload" class="upload-icon" >
		</label>
		<input id="fileInput" type="file" accept="image/*" @change="onFileChange">
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
