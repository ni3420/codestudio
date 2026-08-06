import {defineSchema, defineTable} from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    user:defineTable({
        email:v.string(),
        name:v.string(),
        Id:v.string(),
        role:v.union(v.literal("admin"),v.literal("member"))
    })
    .index("by_user_id",["Id"])
})