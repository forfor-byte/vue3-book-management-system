<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    data: { label: string; value: number }[]
    unit?: string
    max?: number
  }>(),
  { unit: '', max: 0 },
)

const peak = computed(() => props.max || Math.max(...props.data.map((d) => d.value), 1))
const ticks = computed(() => [0.25, 0.5, 0.75, 1].map((r) => Math.round(peak.value * r)))

/** 按相对峰值分四档：越少的月份越偏冷色，越多的越浓，峰值琥珀 */
function tierOf(v: number) {
  const r = v / peak.value
  if (r >= 0.93) return 4
  if (r >= 0.82) return 3
  if (r >= 0.65) return 2
  return 1
}
</script>

<template>
  <div class="plot">
    <div class="grid">
      <span v-for="(t, i) in ticks" :key="t" class="tick" :style="{ top: (75 - i * 25) + '%' }">{{ t }}</span>
    </div>
    <div class="legend">
      <span>少</span>
      <i class="sw s1" /><i class="sw s2" /><i class="sw s3" /><i class="sw s4" />
      <span>多</span>
    </div>
    <div class="bars">
      <div v-for="(d, i) in data" :key="i" class="col" :title="`${d.label} ${d.value}${unit}`">
        <span class="val">{{ d.value }}</span>
        <div class="btrack">
          <div
            class="bar"
            :class="[`t${tierOf(d.value)}`, { peak: d.value === peak }]"
            :style="{ height: (d.value / peak) * 100 + '%' }"
          />
        </div>
        <span class="lb" :class="`lt${tierOf(d.value)}`">{{ d.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plot { position: relative; width: 100%; height: 232px; padding: 12px 0 0 34px; }
.grid { position: absolute; inset: 12px 0 28px 34px; pointer-events: none; }
.grid::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(to bottom, rgba(16, 24, 40, 0.07) 0 1px, transparent 1px 25%);
}
.tick {
  position: absolute;
  left: -32px;
  font-size: 9.5px;
  color: var(--text-3);
  font-variant-numeric: tabular-nums;
  transform: translateY(-50%);
}
.tick:nth-child(1) { top: 75%; }
.tick:nth-child(2) { top: 50%; }
.tick:nth-child(3) { top: 25%; }
.tick:nth-child(4) { top: 0; }

.legend {
  position: absolute;
  top: 6px;
  right: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9.5px;
  color: var(--text-3);
}
.legend .sw { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
.s1 { background: linear-gradient(180deg, #6fd8ff, #12a5e8); }
.s2 { background: linear-gradient(180deg, #8fb2ff, #3b6df0); }
.s3 { background: linear-gradient(180deg, #a98bff, #6a35ef); }
.s4 { background: linear-gradient(180deg, #ffd166, #f79009); }

.bars { position: relative; height: 100%; display: flex; align-items: stretch; gap: 6px; }
.col { flex: 1; min-width: 0; display: flex; flex-direction: column; height: 100%; }
.val { height: 14px; font-size: 9.5px; color: var(--text-3); text-align: center; opacity: 0; transition: opacity 0.16s; }
.col:hover .val { opacity: 1; }
.btrack { flex: 1; display: flex; align-items: flex-end; justify-content: center; min-height: 0; }
.bar {
  width: 72%;
  max-width: 26px;
  border-radius: 6px 6px 3px 3px;
  transition: filter 0.16s;
}
.bar.t1 { background: linear-gradient(180deg, #6fd8ff, #12a5e8); }
.bar.t2 { background: linear-gradient(180deg, #8fb2ff, #3b6df0); }
.bar.t3 { background: linear-gradient(180deg, #a98bff, #6a35ef); }
.bar.t4,
.bar.peak { background: linear-gradient(180deg, #ffd166, #f79009); }
.col:hover .bar { filter: brightness(0.94) saturate(1.2); }
.lb { height: 22px; line-height: 22px; font-size: 9.5px; color: var(--text-3); text-align: center; white-space: nowrap; }
.lb.lt3 { color: #5b5bd6; font-weight: 600; }
.lb.lt4 { color: #d97706; font-weight: 700; }
</style>
