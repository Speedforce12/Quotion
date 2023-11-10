"use client";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import React from "react";

const AlertBanner = ({ documentId }) => {
  const { onOpen } = useConfirm();
  return (
    <div className='flex items-center justify-center bg-rose-500 p-2'>
      <div className='gap-x-2 flex items-center'>
        <h3 className='text-sm font-medium'>This note is in the trash. </h3>

        <Button
          className='bg-transparent border text-white font-medium hover:bg-rose-500/80'
          size='sm'>
          Restore
        </Button>
        <Button
          onClick={() => onOpen({ id: documentId })}
          className='bg-transparent border text-white font-medium hover:bg-rose-500/80'
          size='sm'>
          Delete forever
        </Button>
      </div>
    </div>
  );
};

export default AlertBanner;
