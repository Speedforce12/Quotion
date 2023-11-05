"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DocMenu = ({ document }) => {
  const router = useRouter();

  const archive = useMutation(api.documents.archiveDocs);
  const HandleDeletion = () => {
    const promise = archive({ documentId: document._id }).then(() =>
      router.push("/documents")
    );

    toast.promise(promise, {
      loading: "deletion of page in progress",
      success: "Successfully deleted page",
      error: "Unable to delete page",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='font-medium'>
          <MoreHorizontal size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' alignOffset={8} className='w-60 p-0'>
        <DropdownMenuItem className='cursor-pointer' onClick={HandleDeletion}>
          <Trash className='mr-2 text-rose-400' size={16} />
          <p className='font-medium text-sm'>Delete</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='focus:bg-transparent'>
          <p className='font-medium text-xs text-muted-foreground pb-1'>
            Last edited by: Ovonee
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocMenu;
