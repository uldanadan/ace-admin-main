<template>
    <div
        ref="box"
        class="chat-box"
        :class="{ 'chat-box__show' : modelValue }"
    >
        <div class="chat-box__header">
            <Icon icon="chevron" deg="left" @click="resetidPlayer()" v-if="idPlayer" />

            <h3>{{ idPlayer ? 'Player ' + idPlayer : 'List of players' }}</h3>

            <Icon icon="xmark" @click="closeBox()" />
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import Icon from '@/components/UI/Icon.vue'
import { ref, defineModel, watch } from 'vue'
import { onClickOutside, useMagicKeys } from '@vueuse/core'

const modelValue = defineModel<boolean>()
const idPlayer = defineModel<number>('idPlayer')

const box = ref<HTMLElement | null>(null)

const { escape } = useMagicKeys()

watch(escape, (v) => {
  if (v) idPlayer.value ? resetidPlayer() : closeBox()
})

const resetidPlayer = () => {
    if (idPlayer.value) {
        idPlayer.value = 0
    }
}
const closeBox = () => {
    if (modelValue.value) {
        modelValue.value = false

        resetidPlayer()
    }
}

onClickOutside(box, () => closeBox())
</script>

<style scoped lang="scss">
.chat-box {
    position: fixed;
    right: -100%;
    bottom: 50px;
    z-index: 20;
    width: 425px;
    height: 625px;
    background: #444857;
    transition: .2s;
    border-radius: 8px;

    &__show {
        right: 50px;
    }

    &__header {
        padding: 16px 24px;
        border-bottom: 1px solid gray;

        display: flex;
        align-items: center;
        gap: 12px;

        color: #FFFFFF;

        h3 {
            font-weight: 600;
        }

        .xmark {
            margin-left: auto;
        }


        .icon {
            cursor: pointer;

            &:hover {
                opacity: .6;
            }
        }
    }
}
</style>
