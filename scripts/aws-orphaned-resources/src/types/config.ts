import { z } from "zod";
import { SUPPORTED_RESOURCE_TYPES } from "./resourceType.js";

const tagFilterSchema = z.object({
  key: z.string(),
  value: z.array(z.string()).optional()
});
export const scriptConfigSchema = z.object({

  profile: z.string().default("default").describe("AWS Profile script will work through"),
  region: z.string().default("us-east-1").describe("AWS Region"),

  tagFilter: z.array(tagFilterSchema).optional().describe("Filter resources by tags"),
  resourceTypeFilter: z.array(z.enum(SUPPORTED_RESOURCE_TYPES)).default([...SUPPORTED_RESOURCE_TYPES]).describe("Filter resources by type"),

  lookbackDays: z.number().default(30).describe("How many days script need to analyze"),

});
export type ScriptConfig = z.infer<typeof scriptConfigSchema>;
