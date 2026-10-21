# vanilla-ts

*Русская версия: [README.ru.md](README.ru.md).*

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

  const render = () => {
    button.textContent = `Count is ${count}`
  }

  const increment = () => {
    count += 1
    render()
  }

  const button = (
    <button type="button" onClick={increment} />
  ) as HTMLButtonElement

  render()
  return button
}
```

### Pattern: state, `render` and handlers

Components without a framework follow one small convention, shown above:

- **State** is a plain local variable (`count`).
- **`render`** is the only function that writes state into the DOM. It is also called once at creation, so the initial markup is produced by the same code as every update instead of being duplicated in the JSX.
- **Handlers** (`increment`) change the state and then call `render`.

Why this is better than putting everything inside the inline `onClick`:

- **One place for DOM updates.** When the view needs to change, there is exactly one function to edit, and initial and updated output cannot drift apart.
- **Handlers stay about behavior.** They read like the logic they implement, are easy to reuse from several events, and can be tested by calling the handler and checking the DOM.
- **The missing reactivity is explicit.** Since nothing re-renders automatically, the rule "every state change must end in `render()`" is visible in the code and easy to review.
- **Easy to grow.** Adding a second piece of state or a second event means a new handler that calls the same `render`, not another copy of DOM-patching code.

`render` refers to `button`, which is declared below it. That is safe because `render` only runs after the button exists: its first call is placed right after the declaration.

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
- [CLAUDE.md](CLAUDE.md): guidance for AI coding assistants working in this repo (English only)

## Limitations

This is a demonstration, not a framework. There is no reactivity: nothing re-renders when a variable changes, and every update is a manual DOM mutation.

The `Counter` above works despite this only because its click handler mutates the DOM directly (`button.textContent = ...`). The `count` variable itself is not reactive: the `{count}` in the JSX is read once, when the component is created. If the handler only did `count += 1` and did not touch the DOM, the button text would never change. That is fine for small widgets and static pages, and it is the trade-off the project exists to show.
