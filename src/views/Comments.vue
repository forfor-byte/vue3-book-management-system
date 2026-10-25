<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import StatCard from '../components/StatCard.vue'
import { comments } from '../data'

const filter = ref('全部')
const kw = ref('')

const filtered = computed(() =>
  comments.filter(
    (c) =>
      (filter.value === '全部' || c.status === filter.value) &&
      (c.book + c.reader).includes(kw.value),
  ),
)

const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n)
const statusClass = (s: string) => (s === '已通过' ? 'tag-success' : s === '待审核' ? 'tag-warning' : 'tag-danger')
</script>

<template>
  <div>
    <PageHead title="评论管理" desc="读者书评的审核与内容质量管理。" actions>
      <template #actions>
        <button class="btn"><Icon name="refresh" :size="15" />刷新</button>
        <button class="btn btn-primary"><Icon name="check" :size="15" />批量通过</button>
      </template>
    </PageHead>

    <section class="stat-grid">
      <StatCard icon="comment" value="456" label="评论总数" trend="12% 较上月" up />
      <StatCard icon="clock" value="7" label="待审核" trend="今日新增 3 条" tone="tone-warn" />
      <StatCard icon="check" value="428" label="已通过" trend="15% 较上月" up tone="tone-green" />
      <StatCard icon="x" value="21" label="已拒绝" trend="5% 较上月" tone="tone-red" />
    </section>

    <article class="card">
      <div class="filters card-body">
        <div class="field"><Icon name="search" :size="15" /><input v-model="kw" class="input" placeholder="图书 / 读者" /></div>
        <select v-model="filter" class="select">
          <option>全部</option>
          <option>已通过</option>
          <option>待审核</option>
          <option>已拒绝</option>
        </select>
        <span class="count">共 {{ filtered.length }} 条</span>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr><th>图书</th><th>读者</th><th>评分</th><th>评论内容</th><th>状态</th><th>评论时间</th><th style="text-align:right">操作</th></tr>
          </thead>
          <tbody>
            <tr v-for="c in filtered" :key="c.book + c.reader">
              <td><b class="cell-main">{{ c.book }}</b></td>
              <td>{{ c.reader }}</td>
              <td><span class="stars">{{ stars(c.rating) }}</span></td>
              <td class="comment-text" :title="c.content">{{ c.content }}</td>
              <td><span class="tag" :class="statusClass(c.status)">{{ c.status }}</span></td>
              <td class="num">{{ c.time }}</td>
              <td style="text-align:right; white-space:nowrap">
                <template v-if="c.status === '待审核'">
                  <button class="btn-link"><Icon name="check" :size="14" />通过</button>
                  <button class="btn-link" style="color:var(--danger)"><Icon name="x" :size="14" />拒绝</button>
                </template>
                <button v-else class="btn-link"><Icon name="edit" :size="14" />详情</button>
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
.stars { color: #f59f00; letter-spacing: 1px; }
.comment-text { max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.count { font-size: 13px; color: var(--text-3); margin-left: auto; }
</style>
