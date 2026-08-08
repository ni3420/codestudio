import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { PlayGroundTypes } from "@/schema/play-ground.types";

const app = new Hono()
.post("/", zValidator("json", PlayGroundTypes), async (c) => {
  try {
    const { code, language } = c.req.valid("json");
    console.log("code", code);

    let extension = "";
    let command: string[] = [];
    const id = crypto.randomUUID();
    let file = "";

    switch (language) {
      case "python":
        extension = "py";
        file = `/tmp/${id}.${extension}`;
        await Bun.write(file, code);
        command = ["python3", file];
        break;

      case "javascript":
        extension = "js";
        file = `/tmp/${id}.${extension}`;
        await Bun.write(file, code);
        command = ["node", file];
        break;

        case "typescript":
        extension = "ts";
        file = `/tmp/${id}.${extension}`;
        await Bun.write(file, code);
        command = ["bun", "run", file];
        break;
case "cpp": {
  extension = "cpp";
  file = `/tmp/${id}.${extension}`;

  const output = `/tmp/${id}`;

  await Bun.write(file, code);

  const compile = Bun.spawn([
    "g++",
    file,
    "-o",
    output,
  ]);

  const compileError = await new Response(
    compile.stderr
  ).text();

  const exitCode = await compile.exited;

  if (exitCode !== 0) {
    return c.json({
      success: false,
      error: compileError,
    });
  }

  command = [output];
  break;
}
case "c":
  extension = "c";
  file = `/tmp/${id}.${extension}`;

  const output = `/tmp/${id}`;

  await Bun.write(file, code);

  const compile = Bun.spawn([
    "gcc",
    file,
    "-o",
    output,
  ]);

  const compileError = await new Response(
    compile.stderr
  ).text();

  const exitCode = await compile.exited;

  if (exitCode !== 0) {
    return c.json({
      success: false,
      error: compileError,
    });
  }

  command = [output];
  break;
  case "java": {
  file = `/tmp/Main.java`;

  await Bun.write(file, code);

  const compile = Bun.spawn([
    "javac",
    file,
  ]);

  const compileError = await new Response(
    compile.stderr
  ).text();

  const exitCode = await compile.exited;

  if (exitCode !== 0) {
    return c.json({
      success: false,
      error: compileError,
    });
  }

  command = [
    "java",
    "-cp",
    "/tmp",
    "Main",
  ];

  break;
}
case "go": {
  extension = "go";
  file = `/tmp/${id}.${extension}`;

  const output = `/tmp/${id}`;

  await Bun.write(file, code);

  const compile = Bun.spawn([
    "go",
    "build",
    "-o",
    output,
    file,
  ]);

  const compileError = await new Response(
    compile.stderr
  ).text();

  const exitCode = await compile.exited;

  if (exitCode !== 0) {
    return c.json({
      success: false,
      error: compileError,
    });
  }

  command = [output];

  break;
}

      default:
        return c.json({
          success: false,
          error: "Language not supported",
        });
    }

    const program = Bun.spawn(command);

    const output = await new Response(program.stdout).text();
    const error = await new Response(program.stderr).text();

    return c.json({
      success: true,
      output,
      error,
    });
  } catch (error) {
    console.error(error);

    return c.json(
      {
        success: false,
        error: "Internal server error",
      },
      500
    );
  }
});

export default app;