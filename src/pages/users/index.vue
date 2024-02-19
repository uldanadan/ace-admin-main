<script setup lang="ts">
import { onMounted, computed } from "vue"
import { useUsersStore } from "@/stores/useUsersStore"

const usersStore = useUsersStore()

const users = computed(() => {
	return usersStore.getUsers?.results
})

onMounted(async () => {
	await usersStore.loadUsers()
})
</script>

<template>
	<section>
		<div class="w-container">
			<div class="mx-auto py-8">
				<div class="table-primary">
					<table>
						<thead>
							<tr class="">
								<th class="">Логин</th>
								<th class="">E-mail</th>
								<th class="">Статус</th>
								<th class="">Уровень</th>
								<th class="">Скидка</th>
								<th class="">Баланс</th>
								<th class="">Регистрация</th>
								<th class="">Имя</th>
								<th class="">Фамилия</th>
								<th class="">Пол</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(user, index) in users" :key="index" class="">
								<td>
									<div>
										<p>{{ user.email }}</p>
									</div>
								</td>
								<td>
									<div>
										<p>{{ user.email }}</p>
									</div>
								</td>
								<td>
									<div>
										<p v-if="user.is_active" class="">активен</p>
										<p v-else class="">неактивен</p>
									</div>
								</td>
								<td>
									<div></div>
								</td>
								<td>
									<div></div>
								</td>
								<td>
									<div></div>
								</td>
								<td>
									<div>{{ user.data_joined }}</div>
								</td>
								<td>
									<div>{{ user.first_name }}</div>
								</td>
								<td>
									<div>{{ user.last_name }}</div>
								</td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
