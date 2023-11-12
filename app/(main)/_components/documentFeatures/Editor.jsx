"use client";

import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

const Editor = ({ initialContent, onChange, editable }) => {
  const { resolvedTheme } = useTheme();

  const { edgestore } = useEdgeStore();

  const handleEditorImage = async (file) => {
    const res = await edgestore.publicFiles.upload({ file });
    
    return res.url
  };

  const editor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) =>
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2)),
    uploadFile: handleEditorImage,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default Editor;
