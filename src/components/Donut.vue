<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  data: { label: string; value: number; color: string }[]
  size?: number
}>(), { size: 200 })

const total = computed(() => props.data.reduce((s, d) => s + d.value, 0))
const gradient = computed(() => {
  let acc = 0
  const stops = props.data.map((d) => {
    const start = (acc / Math.max(total.value, 1)) * 100
    acc += d.value
    const end = (acc / Math.max(total.value, 1)) * 100
    return `${d.color} ${start}% ${end}%`
  })
  return `conic-gradient(${stops.join(', ')})`
})
</script>

<template>
  <div class="donut-wrap">
    <div class="donut" :style="{ width: size + 'px', height: size + 'px', background: gradient }">
      <div class="donut-hole">
        <b>{{ total }}</b>
        <small>册藏总量</small>
      </div>
    </div>
    <ul class="legend">
      <li v-for="d in data" :key="d.label">
        <i :style="{ background: d.color }"></i>
        <span>{{ d.label }}</span>
        <em>{{ d.value }}</em>
        <small>{{ Math.round((d.value / Math.max(total, 1)) * 100) }}%</small>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.donut-wrap { display: flex; align-items: center; justify-content: center; gap: 34px; flex-wrap: wrap; padding: 8px 4px; }
.donut { border-radius: 50%; position: relative; flex: none; }
.donut-hole {
  position: absolute;
  inset: 22%;
  border-radius: 50%;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.donut-hole b { font-size: 22px; color: var(--text-1); }
.donut-hole small { font-size: 12px; color: var(--text-3); }
.legend { display: flex; flex-direction: column; gap: 9px; min-width: 150px; }
.legend li { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.legend i { width: 11px; height: 11px; border-radius: 3px; flex: none; }
.legend span { color: var(--text-2); }
.legend em { margin-left: auto; font-style: normal; color: var(--text-1); font-variant-numeric: tabular-nums; }
.legend small { width: 38px; text-align: right; color: var(--text-3); font-size: 12px; }
</style>
