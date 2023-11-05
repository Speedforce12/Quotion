import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import React from "react";

const MiniDocMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <div
          className='h-5 w-5 rounded-sm dark:hover:bg-neutral-700 hover:bg-neutral-300 flex items-center justify-center'
          role='button'>
          <MoreHorizontal className='h-4 w-4 shrink-0' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        alignOffset={8}
        className='w-60 p-0'
        forceMount>
        <DropdownMenuItem className='cursor-pointer'>
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

export default MiniDocMenu;
