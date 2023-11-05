"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const DocumentPage = () => {
  const { user } = useUser();
  return (
    <div className='flex h-full items-center justify-center flex-col'>
      <div className='space-y-2 items-center flex justify-center flex-col'>
        <div className='w-[300px] h-[280px] sm:h-[280px] sm:w-[350px] relative'>
          <Image
            alt='writing'
            src='/writing-light.png'
            fill
            priority
            className='object-contain hidden dark:block'
          />
          <Image
            alt='writing'
            src='/writing.png'
            fill
            priority
            className='object-contain dark:hidden'
          />
        </div>
        <span className='font-bold dark:text-white text-lg'>
          Welcome to {user.firstName}&apos;s Quotion
        </span>

        <Button className="gap-x-2 font-medium">
          <PlusCircle className='shrink-0 h-4 w-4' />
          Create a note
        </Button>
      </div>
    </div>
  );
};

export default DocumentPage;
