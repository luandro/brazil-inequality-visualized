# Repository Guidelines

## Project Structure & Module Organization
- `src/main.tsx` bootstraps the app; `src/App.tsx` defines routes and providers.
- `src/pages/` contains page-level screens (e.g., `Home.tsx`, `Wealth.tsx`).
- `src/components/` holds shared UI; `src/components/ui/` contains shadcn-based primitives.
- `src/context/`, `src/hooks/`, `src/data/`, `src/i18n/`, `src/lib/`, `src/schema.ts` organize app state, helpers, data, and types.
- `public/` is for static assets, `docs/` for project notes, `dist/` for build output.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run dev` starts the Vite dev server with HMR.
- `npm run build` creates the production build in `dist/`.
- `npm run build:dev` builds in development mode for debugging.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint across the repo.

## Coding Style & Naming Conventions
- TypeScript + React, 2-space indentation, semicolons, and ES module imports.
- Prefer the `@/` alias for imports from `src/`.
- Components use `PascalCase.tsx`; hooks live in `src/hooks/` with `use-*.ts(x)` filenames and `useX` exports.
- Use Tailwind utility classes in JSX; keep global styles in `src/index.css`.
- ESLint rules are in `eslint.config.js`; keep formatting consistent with existing files.

## Testing Guidelines
- No automated test runner is configured yet.
- For changes, run `npm run lint` and do a manual smoke test via `npm run dev` or `npm run preview`.
- If adding tests, co-locate `*.test.tsx` or `*.spec.tsx` with the source and add a corresponding script in `package.json`.

## Localization & Content
- Translated strings live in `src/i18n/en.json` and `src/i18n/pt-BR.json`.
- Update both files for UI copy changes; follow `docs/i18n-guide.md` for conventions.

## Commit & Pull Request Guidelines
- Follow the existing convention: `feat: ...`, `fix: ...`, `chore: ...` with short, imperative subjects.
- PRs should include a brief summary, testing notes, and screenshots or GIFs for UI changes.
- Link related issues and call out i18n updates or data changes explicitly.
