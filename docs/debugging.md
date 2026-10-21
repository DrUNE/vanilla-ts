# Debugging: from a DOM element to its source code

There is no React or virtual DOM in this project: components return real DOM nodes directly, so DevTools has no component tree to show. Instead, dev mode annotates the DOM with attributes that lead you to the source.

*Русская версия: [debugging.ru.md](debugging.ru.md).*

## Attributes added to the DOM

Only in dev mode (`npm run dev`) and in Vitest. Production builds do not contain them.

| Attribute | Where | Example | Meaning |
| --- | --- | --- | --- |
| `data-source` | every element | `src/components/Counter/index.tsx:12` | file and line of the JSX that created the element |
| `data-component` | root element of a component | `Counter` | name of the component function |

If a component directly returns another component, the names are space-separated: `data-component="Outer Inner"`. Match such an element with the selector `[data-component~=Inner]`.

Components that return a fragment get no attribute, since they have no root element.

## Finding the source from an element

1. Open the **Elements** panel and select an element (Ctrl+Shift+C, then click on the page).
2. Read its `data-source` attribute, e.g. `src/components/Counter/index.tsx:12`.
3. Open **Sources**, press Ctrl+P and type the path (or just `Counter/index.tsx`), then Ctrl+G and the line number.

To find which component an element belongs to, walk up the tree to the nearest `data-component`. The same from the console:

```js
$0.dataset.source                                  // where the selected element was created
$0.closest('[data-component]').dataset.component   // nearest owning component
$0.closest('[data-component]').dataset.source      // where that component's root element is created
```

The reverse direction, finding every instance of a component on the page:

```js
document.querySelectorAll('[data-component~=Counter]')
```

To reveal one in Elements, run `inspect(document.querySelector('[data-component~=Counter]'))`.

## Other routes to the source

- **Styles.** In the **Styles** pane each rule points to a file such as `Counter.module.css:5`; the link opens the CSS module directly (`css.devSourcemap` is enabled).
- **Event handlers.** In the **Event Listeners** pane the link next to `click` and other events leads to the line in `index.tsx` where `onClick` is declared.
- **Call stacks and breakpoints.** TypeScript source maps are on by default in dev, so Sources and stack traces show the original `.tsx`, not compiled code.

## Production builds

`npm run build` emits `.map` files (`build.sourcemap`), so error stacks and breakpoints resolve to the sources. The `data-source` and `data-component` attributes are not in the bundle: from a DOM element in production you can only reach the source via styles, event handlers or stack traces.

## Notes for tests

Vitest also uses the dev runtime, so elements in tests carry these attributes. Do not assert that an element has no attributes, or that `outerHTML` equals an exact string without them.

## Where it lives

[src/lib/jsx/jsx-dev-runtime.ts](../src/lib/jsx/jsx-dev-runtime.ts) (the `jsxDEV` function) and the `css.devSourcemap` / `build.sourcemap` settings in [vite.config.ts](../vite.config.ts).
