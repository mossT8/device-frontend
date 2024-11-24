<template>
    <div class="min-h-screen bg-gray-100">
        <div class="py-6">
            <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white rounded-lg shadow-md">
                    <div class="p-6 border-b border-gray-200">
                        <h2 class="text-xl font-semibold text-gray-800 text-center">Welcome Back</h2>
                        <p class="text-gray-600 text-center">Sign in to your account</p>
                    </div>

                    <form @submit.prevent="handleLogin" class="p-6 space-y-6">
                        <div v-if="error" class="bg-red-50 p-4 rounded text-red-600 text-sm">
                            {{ error }}
                        </div>

                        <div>
                            <input v-model="email" type="email" required placeholder="Email address"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                        </div>

                        <div>
                            <input v-model="password" type="password" required placeholder="Password"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                        </div>

                        <button type="submit" :disabled="loading"
                            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50">
                            {{ loading ? 'Signing in...' : 'Sign in' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'LoginView',
    setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const error = ref('');
        const loading = ref(false);

        const handleLogin = async () => {
            loading.value = true;
            error.value = '';

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value
                    })
                });

                if (!response.ok) throw new Error('Invalid credentials');

                const data = await response.json();
                document.cookie = `auth-token=${data.data.token}; path=/`;
                router.push('/');
            } catch (err) {
                error.value = err instanceof Error ? err.message : 'Login failed';
            } finally {
                loading.value = false;
            }
        };

        return {
            email,
            password,
            error,
            loading,
            handleLogin
        };
    }
});
</script>