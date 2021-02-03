import { ToastTypeEnum } from './toast-type.enum';

export interface ToastInfoInterface {
  message: string;
  toastType: ToastTypeEnum;
  duration: number;
}
