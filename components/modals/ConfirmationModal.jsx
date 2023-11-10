"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/convex/_generated/api";
import { useConfirm } from "@/hooks/use-confirm";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ConfirmationModal = () => {
  const { isOpen, onClose, document } = useConfirm();
  const permaDelete = useMutation(api.documents.deleteDoc);
  const router = useRouter();

  const onDelete = () => {
    const promise = permaDelete({ id: document.id });
    router.push("/documents");

    toast.promise(promise, {
      loading: "Deletion of document in progress",
      success: "Page deleted successfully",
      error: "Error deleting document",
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this page permanently?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex items-center justify-center w-full'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-rose-500 text-white font-bold hover:bg-rose-600'
            onClick={onDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
