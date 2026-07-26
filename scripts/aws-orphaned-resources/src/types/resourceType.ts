export const SUPPORTED_RESOURCE_TYPES = ["dynamodb"] as const;
export type ResourceType = (typeof SUPPORTED_RESOURCE_TYPES)[number];
