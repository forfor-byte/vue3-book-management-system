<script setup lang="ts">
import Icon from './Icon.vue'

defineProps<{
  icon: string
  value: string | number
  label: string
  trend?: string
  up?: boolean
  tone?: '' | 'tone-green' | 'tone-warn' | 'tone-red'
}>()
</script>

<template>
  <article class="card stat-card">
    <div class="stat-icon" :class="tone || ''"><Icon :name="icon" /></div>
    <div>
      <div class="stat-main">{{ value }}</div>
      <div class="stat-label">{{ label }}</div>
      <span v-if="trend" class="stat-trend" :class="up ? 'up' : 'down'">
        <Icon :name="up ? 'trendingUp' : 'trendingDown'" />
        {{ trend }}
      </span>
    </div>
  </article>
</template>
