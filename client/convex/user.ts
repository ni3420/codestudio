import { v } from "convex/values"
import {mutation} from "./_generated/server"

export const CreateUser=mutation({
    args:{
        email:v.string(),
        name:v.string(),
        Id:v.string()
    },
    handler:async(ctx,args)=>{
     try {
           const exitingUser= await ctx.db.query("user")
        .withIndex("by_user_id",(q)=>q.eq("Id",args.Id))
        .first()

        if(exitingUser)
        {
            return exitingUser
        }

        const userId=await ctx.db.insert("user",{
            name:args.name,
            email:args.email,
            Id:args.Id,
            role:"admin"
        })

        return await ctx.db.get(userId)

    
     } catch (error) {
        console.log(error)
        throw error
        
     }
    }
})