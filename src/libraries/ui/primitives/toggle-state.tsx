'use client';

import { type ReactNode, useCallback, useState } from 'react';

type ToggleStateProps = {
  children: (isActive: boolean, toggleActive: () => void) => ReactNode;
};

export const ToggleState = ({ children }: ToggleStateProps) => {
  const [isActive, setIsActive] = useState(false);
  const toggleActive = useCallback(() => setIsActive((prev) => !prev), []);

  return <>{children(isActive, toggleActive)}</>;
};
