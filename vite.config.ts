import { defineConfig } from 'vitest/config'

const fromSrc = (path: string) => decodeURIComponent(new URL(`./src/${path}`, import.meta.url).pathname)

export default defineConfig({
  resolve: {
    alias: {
      'jsx-dom': fromSrc('lib/jsx'),
      '@components': fromSrc('components'),
      '@lib': fromSrc('lib'),
      '@assets': fromSrc('assets'),
    },
  },
  css: { devSourcemap: true },
  build: { sourcemap: true },
  test: { environment: 'jsdom' },
})
