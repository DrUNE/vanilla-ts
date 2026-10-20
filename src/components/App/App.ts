import { createIntro } from '../Intro/Intro.ts'
import { createNextSteps } from '../NextSteps/NextSteps.ts'
import { createSpacer } from '../Spacer/Spacer.ts'
import { createTicks } from '../Ticks/Ticks.ts'
import styles from './App.module.css'

/** Fills the mount point with the page; the root element keeps its id so index.html stays the source of truth. */
export function mountApp(root: HTMLElement): void {
  root.classList.add(styles.app)
  root.replaceChildren(createIntro(), createTicks(), createNextSteps(), createTicks(), createSpacer())
}
