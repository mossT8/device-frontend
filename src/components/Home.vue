<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          ESP32 IoT Device Management Platform
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          A comprehensive solution for managing and configuring ESP32-based IoT devices through an intuitive admin portal
        </p>
        <div class="mt-8">
          <button
            @click="navigateToLogin"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login to Dashboard
          </button>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <div class="text-blue-600 mb-4">
            <component :is="feature.icon" class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Technical Overview -->
      <div class="bg-white p-8 rounded-lg shadow-lg mb-16">
        <h2 class="text-2xl font-bold mb-6">Technical Overview</h2>
        <div class="prose max-w-none">
          <h3 class="text-xl font-semibold mb-4">ESP32 Capabilities</h3>
          <ul class="space-y-2">
            <li v-for="capability in esp32Capabilities" 
                :key="capability"
                class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-blue-500"></div>
              {{ capability }}
            </li>
          </ul>

          <h3 class="text-xl font-semibold mt-6 mb-4">Compatible Sensors</h3>
          <ul class="space-y-2">
            <li v-for="sensor in compatibleSensors" 
                :key="sensor"
                class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              {{ sensor }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Cpu, 
  Wifi, 
  Settings, 
  Database, 
  Shield, 
  LineChart 
} from 'lucide-vue-next';
import { useRouter } from 'vue-router';

interface Feature {
  icon: any;
  title: string;
  description: string;
}

const router = useRouter();

const features: Feature[] = [
  {
    icon: Cpu,
    title: 'Device Management',
    description: 'Easily manage and monitor all your ESP32 devices from a centralized dashboard.',
  },
  {
    icon: Settings,
    title: 'Remote Configuration',
    description: 'Configure your IoT devices remotely with our intuitive interface.',
  },
  {
    icon: Database,
    title: 'Data Logging',
    description: 'Comprehensive data logging and visualization for all your sensor readings.',
  },
  {
    icon: Wifi,
    title: 'Real-time Updates',
    description: 'Get real-time updates and notifications from your connected devices.',
  },
  {
    icon: Shield,
    title: 'Secure Access',
    description: 'Enterprise-grade security with encrypted communications and access control.',
  },
  {
    icon: LineChart,
    title: 'Analytics',
    description: 'Advanced analytics and reporting capabilities for device performance.',
  },
];

const esp32Capabilities = [
  'Dual-core processor up to 240MHz',
  'Built-in Wi-Fi and Bluetooth connectivity',
  'Rich set of peripherals including ADC, DAC, I2C, SPI',
  'Low power consumption with deep sleep modes',
  'Hardware encryption acceleration',
  'Real-time operating system (RTOS) support'
];

const compatibleSensors = [
  'Temperature & Humidity (DHT11, DHT22, BME280)',
  'Motion Detection (PIR sensors, HC-SR04)',
  'Light Sensors (LDR, BH1750)',
  'Air Quality (MQ series gas sensors)',
  'Pressure Sensors (BMP280, BMP180)',
  'Soil Moisture Sensors'
];

const navigateToLogin = () => {
  router.push('/login');
};
</script>