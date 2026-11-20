/* 主题：亮色 / 暗色，写入 <html data-theme> 并持久化 */
import { ref, watchEffect } from 'vue'

export type Theme = 'light' | 'dark'
const KEY = 'lyb-theme'

const saved = (typeof localStorage !== 'undefined' ? localStorage.getItem(KEY) : null) as Theme | null
export const theme = ref<Theme>(saved === 'dark' ? 'dark' : 'light')

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem(KEY, theme.value)
})

export function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
