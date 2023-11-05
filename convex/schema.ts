import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    emoji: v.optional(v.string()),
    userId: v.string(),
    title: v.string(),
    parentId: v.optional(v.id("documents")),
    isPublished: v.boolean(),
    isArchived: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_parentId", ["userId", "parentId"]),
});
