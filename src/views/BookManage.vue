<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import { books, categories } from '../data'

const kw = ref('')
const cat = ref('全部')
const page = ref(1)
const pageSize = 8

const catNames = ['全部', ...categories.map((c) => c.name)]

const filtered = computed(() =>
  books.filter((b) => {
    const hitCat = cat.value === '全部' || b.category === cat.value
    const q = kw.value.trim().toLowerCase()
    const hitKw =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.isbn.includes(q) ||
      b.callNo.toLowerCase().includes(q)
    return hitCat && hitKw
  }),
)

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const rows = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

function setCat(c: string) {
  cat.value = c
  page.value = 1
}

const toast = ref('')
let timer: number | undefined
function say(msg: string) {
  toast.value = msg
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (toast.value = ''), 2200)
}

const stockTotal = computed(() => books.reduce((s, b) => s + b.stock, 0))
</script>

<template>
  <div class="page">
    <PageHead no="02" group="馆藏" title="图书管理" desc="馆藏图书与索书号，按类目归架，在架册数实时结算">
      <button class="btn ghost" @click="say('演示操作：导出馆藏清单（原型未接后端）')">导出清单</button>
      <button class="btn primary" @click="say('演示操作：新增图书（原型未接后端）')">
        <Icon name="plus" :size="13" />新增图书
      </button>
    </PageHead>

    <article class="card">
      <div class="toolbar">
        <label class="search">
          <Icon name="search" :size="14" />
          <input v-model="kw" type="search" placeholder="检索书名 / 作者 / ISBN / 索书号" @input="page = 1" />
        </label>
        <div class="seg">
          <button v-for="c in catNames" :key="c" :class="{ on: cat === c }" @click="setCat(c)">{{ c }}</button>
        </div>
        <div class="spacer" />
        <span class="note">共 {{ filtered.length }} 种 · {{ stockTotal }} 册在架</span>
      </div>

      <div class="table-wrap">
        <table>
          <colgroup>
            <col style="width: 27%" />
            <col style="width: 13%" />
            <col style="width: 13%" />
            <col style="width: 15%" />
            <col style="width: 10%" />
            <col style="width: 9%" />
            <col style="width: 13%" />
          </colgroup>
          <thead>
            <tr>
              <th>书名</th>
              <th>索书号</th>
              <th>作者</th>
              <th>出版社</th>
              <th>类目</th>
              <th>在架</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in rows" :key="b.isbn">
              <td>
                <div class="bk">
                  <img class="cover sm" :src="b.cover" :alt="`${b.title}封面`" loading="lazy" />
                  <span class="bs">{{ b.title }}</span>
                </div>
              </td>
              <td><span class="num">{{ b.callNo }}</span></td>
              <td>{{ b.author }}</td>
              <td class="ell">{{ b.press }}</td>
              <td>{{ b.category }}</td>
              <td><span class="num">{{ b.stock }}</span><span class="muted"> / {{ b.stock + 3 }}</span></td>
              <td>
                <button class="btn sm ghost" @click="say(`演示操作：查看《${b.title}》详情`)">详情</button>
              </td>
            </tr>
            <tr v-if="!rows.length">
              <td colspan="7">
                <div class="empty"><b>没有匹配的馆藏</b>换个关键词或切换类目</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pager">
        <span class="info">共 {{ filtered.length }} 种，当前第 {{ page }} / {{ totalPages }} 页</span>
        <button class="pg" :disabled="page <= 1" @click="page--">‹</button>
        <button v-for="p in totalPages" :key="p" class="pg" :class="{ on: p === page }" @click="page = p">{{ p }}</button>
        <button class="pg" :disabled="page >= totalPages" @click="page++">›</button>
      </div>
    </article>

    <div class="toast" :class="{ on: !!toast }">{{ toast }}</div>
  </div>
</template>

<style scoped>
.bk { display: flex; align-items: center; gap: 10px; min-width: 0; }
.cover.sm {
  flex: none;
  width: 26px;
  height: 39px;
  object-fit: cover;
  border-radius: 4px;
  background: var(--paper-2);
  box-shadow: 0 3px 9px -5px rgba(16, 24, 40, 0.6), 0 0 0 1px rgba(16, 24, 40, 0.06);
}
.bs { color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
@media (max-width: 820px) {
  .seg { flex-wrap: wrap; }
}
</style>
