import { h } from '../../lib/dom.ts'
import styles from './Spacer.module.css'

export const createSpacer = (): HTMLElement => h('section', { class: styles.spacer })
