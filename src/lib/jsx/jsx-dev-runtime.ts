import { jsx } from './jsx-runtime.ts'

export * from './jsx-runtime.ts'

type Source = { fileName: string; lineNumber: number }

/**
 * Dev-only DOM annotations for DevTools: `data-source="file:line"` on every element, and `data-component="Name"` on the root
 * element of each component (space-separated when a component directly returns another one; match with `[data-component~=Name]`).
 */
export function jsxDEV(type: Parameters<typeof jsx>[0], props: Parameters<typeof jsx>[1], _key?: unknown, _isStatic?: boolean, source?: Source): Node {
  const node = jsx(type, props)
  if (typeof type === 'function' && node instanceof Element) {
    // Components are evaluated inside-out, so an outer name is prepended to any already set by a nested component.
    const names = [type.name, node.getAttribute('data-component')].filter(Boolean)
    node.setAttribute('data-component', names.join(' '))
  }
  if (typeof type === 'string' && source && node instanceof Element) {
    node.setAttribute('data-source', `${source.fileName.slice(source.fileName.lastIndexOf('/src/') + 1)}:${source.lineNumber}`)
  }
  return node
}
