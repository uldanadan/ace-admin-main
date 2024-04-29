<script setup lang="ts">
import { ref, defineProps, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import InputPrimary from "@/components/UI/InputPrimary.vue";
import Close from "@/components/icons/Close.vue";
import Button from "@/components/UI/Button.vue";
import { usePartnersStore } from "@/stores/usePartnersStore";
import { useAdminPanelsStore } from "@/stores/useAdminPanelsStore";
import VueSelect from "vue-select";

const props = defineProps({
	opened: Boolean,
	coordinates: Object,
	selectedComputer: Object,
});

const router = useRouter();
const partnersStore = usePartnersStore();
const adminPanelsStore = useAdminPanelsStore();
const emit = defineEmits(["closeSidebar"]);

const selectedZones = ref({uuid: ''});
const selectedGameCenterUuid = ref( partnersStore.getSelectedGameCenter?.uuid);

const close = () => {
	emit("closeSidebar", false)
}

const computer = ref({
	number: null,
	ip_address: "",
	mac_address: ""
})

const zones = computed(() => adminPanelsStore.getZone);

const getZoneOptions = (zones) => {
	if (!zones) return [];

	const options = [];
	for (const zone of zones) {
		if (zone.game_center && zone.game_center.zones) {
			if (!selectedGameCenterUuid.value || zone.game_center.uuid === selectedGameCenterUuid.value) {
				for (const item of zone.game_center.zones) {
					if (zone.name === item.name) {
						options.push({ name: `${zone.game_center.name} - ${zone.name}`, uuid: item.uuid });
					}
				}
			}
		}
	}
	return options;
}

const postComputer = async () => {
	try {
		await partnersStore.postComputer({
			...computer.value,
			map_x: props.coordinates?.x,
			map_y: props.coordinates?.y,
			zone_id: selectedZones.value.uuid,
		})

		window.location.reload();
	} catch (error) {
		console.error("Ошибка при добавлении компьютера:", error);
	}
};

onMounted(async () => {
	await adminPanelsStore.loadZones();
});

</script>

<template>
	<div class="sidebar fixed inset-y-0 right-0 z-30 flex h-full w-full justify-end" :class="{ active: opened }">
		<div @click.prevent="close" class="backdrop"></div>
		<div class="sidebar-wrapper relative z-20 h-full w-[90%] bg-white md:w-[400px]">
			<div>
				<div class="flex items-center justify-between border-b border-brand-line p-4 md:p-6">
					<p class="heading-secondary">Добавление нового ПК</p>
					<button @click.prevent="close" class="btn-close">
						<Close />
					</button>
				</div>
				<div class="space-y-4 p-4 md:p-6">
					<div class="input-wrapper">
						<label for="">Номер</label>
						<InputPrimary class="input-primary" type="text" name="place" v-model="computer.number" />
					</div>
					<div class="input-wrapper">
						<label for="">Зона</label>
						<VueSelect v-model="selectedZones" :options="getZoneOptions(zones)" label="name" :clearable="false" />
					</div>
					<div class="input-wrapper">
						<label for="">IP адрес</label>
						<InputPrimary class="input-primary" type="text" name="ip_address" v-model="computer.ip_address" />
					</div>
					<div class="input-wrapper">
						<label for="">MAC адрес</label>
						<InputPrimary class="input-primary" type="text" name="mac_address" v-model="computer.mac_address" />
					</div>
					<div>
						<Button @click.prevent="postComputer" class="btn-accent w-full">Сохранить</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.sidebar {
	@apply invisible opacity-0 transition-all duration-300 ease-in-out;
	.sidebar-wrapper {
		@apply invisible translate-x-20 opacity-0 transition-all duration-500 ease-in-out;
	}
	&.active {
		@apply visible opacity-100;
		.sidebar-wrapper {
			@apply visible translate-x-0 opacity-100;
		}
	}
}
</style>
