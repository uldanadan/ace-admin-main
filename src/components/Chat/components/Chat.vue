<template>
    <div class="chat-message">
        <div class="chat-message__items">
            <div
                v-for="item in messages"
                :key="item"
                class="chat-message__item"
                :class="{ 'chat-message__item-right' : !item?.admin || item?.sender == 'bot' }"
            >
                <img src="https://w7.pngwing.com/pngs/862/646/png-transparent-beard-hipster-male-man-avatars-xmas-giveaway-icon-thumbnail.png" v-if="item?.admin">
                <img src="https://bryansk.news/wp-content/uploads/2022/09/bot.png" v-if="item?.sender == 'bot'">
                <img src="https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png" v-else>
                <div>
                    <p>{{ item?.message }}</p>
                    <span>{{ item?.created_at }}</span>
                </div>
            </div>
        </div>

        <div class="chat-message__footer">
            <InputPrimary v-model="message" type="text" label="Type a message" name="message" @keyup.enter="setMessage" />

            <button @click="setMessage">
                <Icon icon="paper-plane-tilt" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputPrimary from '@/components/UI/InputPrimary.vue'
import Icon from '@/components/UI/Icon.vue'
import { ref } from 'vue'

const props = defineProps<{
    messages: any[]
}>()

const emit = defineEmits(['setMessage'])

const message = ref<string>('')
const setMessage = () => {
    if (!message.value) return

    emit('setMessage', {
        text: message.value,
        id: props.messages?.length + 1,
        isAdmin: props.messages?.length ? !props.messages[0].isAdmin : true,
        date: '16:03'
    })

    message.value = ''
}
</script>

<style scoped lang="scss">
.chat-message {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__items {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column-reverse;
        gap: 12px;

        overflow-y: auto;
        padding: 24px 24px 0;
    }

    &__item {
        display: flex;
        align-items: start;
        gap: 14px;

        img {
            width: 43px;
            height: 43px;
            border-radius: 100%;
        }

        p {
            padding: 20px 12px;
            background: #FFFFFF;
            color: #2D3643;
            border-radius: 10px;
            margin-bottom: 8px;
            font-size: 14px;
        }

        span {
            font-size: 12px;
            color: #8897AE;
        }

        &-right {
            flex-direction: row-reverse;

            p, span {
                display: block;
                text-align: right;
            }

            p {
                background: #4C56BB;
                color: #FFFFFF;
            }
        }
    }

    &__footer {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 24px;

        input {
            flex: 1 1 auto;
            height: 60px;
            border-radius: 6px;
            padding: 0 14px;
        }

        button {
            width: 60px;
            height: 60px;

            display: flex;
            align-items: center;
            justify-content: center;

            color: #FFFFFF;
            background: #2C303A;
            border-radius: 6px;
            transition: .2s;

            &:hover {
                opacity: .6;
            }
        }
    }
}
</style>
