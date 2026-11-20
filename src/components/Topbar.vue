<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'
import { metaOf, type Page } from '../data'

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
  padding: 0 24px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--rule-soft);
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
.crumb { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--text-3); }
.crumb i { font-style: normal; color: #c7ccd9; }
.crumb b { font-weight: 600; color: var(--text); }
.crumb .c0 { color: var(--text-3); }

.right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
.date { font-size: 11.5px; color: var(--text-3); font-variant-numeric: tabular-nums; }
.user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 4px;
  border-radius: 999px;
  background: var(--surface-2);
  border: 1px solid var(--rule-soft);
}
.av {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(140deg, #8f7bf3, #5b5bd6);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  flex: none;
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
}
</style>
