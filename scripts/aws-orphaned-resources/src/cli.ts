import { run } from "./index.js";
import commandLineArgs, { type OptionDefinition } from 'command-line-args'
import { scriptConfigSchema } from "./types/config.js";
import { z } from "zod";

const parseTagFilter = (tagFilter?: string[]) => tagFilter?.map(x => {
  const split = x.split(':');
  if (!split[0]) return undefined;

  return { key: split[0], value: (split[1] || "").split(',') }
}).filter(x => !!x);

const optionsSchema = scriptConfigSchema.extend({
  tagFilter: z.array(z.string()).optional().transform(parseTagFilter),
});

const optionDefinitions: OptionDefinition[] = [
  { name: 'profile', type: String },
  { name: 'region', type: String },
  { name: 'tagFilter', type: String, multiple: true },
  { name: 'resourceTypeFilter', type: String, multiple: true },
  { name: 'lookbackDays', type: Number },
];

if (import.meta.main) {
  (async () => {

    const options = commandLineArgs(optionDefinitions);
    const parsed = optionsSchema.safeParse(options);
    if (!parsed.success) {
      console.error("Invalid arguments:", z.prettifyError(parsed.error));
      process.exit(1);
    }

    await run(parsed.data);

  })();
}
