import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    Id: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("member")
    ),
  })
    .index("by_email", ["email"])
    .index("by_user_id", ["Id"]),

  projects: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    environment: v.union(
      v.literal("python"),
      v.literal("node"),
      v.literal("bun"),
      v.literal("c"),
      v.literal("cpp"),
      v.literal("java")
    ),
    runtimeImage: v.string(),
    status: v.union(
      v.literal("creating"),
      v.literal("running"),
      v.literal("stopped"),
      v.literal("error")
    ),
    workspaceId: v.optional(v.string()),
    visibility: v.union(
      v.literal("private"),
      v.literal("public")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_status", ["userId", "status"]),

  projectMembers: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"),
    role: v.union(
      v.literal("owner"),
      v.literal("editor"),
      v.literal("viewer")
    ),
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"])
    .index("by_project_and_user", ["projectId", "userId"]),

  projectFiles: defineTable({
    projectId: v.id("projects"),
    name: v.string(),
    path: v.string(),
    type: v.union(
      v.literal("file"),
      v.literal("folder")
    ),
    content: v.optional(v.string()),
    parentPath: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_project_and_parent", ["projectId", "parentPath"]),
});