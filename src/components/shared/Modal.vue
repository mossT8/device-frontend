<template>
    <Transition name="fade">
        <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-screen items-center justify-center p-4">
                <!-- Backdrop -->
                <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="handleBackdropClick"></div>

                <!-- Modal -->
                <Transition name="slide-up">
                    <div v-if="modelValue" :class="[
                        'relative bg-white rounded-lg shadow-xl transform transition-all',
                        sizeClasses,
                        positionClasses
                    ]">
                        <!-- Close button -->
                        <button v-if="showClose" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                            @click="$emit('update:modelValue', false)">
                            ×
                        </button>

                        <!-- Content -->
                        <div :class="['w-full', contentClasses]">
                            <slot></slot>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ModalSize, ModalPosition, SizeClassMap, PositionClassMap } from '@/types/modal';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    size: {
        type: String as () => ModalSize,
        default: 'md'
    },
    position: {
        type: String as () => ModalPosition,
        default: 'center'
    },
    showClose: {
        type: Boolean,
        default: true
    },
    closeOnBackdrop: {
        type: Boolean,
        default: true
    },
    contentClass: {
        type: String,
        default: 'p-6'
    }
});

const emit = defineEmits(['update:modelValue']);

const SIZE_CLASSES: SizeClassMap = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    'full': 'max-w-full mx-4'
};

const POSITION_CLASSES: PositionClassMap = {
    'center': 'my-8',
    'top': 'mt-16 mb-8'
};

const sizeClasses = computed(() => SIZE_CLASSES[props.size]);
const positionClasses = computed(() => POSITION_CLASSES[props.position]);
const contentClasses = computed(() => props.contentClass);

const handleBackdropClick = () => {
    if (props.closeOnBackdrop) {
        emit('update:modelValue', false);
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>