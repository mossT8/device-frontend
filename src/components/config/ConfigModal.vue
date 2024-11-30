// src/components/ConfigModal.vue
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConfigModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    config: {
      type: Object as () => Record<string, any>,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    formatValue(value: any): string {
      if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
      }
      return String(value);
    }
  }
});
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      @click="$emit('close')"
    ></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
          <button 
            @click="$emit('close')"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="px-6 py-4">
          <dl class="grid grid-cols-2 gap-4">
            <template v-for="(value, key) in config" :key="key">
              <dt class="text-sm font-medium text-gray-500">{{ key }}</dt>
              <dd class="text-sm text-gray-900">{{ formatValue(value) }}</dd>
            </template>
          </dl>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200">
          <button
            @click="$emit('close')"
            class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>