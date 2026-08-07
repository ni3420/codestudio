import {Hono} from "hono"
import { serve } from "bun"
import playGroundRoute from "@/controllers/play-ground"
const app=new Hono()

app.route("/",playGroundRoute)
app.get("/health",async(c)=>{
    return c.json({
        "msg":"server start now"
    })

})

serve({
    fetch:app.fetch,
    port:process.env.PORT || 3000

})

console.log('server is start')

