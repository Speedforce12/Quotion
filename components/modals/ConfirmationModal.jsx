"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useConfirm } from "@/hooks/use-confirm";

const ConfirmationModal = () => {
  const { isOpen, onClose } = useConfirm();
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this page permanently?
          </AlertDialogTitle>
        
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center justify-center w-full">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-rose-500 text-white font-bold hover:bg-rose-600">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
