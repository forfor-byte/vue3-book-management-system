<script setup lang="ts">
import Icon from './Icon.vue'

defineProps<{
  title: string
  desc?: string
  actions?: boolean
}>()
const emit = defineEmits<{ (e: 'refresh'): void }>()
</script>

<template>
  <div class="page-head">
    <div>
      <h2 class="page-title">{{ title }}</h2>
      <p v-if="desc" class="page-sub">{{ desc }}</p>
    </div>
    <div v-if="actions" class="page-actions">
      <button class="btn" @click="emit('refresh')"><Icon name="refresh" :size="15" />刷新</button>
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.page-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
</style>
