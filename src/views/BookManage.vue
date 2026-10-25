<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import { books } from '../data'

const kw = ref('')
const cat = ref('全部')
const cats = ['全部', ...Array.from(new Set(books.map((b) => b.category)))]

const filtered = computed(() =>
  books.filter(
    (b) =>
      (cat.value === '全部' || b.category === cat.value) &&
      (b.title + b.author + b.isbn).toLowerCase().includes(kw.value.toLowerCase()),
  ),
)

const stockTotal = books.reduce((s, b) => s + b.stock, 0)
const borrowTotal = books.reduce((s, b) => s + b.borrows, 0)

const coverHue = (i: number) => ['#3455f1', '#12b886', '#f59f00', '#e5484d', '#7048e8', '#0ca678'][i % 6]
</script>

<template>
  <div>
    <PageHead title="图书管理" desc="馆藏书目维护、库存与定价管理。" actions>
      <template #actions>
        <button class="btn"><Icon name="refresh" :size="15" />导入</button>
        <button class="btn btn-primary"><Icon name="plus" :size="15" />新增图书</button>
      </template>
    </PageHead>

    <section class="stat-grid mini">
      <div class="card stat-card"><div class="stat-icon"><Icon name="book" /></div><div><div class="stat-main">{{ books.length }}</div><div class="stat-label">书目种数</div></div></div>
      <div class="card stat-card"><div class="stat-icon tone-green"><Icon name="folder" /></div><div><div class="stat-main">{{ stockTotal }}</div><div class="stat-label">在库册数</div></div></div>
      <div class="card stat-card"><div class="stat-icon tone-warn"><Icon name="exchange" /></div><div><div class="stat-main">{{ borrowTotal }}</div><div class="stat-label">累计借出</div></div></div>
    </section>

    <article class="card">
      <div class="filters card-body">
        <div class="field"><Icon name="search" :size="15" /><input v-model="kw" class="input" placeholder="书名 / 作者 / ISBN" /></div>
        <select v-model="cat" class="select">
          <option v-for="c in cats" :key="c">{{ c }}</option>
        </select>
        <span class="count">共 {{ filtered.length }} 种</span>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr><th>图书</th><th>分类</th><th>作者</th><th>出版社</th><th>定价</th><th>库存</th><th>借阅</th><th>评分</th><th style="text-align:right">操作</th></tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in filtered" :key="b.isbn">
              <td>
                <div class="book-cell">
                  <span class="mini-cover" :style="{ background: coverHue(i) }">{{ b.title.slice(0, 1) }}</span>
                  <div>
                    <b class="cell-main">{{ b.title }}</b>
                    <small class="cell-sub">{{ b.isbn }}</small>
                  </div>
                </div>
              </td>
              <td><span class="tag">{{ b.category }}</span></td>
              <td>{{ b.author }}</td>
              <td>{{ b.press }}</td>
              <td class="num">¥{{ b.price }}</td>
              <td><span class="tag" :class="b.stock < 5 ? 'tag-danger' : b.stock < 10 ? 'tag-warning' : 'tag-success'">{{ b.stock }} 册</span></td>
              <td class="num">{{ b.borrows }}</td>
              <td><span class="rating">★ {{ b.rating.toFixed(1) }}</span></td>
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
  </div>
</template>

<style scoped>
.stat-grid.mini { grid-template-columns: repeat(3, 1fr); max-width: 780px; margin-bottom: 16px; }
.book-cell { display: flex; align-items: center; gap: 11px; }
.mini-cover {
  flex: none;
  width: 36px; height: 48px;
  display: grid; place-items: center;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}
.cell-main { display: block; color: var(--text-1); font-weight: 600; }
.cell-sub { font-size: 12px; color: var(--text-3); }
.rating { color: #f59f00; font-size: 13px; font-weight: 600; }
.count { font-size: 13px; color: var(--text-3); margin-left: auto; }
</style>
