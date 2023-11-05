"use client";

import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div className='space-y-3 max-w-3xl'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Create,organize,share.
        <p className='underline decoration-dashed decoration-amber-400'>
          Your digital canvas for success
        </p>
      </h1>
      <h3 className='font-medium sm:text-xl text-base md:text-2xl dark:text-white text-zinc-500 text-center'>
        Productivity has never been this easy! <br /> Take Notes the simple way.
      </h3>

      {isLoading && (
        <div className='flex items-center justify-center h-full'>
          <Spinner />
        </div>
      )}

      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href='/documents' className='font-semibold gap-x-1'>
            Enter Quotion <ArrowRight className='h-5 w-5' />
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode='modal'>
          <Button className='font-semibold gap-x-1'>
            Join Quotion <ArrowRight className='h-5 w-5' />
          </Button>
        </SignInButton>
      )}

     
    </div>
  );
};

export default Header;
