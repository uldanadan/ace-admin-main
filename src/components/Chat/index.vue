<template>
    <div class="chat">
        <div class="chat__button" @click="isShow = !isShow">
            <span>Players <sup v-if="count">{{ count }}</sup></span>
            <div class="chat__wrapper" v-if="!isShow" />
        </div>

        <Box
            v-model="isShow"
            v-model:playerId="playerId"
            :players="players"
        >
            <div class="chat__transition">
                <Players
                    class="chat__transition-left"
                    :class="{ 'active': playerId }"
                    :players="players"
                    :messages="messages"
                    @setPlayerId="setPlayerId"
                />
                <Chat
                    class="chat__transition-right"
                    :class="{ 'active': playerId }"
                    :messages="messages[playerId]"
                    @setMessage="setMessage"
                />
            </div>
        </Box>
    </div>
</template>

<script setup lang="ts">
import { Players, Chat, Box } from './components'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWebSocket, useSessionStorage } from '@vueuse/core'
import { Messages, Message } from '@/types/types'

const isShow = ref<boolean>(false)

const authStore = useAuthStore()
const token = authStore.getToken ? authStore.getToken : localStorage.getItem('token')

const players = ref<{ [key: string]: string }>({})
const messages = useSessionStorage<Messages>('messages', {})
const playerId = ref<string >('')

const { data, send, close } = useWebSocket(`wss://service.acegaming.gg/ws/chat/?token=${token}`)

const count = ref<number>(0)

// Обработка ответа
watch(data, (v) => {
    const res = JSON.parse(v)

    if (res?.type == 'messages') {
        const sender: any = Object.keys(players.value).find((el: string) => players.value[el] === res.sender)

        if (!messages.value[sender]?.length) {
            messages.value[sender] = []
        }

        if (!messages.value[sender].filter((el: Message) => el?.uuid == res?.uuid)?.length) {
            messages.value[sender].unshift(res)
        }

        if (playerId.value) {
            setReadMessages()
        }
    }

    if (res?.type == 'users_list') {
        players.value = res.users
    }

    if (res?.type == 'new_messages') {
        count.value = res.count
    }
}, { deep: true })
// Обработка ответа

// Отправка СМС
const setMessage = (message: string) => {
    if (message) {
        send(JSON.stringify({
            type: 'message',
            to: players.value[playerId.value],
            message: message
        }))

        if (!messages.value[playerId.value]?.length) {
            messages.value[playerId.value] = []
        }

        messages.value[playerId.value].unshift({
            message: message,
            created_at: new Date,
            admin: true
        })
    }
}
// Отправка СМС

const setPlayerId = (number: string) => {
    playerId.value = number
    setReadMessages()
}

const setReadMessages = () => {
    let ids: any[] = []

    const message = messages.value[playerId.value]

    if (message?.length) {
        ids = message.filter((el: Message) => el?.uuid).map((el: Message) => el.uuid)
    }

    send(JSON.stringify({
        type: 'command',
        command: '__SEEN__',
        uuid: ids
    }))
}

onMounted(() => {
    send(JSON.stringify({
        type: 'command',
        command: '__GET_COMPUTER_USERS__'
    }))
})
setInterval(() => {
    send(JSON.stringify({
        type: 'command',
        command: '__CHECK_NEW_MESSAGES__'
    }))
}, 3000)
onBeforeUnmount(() => {
    close()
})
</script>

<style scoped lang="scss">
.chat {
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 20;

    &__wrapper, &__button {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background: #2b87b4;
    }

    &__wrapper {
        position: absolute;
        z-index: -1;
        animation: pulse 1.2s ease infinite;
    }

    &__button {
        opacity: 1;
        cursor: pointer;
        user-select: none;
        transition: .2s;

        color: white;

        sup {
            padding: 2px 4px;
            background: red;
            border-radius: 8px;
        }

        &:hover {
            opacity: .6;
        }
    }

    &__transition {
        height: calc(100% - 57px);
        overflow: hidden;
        position: relative;

        &-left, &-right {
            position: absolute;
            width: 100%;
            transition: .2s;
        }

        &-left {
            left: 0;

            &.active {
                left: -100%;
            }
        }

        &-right {
            left: 100%;

            &.active {
                left: 0;
            }
        }
    }
}

@keyframes pulse {
    0% {
        transform: scale(1, 1);
    }
    50% {
        opacity: 0.3;
    }
    100% {
        transform: scale(1.5);
        opacity: 0;
    }
}
</style>
