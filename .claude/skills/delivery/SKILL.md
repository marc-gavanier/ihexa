---
name: delivery
user-invocable: true
description: >-
  Follow the 3-checkpoint ATDD process (spec, backend, frontend) to
  deliver an ability from a GitHub issue or feature description.
  Coordinate specialized agents (spec-writer, domain-expert, backend-dev,
  frontend-dev, reviewer, fresh-context-review). Triggers on: "implement
  ability", "deliver feature", "build from issue", "new ability",
  "/delivery".
---

# Ability Delivery

## When to Use

- Starting a new ability implementation from a GitHub issue or feature description
- Resuming an in-progress ability at a specific checkpoint
- When the full spec → backend → frontend cycle applies

## When NOT to Use

- Bug fixes that don't require a new ability — fix directly
- Pure refactoring with no behavior change — no specs needed
- Documentation or config changes — no checkpoints needed
- Product discovery and backlog grooming — use /discovery instead

## Philosophy

```
Specs = Contracts         → Gherkin (.ability.md) + E2E (page.e2e.ts)
ATDD = Safety net         → Red scenario → abilities → green scenario
Three-stream testing      → Cucumber + E2E + Unit (mandatory)
Human = Orchestrator      → Validates each checkpoint, agents execute
```

## Entry point

This workflow starts from a **GitHub issue** (created during /discovery)
or a feature description provided by the user.

Before starting:
1. Create a branch: `feat/<feature-name>` or `feat/<ability-name>`
2. Load the issue context or ask the user to describe the feature
3. Identify which feature and ability this work belongs to

## Architecture (mandatory)

### Feature/Ability structure (fractal colocation)

```
src/features/<feature>/
├── domain/                             # Shared domain types, value objects, errors
└── abilities/
    └── <ability>/
        ├── <ability>.ability.md        # Gherkin specs (Markdown format)
        ├── <ability>.steps.ts          # Cucumber step definitions
        ├── index.ts                    # Barrel export
        ├── action/                     # Server action contract (public surface)
        │   ├── <ability>.validation.ts # Effect Schema validation (input)
        │   ├── <ability>.errors.ts     # Error i18n mapping (output)
        │   └── <ability>.key.ts        # DI key (keyFor)
        ├── implementations/
        │   ├── index.dev.ts            # Dev implementation
        │   ├── index.prod.ts           # Prod implementation
        │   └── index.ts               # Active (generated)
        ├── domain/                     # Ability-specific domain (if needed)
        └── ui/
            ├── components/             # Colocated: form, presenter, submission, combobox, card
            │   ├── <ability>.presenter.ts      # Domain → FormViewModel (SSR → UI)
            │   ├── <ability>.submission.ts      # FormValues → ActionInput (UI → Action)
            │   ├── <ability>-form.tsx
            │   └── <name>.combobox.tsx
            └── pages/
                ├── <ability>.page.tsx
                └── <ability>.page.stories.tsx
```

### Server actions

Server actions live in `src/app/_actions/<feature>/<ability>.action.ts`:
```typescript
actionBuilder()
  .use(withInput(validation))
  .use(withLogger('name'))
  .execute(fromEither(async ({ input }) => fn(input), { onError: ERROR_MAP }))
```

### Data transformation cycle

```
DB ──transfer──▶ Domain ──presenter──▶ Form ──submission──▶ Action ──smart constructor──▶ Domain ──transfer──▶ DB
```

- **presenter.ts**: Domain → FormViewModel (prepare data for the form, handle null)
- **submission.ts**: FormValues → ActionInput (transform form types to action types)
- **Smart constructors**: Convert API/external data (plain strings) to branded domain types
- The form NEVER contains transformation helpers — all logic is in presenter/submission (pure, testable)

### Route structure

```
src/app/.../<route>/
├── page.tsx              # pageBuilder() with middleware
├── page.e2e.ts           # Colocated Playwright E2E test
└── layout.tsx            # Optional layoutBuilder()
```

### Key patterns

- **Domain**: Effect `Schema.TaggedStruct` with branded types, `Either<Result, Error>`
- **Pages**: `pageBuilder().use(withClientBinder(KEY, impl)).use(withOptionalEither/withMap for SSR data).use(withI18n(i18n)('ns')).render(({ data }) => <Page data={data} />)` — render is a pure projection, no logic
- **DI**: `piqure` with `keyFor()` for injection keys
- **Validation**: Effect Schema (never Zod)
- **Incubator**: new transversal code goes in `src/libraries/<lib>/`, published to `@arckit/<lib>` when mature

## Workflow — 3 checkpoints

### Checkpoint 1: SPEC

**Goal**: define WHAT we're building in domain language.

1. Invoke **domain-expert** to review the issue/brief for domain accuracy
2. Invoke **spec-writer** to propose Gherkin scenarios in **free text**
   - Ensure spec-writer reads existing domain to reuse vocabulary
   - Ensure spec-writer challenges edge cases, failures, boundaries
   - Have domain-expert validate against business rules
3. **Iterate** in free text until the user approves
4. Only then: write the `.ability.md` Gherkin file

**Gate**: user approves the scenarios. No code is written until this gate passes.

### Checkpoint 2: BACKEND

**Goal**: implement domain + action + tests. All checks GREEN.

1. Invoke **backend-dev** with:
   - The approved Gherkin .ability.md file
   - The target feature/ability path
   - Any existing domain types to reuse
   - Instruction to read existing code style before writing anything
2. backend-dev implements:
   - Domain types, value objects, typed errors (Data.TaggedError)
   - Validation (Effect Schema) with comprehensive patterns
   - Server action (actionBuilder) in `src/app/_actions/`
   - Implementations: BOTH in-memory AND drizzle (with table + transfer)
   - Cucumber step definitions (calling real mutations/queries)
   - Unit tests for domain logic + transfer round-trip tests
3. backend-dev runs ALL checks before reporting done:
   - `pnpm tsc --noEmit` — zero TypeScript errors
   - `pnpm test:cucumber` — all scenarios GREEN
   - `pnpm test` — all unit tests GREEN
   - `pnpm lint:code:fix` — zero Biome errors
   - `pnpm lint:architecture` — zero violations
4. Invoke **reviewer** (backend mode) to review
   - Reviewer also runs `pnpm tsc --noEmit` and `pnpm lint:code:fix`
   - If REJECTED: reviewer lists ALL issues → re-invoke backend-dev
     with complete feedback (max 2 rounds, then STOP for human)
   - If APPROVED: proceed

**Gate**: user reviews + reviewer APPROVED. All checks GREEN.

### Checkpoint 3: FRONTEND

**Goal**: implement UI + E2E. All test streams GREEN.

1. Invoke **frontend-dev** with:
   - The approved Gherkin .ability.md file (for context)
   - The backend implementation (action keys, types, validation)
   - The target route path
2. frontend-dev implements:
   - E2E test first (page.e2e.ts) — should FAIL
   - Components and pages
   - Storybook stories
   - Wiring: DI (withClientBinder), i18n, routes
3. frontend-dev runs: `pnpm test:e2e`
4. Invoke **reviewer** (frontend mode) to review
   - Same rejection/approval flow as checkpoint 2

**Gate**: user reviews Storybook + reviewer APPROVED. All three test streams GREEN.

### Post-implementation (optional)

Invoke **fresh-context-review** for a final audit with fresh eyes.
Recommended for complex abilities or when multiple abilities interact.

## Final verification

Before committing:
```bash
pnpm test:cucumber && pnpm test && pnpm test:e2e && pnpm build && pnpm lint:architecture
```

## Three-stream testing (mandatory)

| Stream   | Purpose        | Location                                      | Verifies                 |
|----------|----------------|-----------------------------------------------|--------------------------|
| Cucumber | Behavior specs | `<ability>.ability.md` + `<ability>.steps.ts` | WHAT (domain behavior)   |
| E2E      | UI specs       | `src/app/.../page.e2e.ts`                     | VIEW (user interactions) |
| Unit     | Domain logic   | `src/features/<feature>/domain/`              | HOW (internal logic)     |

All three streams must pass. No exceptions.

## Conventions

- **Branches**: `feat/<feature-name>` — never commit directly to main
- **Commits**: `feat(<feature>): <description>`
- **Cucumber steps**: must call real mutations/queries, never manipulate stores directly
- **Shared steps**: steps used across multiple abilities of the same feature go in `<feature>.steps.ts` at feature root
- **Escalation**: if an agent is blocked after 2 attempts → STOP, human takes control

## Anti-patterns

### "Let me skip the specs and code directly"
No. Specs first, always. The spec is the contract.

### "Tests pass, no need for review"
No. Passing tests don't guarantee correct architecture or clean code.

### "I'll add tests later"
No. Tests before or alongside implementation, never after.

### "One big PR for everything"
Prefer one ability per PR. Keep changes reviewable.
