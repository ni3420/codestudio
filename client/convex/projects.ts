import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getProjects = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getProject = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

export const createProject = mutation({
  args: {
    userId: v.string(),
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
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("Id", args.userId))
      .first();

    if (!user) {
      throw new Error("User record not found in database");
    }

    const now = Date.now();

    const projectId = await ctx.db.insert("projects", {
      userId: user._id,
      name: args.name,
      description: args.description,
      environment: args.environment,
      runtimeImage: args.runtimeImage,
      status: "creating",
      visibility: "private",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("projectMembers", {
      projectId,
      userId: user._id,
      role: "owner",
      createdAt: now,
    });

    return projectId;
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.projectId);
  },
});