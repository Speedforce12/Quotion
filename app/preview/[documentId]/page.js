"use client";

import CoverImage from "@/app/(main)/_components/documentFeatures/CoverImage";
import HeaderText from "@/app/(main)/_components/documentFeatures/HeaderText";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { notFound, useParams } from "next/navigation";
import { useMemo } from "react";

const PreviewPage = () => {
  const params = useParams();
  const { documentId } = params;

  const currentDoc = useQuery(api.documents.previewDoc, {
    id: documentId,
  });

  const preview = currentDoc?.isPublished;

 
  const Editor = useMemo(
    () =>
      dynamic(
        () => import("@/app/(main)/_components/documentFeatures/Editor"),
        { ssr: false }
      ),
    []
  );

   if (!currentDoc?.isPublished) {
     return notFound();
   }


  return (
    <div className='pb-40 bg-[#1F1F1F] h-full'>
      <CoverImage
        imageUrl={currentDoc?.coverImage}
        Id={currentDoc?._id}
        preview={preview}
      />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto px-10'>
        <HeaderText document={currentDoc} preview={preview} />
        <div className='pt-2 -ml-10'>
          <Editor initialContent={currentDoc?.content} editable={false} />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
