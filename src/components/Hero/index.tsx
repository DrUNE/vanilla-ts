import heroImg from '@assets/hero.png'
import typescriptLogo from '@assets/typescript.svg'
import viteLogo from '@assets/vite.svg'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <div class={styles.hero}>
      <img src={heroImg} class={styles.base} width="170" height="179" alt="" />
      <img src={typescriptLogo} class={styles.framework} alt="TypeScript logo" />
      <img src={viteLogo} class={styles.vite} alt="Vite logo" />
    </div>
  )
}
