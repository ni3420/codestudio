import z from "zod"

export const PlayGroundTypes = z.object({
  code: z.string(),
  language: z.enum([
    "javascript",
    "typescript",
    "python",
    "java",
    "c",
    "cpp",
    "csharp",
    "go",
    "rust",
    "php",
    "ruby",
    "swift",
    "kotlin",
    "scala",
    "r",
    "perl",
    "dart",
    "lua",
    "bash",
  ]),
  
});