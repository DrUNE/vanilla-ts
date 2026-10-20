import { h, svgIcon } from '../../lib/dom.ts'
import styles from './LinkList.module.css'

export type LinkIcon =
  | { kind: 'logo'; src: string }
  | { kind: 'image'; src: string }
  | { kind: 'sprite'; id: string }

export interface LinkItem {
  href: string
  label: string
  icon: LinkIcon
}

function createIcon(icon: LinkIcon): Node {
  switch (icon.kind) {
    case 'logo':
      return h('img', { class: styles.logo, src: icon.src, alt: '' })
    case 'image':
      return h('img', { class: styles.buttonIcon, src: icon.src, alt: '' })
    case 'sprite':
      return svgIcon(icon.id, styles.buttonIcon)
  }
}

export function createLinkList(links: LinkItem[], options: { invertIcons?: boolean } = {}): HTMLElement {
  const className = options.invertIcons ? `${styles.links} ${styles.invertIcons}` : styles.links
  return h(
    'ul',
    { class: className },
    ...links.map(({ href, label, icon }) =>
      h(
        'li',
        { class: styles.item },
        h('a', { class: styles.link, href, target: '_blank' }, createIcon(icon), label),
      ),
    ),
  )
}
