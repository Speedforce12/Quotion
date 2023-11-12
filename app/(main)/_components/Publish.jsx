"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Check, Copy, Globe2 } from "lucide-react";
import { notFound } from "next/navigation";
import { useState } from "react";

const Publish = ({ document }) => {
  const origin = `${window.location.origin.toString()}/preview/${
    document?._id
  }`;
  const [publish, setPublish] = useState(!!document?.isPublished);
  const [copy, setCopy] = useState(false);

  const updateDoc = useMutation(api.documents.updateDoc);

  const onPublish = () => {
    setPublish(!publish);
    updateDoc({ documentId: document?._id, isPublished: !publish });
  };

 

  const onCopy = async () => {
    setCopy(true);
    await window.navigator.clipboard.writeText(origin);

    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='sm' className='font-medium gap-x-2'>
          Publish{" "}
          {document?.isPublished && (
            <Globe2 size={17} className='text-sky-600' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' alignOffset={8} className='w-72'>
        {document?.isPublished ? (
          <div className='flex flex-col items-start justify-center space-y-3'>
            <div className='flex items-center justify-start space-x-2'>
              <div className='rounded-full h-2 w-2 bg-sky-600 animate-pulse' />
              <p className='font-medium text-xs text-sky-600'>
                This page is live on the web.
              </p>
            </div>

            <div className='flex items-center w-full pt-1'>
              <Input
                value={origin}
                className='h-8 focus-visible:ring-0 focus-visible:ring-transparent bg-[#262626] rounded-r-none w-full text-xs'
                readOnly
              />
              <Button
                onClick={onCopy}
                className='flex items-center justify-center h-7 p-4 rounded-l-none'>
                {copy ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>

            <div className='w-full pt-1'>
              <Button
                onClick={onPublish}
                className='font-bold w-full text-sky-600 text-xs'
                size='sm'>
                Unpublish
              </Button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center space-y-2'>
            <Globe2 className='h-8 w-8 text-muted-foreground' />
            <p className='font-medium text-sm'>Publish this note</p>
            <p className='text-muted-foreground text-xs font-medium'>
              Share your work with others.
            </p>
            <div className='w-full pt-2'>
              <Button
                className='font-bold w-full'
                size='sm'
                onClick={onPublish}>
                Publish
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
