# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc && vite build` (type-check, then bundle to `dist/`)
- `npm run preview` — serve the built bundle

- `npm test` — Vitest (jsdom) single run; `npm run test:watch` for watch mode; one file/test: `npx vitest run src/components/components.test.tsx -t "Counter"`

Tests are colocated as `*.test.tsx` (runtime tests in `src/lib/jsx/`, component tests in `src/components/`). There is no linter; `tsc` (strict unused-locals/params) also type-checks the tests, so `npm run build` fails on type errors in them.

## Architecture

Vanilla TypeScript + Vite with **no UI framework**. JSX is supported through a custom minimal runtime in [src/lib/jsx/jsx-runtime.ts](src/lib/jsx/jsx-runtime.ts):

- JSX expressions evaluate **directly to real DOM nodes** (no virtual DOM, no re-rendering). Components are plain functions `(props) => Node`.
- State is handled imperatively: a component keeps local variables and mutates the DOM itself in event handlers (see [Counter](src/components/Counter/index.tsx), which casts the JSX result to `HTMLButtonElement` and updates `textContent`).
- `onXxx` props become `addEventListener('xxx')`; other props become attributes (`class`, not `className`). Tags in the `SVG_TAGS` set are created in the SVG namespace — add new SVG tags there (and to `IntrinsicElements`) when needed.
- In dev (and Vitest) `jsx-dev-runtime.ts` adds `data-source="src/...:line"` to every element and `data-component="Name"` to each component's root element; production builds use the plain runtime, so it is absent there. Tests must not assume elements have no extra attributes.
- The `jsx-dom` import source is a fake name wired to `src/lib/jsx` in two places that must stay in sync: `paths` in [tsconfig.json](tsconfig.json) (`jsxImportSource: "jsx-dom"`) and the `resolve.alias` in [vite.config.ts](vite.config.ts).

Entry: [index.html](index.html) owns the `#app` root; [src/main.ts](src/main.ts) imports global CSS and calls `mountApp` ([App](src/components/App/index.tsx)), which fills that root.

Components live in `src/components/<Name>/index.tsx` with a colocated `<Name>.module.css` (CSS modules, imported as `styles`). Cross-directory imports use the aliases `@components/*`, `@lib/*`, `@assets/*` (declared in both `tsconfig.json` `paths` and `vite.config.ts` `resolve.alias`; keep them in sync); only same-folder siblings (e.g. `./Foo.module.css`) stay relative. Components are imported by folder (`@components/Name`). Other imports use explicit `.tsx`/`.ts` extensions (`allowImportingTsExtensions`, `verbatimModuleSyntax`). `erasableSyntaxOnly` is on, so no enums/namespaces in app code. Icons come from the sprite in `public/icons.svg` via `SvgIcon` ([src/lib/SvgIcon.tsx](src/lib/SvgIcon.tsx)).
