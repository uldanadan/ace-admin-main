<template>
    <div class="chat">
        <div class="chat__button" @click="isShow = !isShow">
            <span> {{ isAdmin ? 'Players' : 'Support' }} </span>
            <div class="chat__wrapper" v-if="!isShow" />
        </div>

        <Box
            v-model="isShow"
            v-model:idSocket="idSocket"
            :isAdmin="isAdmin"
        >
            <Players
                v-if="isAdmin && !idSocket"
                @setIdSocket="(id: number) => idSocket = id"
            />
            <Chat v-if="idSocket" />
        </Box>
    </div>
</template>

<script setup lang="ts">
import { Players, Chat, Box } from './components'
import { ref } from 'vue'

const isShow = ref<boolean>(false)

const isAdmin = ref<boolean>(true)
const idSocket = ref<number>(0)
</script>

<style scoped lang="scss">
.chat {
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 20;

    &__wrapper, &__button {
        width: 75px;
        height: 75px;
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

        &:hover {
            opacity: .6;
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
