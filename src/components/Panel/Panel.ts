import { h, svgIcon } from '../../lib/dom.ts'
import { createLinkList, type LinkItem } from '../LinkList/LinkList.ts'
import styles from './Panel.module.css'

export interface PanelOptions {
  icon: string
  title: string
  text: string
  links: LinkItem[]
  /** Draws a separator on the trailing edge (right on wide screens, bottom on narrow ones). */
  divided?: boolean
  invertIcons?: boolean
}

export function createPanel({ icon, title, text, links, divided, invertIcons }: PanelOptions): HTMLElement {
  return h(
    'div',
    { class: divided ? `${styles.panel} ${styles.divided}` : styles.panel },
    svgIcon(icon, styles.icon),
    h('h2', {}, title),
    h('p', {}, text),
    createLinkList(links, { invertIcons }),
  )
}
