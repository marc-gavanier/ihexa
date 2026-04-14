# Contributing

## 📑 Table of Contents

- 🚀 [Prerequisites](#prerequisites)
- 🏁 [Getting Started](#getting-started)
- 🐳 [Docker Services](#docker-services)
- 🛠️ [Available Scripts](#available-scripts)
- 🏗️ [Environment Setup Guide](#environment-setup-guide)
- 🤝 [Requirements](#requirements)
- 🏗️ [Built With](#built-with)
- 🔄 [CI/CD](#cicd)
- 🏷️ [Versioning](#versioning)

<h2 id="prerequisites">🚀 Prerequisites</h2>

Make sure you have the following tools installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v22+)
- [pnpm](https://pnpm.io/) (v10+)
- [Docker](https://www.docker.com/)

> **Recommendation**: use [fnm](https://github.com/Schniz/fnm) (Fast Node Manager) for easier Node.js version management.

<h2 id="getting-started">🏁 Getting Started</h2>

1. **Clone the repository**

```bash
git clone git@github.com:marc-music/ihexa.git
cd ihexa
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

4. **Start the development server**

```bash
pnpm dev
```

The app is now running at [http://localhost:3000](http://localhost:3000).

<h2 id="docker-services">🐳 Docker Services</h2>

| Service    | Port | Description              |
|------------|------|--------------------------|
| PostgreSQL | 5432 | Database (postgres:17)   |

Docker Compose reads credentials from your `.env` file (`DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_PORT`, `DATABASE_NAME`), you have to configure them first.

**Managing services:**

```bash
docker compose up -d      # Start services
docker compose down       # Stop services
docker compose ps         # Check status
docker compose logs -f    # Follow logs
```

**Reset database data:**

Database files are stored in `.database/`. To reset:

```bash
docker compose down
docker run --rm -v $(pwd)/.database:/data alpine sh -c "rm -rf /data/*"
docker compose up -d
pnpm db:migrate
```

<h2 id="available-scripts">🛠️ Available Scripts</h2>

### Development

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the [Next.js](https://nextjs.org/docs) dev server. Automatically generates implementations and i18n types via `predev` hook. |
| `pnpm dev@prod` | Start the dev server with production implementations (Drizzle/PostgreSQL instead of in-memory). Requires a running database. |
| `pnpm build` | Create a production build. Automatically generates implementations and i18n types via `prebuild` hook. |
| `pnpm start` | Start the production server (requires `pnpm build` first). |

### Testing

| Command | Description |
|---------|-------------|
| `pnpm test` | Run [Vitest](https://vitest.dev/) unit tests in watch mode. |
| `pnpm test:coverage` | Run unit tests once with [v8 coverage](https://vitest.dev/guide/coverage) report. |
| `pnpm test:cucumber` | Run [Cucumber](https://cucumber.io/) BDD scenarios with in-memory implementations. |
| `pnpm test:cucumber@prod` | Run Cucumber scenarios against PostgreSQL (requires a running database). |
| `pnpm test:e2e` | Run [Playwright](https://playwright.dev/) end-to-end tests. |

### Code Quality

| Command | Description |
|---------|-------------|
| `pnpm lint:code:fix` | Lint and format code with [Biome](https://biomejs.dev/). |
| `pnpm lint:code:ci` | Check code with Biome (CI mode, no auto-fix). |
| `pnpm lint:commit` | Validate commit messages against [Conventional Commits](https://www.conventionalcommits.org/) using [commitlint](https://commitlint.js.org/). |
| `pnpm lint:architecture` | Check architecture rules with [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) and [folderslint](https://github.com/denber1024/folderslint). |

### Database

| Command | Description |
|---------|-------------|
| `pnpm db:generate` | Generate SQL migration files from schema changes with [Drizzle Kit](https://orm.drizzle.team/docs/drizzle-kit-overview). |
| `pnpm db:migrate` | Apply pending migrations to the database. |
| `pnpm db:push` | Push schema directly to the database (skips migration files, useful for rapid prototyping). |
| `pnpm db:studio` | Open [Drizzle Studio](https://orm.drizzle.team/docs/drizzle-studio) to browse and edit database data. |

### Documentation & Analysis

| Command | Description |
|---------|-------------|
| `pnpm storybook:dev` | Start [Storybook](https://storybook.js.org/) on port 6006. |
| `pnpm storybook:build` | Build Storybook for static hosting. |
| `pnpm doc:architecture` | Generate a dependency graph SVG using dependency-cruiser and [Graphviz](https://graphviz.org/). |
| `pnpm bundle:analyze` | Analyze production bundle size with [source-map-explorer](https://github.com/nicedoc/source-map-explorer). |

### Internals

| Command | Description |
|---------|-------------|
| `pnpm generate:implementations` | Copy `index.{ENV}.ts` files to `index.ts` based on the `ENV` variable (`dev`, `prod`, or `ephemeral`). Defaults to `dev`. |
| `pnpm i18n:interface` | Generate TypeScript types from i18n translation files using [i18next-resources-for-ts](https://github.com/i18next/i18next-resources-for-ts). |

<h2 id="environment-setup-guide">🏗️ Environment Setup Guide</h2>

This guide walks through every step needed to deploy the project on GitHub with fully working CI/CD, ephemeral environments, and production deployment.

### Step 1: AWS Account

You need an AWS account. The project uses SST (Serverless Stack) which deploys to AWS.

1. Create an [AWS account](https://aws.amazon.com/) (free tier is sufficient)
2. Create two IAM users with programmatic access:
   - One for **production** deployments
   - One for **ephemeral** deployments
3. Attach the `AdministratorAccess` policy to both (SST needs broad permissions to provision resources)
4. Save the Access Key ID and Secret Access Key for each

### Step 2: Neon Database

The project uses [Neon](https://neon.tech/) for serverless PostgreSQL.

1. Create a [Neon account](https://console.neon.tech/signup) (free tier, no credit card)
2. Create a new project (e.g., `ihexa`)
3. Note the **Project ID** (visible in project settings)
4. Generate an **API key** in your [Neon account settings](https://console.neon.tech/app/settings/api-keys)
5. Note the **connection URI** of the default branch (e.g., `production`), this will be your production DATABASE_URL

### Step 3: GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions.

**Repository secrets** (shared across all workflows):

| Secret | Value | Used by |
|--------|-------|---------|
| `EPHEMERAL_AWS_ACCESS_KEY_ID` | Ephemeral IAM user access key | Ephemeral deployments |
| `EPHEMERAL_AWS_SECRET_ACCESS_KEY` | Ephemeral IAM user secret key | Ephemeral deployments |
| `NEON_API_KEY` | Neon API key | Neon branch creation/deletion |
| `NEON_PROJECT_ID` | Neon project ID | Neon branch creation/deletion |
| `GH_TOKEN` | GitHub PAT with `repo` scope | Environment cleanup |

**Environment secrets** on the `production` environment (Settings → Environments → `production`):

| Secret | Value | Used by |
|--------|-------|---------|
| `AWS_ACCESS_KEY_ID` | Production IAM user access key | Production deployment |
| `AWS_SECRET_ACCESS_KEY` | Production IAM user secret key | Production deployment |
| `DATABASE_URL` | Neon `main` branch connection URI | Production migrations |

> This separation ensures production credentials are only accessible to workflows that explicitly target the `production` environment.

### Step 4: GitHub App (for Semantic Release)

The release workflow uses a GitHub App to create releases and push tags.

1. Create a [GitHub App](https://docs.github.com/en/apps/creating-github-apps) with `contents: write` and `issues: write` permissions
2. Install it on your repository
3. Add these **repository secrets**:

| Secret | Value |
|--------|-------|
| `GH_APP_ID` | GitHub App ID |
| `GH_APP_PRIVATE_KEY` | GitHub App private key |

### Step 6: Verify

1. **Push to a feature branch** (e.g., `feat/test-deploy`), this triggers:
   - Code checks, tests, build
   - Cucumber integration tests against a PostgreSQL service container
   - Neon branch creation → migrations → SST ephemeral deployment
2. **Check the GitHub Actions output** : all jobs should pass, and the deploy job should output a CloudFront URL
3. **Merge to `main`**, this triggers:
   - Production deployment with migrations on the Neon `main` branch
   - Semantic Release
4. **Delete the feature branch**, this triggers:
   - Neon branch deletion
   - SST environment removal
   - GitHub environment cleanup

<h2 id="requirements">🤝 Requirements</h2>

### Branches

- Keep your branch **up-to-date** with `main` using rebase
- Use conventional branch prefixes: `feat/`, `fix/`, `chore/`, `ci/`, `docs/`, `refactor/`, `test/`, `build/`, `perf/`, `revert/`, `style/`

### Commits

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Commits must be GPG-signed

### Feature Branch Workflow

1. Create a branch from `main` with a conventional prefix
2. Make your changes and commit
3. Push your branch : CI runs automatically, ephemeral environment is deployed
4. Open a Pull Request to merge into `main`

<h2 id="built-with">🏗️ Built With</h2>

### Languages & Frameworks

- [TypeScript](https://www.typescriptlang.org/): statically typed superset of JavaScript
- [React](https://react.dev/): declarative library for building user interfaces
- [Next.js](https://nextjs.org/): full-stack React framework with App Router
- [Effect](https://effect.website/): type-safe functional programming library for domain modeling

### UI & Styling

- [Tailwind CSS](https://tailwindcss.com/): utility-first CSS framework
- [DaisyUI](https://daisyui.com/): component library for Tailwind CSS
- [Motion](https://motion.dev/): animation library for React

### Database & ORM

- [PostgreSQL](https://www.postgresql.org/): open-source relational database
- [Drizzle ORM](https://orm.drizzle.team/): TypeScript ORM with type-safe queries

### Tools

- [Biome](https://biomejs.dev/): fast linter and formatter
- [Vitest](https://vitest.dev/): unit test framework
- [Playwright](https://playwright.dev/): end-to-end testing framework
- [Cucumber](https://cucumber.io/): BDD testing framework
- [Storybook](https://storybook.js.org/): UI component explorer
- [Husky](https://typicode.github.io/husky/): git hooks for automatic checks
- [Commitlint](https://github.com/conventional-changelog/commitlint): conventional commits validation
- [Lint-staged](https://github.com/okonet/lint-staged): linters on staged git files
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser): architecture dependency rules
- [folderslint](https://github.com/denber1024/folderslint): folder structure validation

<h2 id="cicd">🔄 CI/CD</h2>

### Tools

- [GitHub Actions](https://docs.github.com/en/actions) : CI/CD pipeline
- [SST](https://sst.dev/) : Serverless deployment to AWS
- [Neon](https://neon.tech/) : Serverless PostgreSQL with branch-per-environment

### Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| [Feature branch](.github/workflows/feature-branch.yml) | Push to feature branch | Lint, test, build, create Neon branch, deploy ephemeral env |
| [Release](.github/workflows/release.yml) | Push to `main` | Deploy to production, run semantic release |
| [Remove ephemeral env](.github/workflows/remove-ephemeral-env.yml) | Branch deletion | Remove SST deployment, delete Neon branch, clean up |

### Ephemeral Environments

Each feature branch automatically gets its own environment:
1. A **Neon database branch** is created (isolated copy of the main database)
2. **Migrations** are applied to the branch
3. The app is **deployed to AWS** via SST with its own CloudFront URL
4. When the branch is deleted, everything is **cleaned up automatically**

<h2 id="versioning">🏷️ Versioning</h2>

This project follows [Semantic Versioning 2.0.0](https://semver.org/) specification for version naming, ensuring a clear release cycle and promoting backward compatibility.
