import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createNote = mutation({
  args: {
    title: v.string(),
    parentId: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      parentId: args.parentId,
      userId,
      isPublished: false,
      isArchived: false,
    });

    return documentId;
  },
});

export const getDocuments = query({
  args: { parentId: v.optional(v.id("documents")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parentId", (q) =>
        q.eq("userId", userId).eq("parentId", args.parentId)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .collect();

    return documents;
  },
});

export const searchDocuments = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const foundDocuments = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived", false)))
      .collect();

    return foundDocuments;
  },
});

export const getDocById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return document;
  },
});

export const updateDoc = mutation({
  args: {
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    emoji: v.optional(v.string()),
    title: v.string(),
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;
    const { documentId, ...rest } = args;

    const foundDoc = await ctx.db.get(documentId);

    if (!foundDoc) {
      throw new Error("Not found");
    }

    if (foundDoc.userId !== userId) {
      throw new Error("Unauthorized User");
    }

    const updatedDoc = await ctx.db.patch(documentId, {
      ...rest,
    });

    return updatedDoc;
  },
});

export const archiveDocs = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const foundDoc = await ctx.db.get(args.documentId);

    if (!foundDoc) {
      throw new Error("Document not found");
    }

    if (foundDoc.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (documentId) => {
      const childrenDocs = await ctx.db
        .query("documents")
        .withIndex("by_user_parentId", (q) =>
          q.eq("userId", userId).eq("parentId", documentId)
        )
        .collect();

      for (const childDoc of childrenDocs) {
        await ctx.db.patch(childDoc._id, {
          isArchived: true,
        });

        await recursiveArchive(childDoc._id);
      }
    };

    const updatedDoc = await ctx.db.patch(args.documentId, {
      isArchived: true,
    });

    recursiveArchive(args.documentId);

    return updatedDoc;
  },
});

export const getArchiveDocs = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const foundDocuments = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    // if (!foundDocuments) {
    //   throw new Error("No documents found");
    // }

    return foundDocuments;
  },
});
