# Adobe XD → React Healthcare Dashboard

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?logo=github)](https://hpv333.github.io/Adobe_to_React/)  [![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev)  [![Material UI](https://img.shields.io/badge/MUI-v6-purple?logo=mui)](https://mui.com)  [![Chart.js](https://img.shields.io/badge/Chart.js-4.4-orange?logo=chartdotjs)](https://www.chartjs.org/)  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A **pixel‑perfect healthcare analytics dashboard** faithfully recreated from an Adobe XD mock‑up and engineered with **React 18**, **Material UI v6**, and **Chart.js 4**. The application streams real‑time patient vitals, renders interactive charts, and demonstrates a robust design‑to‑code workflow—proving that high‑fidelity Adobe designs can become clean, maintainable, production‑ready React code.

---

## 📸 Screenshots

| Login ↗︎ | Dashboard ↗︎ | Patient Detail ↗︎ |
|---------|--------------|--------------------|
| ![Login](docs/screens/login.png) | ![Dashboard](docs/screens/dashboard.png) | ![Patient](docs/screens/patient.png) |

> **Note:** All screenshots were captured at 1440 × 900. The layout is fully responsive down to 320 px.

---

## ✨ Key Features

- **Secure Auth Flow** – JWT‑based authentication with form validation and error feedback.
- **Real‑time Vitals** – WebSocket listener pushes live heart‑rate, BP, and SpO₂ data to the UI.
- **Dynamic Charts** – Line, bar, and doughnut charts powered by Chart.js with custom tooltips & themes.
- **Searchable Sidebar** – Instant filtering of patients by name, ward, or risk score.
- **Theming & Dark Mode** – One‑click toggle that persists user preference in `localStorage`.
- **Accessibility‑First** – Semantic HTML, colour‑contrast AA, keyboard navigation, ARIA labels.
- **i18n Ready** – Text strings extracted to JSON and loaded via `react‑i18next`.
- **E2E Tested** – Cypress tests cover critical paths (login, vitals stream, chart interactions).

---

## 🛠️ Tech Stack

| Layer | Libraries / Tools |
|-------|-------------------|
| **Front‑End** | React 18 + Vite, Material UI v6, Emotion 11 |
| **Data Visualisation** | Chart.js 4, `react-chartjs-2` wrapper |
| **State Management** | React Context API, `useReducer` hooks |
| **Routing** | React Router v6 |
| **Real‑Time** | Native WebSocket API (fallback to SSE) |
| **Form Handling** | React Hook Form 7 + Yup validation |
| **Testing** | Jest, React Testing Library, Cypress 13 |
| **Lint / Format** | ESLint (airbnb config), Prettier |
| **CI/CD** | GitHub Actions (build, test, deploy to Pages) |

---

## 🧩 Architecture

```
Adobe_to_React/
├─ public/                # Static assets
├─ src/
│  ├─ api/                # REST + WebSocket helpers
│  ├─ components/         # Reusable UI components (ChartCard, StatChip, ...)
│  ├─ features/           # Domain slices (auth, patients, vitals)
│  ├─ hooks/              # Custom hooks (useVitalsStream, useDarkMode)
│  ├─ layouts/            # AuthLayout, DashboardLayout
│  ├─ pages/              # Login, Dashboard, PatientDetail
│  ├─ routes/             # ProtectedRoute wrapper
│  ├─ styles/             # Global theme overrides & SCSS helpers
│  ├─ tests/              # Unit & integration tests
│  ├─ App.jsx             # Root component / router
│  └─ main.jsx            # Vite entry point
├─ .github/workflows/     # CI pipelines
├─ cypress/               # E2E tests & fixtures
├─ vite.config.js         # Vite + alias config
└─ README.md              # <— you are here
```

### Data Flow

```
Adobe XD Mock‑up → Figma (Dev Mode) → React Components → Context API Store → Charts & Tables → User
```

1. **Design Handoff** – Colours, typography, and spacing tokens extracted via Figma Dev Mode.
2. **Atomic Components** – Buttons, cards, chips coded as isolated Storybook stories.
3. **Feature Composition** – Pages composed from atomic + molecular components.
4. **State Layer** – Context stores fetch data via REST and update via WebSocket.
5. **Presentation** – Chart.js renders datasets; Material UI tables list patient info.

---

## 🚀 Getting Started

### Prerequisites

- **Node >= 18**
- **pnpm >= 8** (or npm/yarn)

```bash
# 1. Clone
$ git clone https://github.com/hpv333/Adobe_to_React.git
$ cd Adobe_to_React

# 2. Install dependencies
$ pnpm install

# 3. Environment variables
$ cp .env.example .env.local
# → Fill in VITE_API_BASE_URL, VITE_WS_URL, etc.

# 4. Run dev server
$ pnpm dev
# App runs at http://localhost:5173 and reloads on save
```

### Available Scripts

| Script | What it does |
|--------|--------------|
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | Production build to `dist/` |
| `pnpm preview` | Preview the build locally |
| `pnpm test` | Run Jest unit & integration tests |
| `pnpm cypress:open` | Open Cypress runner |
| `pnpm format` | Run Prettier write |
| `pnpm lint` | ESLint + stylelint checks |
| `pnpm deploy` | Build + push `dist/` to `gh-pages` |

---

## 🧪 Testing Strategy

- **Unit Tests** – All pure functions and hooks are covered with Jest.
- **Component Tests** – RTL checks render output, props, and accessibility.
- **E2E Tests** – Cypress simulates full user journeys (login → dashboard → patient drill‑down) against a mock API.
- **Performance Budget** – Lighthouse CI fails if TTI > 3 s or CLS > 0.1.

Run the full test suite locally:

```bash
pnpm test && pnpm cypress:run
```

---

## 🌐 Deployment

A GitHub Actions workflow builds the app, runs tests, and deploys the `dist/` folder to the `gh-pages` branch. The site is then served at **`https://hpv333.github.io/Adobe_to_React/`**.

```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: 8 }
      - run: pnpm install
      - run: pnpm test --coverage
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          publish_dir: ./dist
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🗺️ Roadmap

- [ ] Migrate to **TanStack Query** for smarter data caching.
- [ ] Replace Context with **Redux Toolkit** + RTK Query.
- [ ] Add **voice‑over mode** for hands‑free accessibility.
- [ ] Containerise with Docker & deploy to AWS Amplify.
- [ ] Integrate **Storybook** & Chromatic for UI regression.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you’d like to change. For major changes, create a feature branch:

```bash
git checkout -b feat/amazing-feature
```

Commit with [Conventional Commits](https://www.conventionalcommits.org/) and ensure the linter passes:

```bash
pnpm lint && pnpm test
```

Then open a PR describing your changes.

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## 🙋‍♀️ Author & Contact

**Hari Priya Vedala**  – [LinkedIn](https://www.linkedin.com/in/haripriyav3) • [GitHub](https://github.com/hpv333) • [Portfolio](https://hpv333.github.io/blog-build/)

> Built with ❤️ and ☕ in Denton, TX.

