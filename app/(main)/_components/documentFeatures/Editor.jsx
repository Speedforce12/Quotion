"use client";

import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";

const Editor = ({ initialContent, onChange, editable }) => {
  const { resolvedTheme } = useTheme();

  console.log(`Editor: ${initialContent}`);

  const editor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) =>
      
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2)),
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default Editor;
