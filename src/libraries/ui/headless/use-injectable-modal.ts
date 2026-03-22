import type { InjectionKey } from 'piqure/src/Providing';
import { useCallback, useState } from 'react';
import { provide } from '@/libraries/injection/container';

export type ModalControls = {
  open: () => void;
  close: () => void;
};

export const useInjectableModal = (key: InjectionKey<ModalControls>) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  provide(key, { open, close });

  return { isOpen, open, close };
};
