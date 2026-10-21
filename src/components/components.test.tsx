import { describe, expect, it } from 'vitest'
import { mountApp } from '@components/App'
import { Counter } from '@components/Counter'
import { LinkList, type LinkItem } from '@components/LinkList'
import { Panel } from '@components/Panel'
import { SvgIcon } from '@lib/SvgIcon.tsx'

const links: LinkItem[] = [
  { href: 'https://a.test', label: 'A', icon: { kind: 'logo', src: 'a.svg' } },
  { href: 'https://b.test', label: 'B', icon: { kind: 'image', src: 'b.svg' } },
  { href: 'https://c.test', label: 'C', icon: { kind: 'sprite', id: 'github-icon' } },
]

describe('Counter', () => {
  it('increments on each click', () => {
    const button = Counter() as HTMLButtonElement
    expect(button.textContent).toBe('Count is 0')
    button.click()
    button.click()
    expect(button.textContent).toBe('Count is 2')
  })
})

describe('SvgIcon', () => {
  it('references the sprite by id', () => {
    const svg = SvgIcon({ id: 'x', class: 'k' }) as SVGElement
    expect(svg.querySelector('use')!.getAttribute('href')).toBe('/icons.svg#x')
  })
})

describe('LinkList', () => {
  it('renders one external link per item with the matching icon type', () => {
    const ul = LinkList({ links }) as HTMLElement
    const anchors = ul.querySelectorAll('a')
    expect(anchors).toHaveLength(3)
    expect(anchors[0].getAttribute('href')).toBe('https://a.test')
    expect(anchors[0].getAttribute('target')).toBe('_blank')
    expect(anchors[0].querySelector('img')!.getAttribute('src')).toBe('a.svg')
    expect(anchors[2].querySelector('use')!.getAttribute('href')).toBe('/icons.svg#github-icon')
    expect(anchors[1].textContent).toBe('B')
  })

  it('adds an extra class when invertIcons is set', () => {
    const plain = LinkList({ links }) as HTMLElement
    const inverted = LinkList({ links, invertIcons: true }) as HTMLElement
    expect(inverted.classList.length).toBe(plain.classList.length + 1)
  })
})

describe('Panel', () => {
  it('renders title, text and links', () => {
    const el = Panel({ icon: 'i', title: 'T', text: 'body', links }) as HTMLElement
    expect(el.querySelector('h2')!.textContent).toBe('T')
    expect(el.querySelector('p')!.textContent).toBe('body')
    expect(el.querySelectorAll('li')).toHaveLength(3)
  })

  it('adds a divider class only when divided', () => {
    const base = Panel({ icon: 'i', title: 'T', text: 't', links }) as HTMLElement
    const divided = Panel({ icon: 'i', title: 'T', text: 't', links, divided: true }) as HTMLElement
    expect(divided.classList.length).toBe(base.classList.length + 1)
  })
})

describe('mountApp', () => {
  it('fills the root with the page and a working counter', () => {
    const root = document.createElement('div')
    mountApp(root)
    expect(root.classList.length).toBe(1)
    expect(root.querySelector('h1')!.textContent).toBe('Get started')
    const button = root.querySelector('button')!
    button.click()
    expect(button.textContent).toBe('Count is 1')
  })
})
