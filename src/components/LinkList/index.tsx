import { SvgIcon } from '@lib/SvgIcon.tsx'
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

function Icon({ icon }: { icon: LinkIcon }) {
  switch (icon.kind) {
    case 'logo':
      return <img class={styles.logo} src={icon.src} alt="" />
    case 'image':
      return <img class={styles.buttonIcon} src={icon.src} alt="" />
    case 'sprite':
      return <SvgIcon id={icon.id} class={styles.buttonIcon} />
  }
}

export function LinkList({ links, invertIcons }: { links: LinkItem[]; invertIcons?: boolean }) {
  return (
    <ul class={invertIcons ? `${styles.links} ${styles.invertIcons}` : styles.links}>
      {links.map(({ href, label, icon }) => (
        <li class={styles.item}>
          <a class={styles.link} href={href} target="_blank">
            <Icon icon={icon} />
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}
