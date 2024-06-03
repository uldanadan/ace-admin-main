<template>
    <div class="chat-players">
        <div
            class="chat-players__item"
            v-for="(email, number) in players"
            :key="number"
            @click="emit('setEmailPlayer', email)"
        >
            <div>{{ number }}</div>

            <p :style="`${ true ? 'opacity: .5;' : '' }`">
                {{ false || 'В этом чате еще нет сообщений' }}
            </p>

            <span>18:30</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['setEmailPlayer'])

const props = defineProps<{
    players: any
}>()

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
            max-width: 255px;
        }

        span {
            margin-left: auto;
            opacity: .8;
        }
    }
}
</style>
