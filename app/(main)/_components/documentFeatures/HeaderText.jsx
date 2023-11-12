import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

import { ImageIcon } from "lucide-react";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import IconPicker from "./IconPicker";
import { useImageUploader } from "@/hooks/use-image-uploader";

const HeaderText = ({ document, preview }) => {
  const [title, setTitle] = useState(document?.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const updateDoc = useMutation(api.documents.updateDoc);
  const { onOpen } = useImageUploader();

  const onEdit = () => {
    setTitle(document.title);
    setIsEditing(true);
  };

  const onChange = (e) => {
    setTitle(e.target.value);
    updateDoc({ documentId: document._id, title: e.target.value });
  };

  const onDisable = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onDisable();
    }
  };

  return (
    <div className='relative group w-full pt-6'>
      <div className='space-y-3'>
        {document?.emoji && (
          <IconPicker document={document} preview={preview} />
        )}
        <div className='flex items-center gap-x-2 group-hover:opacity-100 opacity-0'>
          {!document?.emoji && !preview && <IconPicker document={document} />}
          {!document?.coverImage && !preview && (
            <Button
              onClick={onOpen}
              size='sm'
              variant='outline'
              className='gap-x-1  text-xs text-muted-foreground'>
              <ImageIcon size={17} /> Add Cover
            </Button>
          )}
        </div>
        {isEditing ? (
          <TextareaAutosize
            value={title}
            autoFocus
            disabled={!isEditing}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onDisable}
            className='px-1 max-w-md w-full outline-none  resize-none text-4xl font-bold bg-transparent text-muted-foreground'
          />
        ) : (
          <div
            className='px-1 max-w-md w-full outline-none  resize-none text-4xl font-bold bg-transparent text-muted-foreground'
            onClick={onEdit}>
            {document?.title}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderText;
