"use client";

import CoverImage from "@/app/(main)/_components/documentFeatures/CoverImage";
import HeaderText from "@/app/(main)/_components/documentFeatures/HeaderText";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const DocumentDetails = ({ params }) => {
  const { documentId } = params;

  const currentDoc = useQuery(api.documents.getDocById, {
    documentId: documentId,
  });

  const updateDocContent = useMutation(api.documents.updateDoc);

  const Editor = useMemo(
    () =>
      dynamic(
        () => import("@/app/(main)/_components/documentFeatures/Editor"),
        { ssr: false }
      ),
    []
  );

  if (currentDoc === undefined) {
    return (
      <div className='pb-40'>
        <Skeleton className='h-[20vh] w-full' />
        <div className='md:max-w-3xl lg:max-w-4xl mx-auto px-10 mt-10'>
          <div className='pt-2 -ml-10 space-y-3'>
            <Skeleton className='w-full h-4 rounded-full' />
            <Skeleton className='w-full h-4 rounded-full' />
            <Skeleton className='w-full h-4 rounded-full' />
            <Skeleton className='w-full h-4 rounded-full' />
          </div>
        </div>
      </div>
    );
  }

  const onChange = async (content) => {
    updateDocContent({ documentId: documentId, content });
  };

  return (
    <div className='pb-40'>
      <CoverImage imageUrl={currentDoc?.coverImage} Id={currentDoc?._id} />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto px-10'>
        <HeaderText document={currentDoc} />
        <div className='pt-2 -ml-10'>
          <Editor initialContent={currentDoc?.content} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
