<template>
    <nav class="bg-gray-800 shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16">
                <div class="flex">
                    <div class="flex-shrink-0 flex items-center">
                        <span class="text-white text-xl font-semibold">Device Portal</span>
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <router-link to="/users"
                            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            active-class="bg-gray-900 text-white">
                            Users
                        </router-link>
                        <router-link to="/devices"
                            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            active-class="bg-gray-900 text-white">
                            Devices
                        </router-link>
                        <router-link to="/sensors"
                            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            active-class="bg-gray-900 text-white">
                            Sensors
                        </router-link>
                    </div>
                </div>
                <div class="flex items-center sm:hidden">
                    <button @click="isOpen = !isOpen"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                        <svg class="h-6 w-6" :class="{ 'hidden': isOpen, 'block': !isOpen }"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg class="h-6 w-6" :class="{ 'block': isOpen, 'hidden': !isOpen }"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="sm:hidden" :class="{ 'block': isOpen, 'hidden': !isOpen }">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <router-link to="/users"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    active-class="bg-gray-900 text-white" @click="isOpen = false">
                    Users
                </router-link>
                <router-link to="/devices"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    active-class="bg-gray-900 text-white" @click="isOpen = false">
                    Devices
                </router-link>
                <router-link to="/sensors"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    active-class="bg-gray-900 text-white" @click="isOpen = false">
                    Sensors
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Navbar',
    setup() {
        const isOpen = ref(false);
        return { isOpen };
    },
});
</script>