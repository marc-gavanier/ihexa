import toast from 'react-hot-toast';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { ICON_LG } from '@/libraries/ui/icons/sizes';
import type { ServerActionSuccess } from '../action';

export const toastSuccess =
  <T,>({ data }: ServerActionSuccess<T>) =>
  (message: (data: T) => string) => {
    toast.success(message(data), {
      icon: <RiCheckboxCircleLine size={ICON_LG} />
    });
  };
