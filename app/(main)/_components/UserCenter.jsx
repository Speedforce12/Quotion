"use client";

import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserCenter = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center gap-2 hover:bg-primary/5 p-3 w-full cursor-pointer'>
          <Image
            alt={user.firstName}
            src={user.imageUrl}
            width={22}
            height={22}
            className='object-cover rounded-full'
          />
          <h3 className='text-sm line-clamp-1 font-medium'>
            {user.firstName}&apos;s Quotion
          </h3>

          <ChevronsUpDown className='h-4 w-4 text-muted-foreground' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='ml-5 w-72 p-2'>
        <DropdownMenuGroup>
          <DropdownMenuItem className='focus:bg-transparent'>
            <div className='flex flex-col space-y-2'>
              <p className='text-xs text-muted-foreground'>
                {user.emailAddresses[0].emailAddress}
              </p>

              <div className='flex items-center gap-3'>
                <div className='rounded-md bg-neutral-800  h-8 w-8 flex items-center justify-center'>
                  <Image
                    alt={user.firstName}
                    src={user.imageUrl}
                    width={22}
                    height={22}
                    className='object-cover rounded-full'
                  />
                </div>

                <p className='text-sm font-medium'>
                  {user.firstName}&apos;s Quotion
                </p>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton className='text-sm w-full text-start' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserCenter;
