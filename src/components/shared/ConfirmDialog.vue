// components/shared/ConfirmDialog.vue
<template>
    <Transition name="fade">
        <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-screen items-center justify-center p-4">
                <!-- Backdrop -->
                <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

                <!-- Dialog -->
                <Transition name="slide-up">
                    <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
                        <!-- Header -->
                        <div class="p-6 border-b border-gray-200">
                            <h3 class="text-lg font-medium text-gray-900">
                                {{ title }}
                            </h3>
                        </div>

                        <!-- Body -->
                        <div class="p-6">
                            <p class="text-sm text-gray-500">
                                {{ message }}
                            </p>
                        </div>

                        <!-- Footer -->
                        <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                            <button @click="$emit('cancel')" class="btn-secondary">
                                {{ cancelText }}
                            </button>
                            <button @click="$emit('confirm')" :class="[
                                type === 'danger' ? 'btn-danger' :
                                    type === 'warning' ? 'btn-warning' :
                                        'btn-primary'
                            ]">
                                {{ confirmText }}
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: Boolean,
    },
    title: {
        type: String,
        default: 'Confirm'
    },
    message: {
        type: String,
        required: true
    },
    confirmText: {
        type: String,
        default: 'Confirm'
    },
    cancelText: {
        type: String,
        default: 'Cancel'
    },
    type: {
        type: String as () => 'danger' | 'warning' | 'info',
        default: 'info'
    }
});

defineEmits(['confirm', 'cancel', 'update:modelValue']);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.2s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>