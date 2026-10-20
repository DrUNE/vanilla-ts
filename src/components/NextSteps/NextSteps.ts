import { h } from '../../lib/dom.ts'
import typescriptLogo from '../../assets/typescript.svg'
import viteLogo from '../../assets/vite.svg'
import { createPanel } from '../Panel/Panel.ts'
import styles from './NextSteps.module.css'

export function createNextSteps(): HTMLElement {
  return h(
    'section',
    { class: styles.nextSteps },
    createPanel({
      icon: 'documentation-icon',
      title: 'Documentation',
      text: 'Your questions, answered',
      divided: true,
      links: [
        { href: 'https://vite.dev/', label: 'Explore Vite', icon: { kind: 'logo', src: viteLogo } },
        { href: 'https://www.typescriptlang.org', label: 'Learn more', icon: { kind: 'image', src: typescriptLogo } },
      ],
    }),
    createPanel({
      icon: 'social-icon',
      title: 'Connect with us',
      text: 'Join the Vite community',
      invertIcons: true,
      links: [
        { href: 'https://github.com/vitejs/vite', label: 'GitHub', icon: { kind: 'sprite', id: 'github-icon' } },
        { href: 'https://chat.vite.dev/', label: 'Discord', icon: { kind: 'sprite', id: 'discord-icon' } },
        { href: 'https://x.com/vite_js', label: 'X.com', icon: { kind: 'sprite', id: 'x-icon' } },
        { href: 'https://bsky.app/profile/vite.dev', label: 'Bluesky', icon: { kind: 'sprite', id: 'bluesky-icon' } },
      ],
    }),
  )
}
