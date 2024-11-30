<template>
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div class="flex-1 flex justify-between sm:hidden">
                            <button @click="prev" :disabled="currentPage === 0"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 0 }">
                                Previous
                            </button>
                            <button @click="next" :disabled="!hasMorePages"
                                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                :class="{ 'opacity-50 cursor-not-allowed': !hasMorePages }">
                                Next
                            </button>
                        </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700">
                                    Showing
                                    <span class="font-medium">{{ pageStart + 1 }}</span>
                                    to
                                    <span class="font-medium">{{ pageEnd }}</span>
                                    of
                                    <span class="font-medium">{{ totalItems }}</span>
                                    results
                                </p>
                            </div>
                            <div>
                                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button @click="prev" :disabled="currentPage === 0"
                                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 0 }">
                                        Previous
                                    </button>
                                    <button @click="next" :disabled="!hasMorePages"
                                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        :class="{ 'opacity-50 cursor-not-allowed': !hasMorePages }">
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    name: 'SharedPagination',
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      pageSize: {
        type: Number,
        required: true
      },
      totalItems: {
        type: Number,
        required: true
      }
    },
    emits: ['update:currentPage', 'previous', 'next'],
    setup(props, { emit }) {
      const pageStart = computed(() => props.currentPage * props.pageSize);
      const pageEnd = computed(() => Math.min((props.currentPage + 1) * props.pageSize, props.totalItems));
      const hasMorePages = computed(() => pageEnd.value < props.totalItems);
  
      const prev = () => {
        if (props.currentPage > 0) {
          emit('update:currentPage', props.currentPage - 1);
          emit('previous');
        }
      };
  
      const next = () => {
        if (hasMorePages.value) {
          emit('update:currentPage', props.currentPage + 1);
          emit('previous');
        }
      };
  
      return {
        pageStart,
        pageEnd,
        hasMorePages,
        prev,
        next
      };
    }
  });
  </script>
  