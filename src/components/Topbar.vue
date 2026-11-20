<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'
import { metaOf, type Page } from '../data'
import { theme, toggleTheme } from '../theme'

const props = defineProps<{ page: Page }>()
const emit = defineEmits<{ (e: 'toggleSidebar'): void }>()

const group = computed(() => metaOf(props.page).group)

const today = computed(() => {
  const d = new Date()
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
})
</script>

<template>
  <header class="top">
    <button class="burger" aria-label="菜单" @click="emit('toggleSidebar')">
      <Icon name="menu" :size="18" />
    </button>

    <div class="crumb">
      <span class="c0">工作台</span>
      <i>/</i>
      <span>{{ group }}</span>
      <i>/</i>
      <b>{{ page }}</b>
    </div>

    <div class="right">
      <span class="date">{{ today }}</span>
      <button class="tbtn" :title="theme === 'light' ? '切换到暗色' : '切换到亮色'" @click="toggleTheme">
        <Icon :name="theme === 'light' ? 'moon' : 'sun'" :size="14" />
        <span class="tlabel">{{ theme === 'light' ? '暗色' : '亮色' }}</span>
      </button>
      <div class="user">
        <span class="av">管</span>
        <div class="ut">
          <b>管理员</b>
          <span>馆务账号</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top {
  position: sticky;
  top: 0;
  z-index: 30;
  height: var(--topbar-h);
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 26px;
  background: var(--topbar-bg);
  backdrop-filter: blur(14px) saturate(1.15);
  border-bottom: 1px solid var(--rule-soft);
  box-shadow: 0 4px 18px -18px rgba(20, 35, 55, 0.55);
}
.burger {
  display: none;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid var(--rule);
  border-radius: 8px;
  background: var(--surface);
  color: var(--text);
}
.crumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-3); }
.crumb i { font-style: normal; color: var(--paper-2); }
.crumb b { font-weight: 600; color: var(--text); }
.crumb .c0 { color: var(--text-3); }

.right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
.date { font-size: 11.5px; color: var(--text-3); font-variant-numeric: tabular-nums; }
.tbtn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 10px;
  border: 1px solid var(--rule);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-2);
  font-size: 11.5px;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.tbtn:hover { border-color: var(--brand); color: var(--brand); background: var(--brand-soft); }
.user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 4px;
  border-radius: 999px;
  background: rgba(247, 249, 252, 0.82);
  border: 1px solid var(--rule-soft);
  transition: border-color .16s ease, background .16s ease;
}
.user:hover { border-color: var(--rule); background: var(--surface); }
.av {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(140deg, #758bd9, #5267c7);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  flex: none;
  box-shadow: 0 5px 12px -8px rgba(82, 103, 199, .85), inset 0 1px rgba(255,255,255,.25);
}
.ut { line-height: 1.2; }
.ut b { display: block; font-size: 11.5px; font-weight: 600; color: var(--text); }
.ut span { display: block; font-size: 10px; color: var(--text-3); margin-top: 1px; }

@media (max-width: 820px) {
  .top { padding: 0 14px; gap: 10px; }
  .burger { display: inline-grid; }
  .crumb .c0, .crumb i:first-of-type { display: none; }
  .date { display: none; }
}
@media (max-width: 560px) {
  .crumb span:not(.c0), .crumb i { display: none; }
  .ut { display: none; }
  .user { background: transparent; border: 0; padding: 0; }
  .tbtn { width: 28px; padding: 0; justify-content: center; }
  .tlabel { display: none; }
}
</style>
