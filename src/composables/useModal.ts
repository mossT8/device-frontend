import { ref, computed } from "vue";
import { ModalInstance, ModalOptions } from "@/types/modal";

const defaultOptions: ModalOptions = {
  size: "md",
  position: "center",
  closeOnBackdrop: true,
  showClose: true,
  persistent: false,
};

export function useModal(initialOptions: ModalOptions = {}) {
  const modal = ref<ModalInstance>({
    isOpen: false,
    options: { ...defaultOptions, ...initialOptions },
  });

  const open = (options?: ModalOptions) => {
    if (options) {
      modal.value.options = { ...modal.value.options, ...options };
    }
    modal.value.isOpen = true;
  };

  const close = () => {
    if (!modal.value.options.persistent) {
      modal.value.isOpen = false;
    }
  };

  const toggle = () => {
    if (modal.value.isOpen && modal.value.options.persistent) return;
    modal.value.isOpen = !modal.value.isOpen;
  };

  const updateOptions = (options: Partial<ModalOptions>) => {
    modal.value.options = { ...modal.value.options, ...options };
  };

  // Computed classes based on options
  const modalClasses = computed(() => {
    const { size, position } = modal.value.options;
    return {
      "modal-container": true,
      [`modal-${size}`]: true,
      [`modal-position-${position}`]: true,
    };
  });

  return {
    modal,
    open,
    close,
    toggle,
    updateOptions,
    modalClasses,
  };
}
