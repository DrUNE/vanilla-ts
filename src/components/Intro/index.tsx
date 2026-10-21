import { Counter } from '@components/Counter'
import { Hero } from '@components/Hero'
import styles from './Intro.module.css'

export function Intro() {
  return (
    <section class={styles.intro}>
      <Hero />
      <div>
        <h1>Get started</h1>
        <p>
          Edit <code>src/main.ts</code> and save to test <code>HMR</code>
        </p>
      </div>
      <Counter />
    </section>
  )
}
