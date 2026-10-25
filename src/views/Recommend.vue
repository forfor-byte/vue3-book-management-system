<script setup lang="ts">
import PageHead from '../components/PageHead.vue'
import RankList from '../components/RankList.vue'
import Icon from '../components/Icon.vue'
import { books } from '../data'

const recs = books.slice(0, 4).map((b, i) => ({ book: b, hue: ['#3455f1', '#12b886', '#f59f00', '#7048e8'][i] }))

const highScore = books
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6)
  .map((b) => ({ name: b.title, meta: b.author, value: '★ ' + b.rating.toFixed(1), note: '分' }))

const hot = books
  .slice()
  .sort((a, b) => b.borrows - a.borrows)
  .slice(0, 6)
  .map((b) => ({ name: b.title, meta: b.author, value: b.borrows, note: '次' }))
</script>

<template>
  <div>
    <PageHead title="图书推荐" desc="基于借阅热度与评分生成的个性化推荐。" actions>
      <template #actions>
        <button class="btn btn-soft"><Icon name="refresh" :size="15" />刷新推荐</button>
      </template>
    </PageHead>

    <section class="rec-grid">
      <article v-for="r in recs" :key="r.book.isbn" class="card rec-card">
        <div class="rec-cover" :style="{ background: `linear-gradient(135deg, ${r.hue}, ${r.hue}bb)` }">
          <span class="rec-letter">{{ r.book.title.slice(0, 1) }}</span>
          <div class="rec-rate">★ {{ r.book.rating.toFixed(1) }}</div>
        </div>
        <div class="rec-body">
          <h3>{{ r.book.title }}</h3>
          <p>{{ r.book.author }} · {{ r.book.press }}</p>
          <div class="rec-tags">
            <span class="tag">{{ r.book.category }}</span>
            <span class="tag tag-neutral">{{ r.book.borrows }} 次借阅</span>
          </div>
          <div class="rec-foot">
            <span class="rec-price">¥{{ r.book.price }}</span>
            <button class="btn btn-sm btn-primary"><Icon name="exchange" :size="13" />去借阅</button>
          </div>
        </div>
      </article>
    </section>

    <div class="two-col wide-left">
      <RankList title="高分图书 Top 6" sub="按读者评分" :items="highScore" />
      <RankList title="热门图书 Top 6" sub="按借阅热度" :items="hot" />
    </div>
  </div>
</template>

<style scoped>
.rec-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 16px; }
.rec-card { overflow: hidden; transition: all 0.2s ease; }
.rec-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
.rec-cover {
  position: relative;
  height: 128px;
  display: grid; place-items: center;
  color: #fff;
}
.rec-letter { font-size: 30px; font-weight: 700; }
.rec-rate {
  position: absolute;
  top: 10px; right: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #f59f00;
  font-size: 12px; font-weight: 600;
  padding: 2px 8px; border-radius: 20px;
}
.rec-body { padding: 14px 16px 16px; }
.rec-body h3 { font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rec-body p { font-size: 12px; color: var(--text-3); margin: 3px 0 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rec-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
.rec-foot { display: flex; align-items: center; justify-content: space-between; }
.rec-price { font-size: 16px; font-weight: 700; color: var(--text-1); }

@media (max-width: 1080px) { .rec-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .rec-grid { grid-template-columns: 1fr; } }
</style>
