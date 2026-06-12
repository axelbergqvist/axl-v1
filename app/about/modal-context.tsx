'use client';

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext<{
  closing: boolean;
  setClosing: (v: boolean) => void;
}>({ closing: false, setClosing: () => {} });

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [closing, setClosing] = useState(false);
  return (
    <ModalContext.Provider value={{ closing, setClosing }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalClosing() {
  return useContext(ModalContext);
}