<script setup lang="ts">
import { computed } from 'vue'
// 轻量柱状趋势图（CSS 实现）
const props = withDefaults(defineProps<{
  data: { label: string; value: number }[]
  unit?: string
}>(), { unit: '' })

const maxValue = computed(() => Math.max(...props.data.map((x) => x.value), 1))
</script>

<template>
  <div class="barchart">
    <div class="bars">
      <div v-for="(d, i) in data" :key="i" class="bar-col">
        <span class="bar-val">{{ d.value }}{{ unit }}</span>
        <div class="bar-track">
          <div
            class="bar"
            :class="{ hot: d.value === maxValue }"
            :style="{ height: (d.value / maxValue) * 100 + '%' }"
          ></div>
        </div>
        <span class="bar-label">{{ d.label }}</span>
      </div>
    </div>
    <div class="grid-line" v-for="n in 4" :key="n" :style="{ bottom: n * 25 + '%' }" />
  </div>
</template>

<style scoped>
.barchart { position: relative; height: 260px; padding: 26px 6px 0; }
.grid-line { position: absolute; left: 6px; right: 6px; border-top: 1px dashed #eef0f4; }
.bars {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 8px;
}
.bar-col {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
}
.bar-track {
  width: 100%;
  max-width: 44px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  border-radius: 6px;
  background: var(--surface-3);
}
.bar {
  width: 100%;
  border-radius: 6px;
  background: linear-gradient(180deg, var(--accent-2), var(--accent));
  transition: height 0.5s ease;
}
.bar.hot { background: linear-gradient(180deg, #7b9bff, var(--accent)); }
.bar-col:hover .bar { filter: brightness(1.06); }
.bar-val { font-size: 12px; color: var(--text-3); margin-bottom: 5px; font-variant-numeric: tabular-nums; }
.bar-label { margin-top: 8px; font-size: 12px; color: var(--text-3); white-space: nowrap; }
</style>
