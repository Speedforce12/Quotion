import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

const NavItem = ({
  icon: Icon,
  documentIcon,
  id,
  text,
  level = 0,
  onClick,
  expanded,
  active,
  toggleDoc,
}) => {
  const handleExpand = (e) => {
    e.stopPropagation();
    toggleDoc?.();
  };

  const create = useMutation(api.documents.createNote);
  const archive = useMutation(api.documents.archiveDocs);
  const router = useRouter();
  const {user} = useUser()

  // create a new page/document
  const createDocument = (e) => {
    e.stopPropagation();

    const promise = create({ title: "Untitled", parentId: id }).then(
      (documentId) => router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a note",
      success: "New note created!",
      error: "Could not create a note",
    });
  };

  // delete page
  const HandleDeletion = () => {
    const promise = archive({ documentId: id }).then(() =>
      router.push("/documents")
    );

    toast.promise(promise, {
      loading: "deletion of page in progress",
      success: "Successfully deleted page",
      error: "Unable to delete page",
    });
  };

  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      role='button'
      className={cn(
        "flex items-center font-medium hover:bg-primary/5 text-sm py-1 gap-x-2 cursor-pointer text-muted-foreground group",
        active && "bg-primary/10 text-white"
      )}
      onClick={onClick}>
      {!!id && (
        <div
          role='button'
          className='h-5 w-5 rounded-sm dark:hover:bg-neutral-800 hover:bg-neutral-300 flex items-center justify-center'
          onClick={handleExpand}>
          {expanded ? (
            <ChevronDown size={18} className='shrink-0' />
          ) : (
            <ChevronRight size={18} className='shrink-0' />
          )}
        </div>
      )}

      {documentIcon ? (
        <div className='shrink-0'>{documentIcon}</div>
      ) : (
        <>
          <Icon size={18} className='shrink-0 text-muted-foreground' />
        </>
      )}
      <p className='text-sm font-medium truncate'>{text}</p>

      {!!id && (
        <div className='flex items-center space-x-1 group-hover:opacity-100 opacity-0 ml-auto mr-1'>
          <Popover>
            <PopoverTrigger
              className='h-5 w-5 rounded-sm dark:hover:bg-neutral-700 hover:bg-neutral-300 flex items-center justify-center'
              onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className='h-4 w-4 shrink-0 text-muted-foreground' />
            </PopoverTrigger>
            <PopoverContent className='p-1 w-60' sideOffset='0' align='start'>
              <div className='space-y-1'>
                <div
                  className='flex items-center hover:bg-primary/10 p-1 cursor-pointer rounded-md'
                  onClick={HandleDeletion}>
                  <Trash className='mr-2 text-rose-400' size={16} />
                  <p className='font-medium text-sm'>Delete</p>
                </div>
                <Separator className='my-2' />
                <p className='font-medium text-xs text-muted-foreground p-1'>
                  Last edited by: {user.fullName}
                </p>
              </div>
            </PopoverContent>
          </Popover>

          <div
            className='h-5 w-5 rounded-sm dark:hover:bg-neutral-700 hover:bg-neutral-300 flex items-center justify-center'
            onClick={createDocument}>
            <Plus size={17} className='shrink-0 text-muted-foreground' />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;
