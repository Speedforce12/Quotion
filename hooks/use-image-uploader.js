import { create } from "zustand";

export const useImageUploader = create((set) => ({
  isOpen: false,
  url: undefined,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  replaceImage: (imageUrl) => set({ isOpen: true, url: imageUrl }),
}));
