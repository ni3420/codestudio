import { Hono } from "hono";
import { serve } from "bun";
import { cors } from "hono/cors";

import playGroundRoute from "@/controllers/play-ground";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
  })
);

app.route("/", playGroundRoute);

app.get("/health", (c) => {
  return c.json({
    msg: "server running",
  });
})

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      message: "Internal Server Error",
    },
    500
  );
});

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});

console.log("Server started");