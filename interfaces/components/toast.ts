export interface ToastProps {
  message: string;
  visible: boolean;
  onHide?: () => void;
  type?: 'success' | 'info' | 'error' | 'warning';
  title?: string;
  description?: string;
  showIcon?: boolean;
}

export interface ToastRef {
  show: (
    message: string,
    options?: {
      type?: 'success' | 'info' | 'error' | 'warning';
      title?: string;
      description?: string;
      showIcon?: boolean;
    }
  ) => void;
}
