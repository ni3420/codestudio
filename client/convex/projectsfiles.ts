import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getProjectFiles = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projectFiles")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const createFileOrFolder = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.string(),
    type: v.union(v.literal("file"), v.literal("folder")),
    parentPath: v.string(), // "" for root, or "src", "src/components"
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const normalizedParent = args.parentPath ? args.parentPath.replace(/\/$/, "") : "";
    const path = normalizedParent ? `${normalizedParent}/${args.name}` : args.name;

    const existing = await ctx.db
      .query("projectFiles")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .filter((q) => q.eq(q.field("path"), path))
      .first();

    if (existing) {
      throw new Error(`A ${args.type} with path "${path}" already exists.`);
    }

    return await ctx.db.insert("projectFiles", {
      projectId: args.projectId,
      name: args.name,
      path,
      type: args.type,
      content: args.type === "file" ? args.content ?? "" : undefined,
      parentPath: normalizedParent,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateFileContent = mutation({
  args: {
    fileId: v.id("projectFiles"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.fileId, {
      content: args.content,
      updatedAt: Date.now(),
    });
  },
});

export const deleteFileOrFolder = mutation({
  args: {
    fileId: v.id("projectFiles"),
  },
  handler: async (ctx, args) => {
    const target = await ctx.db.get(args.fileId);
    if (!target) return;

    if (target.type === "folder") {
      const allFiles = await ctx.db
        .query("projectFiles")
        .withIndex("by_project", (q) => q.eq("projectId", target.projectId))
        .collect();

      const toDelete = allFiles.filter(
        (f) => f.path === target.path || f.path.startsWith(`${target.path}/`)
      );

      await Promise.all(toDelete.map((f) => ctx.db.delete(f._id)));
    } else {
      await ctx.db.delete(args.fileId);
    }
  },
});