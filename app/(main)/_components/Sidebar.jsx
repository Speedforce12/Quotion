"use client";

import React, { useEffect, useRef, useState } from "react";
import UserCenter from "./UserCenter";
import {
  ChevronsLeft,
  Menu,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import Navbar from "./Navbar";
import NavItem from "./NavItem";
import { useSettings } from "@/hooks/use-settings";
import { useSearch } from "@/hooks/use-search";
import PageItem from "./PageItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TrashBin from "./TrashBin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const [minWidth, maxWidth, defaultWidth] = [240, 500, 240];

const Sidebar = () => {
  const isMobileView = window.innerWidth <= 768;
  const [isCollapsed, setIsCollapsed] = useState(isMobileView);
  const initialWidth = isMobileView
    ? 0
    : parseInt(localStorage.getItem("sidebarWidth")) || defaultWidth;
  const [width, setWidth] = useState(initialWidth);
  const isResized = useRef(false);

  const params = useParams();
  const navbarRef = useRef(null);

  const search = useSearch();

  const settings = useSettings();
  const router = useRouter();

  const sidebarStyles = {
    display: isCollapsed ? "none" : "block",
    width: isCollapsed ? 0 : `${width / 16}rem`,
    // transition: "width 0.3s ease-in-out",
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;

        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener("mouseup", () => {
      isResized.current = false;
    });
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prevCollapsed) => !prevCollapsed);
  };

  // store sidebar width in localStorage
  useEffect(() => {
    localStorage.setItem("sidebarWidth", width);
  }, [width]);

  // close the sidebar when in mobile view mode
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsCollapsed(mobile);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      navbarRef.current.style.left = isCollapsed ? "0" : `${width / 16}rem`;
    }
  }, [isCollapsed, width]);

  const create = useMutation(api.documents.createNote);

  const createDocument = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a note",
      success: "New note created!",
      error: "Could not create a note",
    });
  };

  return (
    <>
      <div className='flex  group/sidebar'>
        <aside
          className={cn(
            "flex flex-col h-full bg-secondary dark:bg-[#262626]  relative z-[99999]"
          )}
          style={sidebarStyles}>
          <Button
            onClick={toggleSidebar}
            size='icon'
            variant='ghost'
            className='h-6 w-6 absolute right-2 top-2.5 hover:bg-neutral-500 transition'>
            <ChevronsLeft
              size={30}
              className='group-hover/sidebar:opacity-100 opacity-0 text-muted-foreground'
            />
          </Button>

          <UserCenter />

          <NavItem icon={Search} text='Search' onClick={search.onOpen} />
          <NavItem icon={Settings} text='Settings' onClick={settings.onOpen} />
          <NavItem icon={PlusCircle} text='New Page' onClick={createDocument} />

          <div className='my-4'>
            <PageItem />
            <NavItem icon={Plus} text='Add a page' onClick={createDocument} />
          </div>

          <Popover>
            <PopoverTrigger className='w-full'>
              <NavItem icon={Trash} text='Trash' />
            </PopoverTrigger>
            <PopoverContent
              side={isMobileView ? "bottom" : "right"}
              className='p-1 w-72'>
              <TrashBin />
            </PopoverContent>
          </Popover>
        </aside>
        <div
          onMouseDown={() => {
            isResized.current = true;
          }}
          className={cn(
            "group-hover/sidebar:cursor-col-resize w-1 group-hover/sidebar:bg-zinc-300 dark:group-hover/sidebar:bg-zinc-600",
            isCollapsed ? "hidden" : "block"
          )}
        />
      </div>

      <div
        className={cn(
          "absolute top-0 z-[99999] ",
          isCollapsed ? "w-full" : "left-60 w-[calc(100%-240px)]"
        )}
        ref={navbarRef}>
        {!!params.documentId ? (
          <Navbar
            toggleSidebar={toggleSidebar}
            isCollapsed={isCollapsed}
            isMobileView={isMobileView}
          />
        ) : (
          isCollapsed && (
            <Menu
              className='h-6 w-6 text-muted-foreground cursor-pointer absolute top-2 left-3'
              role='button'
              onClick={toggleSidebar}
            />
          )
        )}
      </div>
    </>
  );
};

export default Sidebar;
