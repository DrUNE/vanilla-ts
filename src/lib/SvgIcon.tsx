/** An <svg><use href="/icons.svg#id"/></svg> reference to the sprite in public/. */
export function SvgIcon({ id, class: className }: { id: string; class: string }) {
  return (
    <svg class={className} role="presentation" aria-hidden="true">
      <use href={`/icons.svg#${id}`} />
    </svg>
  )
}
