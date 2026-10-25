<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import Donut from '../components/Donut.vue'
import { readers } from '../data'

const kw = ref('')
const type = ref('全部')
const filtered = computed(() =>
  readers.filter(
    (r) =>
      (type.value === '全部' || r.type === type.value) &&
      (r.name + r.id + r.dept).includes(kw.value),
  ),
)

const typeDist = [
  { label: '本科生', value: 198, color: '#3455f1' },
  { label: '研究生', value: 82, color: '#12b886' },
  { label: '教师', value: 48, color: '#f59f00' },
]
</script>

<template>
  <div>
    <PageHead title="读者管理" desc="管理读者档案、身份类型与借阅资格。" actions>
      <template #actions>
        <button class="btn"><Icon name="filter" :size="15" />筛选</button>
        <button class="btn btn-primary"><Icon name="plus" :size="15" />新增读者</button>
      </template>
    </PageHead>

    <section class="stat-grid mini">
      <div class="card stat-card">
        <div class="stat-icon"><Icon name="reader" /></div>
        <div><div class="stat-main">328</div><div class="stat-label">读者总数</div></div>
      </div>
      <div class="card stat-card">
        <div class="stat-icon tone-green"><Icon name="trendingUp" /></div>
        <div><div class="stat-main">16</div><div class="stat-label">本月新增</div></div>
      </div>
    </section>

    <div class="two-col wide-left">
      <article class="card">
        <div class="card-head"><h3 class="card-title">读者档案</h3></div>
        <div class="filters card-body">
          <div class="field"><Icon name="search" :size="15" /><input v-model="kw" class="input" placeholder="姓名 / 证号 / 院系" /></div>
          <select v-model="type" class="select">
            <option>全部</option>
            <option>本科生</option>
            <option>研究生</option>
            <option>教师</option>
          </select>
          <span class="count">共 {{ filtered.length }} 人</span>
        </div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>读者证号</th><th>姓名</th><th>性别</th><th>院系</th><th>类型</th><th>联系电话</th><th>加入时间</th><th style="text-align:right">操作</th></tr>
            </thead>
            <tbody>
              <tr v-for="r in filtered" :key="r.id">
                <td><b class="cell-main">{{ r.id }}</b></td>
                <td>{{ r.name }}</td>
                <td>{{ r.gender }}</td>
                <td>{{ r.dept }}</td>
                <td><span class="tag" :class="r.type === '教师' ? 'tag-warning' : r.type === '研究生' ? 'tag-success' : ''">{{ r.type }}</span></td>
                <td class="num">{{ r.phone }}</td>
                <td class="num">{{ r.joined }}</td>
                <td style="text-align:right; white-space:nowrap">
                  <button class="btn-link"><Icon name="edit" :size="14" />编辑</button>
                  <button class="btn-link" style="color:var(--danger)"><Icon name="trash" :size="14" />删除</button>
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

      <article class="card">
        <div class="card-head"><h3 class="card-title">读者类型构成</h3></div>
        <div class="card-body">
          <Donut :data="typeDist" :size="180" />
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.stat-grid.mini { grid-template-columns: repeat(2, 1fr); max-width: 560px; margin-bottom: 16px; }
.cell-main { color: var(--text-1); font-weight: 600; }
.count { font-size: 13px; color: var(--text-3); margin-left: auto; }
</style>
