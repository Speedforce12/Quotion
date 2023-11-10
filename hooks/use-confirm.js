import { create } from "zustand";

export const useConfirm = create((set) => ({
  isOpen: false,
  document: null,
  onOpen: (id) => set({ isOpen: true, document: id }),
  onClose: () => set({ isOpen: false }),
}));
