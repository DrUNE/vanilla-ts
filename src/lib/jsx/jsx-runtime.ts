/** Minimal JSX runtime: JSX expressions evaluate directly to DOM nodes (no virtual DOM, no React). */

type Child = Node | string | number | false | null | undefined | Child[]
type Props = { children?: Child; [name: string]: unknown }
type Component = (props: any) => Node

const SVG_NS = 'http://www.w3.org/2000/svg'
const SVG_TAGS = new Set(['svg', 'use', 'path', 'g', 'circle', 'rect', 'line', 'polyline', 'polygon', 'defs', 'symbol'])

function appendChildren(parent: Node, child: Child): void {
  if (Array.isArray(child)) child.forEach((c) => appendChildren(parent, c))
  else if (child !== null && child !== undefined && child !== false) parent.appendChild(child instanceof Node ? child : document.createTextNode(String(child)))
}

export function jsx(type: string | Component, props: Props): Node {
  if (typeof type === 'function') return type(props)

  const { children, ...attrs } = props
  const element = SVG_TAGS.has(type) ? document.createElementNS(SVG_NS, type) : document.createElement(type)
  for (const [name, value] of Object.entries(attrs)) {
    if (value === undefined || value === null || value === false) continue
    if (name.startsWith('on') && typeof value === 'function') {
      element.addEventListener(name.slice(2).toLowerCase(), value as EventListener)
    } else {
      element.setAttribute(name, value === true ? '' : String(value))
    }
  }
  appendChildren(element, children)
  return element
}

export function Fragment({ children }: Props): Node {
  const fragment = document.createDocumentFragment()
  appendChildren(fragment, children)
  return fragment
}

export { jsx as jsxs, jsx as jsxDEV }

type Attrs = { children?: Child; class?: string; [attr: string]: unknown }

export namespace JSX {
  export type Element = Node
  export type ElementType = string | Component
  export interface ElementChildrenAttribute {
    children: {}
  }
  export type IntrinsicElements = { [K in keyof HTMLElementTagNameMap]: Attrs } & {
    svg: Attrs
    use: Attrs
  }
}
