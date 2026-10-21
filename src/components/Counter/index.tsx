import styles from './Counter.module.css'

export function Counter() {
  let count = 0

  const render = () => {
    button.textContent = `Count is ${count}`
  }

  const increment = () => {
    count += 1
    render()
  }

  const button = (
    <button type="button" class={styles.counter} onClick={increment} />
  ) as HTMLButtonElement

  render()
  return button
}
