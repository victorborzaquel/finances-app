import React, { createContext, RefObject, useContext } from 'react'
import { useRef } from 'react';
import { Modalize } from 'react-native-modalize';

const ModalizeContext = createContext({} as {
  createModalize(): {
    ref: React.RefObject<Modalize>;
    open: () => void | undefined;
    close: () => void | undefined;
  }
})

export const useModalize = () => useContext(ModalizeContext)

export function ModalizeProvider({ children }: { children: React.ReactNode }) {

  function createModalize() {
    const modalizeRef = () => useRef<Modalize>(null)
    const openModalize = (ref: RefObject<Modalize>) => ref.current?.open()
    const closeModalize = (ref: RefObject<Modalize>) => ref.current?.close()

    const ref = modalizeRef()

    return {
      ref,
      open: () => openModalize(ref),
      close: () => closeModalize(ref)
    }
  }

  return (
    <ModalizeContext.Provider value={{ createModalize }}>
      {children}
    </ModalizeContext.Provider>
  )
}