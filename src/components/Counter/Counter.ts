import { h } from '../../lib/dom.ts'
import styles from './Counter.module.css'

export function createCounter(): HTMLButtonElement {
  const button = h('button', { type: 'button', class: styles.counter })
  let count = 0
  const render = () => {
    button.textContent = `Count is ${count}`
  }
  button.addEventListener('click', () => {
    count += 1
    render()
  })
  render()
  return button
}
