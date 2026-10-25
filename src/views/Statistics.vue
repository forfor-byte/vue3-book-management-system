<script setup lang="ts">
import PageHead from '../components/PageHead.vue'
import BarTrend from '../components/BarTrend.vue'
import Donut from '../components/Donut.vue'
import RankList from '../components/RankList.vue'
import StatCard from '../components/StatCard.vue'
import { categories, books } from '../data'

const monthly = [
  { label: '1月', value: 320 },
  { label: '2月', value: 410 },
  { label: '3月', value: 388 },
  { label: '4月', value: 465 },
  { label: '5月', value: 520 },
  { label: '6月', value: 492 },
  { label: '7月', value: 356 },
  { label: '8月', value: 402 },
  { label: '9月', value: 610 },
  { label: '10月', value: 588 },
]

const readerGrowth = [
  { label: '7月', value: 18 },
  { label: '8月', value: 26 },
  { label: '9月', value: 35 },
  { label: '10月', value: 41 },
  { label: '11月', value: 49 },
]

const donut = categories.slice(0, 6).map((c, i) => ({
  label: c.name,
  value: c.count,
  color: (['#3455f1', '#12b886', '#f59f00', '#e5484d', '#7048e8', '#0ca678'][i] as string) ?? '#3455f1',
}))

const topBooks = books
  .slice()
  .sort((a, b) => b.borrows - a.borrows)
  .slice(0, 6)
  .map((b) => ({ name: b.title, meta: b.author, value: b.borrows, note: '次' }))
</script>

<template>
  <div>
    <PageHead title="统计分析" desc="馆藏、借阅与读者数据的多维分析。" actions>
      <template #actions>
        <button class="btn"><Icon name="calendar" :size="15" />2026 年度</button>
        <button class="btn btn-soft"><Icon name="chart" :size="15" />导出报表</button>
      </template>
    </PageHead>

    <section class="stat-grid">
      <StatCard icon="book" value="1,256" label="馆藏总量" trend="12% 较去年" up />
      <StatCard icon="exchange" value="4,528" label="年度借阅" trend="18% 较去年" up tone="tone-green" />
      <StatCard icon="reader" value="328" label="注册读者" trend="8% 较去年" up />
      <StatCard icon="chart" value="14.6" label="人均借阅(册)" trend="2.3 较去年" up tone="tone-warn" />
    </section>

    <div class="two-col wide-left">
      <article class="card">
        <div class="card-head"><h3 class="card-title">月度借阅趋势</h3><span class="hint">2026 年 1-10 月</span></div>
        <div class="card-body"><BarTrend :data="monthly" /></div>
      </article>
      <article class="card">
        <div class="card-head"><h3 class="card-title">馆藏分类占比</h3></div>
        <div class="card-body"><Donut :data="donut" :size="190" /></div>
      </article>
    </div>

    <div class="two-col wide-left">
      <article class="card">
        <div class="card-head"><h3 class="card-title">读者增长</h3><span class="hint">近 5 个月新增</span></div>
        <div class="card-body"><BarTrend :data="readerGrowth" /></div>
      </article>
      <RankList title="借阅排行 Top 6" sub="按累计借阅" :items="topBooks" />
    </div>
  </div>
</template>

<style scoped>
.hint { font-size: 12px; color: var(--text-3); }
</style>
