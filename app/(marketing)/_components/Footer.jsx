import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className='h-16 flex items-center p-5 z-50'>
      <div className='flex items-center justify-between w-full'>
        <Link href='/' className='md:flex items-center gap-1.5 hidden'>
          <Image
            src='/logo.png'
            alt='Quotion Logo'
            width={35}
            height={35}
            className='object-cover dark:invert'
          />

          <h1 className='font-semibold text-base'>Quotion</h1>
        </Link>

        <div className='flex items-center justify-between md:justify-end gap-3 w-full'>
          <Button
            variant='ghost'
            size='sm'
            className='dark:text-zinc-400 font-medium'>
            <Link href='/privacy'>Privacy Policy</Link>
          </Button>
          <Button
            asChild
            size='sm'
            variant='ghost'
            className='font-medium dark:text-zinc-400'>
            <Link href='/terms'>Terms & Conditions</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
