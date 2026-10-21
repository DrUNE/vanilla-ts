# vanilla-ts

*English version: [README.md](README.md).*

Демонстрационный проект: современный компонентный UI можно собрать на **чистом TypeScript и Vite, без UI-фреймворка**. Здесь используется JSX, но не React: собственный JSX-рантайм на ~50 строк превращает каждое JSX-выражение сразу в настоящий DOM-узел. Нет виртуального DOM, нет сравнения деревьев и повторных рендеров. Страница повторяет стартовый шаблон Vite, собранный из небольших компонентов, и служит примером того, как далеко можно зайти без фреймворка.

## Ключевые идеи

- **JSX, который возвращает DOM.** `<button>Hi</button>` вычисляется в `HTMLButtonElement`. Компоненты — обычные функции `(props) => Node`.
- **Императивное состояние.** Компонент хранит локальные переменные и сам обновляет DOM в обработчиках событий (см. [Counter](src/components/Counter/index.tsx)).
- **CSS-модули рядом с компонентом.** Каждый компонент лежит в `src/components/<Name>/`: `index.tsx` и `<Name>.module.css`.
- **Алиасы путей.** `@components/*`, `@lib/*` и `@assets/*` вместо относительных `../../`.
- **Отладка без фреймворка.** В dev-режиме у элементов есть `data-source` (файл:строка), а у корней компонентов — `data-component`, так что от любого DOM-узла можно перейти к исходнику. См. [docs/debugging.ru.md](docs/debugging.ru.md).
- **Тесты.** Vitest с jsdom, на том же рантайме.

```tsx
export function Counter() {
  let count = 0
  const button = (
    <button type="button" onClick={() => { count += 1; button.textContent = `Count is ${count}` }}>
      Count is {count}
    </button>
  ) as HTMLButtonElement
  return button
}
```

## Быстрый старт

```bash
npm install
npm run dev        # dev-сервер с HMR
npm run build      # проверка типов (tsc) и сборка в dist/
npm run preview    # запуск продакшен-сборки
npm test           # один прогон тестов (npm run test:watch — режим наблюдения)
```

## Структура проекта

```
index.html                 содержит точку монтирования #app
src/main.ts                вход: глобальный CSS + mountApp()
src/components/<Name>/     index.tsx + <Name>.module.css
src/lib/jsx/               собственный JSX-рантайм (jsx-runtime.ts, jsx-dev-runtime.ts)
src/lib/SvgIcon.tsx        помощник <svg><use/></svg> для public/icons.svg
docs/                      документация для разработчиков
```

Источник JSX — выдуманный модуль `jsx-dom`, привязанный к `src/lib/jsx` и в `tsconfig.json` (`paths`), и в `vite.config.ts` (`resolve.alias`). Алиасы `@…` объявлены в тех же двух местах; держите их согласованными.

## Документация

- [Отладка: от DOM-элемента к исходному коду](docs/debugging.ru.md) ([EN](docs/debugging.md))
- [CLAUDE.md](CLAUDE.md): инструкции для ИИ-ассистентов, работающих в репозитории (только на английском)

## Ограничения

Это демонстрация, а не фреймворк. Реактивности нет: ничего не перерисовывается при изменении переменной, любое обновление — ручная правка DOM. Для небольших виджетов и статичных страниц этого достаточно, и именно этот компромисс проект и показывает.
