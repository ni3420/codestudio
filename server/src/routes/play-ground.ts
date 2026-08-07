import PlayGround from "../controllers/play-ground"
import {Hono} from "hono"

const route=new Hono()
.route("/",PlayGround)

export default route
