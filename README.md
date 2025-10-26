# My IHexa Training Progress

<h2 id="about">🪧 About</h2>

This repository contains my progress on the [**IHexa** training](https://www.ihexa.fr/), with a twist: I adapt the suggested path to my own technological choices and code organization.  
The goal is to provide an alternative example, staying faithful to the training while offering a different perspective that might interest others who have followed it.

Here are some of my choices:
- **Front-end**: Vue.js → React
- **Backend**: Java API based → Next.js Server Components + Server Actions
- **E2E tests tool**: Cypress → Playwright
- **Versioning & repo**: GitLab → GitHub
- **Code organization**: Hexagonal architecture “primary/secondary” → Features & Use Cases based organization (similar to “ducks” pattern)
- **Domain modeling**: plain objects → functional domain model
- **Project setup**: JHipster → tools official documentations (Sorry Colin! 😉)
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
- **AWS with SST instead of Clever Cloud**: I’ve been wanting to try **SST (Serverless Stack)** for a while, as it is an **open alternative to Vercel**, offering similar simplicity while keeping full control over the infrastructure. Using it for this project was the perfect occasion to **experiment with modern serverless deployment**. As a bonus, it **stays entirely within AWS’s free tier**, so it costs nothing to run.
- **DaisyUI + TailwindCSS instead of tikui**: DaisyUI provides a **solid design foundation** out of the box while staying **fully compatible with Tailwind’s utility-first approach**. Combined with TailwindCSS, it strikes a balance between having **ready-to-use components** and keeping enough **flexibility to customize the design** without the complexity often seen in pure Tailwind setups.
- **Storybook instead of tikui documentation**: I’ve already used Storybook, but I wanted to go deeper into what the tool really offers: exploring its full potential for **interactive documentation**, **visual testing** and **design system workflows** for UI components.

<h2 id="contributing">🤗 Contributing</h2>

This repository is primarily a personal progress log.  
If you want to share ideas, suggestions, or adaptations on this alternative version, feel free to open an **issue** or **pull request**.

<h2 id="license">📝 License</h2>

This repository is for personal use and inspired by the [IHexa training](https://www.ihexa.fr/).
See the [LICENSE.md](./LICENSE.md) file in the repository for more information
