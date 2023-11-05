"use client";

import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/Spinner";
import SearchCommand from "@/components/modals/SearchCommand";

const MainLayout = ({ children }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className='flex dark:bg-[#1F1F1F] h-full'>
      <Sidebar />
      <div className='flex-1 overflow-y-auto h-full'>
        <SearchCommand />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
