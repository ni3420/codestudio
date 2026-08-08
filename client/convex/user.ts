import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    Id: v.string(), 
  },
  handler: async (ctx, args) => {
    try {
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_user_id", (q) => q.eq("Id", args.Id))
        .first();

      if (existingUser) {
        return existingUser;
      }

      const userId = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        Id: args.Id,
        role: "member", // Defaulting to member for safe RBAC
      });

      return await ctx.db.get(userId);
    } catch (error) {
      console.error("Error syncing Clerk user to Convex:", error);
      throw error;
    }
  },
});