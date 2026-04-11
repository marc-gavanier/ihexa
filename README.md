# My IHexa Training Progress

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5-5A0EF8?logo=daisyui&logoColor=white)](https://daisyui.com/)
[![Effect](https://img.shields.io/badge/Effect-3-black)](https://effect.website/)

[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber&logoColor=white)](https://cucumber.io/)
[![Storybook](https://img.shields.io/badge/Storybook-10-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)

[![SST](https://img.shields.io/badge/SST-Serverless-E27152)](https://sst.dev/)
[![AWS](https://img.shields.io/badge/AWS-Deploy-FF9900?logo=amazonwebservices&logoColor=white)](https://aws.amazon.com/)
[![pnpm](https://img.shields.io/badge/pnpm-Package_Manager-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

<h2 id="about">🪧 About</h2>

This repository contains my progress on the [**IHexa** training](https://www.ihexa.fr/), with a twist: I adapt the suggested path to my own technological choices and code organization.  
The goal is to provide an alternative example, staying faithful to the training while offering a different perspective that might interest others who have followed it.

Here are some of my choices:
- **Front-end**: Vue.js → React
- **Backend**: Java API based → Next.js Server Components + Server Actions
- **E2E tests tool**: Cypress → Playwright
- **Versioning & repo**: GitLab → GitHub
- **Code organization**: Hexagonal architecture “primary/secondary” → Feature-based Vertical Slices with colocated Abilities (Screaming Architecture principles)
- **Domain modeling**: plain objects → functional domain model
- **Project setup**: JHipster → tools official documentations (Sorry Colin! 😉)
- **Database hosting**: Clever Cloud PostgreSQL → Neon (serverless PostgreSQL, scale-to-zero, branch-per-environment)
- **ORM & migrations**: JPA + Liquibase → Drizzle ORM + Drizzle Kit migrations
- **Integration testing strategy**: separate integration tests for repositories + Gherkin component tests simulating full API calls → Cucumber scenarios serve dual purpose: BDD acceptance tests (in-memory) and integration tests against PostgreSQL in CI
- **Deployment**: Clever Cloud → AWS with SST (Serverless Stack) for Next.js applications with OpenNext
- **UI Documentation**: tikui → Storybook
- **UI Pattern library**: tikui → DaisyUI + TailwindCSS

This approach keeps me close to the training while exploring practical alternatives with others technologies.

## 📑 Table of Contents

- 🪧 [About](#about)
- ✨ [My Approach & Choices](#approach)
- 🤗 [Contributing](#contributing)
- 📝 [License](#license)

<h2 id="approach">✨ My Approach & Choices</h2>

Here is a more detailed explanation of the choices I made while following the IHexa training:
- **React instead of Vue.js**: React is the most widely used tool for building web interfaces. However, it is also heavily influenced by practices that, in my opinion, can diverge from a clean architecture. I see this project as an opportunity to experiment with **alternatives that work without relying on the usual “messy” patterns** commonly found in React projects.
- **Next.js instead of a Java-based backend**: similar to React, Next.js is becoming a widely adopted framework. However, most examples and tutorials rarely consider architectural concerns that emphasize a **domain isolated from the framework**. Using it here is an opportunity to **explore how a clean, domain-driven structure can coexist with a modern full-stack framework** that mixes client and server boundaries.
- **Playwright instead of Cypress**: I’m familiar with Cypress, but I’ve never used Playwright. This is a great opportunity to **discover a new tool** and compare approaches for end-to-end testing.
- **GitHub instead of GitLab**: purely for the pleasure of doing things differently and exploring an **alternative setup for CI/CD pipelines**. This allows me to compare approaches.
- **Feature / Use Case-based organization**: this is a personal preference that makes navigating the code much easier. While I fully understand hexagonal architecture and its primary/secondary ports, translating the concept directly into folders often confuses me. I’m excessively sensitive to folder organization, so **this structure keeps the code readable and maintainable for me**.
- **Functional domain modeling**: I usually model the domain in a functional style, but for this project I wanted to **go one step further** by learning how to use the **Effect** library and building a **purely functional domain model**. This allows encoding business rules in the type system and handling errors in a composable, effectful way rather than relying on runtime `throw`s.
- **No JHipster**: I have a habit of **enjoying setups that are *slightly inconvenient***, forcing me to spend an unreasonable amount of time reading documentation and getting frustrated when things don’t work.
- **Neon instead of Clever Cloud PostgreSQL**: Neon offers **serverless PostgreSQL with true scale-to-zero**, meaning the database costs nothing when idle, perfect for a learning project. Its **branch-per-environment** feature creates an isolated database copy in under a second for each ephemeral deployment, which is far more practical than provisioning a full Clever Cloud add-on per preview environment.
- **Drizzle ORM instead of JPA + Liquibase**: Drizzle is a **lightweight, type-safe SQL toolkit** that fits naturally in a TypeScript codebase. Combined with Drizzle Kit for migrations, it provides a **code-first schema approach** where table definitions reference domain constants (e.g., max lengths), keeping the database schema aligned with business rules by design.
- **Cucumber scenarios as integration tests**: in the training, **integration tests for repositories** and Gherkin-based component tests that simulate full API calls are separated. Since this project has **no standalone backend API** (Next.js server actions call domain logic directly), I chose to **reuse the same Cucumber scenarios** for both purposes: they run against in-memory implementations locally, and against a real PostgreSQL database in CI by simply switching the implementation profile (`ENV=prod`). This avoids duplicating test logic while still validating real database interactions.
- **AWS with SST instead of Clever Cloud**: I’ve been wanting to try **SST (Serverless Stack)** for a while, as it is an **open alternative to Vercel**, offering similar simplicity while keeping full control over the infrastructure. Using it for this project was the perfect occasion to **experiment with modern serverless deployment**.
- **DaisyUI + TailwindCSS instead of tikui**: DaisyUI provides a **solid design foundation** out of the box while staying **fully compatible with Tailwind’s utility-first approach**. Combined with TailwindCSS, it strikes a balance between having **ready-to-use components** and keeping enough **flexibility to customize the design** without the complexity often seen in pure Tailwind setups.
- **Storybook instead of tikui documentation**: I’ve already used Storybook, but I wanted to go deeper into what the tool really offers: exploring its full potential for **interactive documentation**, **visual testing** and **design system workflows** for UI components.
- **Near-zero infrastructure cost**: combined, AWS (Lambda, CloudFront, S3) and Neon both **scale to zero when idle**, less than 1€/year for a learning project with no traffic, a few euros per month for a low-traffic app, and still under 15€/month for a small production app with hundreds of daily users.

<h2 id="contributing">🤗 Contributing</h2>

This repository is primarily a personal progress log.  
If you want to share ideas, suggestions, or adaptations on this alternative version, feel free to open an **issue** or **pull request**.

See the [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, available scripts, and environment configuration.

<h2 id="license">📝 License</h2>

This repository is for personal use and inspired by the [IHexa training](https://www.ihexa.fr/).
See the [LICENSE.md](./LICENSE.md) file in the repository for more information
