<script setup lang="ts">
defineProps<{
  no: string
  group: string
  title: string
  desc?: string
}>()
</script>

<template>
  <div class="page-head">
    <div class="ph-l">
      <span class="eyebrow"><span class="badge">{{ no }}</span>{{ group }}</span>
      <h1>{{ title }}</h1>
      <p v-if="desc" class="sub">{{ desc }}</p>
    </div>
    <div class="ph-r">
      <slot />
    </div>
  </div>
</template>
