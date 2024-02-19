<script setup lang="ts">

import FiletransferDataService from "../../services/FiletransferDataService"
import { FileInfo } from "../../types/types"

const emit = defineEmits<{
	(event: "onFileUploaded", payload: FileInfo): void
}>()

const onFileChange = async (e) => {
	const formData = new FormData();
	formData.append('is_active', true);
	formData.append('image', e.target.files[0]);
	FiletransferDataService.postImage(formData).then((r) => emit("onFileUploaded", r.data))
}

</script>

<template>
	<input ref="fileInput" type="file" accept="image/*" @change="onFileChange">
</template>

<style lang="scss" scoped></style>
