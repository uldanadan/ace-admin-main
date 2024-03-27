<script setup lang="ts">
import { defineProps } from "vue"
import Close from "@/components/icons/Close.vue"

defineProps<{
	list: {
		type: Array<any>
	}
	isActive: {
		type: boolean
	}
}>()
const emit = defineEmits(["closeMenu"])
const close = () => {
	emit("closeMenu", false)
}
</script>

<template>
	<div class="mobile-nav fixed inset-0 z-40 flex justify-end" :class="{ active: isActive }">
		<div @click.prevent="close" class="backdrop"></div>
		<div class="mobile-nav__bar relative h-full w-[85%] bg-white">
			<div class="flex justify-end border-b border-brand-line px-5 py-4">
				<button @click.prevent="close" class="btn-close">
					<Close />
				</button>
			</div>
			<nav>
				<ul class="divide-y divide-brand-line">
					<li v-for="(item, index) in list" :key="index">
						<router-link :to="item.link" class="link">{{ item.name }}</router-link>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.mobile-nav {
	@apply invisible opacity-0 transition-all duration-500 ease-in-out;
	&__bar {
		@apply invisible translate-x-20 opacity-0 transition-all duration-500 ease-in-out;
	}
	&.active {
		@apply visible opacity-100;
		.mobile-nav__bar {
			@apply visible translate-x-0 opacity-100;
		}
	}
}
.link {
	@apply inline-block w-full px-5 py-4 transition-all duration-300 ease-in-out;
	&:hover {
		@apply bg-brand-gray;
	}
}
</style>
