"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SingleImageDropzone } from "@/components/ui/image-upload";
import { api } from "@/convex/_generated/api";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";

const ImageUploader = () => {
  const { isOpen, onClose, url } = useImageUploader();
  const { edgestore } = useEdgeStore();
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState();
  const params = useParams();

  const updateDocCover = useMutation(api.documents.updateDoc);

  const handleClose = () => {
    setSubmitting(false);
    setFile(undefined);
    onClose();
  };

  const onChange = async (file) => {
    if (file) {
      setSubmitting(true);
      setFile(file);
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: url,
        },
      });

      await updateDocCover({
        documentId: params.documentId,
        coverImage: res.url,
      });

      handleClose();
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <h2 className='font-medium text-lg text-center'>Cover Image</h2>
        </DialogHeader>

        <SingleImageDropzone
          onChange={onChange}
          value={file}
          disabled={submitting}
          className='w-full outline-none h-full'
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;
