<script setup lang="ts">
defineProps<{
  title: string
  items: { name: string; meta: string; value: string | number; note?: string }[]
  sub?: string
}>()
</script>

<template>
  <article class="card rank">
    <div class="card-head">
      <h3 class="card-title">{{ title }}</h3>
      <span v-if="sub" class="rank-sub">{{ sub }}</span>
    </div>
    <ul class="rank-list">
      <li v-for="(it, i) in items" :key="i">
        <span class="rank-no" :class="{ top: i < 3 }">{{ String(i + 1).padStart(2, '0') }}</span>
        <div class="rank-info">
          <b>{{ it.name }}</b>
          <small>{{ it.meta }}</small>
        </div>
        <span class="rank-value">
          {{ it.value }}
          <small v-if="it.note">{{ it.note }}</small>
        </span>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.rank-sub { font-size: 12px; color: var(--text-3); }
.rank-list { padding: 6px 10px; }
.rank-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px;
  border-radius: 9px;
  transition: background 0.15s;
}
.rank-list li:hover { background: var(--surface-2); }
.rank-no {
  flex: none;
  width: 30px; height: 30px;
  display: grid; place-items: center;
  border-radius: 8px;
  background: var(--surface-3);
  color: var(--text-3);
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.rank-no.top { background: var(--accent-soft); color: var(--accent); }
.rank-info { flex: 1; min-width: 0; }
.rank-info b { display: block; font-size: 13px; font-weight: 600; color: var(--text-1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rank-info small { font-size: 12px; color: var(--text-3); }
.rank-value { font-size: 14px; font-weight: 600; color: var(--text-1); font-variant-numeric: tabular-nums; text-align: right; }
.rank-value small { font-size: 11px; font-weight: 400; color: var(--text-3); margin-left: 4px; }
</style>
