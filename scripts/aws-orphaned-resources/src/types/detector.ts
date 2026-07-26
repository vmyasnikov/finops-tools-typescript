import type { ScriptConfig } from "./config.js";
import type { ResourceType } from "./resourceType.js";

interface IDetector {
  resourceType: ResourceType;

  detect(config:ScriptConfig):Promise<void>
}
