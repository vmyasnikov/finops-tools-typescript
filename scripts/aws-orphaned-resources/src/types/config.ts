import { z } from "zod";

const tagFilterSchema = z.object({
  key: z.string(),
  value: z.array(z.string()).optional()
});
const scriptConfigSchema = z.object({

  profile: z.string().default("default").describe("AWS Profile script will work through"),
  region: z.string().default("us-east-1").describe("AWS Region"),

  tagFilter: z.array(tagFilterSchema).optional().describe("Filter resources by tags"),
  resourceTypeFilter: z.array(z.string()).optional().describe("Filter resources by type"),

  lookbackDays: z.number().default(30).describe("How many days script need to analyze"),

});
export type ScriptConfig = z.infer<typeof scriptConfigSchema>;
