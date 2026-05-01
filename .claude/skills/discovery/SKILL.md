---
name: discovery
user-invocable: true
description: >-
  Product discovery and backlog grooming workflow. Explore a product idea,
  challenge it with the domain expert, decompose into features and abilities,
  and create prioritized GitHub issues. Use before /delivery to define
  WHAT to build.
---

# Product Discovery

## Philosophy

```
Discovery = Understand WHAT to build and WHY
Delivery  = Implement HOW to build it
Discovery outputs GitHub issues → Delivery consumes them
```

## When to Use

- Exploring a new product idea or feature area
- Grooming and prioritizing a backlog of abilities
- Decomposing a broad requirement into features and abilities
- Before starting /delivery, to define WHAT to build

## When NOT to Use

- Implementing code — use /delivery instead
- Fixing a bug or refactoring — work directly, no discovery needed
- When a well-defined GitHub issue already exists — go straight to /delivery

## Entry point

The user describes a product idea, a new feature area, or a problem
to solve. This can be vague — discovery's job is to refine it.

## Workflow

### Step 1: Understand the idea

Ask clarifying questions (one at a time, not a wall of questions):

1. **Who and why**: who has the problem? What pain does it cause?
2. **Desired outcome**: what should be true when this is done?
3. **Boundaries**: what is explicitly OUT of scope?
4. **Constraints**: technology, timeline, regulatory constraints?

Stop asking when you have enough to proceed. Don't over-interview.

### Step 2: Domain validation

Invoke the **domain-expert** agent to:
- Validate the idea against domain reality
- Flag missing domain concepts or rules
- Clarify vocabulary and business terms
- Identify regulatory or compliance considerations

### Step 3: Decompose into features and abilities

Map the idea onto the feature/ability architecture:

```
Product idea
└── Feature A (bounded functional area)
    ├── Ability A1 (single responsibility)
    ├── Ability A2
    └── Ability A3
└── Feature B
    ├── Ability B1
    └── Ability B2
```

For each ability, identify:
- **What it does** (one sentence)
- **Domain concepts involved** (types, value objects)
- **Dependencies** on other abilities (if any)

### Step 4: Prioritize

Propose a priority order based on:
- Dependencies (build foundations first)
- Value (high-impact abilities first)
- Risk (uncertain/complex abilities earlier to derisk)

Present the prioritized list to the user for validation.

### Step 5: Create GitHub issues

For each ability, create a GitHub issue using `gh issue create`:

```markdown
## Context
[Why this ability exists, what problem it solves]

## Expected behavior
[High-level description of what the ability should do]

## Domain concepts
[Key types, rules, edge cases identified during discovery]

## Acceptance criteria
[Bullet points — will be refined into Gherkin during /delivery]

## Dependencies
[Other abilities this depends on, if any]
```

Use labels for categorization:
- `feature:<feature-name>` — groups abilities by feature
- `priority:high`, `priority:medium`, `priority:low`

### Step 6: Confirm next steps

List the created issues with their numbers and suggest which one
to implement first using `/delivery`.

```
Issues created:
- #12 create-client (priority:high, feature:client)
- #13 list-clients (priority:high, feature:client)
- #14 edit-client (priority:medium, feature:client)

Suggested next: /delivery starting from #12
```

## Useful commands

```bash
# List all issues by feature
gh issue list --label "feature:<name>"

# List by priority
gh issue list --label "priority:high"

# View a specific issue
gh issue view <number>

# Close when implemented
gh issue close <number>
```

## What this skill does NOT do

- Does not write code
- Does not write Gherkin scenarios (that's /delivery's job)
- Does not make priority decisions — it proposes, the human decides
- Does not replace user research or stakeholder interviews

## Linking to /delivery

When ready to implement an ability:
```
/delivery
> Starting from issue #42: <ability-name>
```

The delivery skill picks up from the issue and begins checkpoint 1.
