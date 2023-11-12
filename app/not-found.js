"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='space-y-3 flex flex-col items-center justify-center'>
        <div className='w-[300px] h-[280px] sm:h-[280px] sm:w-[350px] relative'>
          <Image
            alt='not found'
            src='/not-found.png'
            fill
            className='object-contain invert'
          />
        </div>

        <div className="text-center px-3">
          <h2 className='font-bold text-2xl'>Oops!</h2>

          <p className="text-sm text-muted-foreground">The requested Page might have been deleted or no longer public</p>
        </div>
        <Button
          className='font-semibold '
          onClick={() => router.push("/documents")}>
          Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
