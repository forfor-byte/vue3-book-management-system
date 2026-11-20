<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items: { label: string; value: number }[]
    max?: number
    suffix?: string
    alt?: boolean
    /** 逐行配色，缺省则用品牌紫 / 琥珀 */
    colors?: string[]
  }>(),
  { max: 0, suffix: '%', alt: false, colors: () => [] },
)

const top = props.max || Math.max(...props.items.map((i) => i.value), 1)

function fillStyle(i: number) {
  const c = props.colors[i]
  if (!c) return undefined
  return { background: `linear-gradient(90deg, ${c}b3, ${c})` }
}
</script>

<template>
  <div class="meters">
    <div v-for="(it, i) in items" :key="it.label" class="meter-row">
      <span class="k">{{ it.label }}</span>
      <span class="meter-track">
        <span
          class="meter-fill"
          :class="{ alt: alt && !colors.length }"
          :style="{ width: (it.value / top) * 100 + '%', ...fillStyle(i) }"
        />
      </span>
      <span class="v">{{ it.value }}{{ suffix }}</span>
    </div>
  </div>
</template>
