<script setup>
import { computed, onMounted, onUnmounted, watch } from "vue"

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	maxWidth: {
		type: String,
		default: "2xl"
	},

	closeable: {
		type: Boolean,
		default: true
	}
})

const emit = defineEmits(["close"])

watch(
	() => props.show,
	() => {
		if (props.show) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = null
		}
	}
)

const close = () => {
	if (props.closeable) {
		emit("close")
	}
}

const closeOnEscape = e => {
	if (e.key === "Escape" && props.show) {
		close()
	}
}

onMounted(() => document.addEventListener("keydown", closeOnEscape))

onUnmounted(() => {
	document.removeEventListener("keydown", closeOnEscape)
	document.body.style.overflow = null
})

const maxWidthClass = computed(() => {
	return {
		sm: "sm:max-w-sm",
		md: "sm:max-w-md",
		lg: "sm:max-w-lg",
		xl: "sm:max-w-xl",
		"2xl": "sm:max-w-2xl"
	}[props.maxWidth]
})
</script>

<template>
	<teleport to="body">
		<transition name="slide-nested">
			<div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-0">
				<transition name="slide-fade">
					<div v-if="show" class="fixed inset-0 transform transition-all" @click="close">
						<div class="absolute inset-0 bg-dark/60 backdrop" />
					</div>
				</transition>
				<transition name="slide-fade">
					<div v-if="show" :class="maxWidthClass" class="relative z-[60] overflow-y-auto px-4 py-6 sm:px-0" scroll-region>
						<slot v-if="show" />
					</div>
				</transition>
			</div>
		</transition>
	</teleport>
</template>
