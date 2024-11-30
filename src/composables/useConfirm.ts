import { ConfirmOptions } from '@/types/confirmOptions';
import { ref } from 'vue';

export function useConfirmDialog() {
  const showing = ref(false);
  const options = ref<ConfirmOptions>({
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'info'
  });
  
  let resolvePromise: ((value: boolean) => void) | null = null;

  const show = (newOptions: ConfirmOptions): Promise<boolean> => {
    options.value = {
      ...options.value,
      ...newOptions
    };
    showing.value = true;

    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  };

  const confirm = () => {
    showing.value = false;
    resolvePromise?.(true);
  };

  const cancel = () => {
    showing.value = false;
    resolvePromise?.(false);
  };

  return {
    showing,
    options,
    show,
    confirm,
    cancel
  };
}