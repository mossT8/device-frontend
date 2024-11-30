<template>
    <div class="mb-8">
        <button @click="isFormVisible = !isFormVisible"
            class="w-full max-w-md bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2">
            <span>{{ isFormVisible ? 'Cancel' : 'Add New User' }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300"
                :class="{ 'rotate-180': isFormVisible }" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <div class="overflow-hidden transition-all duration-300 ease-in-out" :style="{
            maxHeight: isFormVisible ? formHeight + 'px' : '0',
            opacity: isFormVisible ? '1' : '0',
            marginTop: isFormVisible ? '1rem' : '0'
        }">
            <div class="bg-white rounded-lg shadow-md p-6" ref="formContainer">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Add New User</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="grid gap-6 max-w-md">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input v-model="formData.name" type="text" required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter user's name" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input v-model="formData.email" type="email" required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter user's email" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                            <select v-model="formData.role" required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                <option value="">Select a role</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>
                        <div class="flex gap-4">
                            <button type="submit"
                                class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                                Add User
                            </button>
                            <button type="button" @click="isFormVisible = false"
                                class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'UserForm',
    setup() {
        const store = useStore();
        const isFormVisible = ref(false);
        const formContainer = ref<HTMLElement | null>(null);
        const formHeight = ref(0);

        const formData = reactive({
            name: '',
            email: '',
            role: '',
        });

        onMounted(() => {
            if (formContainer.value) {
                formHeight.value = formContainer.value.offsetHeight;
            }
        });

        const handleSubmit = () => {
            store.dispatch('addUser', { ...formData });
            formData.name = '';
            formData.email = '';
            formData.role = '';
            isFormVisible.value = false;
        };

        return {
            formData,
            handleSubmit,
            isFormVisible,
            formContainer,
            formHeight,
        };
    },
});
</script>