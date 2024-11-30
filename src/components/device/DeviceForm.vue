<template>
  <div>
    <form @submit.prevent="handleSubmit" class="form-group">
      <div>
        <label class="form-label" for="device-name">Name</label>
        <input v-model="form.name" id="device-name" type="text" required class="form-input" />
      </div>
      <div>
        <label class="form-label" for="device-serial">Serial Number</label>
        <input v-model="form.serial_number" id="device-serial" type="text" required class="form-input" />
      </div>
      <div>
        <label class="form-label" for="device-model">Model ID</label>
        <input v-model.number="form.model_id" id="device-model" type="number" required class="form-input" />
      </div>

      <div class="mt-6 flex justify-end space-x-3">
        <button type="button" class="btn-secondary" @click="onClose">Cancel</button>
        <button type="submit" class="btn-primary">
          {{ isEditing ? 'Update' : 'Add' }}
        </button>
      </div>
    </form>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { Device } from '@/types/device';

export default defineComponent({
  name: 'DeviceForm',
  props: {
    device: {
      type: Object as () => Device | null,
      default: null
    }
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const form = ref<Device>({
      name: '',
      serial_number: '',
      model_id: 0,
      model_config: {},
      id: 0,
      created_at: '',
      modified_at: ''
    });

    const isEditing = computed(() => !!props.device);

    watch(() => props.device, (device) => {
      if (device) {
        form.value = device;
      } else {
        form.value = {
          name: '',
          serial_number: '',
          model_id: 0,
          model_config: {},
          id: 0,
          created_at: '',
          modified_at: ''
        };
      }
    }, { immediate: true });

    const handleSubmit = () => {
      emit('submit', form.value);
    };

    const onClose = () => {
      emit('close');
    };

    return {
      form,
      isEditing,
      handleSubmit,
      onClose
    };
  }
});
</script>