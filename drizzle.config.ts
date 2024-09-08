import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema",
  out: "./lib/db/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  }
} satisfies Config;