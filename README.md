# vanilla-ts

A demo project showing that a modern component-style UI can be built with **plain TypeScript and Vite, with no UI framework**. It uses JSX, but not React: a ~50-line custom JSX runtime turns every JSX expression straight into a real DOM node. There is no virtual DOM, no diffing and no re-rendering. The page is the Vite starter layout, rebuilt out of small components, and serves as a reference for how far you can get without a framework.

## Key ideas

- **JSX that returns DOM.** `<button>Hi</button>` evaluates to an `HTMLButtonElement`. Components are plain functions `(props) => Node`.
- **Imperative state.** A component keeps local variables and updates the DOM itself in event handlers (see [Counter](src/components/Counter/index.tsx)).
- **Colocated CSS Modules.** Each component lives in `src/components/<Name>/` with its `index.tsx` and `<Name>.module.css`.
- **Path aliases.** `@components/*`, `@lib/*` and `@assets/*` instead of relative `../../` imports.
- **Debuggable without a framework.** In dev, elements carry `data-source` (file:line) and component roots carry `data-component`, so you can go from any DOM node to its source. See [docs/debugging.md](docs/debugging.md).
- **Tests.** Vitest with jsdom, run against the same runtime.

```tsx
export function Counter() {
  let count = 0
  const button = (
    <button type="button" onClick={() => { count += 1; button.textContent = `Count is ${count}` }}>
      Count is {count}
    </button>
  ) as HTMLButtonElement
  return button
}
```

## Getting started

```bash
npm install
npm run dev        # dev server with HMR
npm run build      # type-check (tsc) and build to dist/
npm run preview    # serve the production build
npm test           # run tests once (npm run test:watch for watch mode)
```

## Project layout

```
index.html                 owns the #app mount point
src/main.ts                entry: global CSS + mountApp()
src/components/<Name>/     index.tsx + <Name>.module.css
src/lib/jsx/               the custom JSX runtime (jsx-runtime.ts, jsx-dev-runtime.ts)
src/lib/SvgIcon.tsx        <svg><use/></svg> helper for public/icons.svg
docs/                      developer docs
```

The JSX import source is a made-up module name, `jsx-dom`, mapped to `src/lib/jsx` in both `tsconfig.json` (`paths`) and `vite.config.ts` (`resolve.alias`). The `@…` aliases are declared in the same two places; keep them in sync.

## Documentation

- [Debugging: from a DOM element to its source](docs/debugging.md) ([RU](docs/debugging.ru.md))
- [CLAUDE.md](CLAUDE.md): guidance for AI coding assistants working in this repo

## Limitations

This is a demonstration, not a framework. There is no reactivity: nothing re-renders when a variable changes, and every update is a manual DOM mutation. That is fine for small widgets and static pages, and it is the trade-off the project exists to show.
