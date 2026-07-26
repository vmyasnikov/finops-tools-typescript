# finops-tools

Collection of scripts and tools useful for FinOps analysis.

A pnpm monorepo written in TypeScript, targeting Node.js 24.

## Requirements

- **Node.js** `>= 24` (see [`.nvmrc`](.nvmrc); `nvm use` picks it up)
- **pnpm** `10` (pinned via the `packageManager` field; run `corepack enable` to have it installed automatically)

## Workspace layout

```
.
├── packages/
│   └── core/        @finops-tools/core — shared FinOps analysis library
└── apps/
    └── cli/         @finops-tools/cli  — command-line interface (depends on @finops-tools/core)
```

Both packages are currently empty scaffolds ready to be filled in.

## Getting started

```bash
pnpm install
pnpm build
```

Run the CLI in dev mode (via [tsx](https://github.com/privatenumber/tsx), no build step needed):

```bash
pnpm cli
```

Or run the compiled binary after `pnpm build`:

```bash
node apps/cli/dist/index.js
```

## Toolchain

| Concern         | Tool                                                  |
| --------------- | ----------------------------------------------------- |
| Package manager | [pnpm](https://pnpm.io) workspaces                    |
| Language        | [TypeScript](https://www.typescriptlang.org) (strict) |
| Runtime         | Node.js 24                                            |
| Linter          | [oxlint](https://oxc.rs/docs/guide/usage/linter)      |
| Formatter       | [oxfmt](https://oxc.rs)                               |
| Dev runner      | [tsx](https://github.com/privatenumber/tsx)           |

TypeScript is configured with a shared [`tsconfig.base.json`](tsconfig.base.json) and
[project references](https://www.typescriptlang.org/docs/handbook/project-references.html),
so `tsc -b` builds packages in dependency order.

## Scripts

Run from the repo root:

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `pnpm build`        | Type-check and build all packages (`tsc -b`)  |
| `pnpm clean`        | Remove build output and TS build info         |
| `pnpm typecheck`    | Type-check the whole workspace                |
| `pnpm lint`         | Lint with oxlint                              |
| `pnpm lint:fix`     | Lint and apply auto-fixes                     |
| `pnpm format`       | Format the repo with oxfmt                    |
| `pnpm format:check` | Verify formatting without writing changes     |
| `pnpm cli`          | Run the CLI in dev mode (`@finops-tools/cli`) |

Per-package scripts (`build`, `clean`, `start`, `dev`) can be run with
`pnpm --filter <name> run <script>`, e.g. `pnpm --filter @finops-tools/cli run dev`.

## Adding a package

1. Create a folder under `packages/` (a library) or `apps/` (an application).
2. Add a `package.json` (`"name": "@finops-tools/<name>"`, `"type": "module"`) and a
   `tsconfig.json` that extends `../../tsconfig.base.json` with `"composite": true`.
3. Reference it from `tsconfig.json` at the root (and from any dependent package's
   `references`), then run `pnpm install`.
