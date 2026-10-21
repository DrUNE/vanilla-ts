import { jsx } from './jsx-runtime.ts'

export * from './jsx-runtime.ts'

type Source = { fileName: string; lineNumber: number }

/** Dev-only: tags every element with `data-source="file:line"` so DevTools can map a DOM node back to its JSX. */
export function jsxDEV(type: Parameters<typeof jsx>[0], props: Parameters<typeof jsx>[1], _key?: unknown, _isStatic?: boolean, source?: Source): Node {
  const node = jsx(type, props)
  if (typeof type === 'string' && source && node instanceof Element) {
    node.setAttribute('data-source', `${source.fileName.slice(source.fileName.lastIndexOf('/src/') + 1)}:${source.lineNumber}`)
  }
  return node
}
