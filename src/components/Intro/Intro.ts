import { h } from '../../lib/dom.ts'
import { createCounter } from '../Counter/Counter.ts'
import { createHero } from '../Hero/Hero.ts'
import styles from './Intro.module.css'

export function createIntro(): HTMLElement {
  return h(
    'section',
    { class: styles.intro },
    createHero(),
    h(
      'div',
      {},
      h('h1', {}, 'Get started'),
      h('p', {}, 'Edit ', h('code', {}, 'src/main.ts'), ' and save to test ', h('code', {}, 'HMR')),
    ),
    createCounter(),
  )
}
