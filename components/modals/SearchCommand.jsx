"use client";

import {
  Calculator,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useSearch } from "@/hooks/use-search";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const SearchCommand = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { toggle, isOpen, onClose } = useSearch();
  const { user } = useUser();
  const router = useRouter();

  const documents = useQuery(api.documents.getDocuments);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSelect = (documentId) => {
    router.push(`/documents/${documentId}`);
    onClose();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user.firstName}'s Quotion`} />{" "}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Notes'>
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={() => onSelect(doc._id)}>
              {doc.emoji ? (
                <p className='h-4 w-4 mr-2'>{doc.emoji}</p>
              ) : (
                <FileText className='h-4 w-4 mr-2' />
              )}
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
