<template>
    <div class="min-h-screen bg-gray-100">
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white rounded-lg shadow-md">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 class="text-xl font-semibold text-gray-800">Sensors</h2>
                            <div class="relative">
                                <input v-model="searchQuery" type="text" placeholder="Search sensors..."
                                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-64 transition-all"
                                    @input="handleSearch" />
                                <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Unit</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Value</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Update</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="sensor in filteredSensors" :key="sensor.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">{{ sensor.name }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ sensor.type }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ sensor.unit }}</div>
                                    </td>
                                </tr>

                                <tr v-if="filteredSensors.length === 0">
                                    <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                                        {{ loading ? 'Loading sensors...' : 'No sensors found' }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div class="flex-1 flex justify-between sm:hidden">
                            <button @click="previousPage" :disabled="currentPage === 0"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 0 }">
                                Previous
                            </button>
                            <button @click="nextPage" :disabled="!hasMorePages"
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
                                    <button @click="previousPage" :disabled="currentPage === 0"
                                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 0 }">
                                        Previous
                                    </button>
                                    <button @click="nextPage" :disabled="!hasMorePages"
                                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        :class="{ 'opacity-50 cursor-not-allowed': !hasMorePages }">
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { Sensor } from '@/types/sensor';

export default defineComponent({
    name: 'SensorsView',
    setup() {
        const sensors = ref<Sensor[]>([]);
        const searchQuery = ref('');
        const loading = ref(true);
        const currentPage = ref(0);
        const pageSize = ref(10);
        const totalItems = ref(0);

        const fetchSensors = async () => {
            loading.value = true;
            try {
                const queryParams = new URLSearchParams({
                    page: currentPage.value.toString(),
                    pageSize: pageSize.value.toString(),
                    ...(searchQuery.value && { filterText: searchQuery.value }),
                });

                const response = await fetch(`/api/sensor/list?${queryParams}`);
                const data = await response.json();
                sensors.value = data.data || [];
                totalItems.value = data.total || 0;
            } catch (error) {
                console.error('Error fetching sensors:', error);
            } finally {
                loading.value = false;
            }
        };

        const handleSearch = () => {
            currentPage.value = 0;
            fetchSensors();
        };

        const filteredSensors = computed(() => sensors.value);

        const pageStart = computed(() => currentPage.value * pageSize.value);
        const pageEnd = computed(() => Math.min((currentPage.value + 1) * pageSize.value, totalItems.value));
        const hasMorePages = computed(() => pageEnd.value < totalItems.value);

        const previousPage = () => {
            if (currentPage.value > 0) {
                currentPage.value--;
                fetchSensors();
            }
        };

        const nextPage = () => {
            if (hasMorePages.value) {
                currentPage.value++;
                fetchSensors();
            }
        };

        watch(searchQuery, () => {
            // Debounce search input
            const timeoutId = setTimeout(() => {
                handleSearch();
            }, 300);
            return () => clearTimeout(timeoutId);
        });

        onMounted(() => {
            fetchSensors();
        });

        return {
            sensors,
            searchQuery,
            loading,
            filteredSensors,
            currentPage,
            pageSize,
            totalItems,
            pageStart,
            pageEnd,
            hasMorePages,
            handleSearch,
            previousPage,
            nextPage,
        };
    },
});
</script>