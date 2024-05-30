<template>
    <div class="chat-players">
        <div
            class="chat-players__item"
            v-for="item in players"
            :key="item"
            @click="emit('setIdSocket', item?.id)"
        >
            <div>{{ item?.id }}</div>

            <p :style="`${ !item?.text ? 'opacity: .5;' : '' }`">
                {{ item?.text || 'В этом чате еще нет сообщений' }}
            </p>

            <span>18:30</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['setIdSocket'])

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
</script>

<style scoped lang="scss">
.chat-players {
    display: flex;
    flex-direction: column;

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
