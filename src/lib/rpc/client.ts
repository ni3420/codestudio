import { AppType } from "@/app/api/rpc/[[...routes]]/route";
import { hc } from "hono/client";

export const client=hc<AppType>("/")