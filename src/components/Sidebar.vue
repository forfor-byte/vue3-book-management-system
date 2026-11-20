<script setup lang="ts">
import { metaOf, navGroups, overview, type Page } from '../data'
import Icon from './Icon.vue'

defineProps<{ active: Page; open: boolean }>()
const emit = defineEmits<{ (e: 'select', page: Page): void }>()
</script>

<template>
  <aside class="side" :class="{ open }">
    <div class="brand">
      <span class="mark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
          <path d="M9 7h7M9 11h5" />
        </svg>
      </span>
      <div class="brand-txt">
        <b>墨卷</b>
        <small>馆藏管理台</small>
      </div>
    </div>

    <nav class="nav">
      <div v-for="g in navGroups" :key="g.title" class="grp">
        <div class="grp-h"><span>{{ g.title }}</span><i /></div>
        <button
          v-for="key in g.keys"
          :key="key"
          class="item"
          :class="{ on: active === key }"
          :title="key"
          @click="emit('select', key)"
        >
          <Icon :name="metaOf(key).icon" :size="16" class="ic" />
          <span class="lbl">{{ key }}</span>
        </button>
      </div>
    </nav>

    <div class="foot">
      <div class="foot-box">
        <span class="f-l">在架率</span>
        <span class="f-p"><i :style="{ width: ((overview.available / overview.total) * 100).toFixed(1) + '%' }" /></span>
        <span class="f-r">{{ ((overview.available / overview.total) * 100).toFixed(0) }}%</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.side {
  width: var(--sidebar-w);
  background: var(--nav);
  border-right: 1px solid var(--rule-soft);
  color: var(--text-2);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 50;
  transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1);
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  min-height: var(--topbar-h);
}
.mark {
  flex: none;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: linear-gradient(140deg, #6f6ff0, #4f4fd0);
  color: #fff;
  box-shadow: 0 8px 16px -10px rgba(91, 91, 214, 0.9);
}
.mark svg { width: 18px; height: 18px; }
.brand-txt { min-width: 0; }
.brand-txt b {
  display: block;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--ink);
  line-height: 1.2;
}
.brand-txt small {
  display: block;
  font-size: 10.5px;
  letter-spacing: 0.4px;
  color: var(--text-3);
  margin-top: 2px;
}

.nav { flex: 1; overflow-y: auto; padding: 4px 0 10px; }
.grp { padding: 8px 0 3px; }
.grp-h { display: flex; align-items: center; gap: 8px; padding: 0 18px 4px; }
.grp-h span { font-size: 10.5px; letter-spacing: 1px; color: var(--text-3); font-weight: 600; }
.grp-h i { flex: 1; height: 1px; background: var(--rule-soft); }

.item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: calc(100% - 20px);
  margin: 1px 10px;
  min-height: 34px;
  padding: 8px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text-2);
  font-size: 12.5px;
  text-align: left;
  transition: background 0.16s, color 0.16s;
}
.item:hover { background: var(--surface-2); color: var(--text); }
.item.on { background: var(--brand-soft); color: var(--brand); font-weight: 600; }
.ic { flex: none; opacity: 0.9; }
.item.on .ic { opacity: 1; }
.lbl { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.foot { padding: 10px 14px 14px; }
.foot-box {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 8px;
  padding: 10px 12px 11px;
  border-radius: 10px;
  background: var(--surface-2);
  border: 1px solid var(--rule-soft);
  font-size: 10.5px;
  color: var(--text-3);
}
.f-l { letter-spacing: 0.5px; }
.f-r { font-variant-numeric: tabular-nums; color: var(--brand); font-weight: 600; }
.f-p {
  grid-column: 1 / -1;
  height: 4px;
  border-radius: 999px;
  background: #e4e6f7;
  overflow: hidden;
  order: 3;
}
.f-p i { display: block; height: 4px; border-radius: 999px; background: linear-gradient(90deg, #7d7de8, var(--brand)); }

@media (min-width: 821px) and (max-width: 1080px) {
  .brand { justify-content: center; padding: 12px 0; }
  .brand-txt, .lbl, .grp-h span { display: none; }
  .grp-h { justify-content: center; padding: 0; }
  .grp-h i { display: none; }
  .item { justify-content: center; padding: 9px 0; margin: 2px 9px; }
  .foot { display: none; }
}

@media (max-width: 820px) {
  .side {
    position: fixed;
    inset: 0 auto 0 0;
    transform: translateX(-100%);
    box-shadow: 0 20px 60px -20px rgba(16, 24, 40, 0.35);
  }
  .side.open { transform: translateX(0); }
  .item { min-height: 44px; font-size: 13.5px; }
}
</style>
