<script setup lang="ts">
import Icon from './Icon.vue'
import type { Page } from '../data'

defineProps<{ page: Page }>()
const emit = defineEmits<{ (e: 'toggleSidebar'): void; (e: 'search', kw: string): void }>()
</script>

<template>
  <header class="topbar">
    <button class="topbar-hamburger" @click="emit('toggleSidebar')" aria-label="菜单">
      <Icon name="menu" :size="20" />
    </button>

    <div class="crumb">
      <span>工作台</span>
      <i>/</i>
      <b>{{ page }}</b>
    </div>

    <div class="topbar-right">
      <button class="tb-icon" aria-label="搜索">
        <Icon name="search" :size="18" />
      </button>
      <button class="tb-icon bell" aria-label="通知">
        <Icon name="bell" :size="18" />
        <span class="badge">3</span>
      </button>
      <div class="divider" />
      <div class="profile">
        <span class="p-avatar">管</span>
        <div class="p-meta">
          <b>管理员</b>
          <small>超级管理员</small>
        </div>
        <Icon name="chevron" :size="14" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  height: var(--topbar-h);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
}
.topbar-hamburger {
  display: none;
  width: 36px; height: 36px;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--surface);
  color: var(--text-2);
}
.crumb { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--text-3); }
.crumb b { font-weight: 600; color: var(--text-1); }
.crumb i { font-style: normal; }

.topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }
.tb-icon {
  position: relative;
  width: 36px; height: 36px;
  display: grid; place-items: center;
  border: 0; background: transparent;
  color: var(--text-3);
  border-radius: 9px;
  transition: all 0.18s;
}
.tb-icon:hover { background: var(--surface-3); color: var(--text-1); }
.badge {
  position: absolute;
  top: 3px; right: 3px;
  min-width: 16px; height: 16px;
  padding: 0 4px;
  display: grid; place-items: center;
  border-radius: 8px;
  background: var(--danger);
  color: #fff;
  font-size: 10px;
  font-weight: 600;
}
.divider { width: 1px; height: 24px; background: var(--border); margin: 0 4px; }
.profile {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 10px;
  transition: background 0.18s;
}
.profile:hover { background: var(--surface-3); }
.p-avatar {
  width: 34px; height: 34px;
  display: grid; place-items: center;
  border-radius: 10px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
}
.p-meta { display: flex; flex-direction: column; line-height: 1.25; }
.p-meta b { font-size: 13px; font-weight: 600; }
.p-meta small { font-size: 11px; color: var(--text-3); }
.profile > svg { color: var(--text-3); }

@media (max-width: 820px) {
  .topbar-hamburger { display: inline-grid; }
  .topbar { padding: 0 16px; }
  .p-meta { display: none; }
}
</style>
