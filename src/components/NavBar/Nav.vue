<script setup lang="ts">
import { ref, watch } from "vue"
import MobileNav from "@/components/NavBar/component/MobileNav.vue"
import SabNav from "@/components/NavBar/component/SubNav.vue"
import { useRoute } from "vue-router"

const route = useRoute()
const Logo = new URL("/img/icons/logo.svg", import.meta.url).href
const list = ref([
	{
		name: "Карта клуба",
		link: "/"
	},
	{
		name: "Магазин",
		link: "/shop"
	},
	{
		name: "Касса",
		link: "/open-work-shift"
	},
	{
		name: "Пользователи",
		link: "/users"
	},

	{
		name: "Статистика",
		link: "/statistics"
	},
	{
		name: "Контент",
		link: ""
	}
])

const openedMobileNav = ref<boolean>(false)

const closeMenu = (value: boolean) => {
	openedMobileNav.value = value
}

watch(
	openedMobileNav,
	newValue => {
		const html = document.querySelector("html")
		if (newValue === true) {
			html.classList.add("no-scroll")
		} else {
			html.classList.remove("no-scroll")
		}
	},
	{ immediate: true }
)
</script>

<template>
	<div class="relative">
		<div class="h-14 border-b border-brand-line bg-gradient-to-r from-brand-secondary to-brand-primary md:h-16">
			<div class="h-full xl:px-20">
				<div class="flex h-full items-center justify-between">
					<div class="flex h-full items-center justify-center px-4 xl:px-0">
						<img src="../../assets/img/icons/logo.svg" class="w-28 md:w-36" alt="" />
					</div>
					<nav class="hidden xl:block">
						<ul class="flex items-center space-x-10">
							<li v-for="(item, index) in list" :key="index" class="">
								<router-link :to="item.link" class="flex h-full w-full items-center justify-center px-1 text-center text-slate-100">{{ item.name }}</router-link>
							</li>
						</ul>
					</nav>
					<div class="flex h-full items-center">
						<div class="flex h-full items-center px-4 text-white xl:px-0">
							<div class="mr-2 text-right">
								<p class="text-xs text-cyan-100 md:text-sm">Sean</p>
								<p class="text-xs font-semibold md:text-sm">Admin</p>
							</div>
							<div class="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-line md:h-12 md:w-12">S</div>
						</div>
						<button @click.prevent="openedMobileNav = true" class="flex h-full items-center justify-center border-l border-brand-line px-4 xl:hidden">
							<div class="hamburger"></div>
						</button>
					</div>
				</div>
			</div>
		</div>
		<SabNav />
	</div>
	<MobileNav :list="list" :isActive="openedMobileNav" @closeMenu="closeMenu" />
</template>

<style lang="scss" scoped></style>
