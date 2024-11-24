<template>
    <div class="min-h-screen bg-gray-100">
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white rounded-lg shadow-md">
                    <!-- Header Section -->
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 class="text-xl font-semibold text-gray-800">Devices</h2>
                            <div class="flex flex-col sm:flex-row gap-4">
                                <div class="relative">
                                    <input v-model="searchQuery" type="text" placeholder="Search devices..."
                                        class="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-64 transition-all"
                                        @input="handleSearch" />
                                    <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <button @click="openAddModal"
                                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Add Device
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Table Section -->
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Serial Number</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Model ID</th>
                                    <th
                                        class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-if="loading" class="hover:bg-gray-50">
                                    <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                                        Loading devices...
                                    </td>
                                </tr>
                                <tr v-else-if="devices.length === 0" class="hover:bg-gray-50">
                                    <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                                        No devices found
                                    </td>
                                </tr>
                                <tr v-for="device in devices" :key="device.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">{{ device.name }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-500">{{ device.serial_number }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-500">{{ device.model_id }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button @click="editDevice(device)"
                                            class="text-blue-600 hover:text-blue-900 mr-4">
                                            Edit
                                        </button>
                                        <button @click="confirmDelete(device)" class="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div class="flex-1 flex justify-between sm:hidden">
                            <button @click="prevPage" :disabled="currentPage === 0"
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
                                    <button @click="prevPage" :disabled="currentPage === 0"
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

        <!-- Add/Edit Modal -->
        <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75" @click="closeModal"></div>
                <div class="relative bg-white rounded-lg w-full max-w-md p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        {{ isEditing ? 'Edit Device' : 'Add New Device' }}
                    </h3>
                    <form @submit.prevent="submitForm">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Name</label>
                                <input v-model="formData.name" type="text" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Serial Number</label>
                                <input v-model="formData.serialNumber" type="text" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Model ID</label>
                                <input v-model.number="formData.modelId" type="number" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>
                        <div class="mt-6 flex justify-end space-x-3">
                            <button type="button"
                                class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                @click="closeModal">
                                Cancel
                            </button>
                            <button type="submit"
                                class="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                {{ isEditing ? 'Update' : 'Add' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75" @click="closeDeleteModal"></div>
                <div class="relative bg-white rounded-lg w-full max-w-md p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Delete Device</h3>
                    <p class="text-sm text-gray-500 mb-4">
                        Are you sure you want to delete this device? This action cannot be undone.
                    </p>
                    <div class="mt-6 flex justify-end space-x-3">
                        <button type="button"
                            class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            @click="closeDeleteModal">
                            Cancel
                        </button>
                        <button type="button"
                            class="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            @click="deleteDevice">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { Device } from '@/types/device';

export default defineComponent({
    name: 'DevicesView',
    setup() {
        // Reactive References
        const devices = ref<Device[]>([]);
        const loading = ref(true);
        const searchQuery = ref('');
        const currentPage = ref(0);
        const pageSize = ref(10);
        const totalItems = ref(0);
        const showModal = ref(false);
        const showDeleteModal = ref(false);
        const isEditing = ref(false);
        const selectedDevice = ref<Device | null>(null);

        const formData = ref({
            name: '',
            serialNumber: '',
            modelId: 0,
            modelConfig: {},
        });

        // Computed Properties
        const pageStart = computed(() => currentPage.value * pageSize.value);
        const pageEnd = computed(() => Math.min((currentPage.value + 1) * pageSize.value, totalItems.value));
        const hasMorePages = computed(() => pageEnd.value < totalItems.value);

        // API Calls
        const fetchDevices = async () => {
            loading.value = true;
            try {
                const queryParams = new URLSearchParams({
                    page: currentPage.value.toString(),
                    pageSize: pageSize.value.toString(),
                    ...(searchQuery.value && { filterText: searchQuery.value }),
                });

                const response = await fetch(`/api/account/1/device/list?${queryParams}`);
                const data = await response.json();
                devices.value = data.data || [];
                totalItems.value = data.total || 0;
                
            } catch (error) {
                console.error('Error fetching devices:', error);
            } finally {
                loading.value = false;
            }
        };

        // Event Handlers
        const handleSearch = () => {
            currentPage.value = 0;
            fetchDevices();
        };

        const nextPage = () => {
            if (hasMorePages.value) {
                currentPage.value++;
                fetchDevices();
            }
        };

        const prevPage = () => {
            if (currentPage.value > 0) {
                currentPage.value--;
                fetchDevices();
            }
        };

        const openAddModal = () => {
            isEditing.value = false;
            formData.value = {
                name: '',
                serialNumber: '',
                modelId: 0,
                modelConfig: {},
            };
            showModal.value = true;
        };

        const editDevice = (device: Device) => {
            isEditing.value = true;
            selectedDevice.value = device;
            formData.value = {
                name: device.name,
                serialNumber: device.serial_number,
                modelId: device.model_id,
                modelConfig: device.model_config,
            };
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
            selectedDevice.value = null;
            formData.value = {
                name: '',
                serialNumber: '',
                modelId: 0,
                modelConfig: {},
            };
        };

        const submitForm = async () => {
            try {
                if (isEditing.value && selectedDevice.value) {
                    // Update existing device
                    await fetch(`/api/account/1/device/${selectedDevice.value.id}/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData.value),
                    });
                } else {
                    // Add new device
                    await fetch('/api/account/1/device', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData.value),
                    });
                }
                closeModal();
                fetchDevices();
            } catch (error) {
                console.error('Error saving device:', error);
            }
        };

        const confirmDelete = (device: Device) => {
            selectedDevice.value = device;
            showDeleteModal.value = true;
        };

        const closeDeleteModal = () => {
            showDeleteModal.value = false;
            selectedDevice.value = null;
        };

        const deleteDevice = async () => {
            if (!selectedDevice.value) return;

            try {
                await fetch(`/api/account/1/device/${selectedDevice.value.id}`, {
                    method: 'DELETE',
                });
                closeDeleteModal();
                fetchDevices();
            } catch (error) {
                console.error('Error deleting device:', error);
            }
        };

        // Lifecycle Hooks
        onMounted(() => {
            fetchDevices();
        });

        // Return everything needed in template
        return {
            // State
            devices,
            loading,
            searchQuery,
            currentPage,
            pageSize,
            totalItems,
            showModal,
            showDeleteModal,
            isEditing,
            selectedDevice,
            formData,
            // Computed
            pageStart,
            pageEnd,
            hasMorePages,
            // Methods
            fetchDevices,
            handleSearch,
            nextPage,
            prevPage,
            openAddModal,
            editDevice,
            closeModal,
            submitForm,
            confirmDelete,
            closeDeleteModal,
            deleteDevice,
        };
    },
});
</script>