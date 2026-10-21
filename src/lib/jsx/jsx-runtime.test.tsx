import { describe, expect, it, vi } from 'vitest'
import { Fragment } from './jsx-runtime.ts'

describe('jsx runtime', () => {
  it('creates DOM elements with attributes and children', () => {
    const el = (<a href="/x" class="c">hi {1}</a>) as HTMLAnchorElement
    expect(el).toBeInstanceOf(HTMLAnchorElement)
    expect(el.getAttribute('href')).toBe('/x')
    expect(el.className).toBe('c')
    expect(el.textContent).toBe('hi 1')
  })

  it('skips null, undefined and false attributes and children', () => {
    const el = (<div hidden={false} title={undefined}>{[null, false, undefined, "ok"]}</div>) as HTMLElement
    expect(el.getAttributeNames().filter((n) => n !== 'data-source')).toEqual([])
    expect(el.textContent).toBe('ok')
  })

  it('renders boolean true attributes as empty strings', () => {
    const el = (<input disabled />) as HTMLInputElement
    expect(el.getAttribute('disabled')).toBe('')
  })

  it('binds onXxx props as event listeners', () => {
    const handler = vi.fn()
    const el = (<button onClick={handler} />) as HTMLButtonElement
    el.click()
    expect(handler).toHaveBeenCalledOnce()
    expect(el.hasAttribute('onClick')).toBe(false)
  })

  it('flattens nested child arrays', () => {
    const el = (<ul>{[<li>a</li>, [<li>b</li>]]}</ul>) as HTMLElement
    expect(el.children.length).toBe(2)
  })

  it('creates SVG tags in the SVG namespace', () => {
    const el = (<svg><use href="#a" /></svg>) as SVGElement
    expect(el.namespaceURI).toBe('http://www.w3.org/2000/svg')
    expect(el.firstElementChild!.namespaceURI).toBe('http://www.w3.org/2000/svg')
  })

  it('calls function components with props', () => {
    const Comp = ({ name }: { name: string }) => <b>{name}</b>
    expect((<Comp name="x" />).textContent).toBe('x')
  })

  it('Fragment returns a document fragment with children', () => {
    const frag = (<><i /><i /></>) as DocumentFragment
    expect(frag).toBeInstanceOf(DocumentFragment)
    expect(frag.childNodes.length).toBe(2)
    expect(Fragment({ children: 'a' }).textContent).toBe('a')
  })
})

describe('dev runtime', () => {
  it('tags elements with their JSX source location', () => {
    const el = (<div />) as HTMLElement
    expect(el.dataset.source).toMatch(/^src\/lib\/jsx\/jsx-runtime\.test\.tsx:\d+$/)
  })

  it('tags component root elements with the component name', () => {
    const Inner = () => <b />
    const Outer = () => <Inner />
    const el = (<Outer />) as HTMLElement
    expect(el.dataset.component).toBe('Outer Inner')
  })
})
