<template>
    <div class="chat">
        <div class="chat__button" @click="isShow = !isShow">
            <span>Players <sup>91</sup></span>
            <div class="chat__wrapper" v-if="!isShow" />
        </div>

        <Box
            v-model="isShow"
            v-model:idSocket="idSocket"
        >
            <div class="chat__transition">
                <Players
                    class="chat__transition-left"
                    :class="{ 'active': !idSocket }"
                    @setIdSocket="(id: number) => idSocket = id"
                />
                <Chat
                    class="chat__transition-right"
                    :class="{ 'active': idSocket }"
                />
            </div>
        </Box>
    </div>
</template>

<script setup lang="ts">
import { Players, Chat, Box } from './components'
import { ref } from 'vue'

const isShow = ref<boolean>(false)
const idSocket = ref<number>(0)
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
