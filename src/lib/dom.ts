type Child = Node | string

/** Creates an element with attributes and children; strings become text nodes (never HTML). */
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag)
  for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value)
  element.append(...children)
  return element
}

const SVG_NS = 'http://www.w3.org/2000/svg'

/** An <svg><use href="/icons.svg#id"/></svg> reference to the sprite in public/. */
export function svgIcon(id: string, className: string): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('class', className)
  svg.setAttribute('role', 'presentation')
  svg.setAttribute('aria-hidden', 'true')
  const use = document.createElementNS(SVG_NS, 'use')
  use.setAttribute('href', `/icons.svg#${id}`)
  svg.append(use)
  return svg
}
