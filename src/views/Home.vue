<script setup lang="ts">
import PageHead from '../components/PageHead.vue'
import StatCard from '../components/StatCard.vue'
import BarTrend from '../components/BarTrend.vue'
import RankList from '../components/RankList.vue'
import Icon from '../components/Icon.vue'
import { books } from '../data'

const weekly = [
  { label: '周一', value: 44 },
  { label: '周二', value: 52 },
  { label: '周三', value: 37 },
  { label: '周四', value: 65 },
  { label: '周五', value: 72 },
  { label: '周六', value: 85 },
  { label: '周日', value: 57 },
]

const hotBooks = books
  .slice()
  .sort((a, b) => b.borrows - a.borrows)
  .slice(0, 5)
  .map((b) => ({ name: b.title, meta: b.author, value: b.borrows, note: '次借阅' }))

const activities = [
  { text: '读者「张三」借阅了《三体》', time: '10 分钟前', type: 'exchange' },
  { text: '新书上架：《数据结构与算法分析》', time: '32 分钟前', type: 'plus' },
  { text: '《Vue.js设计与实现》收到新评论', time: '1 小时前', type: 'comment' },
  { text: '读者「李四」已归还《算法导论》', time: '2 小时前', type: 'refresh' },
  { text: '批量导入 128 条图书数据', time: '今天 09:20', type: 'book' },
  { text: '图书「活着」库存不足预警', time: '昨天', type: 'alert' },
]
</script>

<template>
  <div>
    <PageHead title="首页" desc="欢迎回来，这里是今日馆藏概览。" />

    <div class="welcome card">
      <div>
        <h2>早上好，管理员 👋</h2>
        <p>今日有 <b>12</b> 本图书逾期未还，<b>45</b> 次借阅正在进行。</p>
      </div>
      <button class="btn btn-primary"><Icon name="plus" :size="15" />登记借阅</button>
    </div>

    <section class="stat-grid">
      <StatCard icon="book" value="1,256" label="馆藏图书" trend="12% 较上月" up />
      <StatCard icon="reader" value="328" label="注册读者" trend="8% 较上月" up />
      <StatCard icon="exchange" value="45" label="今日借阅" trend="15% 较昨日" up tone="tone-green" />
      <StatCard icon="alert" value="12" label="逾期未还" trend="5% 较上月" tone="tone-red" />
    </section>

    <div class="two-col">
      <article class="card">
        <div class="card-head">
          <h3 class="card-title">本周借阅趋势</h3>
          <span class="trend-tag"><Icon name="trendingUp" :size="14" /> 持续上升</span>
        </div>
        <div class="card-body">
          <BarTrend :data="weekly" unit="" />
        </div>
      </article>

      <RankList title="热门图书 Top 5" sub="按借阅次数" :items="hotBooks" />
    </div>

    <section class="two-col wide-left">
      <article class="card">
        <div class="card-head">
          <h3 class="card-title">近期动态</h3>
          <button class="btn btn-sm"><Icon name="refresh" :size="13" />刷新</button>
        </div>
        <ul class="activity">
          <li v-for="(a, i) in activities" :key="i">
            <span class="act-icon"><Icon :name="a.type" :size="16" /></span>
            <div class="act-body">
              <p>{{ a.text }}</p>
              <small>{{ a.time }}</small>
            </div>
          </li>
        </ul>
      </article>

      <article class="card quick">
        <div class="card-head"><h3 class="card-title">快捷操作</h3></div>
        <div class="quick-grid">
          <button class="quick-item"><Icon name="plus" :size="18" /><b>新增图书</b><small>录入馆藏</small></button>
          <button class="quick-item"><Icon name="exchange" :size="18" /><b>借阅登记</b><small>办理借出</small></button>
          <button class="quick-item"><Icon name="refresh" :size="18" /><b>归还处理</b><small>办理还书</small></button>
          <button class="quick-item"><Icon name="reader" :size="18" /><b>读者开户</b><small>注册读者</small></button>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.welcome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 24px;
  margin-bottom: 16px;
  background: linear-gradient(120deg, var(--surface), var(--accent-soft));
  border-color: var(--accent-line);
}
.welcome h2 { font-size: 18px; }
.welcome p { color: var(--text-2); margin-top: 4px; }
.welcome p b { color: var(--accent); font-weight: 600; }

.trend-tag {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; color: var(--success);
  background: var(--success-soft);
  padding: 3px 9px; border-radius: 20px;
}

.activity { padding: 8px 18px; }
.activity li { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px dashed var(--border); }
.activity li:last-child { border-bottom: 0; }
.act-icon {
  flex: none;
  width: 34px; height: 34px;
  display: grid; place-items: center;
  border-radius: 10px;
  background: var(--accent-soft);
  color: var(--accent);
}
.act-body p { font-size: 13px; color: var(--text-1); }
.act-body small { font-size: 12px; color: var(--text-3); }

.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 18px 20px;
}
.quick-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 11px;
  background: var(--surface);
  color: var(--accent);
  text-align: left;
  transition: all 0.18s;
}
.quick-item:hover { border-color: var(--accent); box-shadow: var(--shadow-md); transform: translateY(-2px); }
.quick-item b { font-size: 14px; color: var(--text-1); }
.quick-item small { font-size: 12px; color: var(--text-3); }

@media (max-width: 560px) {
  .welcome { flex-direction: column; align-items: flex-start; }
  .quick-grid { grid-template-columns: 1fr; }
}
</style>
