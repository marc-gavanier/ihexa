# My IHexa Training Progress

<h2 id="about">🪧 About</h2>

This repository contains my progress on the [**IHexa** training](https://www.ihexa.fr/), with a twist: I adapt the suggested path to my own technological choices and code organization.  
The goal is to provide an alternative example, staying faithful to the training while offering a different perspective that might interest others who have followed it.

Here are some of my choices:
- **Front-end**: Vue.js → React
- **E2E tests tool**: Cypress → Playwright
- **Versioning & repo**: GitLab → GitHub
- **Code organization**: Hexagonal architecture “primary/secondary” → Features & Use Cases based organization (similar to “ducks” pattern)
- **Project setup**: JHipster → tools official documentations (Sorry Colin! 😉)

This approach keeps me close to the training while exploring practical alternatives with others technologies.

## 📑 Table of Contents

- 🪧 [About](#about)
- ✨ [My Approach & Choices](#approach)
- 🤗 [Contributing](#contributing)
- 📝 [License](#license)

<h2 id="approach">✨ My Approach & Choices</h2>

Here is a more detailed explanation of the choices I made while following the IHexa training:

- **React instead of Vue.js**: React is the most widely used tool for building web interfaces. However, it is also heavily influenced by practices that, in my opinion, can diverge from a clean architecture. I see this project as an opportunity to experiment with **alternatives that work without relying on the usual “messy” patterns** commonly found in React projects.
- **Playwright instead of Cypress**: I’m familiar with Cypress, but I’ve never used Playwright. This is a great opportunity to **discover a new tool** and compare approaches for end-to-end testing.
- **GitHub instead of GitLab**: purely for the pleasure of doing things differently and exploring an **alternative setup for CI/CD pipelines**. This allows me to compare approaches.
- **Feature / Use Case-based organization**: this is a personal preference that makes navigating the code much easier. While I fully understand hexagonal architecture and its primary/secondary ports, translating the concept directly into folders often confuses me. I’m excessively sensitive to folder organization, so **this structure keeps the code readable and maintainable for me**.  
- **No JHipster**: I have a habit of **enjoying setups that are *slightly inconvenient***, forcing me to spend an unreasonable amount of time reading documentation and getting frustrated when things don’t work.

<h2 id="contributing">🤗 Contributing</h2>

This repository is primarily a personal progress log.  
If you want to share ideas, suggestions, or adaptations on this alternative version, feel free to open an **issue** or **pull request**.

<h2 id="license">📝 License</h2>

This repository is for personal use and inspired by the [IHexa training](https://www.ihexa.fr/).
See the [LICENSE.md](./LICENSE.md) file in the repository for more information
