"use client";

import { Menu } from "lucide-react";
import React from "react";
import Title from "./Title";
import Publish from "./Publish";
import DocMenu from "./DocMenu";
import { MobileNav } from "./MobileNav";
import AlertBanner from "./AlertBanner";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

const Navbar = ({ toggleSidebar, isCollapsed, isMobileView }) => {
  const params = useParams();

  const document = useQuery(api.documents.getDocById, {
    documentId: params.documentId,
  });

  if (document === null) {
    return null;
  }

  return (
    <>
      <div className='flex px-3 bg-background dark:bg-[#1F1F1F] py-2 w-full items-center gap-x-4'>
        {isCollapsed  && (
          <Menu
            className='h-6 w-6 text-muted-foreground cursor-pointer'
            role='button'
            onClick={toggleSidebar}
          />
        )}

        {/* {isCollapsed && isMobileView && (
          <MobileNav toggleSidebar={toggleSidebar} />
        )} */}

        <div className='flex items-center justify-between w-full'>
          <Title document={document} />

          <div className='flex items-center gap-x-2 '>
            <Publish document={document} />
            <DocMenu document={document} />
          </div>
        </div>
      </div>

      {document?.isArchived && <AlertBanner documentId={document._id} />}
    </>
  );
};

export default Navbar;
