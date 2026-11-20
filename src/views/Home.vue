<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import AreaTrend from '../components/AreaTrend.vue'
import MeterBars from '../components/MeterBars.vue'
import RankList from '../components/RankList.vue'
import { books, categoryShare, flow, overview, trend } from '../data'

const toast = ref('')
let timer: number | undefined
function say(msg: string) {
  toast.value = msg
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (toast.value = ''), 2200)
}

const today = new Date()
const dateText = `${today.getFullYear()} 年 ${today.getMonth() + 1} 月 ${today.getDate()} 日`

const hotBooks = computed(() =>
  books
    .slice()
    .sort((a, b) => b.borrows - a.borrows)
    .slice(0, 5)
    .map((b) => ({ name: b.title, meta: b.author, value: b.borrows.toLocaleString(), note: '次', cover: b.cover })),
)

const catColors = ['#5b5bd6', '#2e90fa', '#12b76a', '#f79009', '#9a5cf0', '#f04438']

/** 月度 / 累计（累计＝逐月相加，直接由 trend 现算） */
const mode = ref<'month' | 'cum'>('month')
const trendData = computed(() =>
  mode.value === 'month'
    ? trend
    : trend.map((d, i) => ({ label: d.label, value: trend.slice(0, i + 1).reduce((s, x) => s + x.value, 0) })),
)

const flowTag = (act: string) => {
  if (act === '逾期') return 'over'
  if (act === '缺藏') return 'warn'
  return 'ok'
}
</script>

<template>
  <div class="page">
    <PageHead no="01" group="概览" title="馆藏总览" :desc="`截至 ${dateText} · ${overview.settledAt}`">
      <button class="btn ghost" @click="say('演示操作：导出月报（原型未接后端）')">导出月报</button>
      <button class="btn primary" @click="say('演示操作：登记入藏（原型未接后端）')">登记入藏</button>
    </PageHead>

    <section class="metrics">
      <div class="metric">
        <div class="k"><i />馆藏总册</div>
        <div class="v">{{ overview.total.toLocaleString() }}<small>册</small></div>
        <div class="d up">较上月 +1.2%</div>
      </div>
      <div class="metric">
        <div class="k"><i />在架可借</div>
        <div class="v">{{ overview.available.toLocaleString() }}<small>册</small></div>
        <div class="d">占馆藏 79.0%</div>
      </div>
      <div class="metric">
        <div class="k"><i class="sand" />在借册数</div>
        <div class="v">{{ overview.borrowed.toLocaleString() }}<small>册</small></div>
        <div class="d">较上月 +56 册</div>
      </div>
      <div class="metric risk">
        <div class="k"><i class="seal" />逾期未还</div>
        <div class="v">{{ overview.overdue }}<small>册</small></div>
        <div class="d warn">其中 {{ overview.over30 }} 册超 30 天</div>
      </div>
    </section>

    <div class="two">
      <article class="card">
        <div class="card-h">
          <h2>借阅走势</h2>
          <div class="mini">
            <button :class="{ on: mode === 'month' }" @click="mode = 'month'">月度</button>
            <button :class="{ on: mode === 'cum' }" @click="mode = 'cum'">累计</button>
          </div>
        </div>
        <div class="card-b"><AreaTrend :data="trendData" unit="册" /></div>
      </article>

      <article class="card">
        <div class="card-h">
          <h2>馆藏构成</h2>
          <span class="note">按一级类目</span>
        </div>
        <div class="card-b"><MeterBars :items="categoryShare" :colors="catColors" /></div>
      </article>
    </div>

    <div class="two">
      <article class="card">
        <div class="card-h">
          <h2>近日流转</h2>
          <span class="note">最近 5 条</span>
        </div>
        <div class="listrows">
          <div v-for="(f, i) in flow" :key="i" class="lr">
            <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="main">
              <b>{{ f.text }}</b>
              <span>{{ f.meta }}</span>
            </div>
            <span class="end tag" :class="flowTag(f.act)">{{ f.act }}</span>
          </div>
        </div>
      </article>

      <article class="card">
        <div class="card-h">
          <h2>借阅排行</h2>
          <span class="note">累计借阅</span>
        </div>
        <RankList :items="hotBooks" />
      </article>
    </div>

    <div class="toast" :class="{ on: !!toast }">{{ toast }}</div>
  </div>
</template>

<style scoped>
.two { display: grid; grid-template-columns: 1.6fr 1fr; gap: 14px; margin-top: 14px; align-items: start; }
.mini { display: inline-flex; padding: 2px; gap: 2px; border-radius: 999px; background: var(--surface-2); border: 1px solid var(--rule-soft); }
.mini button {
  border: 0;
  padding: 3px 9px;
  border-radius: 999px;
  background: transparent;
  color: var(--text-3);
  font-size: 10.5px;
  transition: background 0.15s, color 0.15s;
}
.mini button.on { background: var(--surface); color: var(--brand); font-weight: 600; box-shadow: var(--shadow-sm); }
@media (max-width: 1000px) {
  .two { grid-template-columns: 1fr; }
}
</style>
