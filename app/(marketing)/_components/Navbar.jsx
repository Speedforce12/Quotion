"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/Spinner";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(50);

  const { isLoading, isAuthenticated } = useConvexAuth();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          setShow(true);
        } else {
          setShow(false);
        }

        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "h-16 sticky bg-background dark:bg-[#1F1F1F] top-0 flex items-center p-5 z-50",
        show && "border-b dark:border-b-gray-700 shadow-sm"
      )}>
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
          {isLoading ? (
            <>
              <Spinner size='sm' />
            </>
          ) : (
            <>
              {isAuthenticated && !isLoading && (
                <>
                  <Button asChild variant='ghost'>
                    <Link
                      href='/documents'
                      className='font-semibold gap-x-1 text-sm'>
                      Enter Quotion
                    </Link>
                  </Button>

                  <UserButton afterSignOutUrl='/' />
                </>
              )}

              {!isAuthenticated && !isLoading && (
                <>
                  <SignInButton mode='modal'>
                    <Button className='font-semibold gap-x-1' variant='ghost'>
                      Login
                    </Button>
                  </SignInButton>

                  <SignInButton mode='modal'>
                    <Button size='sm' className='font-medium'>
                      Get Quotion free
                    </Button>
                  </SignInButton>
                </>
              )}

              {/* {!isAuthenticated && !isLoading && (
                <SignInButton mode='modal'>
                  <Button size='sm' className='font-medium'>
                    Get Quotion free
                  </Button>
                </SignInButton>
              )} */}
              {/* 
              {isAuthenticated && !isLoading && } */}
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
