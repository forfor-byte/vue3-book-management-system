<script setup lang="ts">
import { nav, type Page } from '../data'
import Icon from './Icon.vue'

defineProps<{
  active: Page
  open: boolean
}>()
const emit = defineEmits<{ (e: 'select', page: Page): void }>()
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <div class="brand">
      <span class="brand-mark"><Icon name="book" :size="20" /></span>
      <span class="brand-name">墨卷 · 图书管理系统</span>
    </div>

    <nav class="nav">
      <button
        v-for="item in nav"
        :key="item.label"
        class="nav-item"
        :class="{ on: active === item.label }"
        @click="emit('select', item.label)"
      >
        <span class="nav-icon"><Icon :name="item.icon" :size="19" /></span>
        <span class="nav-label">{{ item.label }}</span>
        <span class="nav-dot" />
      </button>
    </nav>

    <div class="side-foot">
      <div class="side-user">
        <span class="avatar">管</span>
        <div class="side-foot-text">
          <b>管理员</b>
          <small>图书管理系统</small>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-w);
  background: var(--sidebar-bg);
  color: var(--sidebar-text);
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 40;
  transition: transform 0.28s ease, width 0.28s ease;
  overflow: hidden;
}
.brand {
  height: var(--topbar-h);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.brand-mark {
  flex: none;
  width: 30px; height: 30px;
  display: grid; place-items: center;
  border-radius: 9px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #fff;
}
.brand-name {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  white-space: nowrap;
}
.nav { flex: 1; padding: 12px 10px; overflow-y: auto; }
.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  height: 42px;
  padding: 0 12px;
  margin-bottom: 3px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--sidebar-text);
  font-size: 14px;
  transition: all 0.18s ease;
  white-space: nowrap;
}
.nav-item:hover { background: rgba(255, 255, 255, 0.06); color: #dbe6f0; }
.nav-item.on {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 6px 16px rgba(52, 85, 241, 0.35);
}
.nav-icon { flex: none; display: grid; }
.nav-dot {
  margin-left: auto;
  width: 4px; height: 4px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.18s;
}
.nav-item.on .nav-dot { opacity: 0.55; }
.side-foot {
  padding: 12px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.side-user {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar {
  flex: none;
  width: 34px; height: 34px;
  display: grid; place-items: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #dbe6f0;
  font-size: 14px;
}
.side-foot-text { display: flex; flex-direction: column; line-height: 1.3; }
.side-foot-text b { color: #dbe6f0; font-size: 13px; font-weight: 600; }
.side-foot-text small { font-size: 11px; color: var(--sidebar-text); }

@media (min-width: 821px) and (max-width: 1080px) {
  .brand { justify-content: center; padding: 0; }
  .side-user { justify-content: center; }
}
</style>
