<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import BarTrend from '../components/BarTrend.vue'
import MeterBars from '../components/MeterBars.vue'
import RankList from '../components/RankList.vue'
import { books, categoryShare, cycle, overview, trend } from '../data'

const topBooks = computed(() =>
  books
    .slice()
    .sort((a, b) => b.borrows - a.borrows)
    .slice(0, 5)
    .map((b) => ({ name: b.title, meta: b.author, value: b.borrows.toLocaleString(), note: '次', cover: b.cover })),
)

const last = trend[trend.length - 1] ?? { label: '', value: 0 }
const prev = trend[trend.length - 2] ?? { label: '', value: 0 }

/** 借阅周期加权均值：取各区间的中位数天数估算 */
const cycleDays = [4, 11, 22, 40]
const avgDays = computed(() => {
  const w = cycle.reduce((s2, c, i) => s2 + c.value * (cycleDays[i] ?? 30), 0)
  const n = cycle.reduce((s2, c) => s2 + c.value, 0)
  return n ? (w / n).toFixed(1) : '0.0'
})
const overdueRate = computed(() => ((overview.overdue / overview.borrowed) * 100).toFixed(1))

/** 类目配色，与分类卡保持一致 */
const catColors = ['#5b5bd6', '#2e90fa', '#12b76a', '#f79009', '#9a5cf0', '#f04438']
/** 借阅周期：越久越偏暖色，30 天以上标红 */
const cycleColors = ['#12b76a', '#2e90fa', '#f79009', '#f04438']

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
    <PageHead no="09" group="分析" title="统计分析" desc="借阅走势、馆藏构成与借阅周期，用于采购与排架决策">
      <button class="btn ghost" @click="say('已切换为季度口径（演示）')">按季度</button>
      <button class="btn primary" @click="say('演示操作：导出报表（原型未接后端）')">导出报表</button>
    </PageHead>

    <section class="metrics">
      <div class="metric">
        <div class="k"><i />本月借出</div>
        <div class="v">{{ last.value }}<small>册次</small></div>
        <div class="d up">较上月 +{{ last.value - prev.value }}</div>
      </div>
      <div class="metric">
        <div class="k"><i />加权平均周期</div>
        <div class="v">{{ avgDays }}<small>天</small></div>
        <div class="d">按四个区间中位数估算</div>
      </div>
      <div class="metric warn-tile">
        <div class="k"><i class="sand" />30 天以上</div>
        <div class="v">{{ cycle[3]?.value ?? 0 }}<small>%</small></div>
        <div class="d">长借阅占比</div>
      </div>
      <div class="metric risk">
        <div class="k"><i class="seal" />逾期率</div>
        <div class="v">{{ overdueRate }}<small>%</small></div>
        <div class="d warn">{{ overview.overdue }} 册待催还</div>
      </div>
    </section>

    <div class="grid2">
      <article class="card">
        <div class="card-h">
          <h2>借阅走势</h2>
          <span class="note">2026 年 1—10 月 · 单位：册</span>
        </div>
        <div class="card-b"><BarTrend :data="trend" unit="册" /></div>
      </article>

      <article class="card">
        <div class="card-h">
          <h2>馆藏构成</h2>
          <span class="note">按一级类目</span>
        </div>
        <div class="card-b"><MeterBars :items="categoryShare" :colors="catColors" /></div>
      </article>
    </div>

    <div class="grid2">
      <article class="card">
        <div class="card-h">
          <h2>借阅周期分布</h2>
          <span class="note">按归还时的实际天数</span>
        </div>
        <div class="card-b">
          <MeterBars :items="cycle" :colors="cycleColors" />
          <div class="cyc-foot">
            <div><span>加权平均周期</span><em>{{ avgDays }}<i>天</i></em></div>
            <div><span>30 天以上占比</span><em>{{ cycle[3]?.value ?? 0 }}<i>%</i></em></div>
            <div><span>样本</span><em>{{ cycle.reduce((a2, c) => a2 + c.value, 0) }}<i>人次</i></em></div>
          </div>
        </div>
      </article>

      <article class="card">
        <div class="card-h">
          <h2>借阅排行</h2>
          <span class="note">累计借阅 · 前 5</span>
        </div>
        <RankList :items="topBooks" />
      </article>
    </div>

    <section class="ledger">
      <div class="stamp small">统计<br />月报</div>
      <div class="lt">
        <div class="k">2026 年 10 月 · 馆编号 {{ overview.catalogNo }}</div>
        <p class="v">
          本月借出 <b>{{ last.value }}</b> 册次，馆藏在册 <b>{{ overview.total.toLocaleString() }}</b> 册，
          逾期 <b>{{ overview.overdue }}</b> 册。
        </p>
        <p class="n">较上月 +{{ last.value - prev.value }} 册次；文学类占比最高，采购向社科与理工倾斜。</p>
      </div>
      <span class="tag ok ledger-tag">较上月 +{{ last.value - prev.value }}</span>
    </section>

    <div class="toast" :class="{ on: !!toast }">{{ toast }}</div>
  </div>
</template>

<style scoped>
.grid2 { display: grid; grid-template-columns: 1.35fr 1fr; gap: 14px; margin-top: 14px; align-items: start; }
.cyc-foot {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--rule-soft);
}
.cyc-foot div { padding: 9px 11px; border-radius: 9px; background: var(--surface-2); }
.cyc-foot span { display: block; font-size: 10.5px; color: var(--text-3); }
.cyc-foot em { font-style: normal; font-size: 18px; font-weight: 700; color: var(--ink); }
.cyc-foot em i { font-style: normal; font-size: 10.5px; color: var(--text-3); margin-left: 3px; font-weight: 400; }
.ledger {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 14px;
  padding: 15px 18px;
  border-radius: var(--radius);
  border: 1px solid var(--rule-soft);
  background: linear-gradient(120deg, #f5f4ff, #ffffff 60%);
}
.stamp.small {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--brand-soft);
  color: var(--brand);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.3;
  flex: none;
}
.lt { min-width: 0; }
.lt .k { font-size: 11px; color: var(--text-3); }
.lt .v { font-size: 15px; color: var(--text); margin-top: 4px; }
.lt .v b { color: var(--brand); font-weight: 700; }
.lt .n { font-size: 11.5px; color: var(--text-2); margin-top: 4px; }
.ledger-tag { margin-left: auto; height: 28px; padding: 0 12px; font-size: 11.5px; }
@media (max-width: 1000px) {
  .grid2 { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .lt .v { font-size: 13.5px; }
  .cyc-foot { grid-template-columns: 1fr; }
  .ledger { padding: 13px 14px; }
}
</style>
