<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import RankList from '../components/RankList.vue'
import Icon from '../components/Icon.vue'
import { books } from '../data'

const picked = computed(() => books.slice().sort((a, b) => b.borrows - a.borrows).slice(0, 8))

const highScore = computed(() =>
  books
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)
    .map((b) => ({ name: b.title, meta: b.author, value: b.rating.toFixed(1), note: '分', cover: b.cover })),
)

const hot = computed(() =>
  books
    .slice()
    .sort((a, b) => b.borrows - a.borrows)
    .slice(0, 6)
    .map((b) => ({ name: b.title, meta: b.author, value: b.borrows.toLocaleString(), note: '次', cover: b.cover })),
)

const toast = ref('')
let timer: number | undefined
function say(msg: string) {
  toast.value = msg
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (toast.value = ''), 2200)
}
</script>

<template>
  <div class="page">
    <PageHead no="04" group="馆藏" title="图书推荐" desc="按借阅热度与读者评分排序的书单，供前台荐读与排架参考">
      <button class="btn ghost" @click="say('已按借阅热度重新排序')"><Icon name="refresh" :size="13" />重新排序</button>
      <button class="btn primary" @click="say('演示操作：导出书单（原型未接后端）')">导出书单</button>
    </PageHead>

    <div class="shelf">
      <article v-for="b in picked" :key="b.isbn" class="bookc">
        <img class="cover" :src="b.cover" :alt="`${b.title}封面`" loading="lazy" />
        <div class="info">
          <b>{{ b.title }}</b>
          <span class="a">{{ b.author }} · {{ b.press }}</span>
          <p class="desc">{{ b.blurb }}</p>
          <div class="meta">
            <span>{{ b.callNo }}</span>
            <span>·</span>
            <span>{{ b.borrows.toLocaleString() }} 次借阅</span>
            <span class="rate">★ {{ b.rating.toFixed(1) }}</span>
          </div>
        </div>
      </article>
    </div>

    <div class="two" style="margin-top: 18px">
      <article class="card">
        <div class="card-h"><h2>高分书目</h2><span class="note">按读者评分</span></div>
        <RankList :items="highScore" />
      </article>
      <article class="card">
        <div class="card-h"><h2>高频借阅</h2><span class="note">累计借阅</span></div>
        <RankList :items="hot" />
      </article>
    </div>

    <div class="toast" :class="{ on: !!toast }">{{ toast }}</div>
  </div>
</template>

<style scoped>
.rate { margin-left: auto; color: var(--amber); font-weight: 600; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 1000px) {
  .two { grid-template-columns: 1fr; }
}
</style>
