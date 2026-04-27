// components/MainRefContext.tsx
'use client';

import { createContext, RefObject, useContext } from 'react';

export const MainRefContext = createContext<
  
RefObject<HTMLElement | null> | null
>(null);

export function useMainRef() {
  const ctx = useContext(MainRefContext);
  if (!ctx) {
    throw new Error('useMainRef must be used within MainRefContext.Provider');
  }
  return ctx;
}
