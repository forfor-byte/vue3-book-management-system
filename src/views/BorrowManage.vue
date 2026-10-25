<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import StatCard from '../components/StatCard.vue'
import { borrows } from '../data'

const status = ref('全部')
const kw = ref('')

const statusMap: Record<string, string> = {
  借出: 'tag',
  待归还: 'tag-warning',
  已归还: 'tag-success',
  逾期: 'tag-danger',
}

const filtered = computed(() =>
  borrows.filter(
    (b) =>
      (status.value === '全部' || b.status === status.value) &&
      (b.book + b.reader + b.id).includes(kw.value),
  ),
)
</script>

<template>
  <div>
    <PageHead title="借阅管理" desc="借出、归还与逾期状态的统一跟踪。" actions>
      <template #actions>
        <button class="btn"><Icon name="exchange" :size="15" />借出登记</button>
        <button class="btn btn-primary"><Icon name="refresh" :size="15" />归还处理</button>
      </template>
    </PageHead>

    <section class="stat-grid">
      <StatCard icon="exchange" value="45" label="今日借出" trend="15% 较昨日" up tone="tone-green" />
      <StatCard icon="refresh" value="38" label="今日归还" trend="9% 较昨日" up />
      <StatCard icon="clock" value="7" label="待归还" trend="4% 较昨日" tone="tone-warn" />
      <StatCard icon="alert" value="3" label="逾期未还" trend="2 册减少" tone="tone-red" />
    </section>

    <article class="card">
      <div class="filters card-body">
        <div class="field"><Icon name="search" :size="15" /><input v-model="kw" class="input" placeholder="单据号 / 图书 / 读者" /></div>
        <select v-model="status" class="select">
          <option>全部</option>
          <option>借出</option>
          <option>待归还</option>
          <option>已归还</option>
          <option>逾期</option>
        </select>
        <span class="count">共 {{ filtered.length }} 条</span>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr><th>借阅单号</th><th>图书</th><th>读者</th><th>借出日期</th><th>应还日期</th><th>状态</th><th style="text-align:right">操作</th></tr>
          </thead>
          <tbody>
            <tr v-for="b in filtered" :key="b.id">
              <td><b class="cell-main">{{ b.id }}</b></td>
              <td>{{ b.book }}</td>
              <td>{{ b.reader }}</td>
              <td class="num">{{ b.borrowAt }}</td>
              <td class="num">{{ b.dueAt }}</td>
              <td><span class="tag" :class="statusMap[b.status]">{{ b.status }}</span></td>
              <td style="text-align:right; white-space:nowrap">
                <button v-if="b.status === '已归还'" class="btn-link"><Icon name="edit" :size="14" />详情</button>
                <template v-else>
                  <button class="btn-link"><Icon name="check" :size="14" />归还</button>
                  <button class="btn-link" style="color:var(--danger)"><Icon name="alert" :size="14" />催还</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pager">
        <span class="pager-info">共 {{ filtered.length }} 条</span>
        <button class="pg-btn" disabled><Icon name="chevron" :size="14" style="transform:rotate(90deg)" /></button>
        <button class="pg-btn on">1</button>
        <button class="pg-btn" disabled><Icon name="chevron" :size="14" style="transform:rotate(-90deg)" /></button>
      </div>
    </article>
  </div>
</template>

<style scoped>
.cell-main { color: var(--text-1); font-weight: 600; }
.count { font-size: 13px; color: var(--text-3); margin-left: auto; }
</style>
