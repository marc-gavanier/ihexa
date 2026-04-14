# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IHexa training project using Next.js 16, React 19, TypeScript, and Effect for functional domain modeling. Feature-based vertical slice architecture with colocated abilities.

## Commands

```bash
# Development
pnpm dev                    # Start dev server (runs generate:implementations + i18n:interface first)
pnpm build                  # Production build

# Testing
pnpm test                   # Run Vitest unit tests
pnpm test:e2e               # Run Playwright e2e tests
pnpm test:cucumber          # Run Cucumber BDD tests

# Single test patterns
pnpm test -- path/to/file   # Run specific unit test file
pnpm test:e2e --grep "test name"  # Run specific e2e test

# Linting
pnpm lint:code:fix          # Biome lint and format
pnpm lint:architecture      # dependency-cruiser + folderslint

# Storybook
pnpm storybook:dev          # Start Storybook on port 6006

# Implementations (environment-based)
ENV=dev pnpm generate:implementations   # Copy index.dev.ts → index.ts
ENV=prod pnpm generate:implementations  # Copy index.prod.ts → index.ts
```

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
├── configuration/          # App-wide config (i18n, logger)
├── env/                    # Typed environment variables (Effect Schema)
├── features/               # Feature modules (vertical slices)
│   └── {feature}/
│       ├── domain/         # Domain models, value objects, errors
│       └── abilities/      # Use cases
│           └── {ability}/
│               ├── action/           # Server action, validation, errors, action key
│               ├── implementations/  # index.{env}.ts files for DI
│               └── ui/               # components/, pages/
└── libraries/              # Shared utilities
    ├── nextjs/             # Page/layout builders, action builder, hooks
    ├── form/               # TanStack Form integration
    ├── i18n/               # i18next setup
    ├── injection/          # piqure DI container
    └── ui/                 # UI primitives and blocks (DaisyUI)
```

### Key Patterns

**Domain Modeling with Effect**: Value objects use `Schema.TaggedStruct` with branded types. Errors are tagged unions. Business logic returns `Either<Result, Error>`.

**Server Actions**: Built with `actionBuilder()` using middleware pattern:
```typescript
actionBuilder()
  .use(withInput(validation))
  .use(withLogger('name'))
  .execute(fromEither(async ({ input }) => domainFunction(input), { onError: ERROR_MAP }))
```

**Dependency Injection**: Uses `piqure` library. Keys defined in `action/*.action.key.ts`, bound in page via `withClientBinder()`.

**Environment-based Implementations**: Each ability has `implementations/index.{env}.ts` files. The `generate:implementations` script copies the appropriate one to `index.ts` based on `ENV` variable.

**Page Builder**: Pages use `pageBuilder()` with middleware:
```typescript
pageBuilder()
  .use(withClientBinder(KEY, implementation))
  .use(withI18n(i18n)('namespace'))
  .render(async () => <Page />)
```

### Architecture Rules

UI components can only import from:
- `.validation.ts` files
- `.action.key.ts` files
- Domain types
- Libraries

Library dependencies must be declared in `.dependency-cruiser.cjs` `LIBRARY_DEPENDENCIES`.

### Storybook MCP

When Storybook is running (`pnpm storybook:dev`), an MCP server is available at `http://localhost:6006/mcp`.

When working on UI components:
- Query `list-all-documentation` to discover existing components before creating new ones
- Query `get-documentation` for detailed props and usage examples before using a component
- Use `get-storybook-story-instructions` before writing or modifying stories
- Validate changes with `run-story-tests` after modifications

### Type-Safe Server Action Errors

`ServerActionResult<TSuccess, TError>` propagates error types through the chain. `useServerAction` hook extracts both result and error types for type-safe `onSuccess`/`onError` handlers.
