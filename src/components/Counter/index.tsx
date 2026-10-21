import styles from './Counter.module.css'

export function Counter() {
  let count = 0
  const button = (
    <button
      type="button"
      class={styles.counter}
      onClick={() => {
        count += 1
        button.textContent = `Count is ${count}`
      }}
    >
      Count is {count}
    </button>
  ) as HTMLButtonElement
  return button
}
