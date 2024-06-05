<template>
    <div class="chat-players">
        <div
            class="chat-players__item"
            v-for="(email, number) in players"
            :key="number + email"
            @click="emit('setPlayerId', number)"
        >
            <div>{{ number }}</div>

            <p :style="`${ !messages?.[number]?.[0]?.message ? 'opacity: .5;' : '' }`">
                {{ messages?.[number]?.[0]?.message || 'В этом чате еще нет сообщений' }}
            </p>

            <span v-if="messages?.[number]?.[0]?.created_at">
                {{ getDate(messages?.[number]?.[0]?.created_at) }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Messages } from '@/types/types'

const emit = defineEmits(['setPlayerId'])

const props = defineProps<{
    players: { [key: string]: string }
    messages: Messages
}>()

const getDate = (created_at: any): string => {
    if (!created_at) return ''

    const date = new Date(created_at)

    const hours = String(date.getHours())?.padStart(2, '0')
    const minutes = String(date.getMinutes())?.padStart(2, '0')

    return `${hours}:${minutes}`
}

props
</script>

<style scoped lang="scss">
.chat-players {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    &__item {
        display: flex;
        align-items: center;
        gap: 16px;

        padding: 16px 24px;
        border-bottom: 1px solid gray;

        color: #ffffff;

        cursor: pointer;
        user-select: none;
        transition: .2s;
        background: transparent;

        &:hover {
            background: #5f626c;
        }

        div {
            width: 43px;
            height: 43px;
            border-radius: 8px;
            border: 2px solid greenyellow;
            color: #ffffff;

            display: flex;
            align-items: center;
            justify-content: center;
        }

        p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 255px;
            font-size: 14px;
        }

        span {
            margin-left: auto;
            opacity: .8;
            font-size: 12px;
        }
    }
}
</style>
