import { SvgIcon } from '@lib/SvgIcon.tsx'
import { LinkList, type LinkItem } from '@components/LinkList'
import styles from './Panel.module.css'

export interface PanelProps {
  icon: string
  title: string
  text: string
  links: LinkItem[]
  /** Draws a separator on the trailing edge (right on wide screens, bottom on narrow ones). */
  divided?: boolean
  invertIcons?: boolean
}

export function Panel({ icon, title, text, links, divided, invertIcons }: PanelProps) {
  return (
    <div class={divided ? `${styles.panel} ${styles.divided}` : styles.panel}>
      <SvgIcon id={icon} class={styles.icon} />
      <h2>{title}</h2>
      <p>{text}</p>
      <LinkList links={links} invertIcons={invertIcons} />
    </div>
  )
}
