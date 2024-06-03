<template>
    <div class="chat">
        <div class="chat__button" @click="isShow = !isShow">
            <span>Players <sup>91</sup></span>
            <div class="chat__wrapper" v-if="!isShow" />
        </div>

        <Box
            v-model="isShow"
            v-model:idPlayer="idPlayer"
        >
            <div class="chat__transition">
                <Players
                    class="chat__transition-left"
                    :class="{ 'active': !idPlayer }"
                    :players="players"
                    @setIdPlayer="(id: number) => idPlayer = id"
                />
                <Chat
                    class="chat__transition-right"
                    :class="{ 'active': idPlayer }"
                    :messages="messages[idPlayer]"
                    @setMessage="setMessage"
                />
            </div>
        </Box>
    </div>
</template>

<script setup lang="ts">
import { Players, Chat, Box } from './components'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isShow = ref<boolean>(false)

const idAdmin = ref<number | string>('admin')
const idPlayer = ref<number>(0)

const players = ref<any[]>([
    { id: 1, text: 'Полный' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' },
    { id: 5, text: '' },
    { id: 6, text: '' },
    { id: 7, text: '' },
    { id: 8, text: '' },
    { id: 9, text: '' },
    { id: 10, text: '' },
    { id: 11, text: '' },
    { id: 12, text: '' },
    { id: 13, text: '' },
    { id: 14, text: '' },
])

const sockets = ref<{ [key: string]: WebSocket }>({})
const messages = ref<{ [key: string]: any[] }>({
    1: [
        { isAdmin: true, id: 4, text: 'Here is the estimated. Please check', date: '16:03' },
        { isAdmin: false, id: 3, text: 'Please send me a estimated cost', date: '16:02' },
        { isAdmin: true, id: 2, text: 'Hello, Yes I can make this', date: '16:01' },
        { isAdmin: false, id: 1, text: 'Hey Zakir, I want to make this type of workspace. Can you help me?', date: '16:00' },
    ]
})

onMounted(() => {
    players.value.forEach((player: any) => {
        const ws = new WebSocket(`ws://localhost:8080?id=${idAdmin.value}&user=${player?.id}`)
        sockets.value[player?.id] = ws
        messages.value[player?.id] = []

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            messages.value[player?.id].unshift(data.message)
        }
    })
})

onBeforeUnmount(() => {
    Object.values(sockets.value).forEach((ws) => ws.close())
})

const setMessage = (message: any) => {
    const ws = sockets.value[idPlayer.value]

    if (ws && Object.keys(message)?.length) {

        ws.send(JSON.stringify({ 
            targetId: idPlayer.value,
            message: message 
        }))

        messages.value[idPlayer.value].unshift(message)
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
