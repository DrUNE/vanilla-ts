import { h } from '../../lib/dom.ts'
import heroImg from '../../assets/hero.png'
import typescriptLogo from '../../assets/typescript.svg'
import viteLogo from '../../assets/vite.svg'
import styles from './Hero.module.css'

export function createHero(): HTMLElement {
  return h(
    'div',
    { class: styles.hero },
    h('img', { src: heroImg, class: styles.base, width: '170', height: '179', alt: '' }),
    h('img', { src: typescriptLogo, class: styles.framework, alt: 'TypeScript logo' }),
    h('img', { src: viteLogo, class: styles.vite, alt: 'Vite logo' }),
  )
}
