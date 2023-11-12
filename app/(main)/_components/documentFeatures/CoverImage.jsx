import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const CoverImage = ({ imageUrl, Id, preview }) => {
  const { edgestore } = useEdgeStore();
  const updateImage = useMutation(api.documents.updateDoc);
  const { replaceImage } = useImageUploader();


  const onDelete = async () => {
    await edgestore.publicFiles.delete({
      url: imageUrl,
    });

    updateImage({ documentId: Id, coverImage: "" });
  };
  return (
    <div
      className={cn(
        " w-full relative group",
        !!imageUrl ? "h-[35vh]" : "h-[10vh]"
      )}>
      {imageUrl && (
        <Image src={imageUrl} alt='' fill className='object-cover' priority />
      )}
      {!!imageUrl && !preview  &&(
        <div className='absolute bottom-3 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100 transition duration-200'>
          <Button
            onClick={() => replaceImage(imageUrl)}
            className='gap-x-2 text-xs text-muted-foreground'
            size='sm'
            variant='outline'>
            <ImagePlus size={17} /> Change Cover
          </Button>

          <Button
            onClick={onDelete}
            className='gap-x-2 text-xs text-muted-foreground'
            size='sm'
            variant='outline'>
            <X size={17} /> Remove
          </Button>
        </div>
      )}
    </div>
  );
};


export default CoverImage;


