export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPosition = 'center' | 'top';

export type SizeClassMap = Record<ModalSize, string>;
export type PositionClassMap = Record<ModalPosition, string>;

export interface ModalOptions {
  size?: ModalSize;
  position?: ModalPosition;
  closeOnBackdrop?: boolean;
  showClose?: boolean;
  persistent?: boolean;
}

export interface ModalInstance {
  isOpen: boolean;
  options: ModalOptions;
}

