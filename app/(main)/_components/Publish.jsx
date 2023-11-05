"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Globe2 } from "lucide-react";

const Publish = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='sm' className='font-medium'>
          Publish
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' alignOffset={8} className='w-72'>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <Globe2 className='h-8 w-8 text-muted-foreground' />
          <p className='font-medium text-sm'>Publish this note</p>
          <p className='text-muted-foreground text-xs font-medium'>
            Share your work with others.
          </p>
          <div className='w-full pt-2'>
            <Button className='font-bold w-full' size='sm'>
              Publish
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
