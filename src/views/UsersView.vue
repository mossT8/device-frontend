<template>
    <div class="min-h-screen bg-gray-100">
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white rounded-lg shadow-md">
                    <!-- Header Section -->
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 class="text-xl font-semibold text-gray-800">Users</h2>
                            <div class="flex flex-col sm:flex-row gap-4">
                                <div class="relative">
                                    <input v-model="searchQuery" type="text" placeholder="Search users..."
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
                                    Add User
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
                                        Email</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cell</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Updates</th>
                                    <th
                                        class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-if="loading" class="hover:bg-gray-50">
                                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                                        Loading users...
                                    </td>
                                </tr>
                                <tr v-else-if="users.length === 0" class="hover:bg-gray-50">
                                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">
                                            {{ user.firstName }} {{ user.lastName }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-500">{{ user.cell }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                            :class="user.receivesUpdates ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                                            {{ user.receivesUpdates ? 'Yes' : 'No' }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900 mr-4">
                                            Edit
                                        </button>
                                        <button @click="confirmDelete(user)" class="text-red-600 hover:text-red-900">
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
                        {{ isEditing ? 'Edit User' : 'Add New User' }}
                    </h3>
                    <form @submit.prevent="submitForm">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">First Name</label>
                                <input v-model="formData.firstName" type="text" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Last Name</label>
                                <input v-model="formData.lastName" type="text" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Email</label>
                                <input v-model="formData.email" type="email" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Cell Phone</label>
                                <input v-model="formData.cell" type="tel" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div class="flex items-center">
                                <input id="receivesUpdates" v-model="formData.receivesUpdates" type="checkbox"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label for="receivesUpdates" class="ml-2 block text-sm text-gray-900">
                                    Receives Updates
                                </label>
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
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Delete User</h3>
                    <p class="text-sm text-gray-500 mb-4">
                        Are you sure you want to delete this user? This action cannot be undone.
                    </p>
                    <div class="mt-6 flex justify-end space-x-3">
                        <button type="button"
                            class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            @click="closeDeleteModal">
                            Cancel
                        </button>
                        <button type="button"
                            class="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            @click="deleteUser">
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

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cell: string;
    receivesUpdates: boolean;
}

export default defineComponent({
    name: 'UsersView',
    setup() {
        const users = ref<User[]>([]);
        const loading = ref(true);
        const searchQuery = ref('');
        const currentPage = ref(0);
        const pageSize = ref(10);
        const totalItems = ref(0);
        const showModal = ref(false);
        const showDeleteModal = ref(false);
        const isEditing = ref(false);
        const selectedUser = ref<User | null>(null);

        const formData = ref({
            firstName: '',
            lastName: '',
            email: '',
            cell: '',
            receivesUpdates: false,
        });

        const pageStart = computed(() => currentPage.value * pageSize.value);
        const pageEnd = computed(() => Math.min((currentPage.value + 1) * pageSize.value, totalItems.value));
        const hasMorePages = computed(() => pageEnd.value < totalItems.value);

        // API Calls
        const fetchUsers = async () => {
            loading.value = true;
            try {
                const queryParams = new URLSearchParams({
                    page: currentPage.value.toString(),
                    pageSize: pageSize.value.toString(),
                    ...(searchQuery.value && { filterText: searchQuery.value }),
                });

                const response = await fetch(`/api/account/1/user/list?${queryParams}`);
                const data = await response.json();
                users.value = data.data || [];
                console.log('Users:', users.value);
                totalItems.value = data.total || 0;
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                loading.value = false;
            }
        };

        const handleSearch = () => {
            currentPage.value = 0;
            fetchUsers();
        };

        const nextPage = () => {
            if (hasMorePages.value) {
                currentPage.value++;
                fetchUsers();
            }
        };

        const prevPage = () => {
            if (currentPage.value > 0) {
                currentPage.value--;
                fetchUsers();
            }
        };

        const openAddModal = () => {
            isEditing.value = false;
            formData.value = {
                firstName: '',
                lastName: '',
                email: '',
                cell: '',
                receivesUpdates: false,
            };
            showModal.value = true;
        };

        const editUser = (user: User) => {
            isEditing.value = true;
            selectedUser.value = user;
            formData.value = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                cell: user.cell,
                receivesUpdates: user.receivesUpdates,
            };
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
            selectedUser.value = null;
            formData.value = {
                firstName: '',
                lastName: '',
                email: '',
                cell: '',
                receivesUpdates: false,
            };
        };

        const submitForm = async () => {
            try {
                if (isEditing.value && selectedUser.value) {
                    await fetch(`/api/account/1/user/${selectedUser.value.id}/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData.value),
                    });
                } else {
                    await fetch('/api/account/1/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData.value),
                    });
                }
                closeModal();
                fetchUsers();
            } catch (error) {
                console.error('Error saving user:', error);
            }
        };

        const confirmDelete = (user: User) => {
            selectedUser.value = user;
            showDeleteModal.value = true;
        };

        const closeDeleteModal = () => {
            showDeleteModal.value = false;
            selectedUser.value = null;
        };

        const deleteUser = async () => {
            if (!selectedUser.value) return;

            try {
                await fetch(`/api/account/1/user/${selectedUser.value.id}`, {
                    method: 'DELETE',
                });
                closeDeleteModal();
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        };

        onMounted(() => {
            fetchUsers();
        });

        return {
            users,
            loading,
            searchQuery,
            currentPage,
            pageSize,
            totalItems,
            showModal,
            showDeleteModal,
            isEditing,
            selectedUser,
            formData,
            pageStart,
            pageEnd,
            hasMorePages,
            fetchUsers,
            handleSearch,
            nextPage,
            prevPage,
            openAddModal,
            editUser,
            closeModal,
            submitForm,
            confirmDelete,
            closeDeleteModal,
            deleteUser,
        };
    },
});
</script>