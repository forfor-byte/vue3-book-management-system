<script setup lang="ts">
defineProps<{
  items: { name: string; meta: string; value: string | number; note?: string; cover?: string }[]
}>()
</script>

<template>
  <div class="rank">
    <div v-for="(it, i) in items" :key="i" class="rr">
      <span class="no">{{ String(i + 1).padStart(2, '0') }}</span>
      <img v-if="it.cover" class="rcover" :src="it.cover" :alt="`${it.name}封面`" loading="lazy" />
      <div class="info">
        <span class="nm">{{ it.name }}</span>
        <span class="meta">{{ it.meta }}</span>
      </div>
      <span class="val">{{ it.value }}<small v-if="it.note">{{ it.note }}</small></span>
    </div>
  </div>
</template>

<style scoped>
.rr { grid-template-columns: 24px auto 1fr auto; }
.rcover {
  width: 22px;
  height: 33px;
  object-fit: cover;
  border-radius: 3px;
  background: var(--paper-2);
  box-shadow: 0 3px 8px -5px rgba(16, 24, 40, 0.65), 0 0 0 1px rgba(16, 24, 40, 0.06);
}
</style>
