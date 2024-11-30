<template>
    <div class="page-container">
        <div class="content-wrapper">
            <div class="content-container">
                <div class="card">
                    <!-- Header Section -->
                    <div class="card-header">
                        <h2 class="page-title">Devices</h2>
                        <div class="flex gap-4">
                            <SearchInput v-model="searchQuery" placeholder="Search Devices... " />
                            <button @click="openAddModal" class="btn-primary">
                                <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                Add Device
                            </button>
                        </div>
                    </div>

                    <!-- Table Section -->
                    <SharedTable :loading="loading" :items="devices" :columns="columns">
                        <template #default="{ items }">
                            <div v-for="device in devices" :key="device.id" class="table-row">
                                <div class="table-cell">
                                    {{ device.name }}
                                </div>
                                <div class="table-cell">
                                    {{ device.serial_number }}
                                </div>
                                <div class="table-cell">
                                    {{ device.model_id }}
                                </div>
                                <div class="table-cell">
                                    <button @click="editDevice(device)" class="btn-secondary mr-1">Edit</button>
                                    <button @click="handleDelete(device)" class="btn-danger">Delete</button>
                                </div>
                            </div>
                        </template>
                    </SharedTable>

                    <!-- Pagination -->
                    <SharedPagination :current-page="currentPage" :total-items="totalItems" :page-size="pageSize" />
                </div>
            </div>
        </div>

        <!-- Add/Edit Modal -->
        <Modal v-model="showModal">
            <template #title>
                {{ isEditing ? 'Edit Device' : 'Add New Device' }}
            </template>

            <template #default>
                <DeviceForm :device="formData" @close="closeModal" />
            </template>
        </Modal>


        <!-- Delete Confirmation Modal -->
        <ConfirmDialog v-model="confirmDelete.showing.value" v-bind="confirmDelete.options" :message="deleteText"
            @confirm="confirmDelete.confirm" @cancel="confirmDelete.cancel" />
    </div>
</template>

<script lang="ts">
// components
import Modal from '@/components/shared/Modal.vue';
import DeviceForm from '@/components/device/DeviceForm.vue';
import SearchInput from '@/components/shared/SearchInput.vue';
import SharedTable from '@/components/shared/Table.vue';
import SharedPagination from '@/components/shared/Pagination.vue';
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

// types and functions
import { useConfirmDialog } from '@/composables/useConfirm';
import { defineComponent, ref, computed, onMounted } from 'vue';
import { Device } from '@/types/device';
import { TableColumn } from '@/types/tableColumn';
import { useModal } from '@/composables/useModal';

export default defineComponent({
    name: 'DevicesView',
    components: {
        DeviceForm,
        SearchInput,
        SharedTable,
        SharedPagination,
        ConfirmDialog,
        Modal
    },
    setup() {
        // Reactive References
        const addOrUpdatePopUp = useModal();
        const deletePopUp = useConfirmDialog();
        const deleteText = computed<string>(() => deletePopUp.options.value.message)

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
        const columns = ref<TableColumn[]>([
            { key: 'name', label: 'Name' },
            { key: 'serial_number', label: 'Serial Number' },
            { key: 'model_id', label: 'Model ID' },
            { key: 'actions', label: 'Actions', align: 'right' }
        ]);

        const formData = ref<Device>({
            name: '',
            serial_number: '',
            model_id: 0,
            model_config: {},
            id: 0,
            created_at: '',
            modified_at: ''
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

        const closeModal = () => {
            showModal.value = false
        }

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
                serial_number: '',
                model_id: 0,
                model_config: {},
                id: 0,
                created_at: '',
                modified_at: ''
            };
            showModal.value = true;
        };

        const handleDelete = async (device: Device) => {
            try {
                const confirmed = await deletePopUp.show({
                    title: 'Delete Device',
                    message: `Are you sure you want to delete ${device.name}? This action cannot be undone.`,
                    confirmText: 'Delete',
                    cancelText: 'Cancel',
                    type: 'danger'
                });

                if (confirmed) {
                    await fetch(`/api/account/1/device/${device.id}`, {
                        method: 'DELETE'
                    });
                    // Handle successful deletion
                }
            } catch (error) {
                console.error('Error deleting device:', error);
            }
        };


        const editDevice = async (device: Device) => {
            isEditing.value = true;
            selectedDevice.value = device;
            formData.value = device;
            showModal.value = true
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
                fetchDevices();
            } catch (error) {
                console.error('Error saving device:', error);
            }
        };



        // Lifecycle Hooks
        onMounted(() => {
            fetchDevices();
        });

        // Return everything needed in template
        return {
            // State
            deleteText,
            confirmDelete: deletePopUp,
            columns,
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
            handleDelete,
            handleSearch,
            nextPage,
            prevPage,
            closeModal,
            openAddModal,
            editDevice,
            submitForm,
        };
    },
});
</script>