<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    data: { label: string; value: number }[]
    unit?: string
    height?: number
  }>(),
  { unit: '', height: 208 },
)

const box = ref<HTMLDivElement | null>(null)
const width = ref(560)
let ro: ResizeObserver | null = null

onMounted(() => {
  if (typeof ResizeObserver === 'undefined') return
  ro = new ResizeObserver((entries) => {
    const w = entries[0]?.contentRect.width
    if (w && w > 0) width.value = w
  })
  if (box.value) ro.observe(box.value)
})
onBeforeUnmount(() => ro?.disconnect())

const padL = 34
const padR = 10
const padT = 28
const padB = 26

const values = computed(() => props.data.map((d) => d.value))
const peak = computed(() => Math.max(...values.value, 1))
/** 顶部留 12% 余量，避免峰值贴边 */
const top = computed(() => peak.value * 1.12)

const innerW = computed(() => Math.max(width.value - padL - padR, 10))
const innerH = computed(() => Math.max(props.height - padT - padB, 10))

const points = computed(() =>
  props.data.map((d, i) => ({
    x: padL + (props.data.length === 1 ? innerW.value / 2 : (innerW.value * i) / (props.data.length - 1)),
    y: padT + innerH.value - (d.value / top.value) * innerH.value,
    label: d.label,
    value: d.value,
  })),
)

const ticks = computed(() => [0.25, 0.5, 0.75, 1].map((r) => Math.round(peak.value * r)))

/** Catmull-Rom 转三次贝塞尔，得到平滑曲线 */
const linePath = computed(() => {
  const p = points.value
  if (!p.length) return ''
  let d = `M ${p[0]!.x} ${p[0]!.y}`
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]!
    const p1 = p[i]!
    const p2 = p[i + 1]!
    const p3 = p[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`
  }
  return d
})

const areaPath = computed(() => {
  const p = points.value
  if (!p.length) return ''
  const bottom = padT + innerH.value
  return `${linePath.value} L ${p[p.length - 1]!.x} ${bottom} L ${p[0]!.x} ${bottom} Z`
})

/** 默认把峰值点标出来，悬停时跟随鼠标 */
const hoverIdx = ref<number | null>(null)
const peakIdx = computed(() => values.value.indexOf(peak.value))
const active = computed(() => {
  const i = hoverIdx.value ?? peakIdx.value
  return points.value[i] ?? null
})

function onMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  let best = 0
  let dist = Infinity
  points.value.forEach((p, i) => {
    const d = Math.abs(p.x - x)
    if (d < dist) {
      dist = d
      best = i
    }
  })
  hoverIdx.value = best
}

const fmt = (v: number) => v.toLocaleString()

/** 气泡贴边时收进卡片，避免溢出 */
const tipX = computed(() => {
  const p = active.value
  if (!p) return 0
  const half = 36
  const min = padL + 4
  const max = Math.max(width.value - padR - half, min)
  return Math.min(Math.max(p.x, min), max)
})

/** 峰值靠近顶部时把气泡压在曲线下方 */
const tipY = computed(() => Math.max((active.value?.y ?? padT) - 12, 26))
</script>

<template>
  <div ref="box" class="area">
    <svg :width="width" :height="height" class="cv" @mousemove="onMove" @mouseleave="hoverIdx = null">
      <defs>
        <linearGradient id="lybAreaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" class="s-top" />
          <stop offset="100%" class="s-bottom" />
        </linearGradient>
        <linearGradient id="lybAreaLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" class="l-from" />
          <stop offset="100%" class="l-to" />
        </linearGradient>
      </defs>

      <!-- 横向虚线网格 -->
      <line
        v-for="(t, i) in ticks"
        :key="`g${t}`"
        class="grid"
        :x1="padL"
        :x2="width - padR"
        :y1="padT + innerH - (innerH * (i + 1)) / 4"
        :y2="padT + innerH - (innerH * (i + 1)) / 4"
      />
      <!-- 左侧刻度 -->
      <text
        v-for="(t, i) in ticks"
        :key="`t${t}`"
        class="tick"
        :x="padL - 8"
        :y="padT + innerH - (innerH * (i + 1)) / 4 + 3"
      >
        {{ t }}
      </text>

      <path :d="areaPath" class="fill" />
      <path :d="linePath" class="line" />

      <!-- 悬停/峰值圆点 -->
      <g v-if="active">
        <circle :cx="active.x" :cy="active.y" r="7" class="halo" />
        <circle :cx="active.x" :cy="active.y" r="3.6" class="dot" />
      </g>

      <!-- 底部月份 -->
      <text v-for="p in points" :key="`x${p.label}`" class="xlab" :x="p.x" :y="height - 8">{{ p.label }}</text>
    </svg>

    <!-- 数值气泡 -->
    <div
      v-if="active"
      class="tip"
      :style="{ left: tipX + 'px', top: tipY + 'px' }"
      :class="{ pin: hoverIdx === null }"
    >
      <b>{{ fmt(active.value) }}</b>
      <span>{{ unit }}</span>
      <i />
    </div>
  </div>
</template>

<style scoped>
.area { position: relative; width: 100%; }
.cv { display: block; width: 100%; }
.grid { stroke: var(--grid-line); stroke-width: 1; stroke-dasharray: 3 4; }
.tick,
.xlab {
  font-size: 9.5px;
  fill: var(--text-3);
  font-variant-numeric: tabular-nums;
}
.tick { text-anchor: end; }
.xlab { text-anchor: middle; }
.fill { fill: url(#lybAreaFill); }
.s-top { stop-color: var(--brand); stop-opacity: 0.32; }
.s-bottom { stop-color: var(--brand); stop-opacity: 0; }
.line { fill: none; stroke: url(#lybAreaLine); stroke-width: 2.4; stroke-linecap: round; }
.l-from { stop-color: var(--brand); }
.l-to { stop-color: var(--blue); }
.halo { fill: var(--brand); opacity: 0.16; }
.dot { fill: var(--surface); stroke: var(--brand); stroke-width: 2.4; }
.tip {
  position: absolute;
  transform: translate(-50%, -100%);
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  padding: 5px 9px 6px;
  border-radius: 7px;
  background: linear-gradient(135deg, #6a5cf0, #4c4cd4);
  color: #fff;
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 8px 18px -10px rgba(76, 76, 212, 0.8);
  transition: left 0.12s ease-out, top 0.12s ease-out;
}
.tip b { font-weight: 700; font-size: 13px; }
.tip span { opacity: 0.78; font-size: 10px; }
.tip i {
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 9px;
  height: 9px;
  margin-left: -4.5px;
  background: #4c4cd4;
  transform: rotate(45deg);
  border-radius: 2px;
}
</style>
