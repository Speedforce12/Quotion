"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";

const Title = ({ document }) => {
  const [title, setTitle] = useState(document?.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  console.log("title",document?.title)
  const inputRef = useRef();

  const updateDoc = useMutation(api.documents.updateDoc);

  const onEdit = () => {
    // setTitle(document.title);
    setIsEditing(true);
  };

  const onChange = (e) => {
    setTitle(e.target.value);
    updateDoc({
      documentId: document._id,
      title: e.target.value,
    });
  };

  const onDisable = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onDisable();
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();

      inputRef.current.setSelectionRange(0, title.length);
    }
  }, [isEditing]);

  return (
    <div className='flex items-center justify-center'>
      <span>{document?.emoji}</span>

      {isEditing ? (
        <Input
          ref={inputRef}
          value={title}
          disabled={!isEditing}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onDisable}
          className='h-7 focus-visible:ring-0 focus-visible:ring-black px-1'
        />
      ) : (
        <Button variant='ghost' size='sm' className='h-7' onClick={onEdit}>
          {document?.title}
        </Button>
      )}
    </div>
  );
};

export default Title;
