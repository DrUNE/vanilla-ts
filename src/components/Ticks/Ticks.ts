import { h } from '../../lib/dom.ts'
import styles from './Ticks.module.css'

export const createTicks = (): HTMLElement => h('div', { class: styles.ticks })
