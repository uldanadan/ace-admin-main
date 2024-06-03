<template>
    <div class="chat">
        <div class="chat__button" @click="isShow = !isShow">
            <span>Players <sup>91</sup></span>
            <div class="chat__wrapper" v-if="!isShow" />
        </div>

        <Box
            v-model="isShow"
            v-model:emailPlayer="emailPlayer"
        >
            <div class="chat__transition">
                <Players
                    class="chat__transition-left"
                    :class="{ 'active': emailPlayer }"
                    :players="players"
                    @setEmailPlayer="(email: string) => emailPlayer = email"
                />
                <Chat
                    class="chat__transition-right"
                    :class="{ 'active': emailPlayer }"
                    :messages="messages[emailPlayer]"
                    @setMessage="setMessage"
                />
            </div>
        </Box>
    </div>
</template>

<script setup lang="ts">
import { Players, Chat, Box } from './components'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'

const isShow = ref<boolean>(false)

const authStore = useAuthStore()
const token = `${authStore.getToken ? authStore.getToken : localStorage.getItem('token') || null}`

const emailPlayer = ref<string>('')

const players = ref<any>({ 
    1: '123.COM@acegaming.gg' 
})

const sockets = ref<{ [key: string]: WebSocket }>({})
const messages = ref<{ [key: string]: any[] }>({
    1: [
        { 
            status: 'error',
            message: 'Админ временна не доступен...', 
            sender: 'bot',
            created_at: '16:03',
            admin: false
        },
        { 
            status: 'ok',
            message: 'Please send me a estimated cost', 
            sender: 'you',
            created_at: '16:02',
            admin: false
        },
        { 
            status: 'ok',
            message: 'Hello, Yes I can make this', 
            sender: 'admin',
            created_at: '16:01',
            admin: true
        },
        { 
            status: 'ok',
            message: 'Hey Zakir, I want to make this type of workspace. Can you help me?', 
            sender: 'you',
            created_at: '16:00',
            admin: false
        },
    ]
})

onMounted(() => {
    for (const iterator in players.value) {
        const email = players.value[iterator]

        const ws = new WebSocket('wss://service.acegaming.gg/ws/chat/', [token])
        sockets.value[email] = ws
        messages.value[email] = []

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (data.status !== 'ok') { 
                messages.value[email].unshift({
                    status: 'error',
                    message: 'Админ временна не доступен...', 
                    sender: 'bot',
                    created_at: '16:03',
                    admin: false
                })
            } else {
                messages.value[email].unshift(data.message)
            }
            
        }
    }
})

onBeforeUnmount(() => {
    Object.values(sockets.value).forEach((ws) => ws.close())
})

const setMessage = (message: any) => {
    const ws = sockets.value[emailPlayer.value]

    if (ws && Object.keys(message)?.length) {

        ws.send(JSON.stringify({ 
            to: emailPlayer.value,
            message: message 
        }))

        // messages.value[emailPlayer.value].unshift(message)
    }
}
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
