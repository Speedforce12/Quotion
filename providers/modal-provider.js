"use client";

import ImageUploader from "@/app/(main)/_components/documentFeatures/ImageUploader";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import SettingsModal from "@/components/modals/SettingsModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ConfirmationModal />
      <SettingsModal />
      <ImageUploader />
    </>
  );
};

export default ModalProvider;
