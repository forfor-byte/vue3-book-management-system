<script setup lang="ts">
import { metaOf, navGroups, overview, type Page } from '../data'
import Icon from './Icon.vue'

defineProps<{ active: Page; open: boolean }>()
const emit = defineEmits<{ (e: 'select', page: Page): void }>()

/** 每个导航分组一个主色（取侧栏专用的亮色调，深浅底都压得住） */
const TONES: Record<string, string> = {
  概览: 'brand',
  馆藏: 'blue',
  读者: 'teal',
  流通: 'amber',
  分析: 'violet',
  系统: 'slate',
}
const toneOf = (group: string) => {
  const t = TONES[group] ?? 'brand'
  return { '--tone': `var(--sb-${t})` }
}
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
      <div v-for="g in navGroups" :key="g.title" class="grp" :style="toneOf(g.title)">
        <div class="grp-h"><b class="gdot" /><span>{{ g.title }}</span><i /></div>
        <button
          v-for="key in g.keys"
          :key="key"
          class="item"
          :class="{ on: active === key }"
          :title="key"
          @click="emit('select', key)"
        >
          <span class="icwrap"><Icon :name="metaOf(key).icon" :size="15" class="ic" /></span>
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
  background: var(--nav-grad);
  border-right: 1px solid var(--nav-line);
  color: var(--sb-dim);
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 0 auto 0 0;
  height: 100dvh;
  min-height: 100vh;
  overflow: hidden;
  isolation: isolate;
  z-index: 50;
  transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1);
}
.side::before {
  content: '';
  position: absolute;
  width: 220px;
  height: 220px;
  left: -110px;
  top: -80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(117, 185, 239, 0.18), rgba(117, 185, 239, 0) 68%);
  pointer-events: none;
}
.side::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.26;
  pointer-events: none;
  background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, #000, transparent 72%);
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
  background: linear-gradient(140deg, #8bc7ef, #5d8fbe);
  color: #fff;
  box-shadow: 0 10px 22px -12px rgba(83, 151, 203, 0.92), inset 0 1px rgba(255,255,255,.32);
}
.mark svg { width: 18px; height: 18px; }
.brand-txt { min-width: 0; }
.brand-txt b {
  display: block;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--sb-ink);
  line-height: 1.2;
}
.brand-txt small {
  display: block;
  font-size: 10.5px;
  letter-spacing: 0.4px;
  color: var(--sb-faint);
  margin-top: 2px;
}

.nav { flex: 1; overflow-y: auto; padding: 4px 0 10px; }
.grp { padding: 8px 0 3px; }
.grp-h { display: flex; align-items: center; gap: 7px; padding: 0 18px 4px; }
.gdot { width: 5px; height: 5px; border-radius: 2px; background: var(--tone); flex: none; }
.grp-h span { font-size: 10.5px; letter-spacing: 1px; color: var(--sb-faint); font-weight: 600; }
.grp-h i { flex: 1; height: 1px; background: var(--sb-line); }

.item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: calc(100% - 16px);
  margin: 1px 8px;
  min-height: 36px;
  padding: 5px 8px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--sb-dim);
  font-size: 12.5px;
  text-align: left;
  transition: background 0.16s, color 0.16s;
}
.item:hover { background: var(--nav-hover); color: var(--sb-ink); transform: translateX(2px); }
.item:focus-visible {
  outline: 1px solid rgba(156, 202, 235, 0.38);
  outline-offset: -1px;
}
.item.on {
  background: linear-gradient(90deg, rgba(142, 197, 239, 0.20), rgba(142, 197, 239, 0.08));
  color: var(--sb-ink);
  font-weight: 600;
  box-shadow: inset 2px 0 var(--tone), inset 0 0 0 1px rgba(190, 219, 241, 0.06);
}
.item.on .icwrap { background: var(--tone); color: #193149; box-shadow: 0 6px 12px -8px var(--tone); }
.icwrap {
  flex: none;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: var(--sb-chip);
  color: var(--tone);
  transition: background 0.16s, color 0.16s, transform 0.16s;
}
.ic { opacity: 1; }
.lbl { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.foot { padding: 10px 14px 14px; }
.foot-box {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 8px;
  padding: 10px 12px 11px;
  border-radius: 10px;
  background: var(--sb-chip);
  border: 1px solid var(--sb-line);
  font-size: 10.5px;
  color: var(--sb-faint);
}
.f-l { letter-spacing: 0.5px; }
.f-r { font-variant-numeric: tabular-nums; color: var(--sb-ink); font-weight: 600; }
.f-p {
  grid-column: 1 / -1;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  overflow: hidden;
  order: 3;
}
.f-p i { display: block; height: 4px; border-radius: 999px; background: linear-gradient(90deg, #7b74ea, var(--sb-brand)); }

@media (min-width: 821px) and (max-width: 1080px) {
  .brand { justify-content: center; padding: 12px 0; }
  .brand-txt, .lbl, .grp-h span { display: none; }
  .grp-h { justify-content: center; padding: 0; }
  .grp-h i { display: none; }
  .item { justify-content: center; padding: 9px 0; margin: 2px 8px; }
  .foot { display: none; }
}

@media (max-width: 820px) {
  .side {
    transform: translateX(-100%);
    box-shadow: 0 20px 60px -20px rgba(16, 24, 40, 0.35);
  }
  .side.open { transform: translateX(0); }
  .item { min-height: 44px; font-size: 13.5px; }
}
</style>
