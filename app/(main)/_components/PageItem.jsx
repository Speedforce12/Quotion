"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import NavItem from "./NavItem";
import { FileText } from "lucide-react";

const PageItem = ({ parentId, level = 0 }) => {
  const [expanded, setExpanded] = useState({});
  const router = useRouter();
  const param = useParams();

  const toggleDoc = (documentId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getDocuments, {
    parentId: parentId,
  });


  const onSelect = (documentId) => {
    router.push(`/documents/${documentId}`);
  };
  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-muted-foreground/80 text-sm font-medium",
          expanded && "last:block",
          level === 0 && "hidden"
        )}>
        No pages inside
      </p>
      {documents?.map((document) => (
        <div key={document._id}>
          <NavItem
            id={document._id}
            text={document.title}
            expanded={expanded[document._id]}
            icon={FileText}
            active={param.documentId === document._id}
            documentIcon={document?.emoji}
            toggleDoc={() => toggleDoc(document._id)}
            onClick={() => onSelect(document._id)}
            level={level}
          />

          {expanded[document._id] && (
            <PageItem parentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default PageItem;
