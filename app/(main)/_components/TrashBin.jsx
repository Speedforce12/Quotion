"use client";

import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useConfirm } from "@/hooks/use-confirm";
import { useMutation, useQuery } from "convex/react";
import { FileText, Search, Trash2, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TrashBin = () => {
  const [query, setQuery] = useState("");
  const archiveDocs = useQuery(api.documents.getArchiveDocs);
  const restoreDoc = useMutation(api.documents.restore);

  const { onOpen } = useConfirm();
  const router = useRouter();

  // navigate to specific document page
  const onSelect = (documentId) => {
    router.push(`/documents/${documentId}`);
  };

  // permanently delete documents
  const onDelete = (e, documentId) => {
    e.stopPropagation();
    onOpen({ id: documentId });
  };

  // restore the documents
  const onRestore = (e, documentId) => {
    e.stopPropagation();

    restoreDoc({ id: documentId });
    router.push(`/documents/${documentId}`);
  };

  if (archiveDocs === undefined) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Spinner />
      </div>
    );
  }


  const filterDocuments = archiveDocs.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='flex flex-col w-full p-1'>
      <div className='flex items-center space-x-2'>
        <Search className='text-muted-foreground h-5 w-5' />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='h-7 focus-visible:ring-transparent  dark:bg-[#262626] bg-zinc-200'
          placeholder='filter by title'
        />
      </div>

      <div className='pt-3 w-full'>
        {  filterDocuments.map((document) => (
          <div
            className='flex items-center w-full justify-between hover:bg-primary/5 cursor-pointer px-1'
            key={document._id}
            onClick={() => onSelect(document._id)}>
            <div className='flex space-x-2'>
              {document.emoji ? (
                <p>{document.emoji}</p>
              ) : (
                <p>
                  <FileText size={18} />
                </p>
              )}
              <span className='text-sm text-muted-foreground'>
                {document.title}
              </span>
            </div>

            <div className='flex items-center gap-x-2'>
              <div
                role='button'
                className='h-7 w-7 rounded-sm dark:hover:bg-neutral-800 hover:bg-neutral-300 flex items-center justify-center'
                onClick={(e) => onRestore(e, document._id)}>
                <Undo2 size={17} />
              </div>

              <div
                role='button'
                className='h-7 w-7 rounded-sm dark:hover:bg-neutral-800 hover:bg-neutral-300 flex items-center justify-center'
                onClick={(e) => onDelete(e, document._id)}>
                <Trash2 size={17} />
              </div>
            </div>
          </div>
        ))}

        {archiveDocs.length === 0 && (
          <div className='flex items-center justify-center h-full'>
            <span className="text-muted-foreground text-sm font-semibold">No matches found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashBin;
