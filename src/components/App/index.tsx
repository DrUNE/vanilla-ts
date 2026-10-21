import { Intro } from '@components/Intro'
import { NextSteps } from '@components/NextSteps'
import { Spacer } from '@components/Spacer'
import { Ticks } from '@components/Ticks'
import styles from './App.module.css'

/** Fills the mount point with the page; the root element keeps its id so index.html stays the source of truth. */
export function mountApp(root: HTMLElement): void {
  root.classList.add(styles.app)
  root.replaceChildren(<Intro />, <Ticks />, <NextSteps />, <Ticks />, <Spacer />)
}
