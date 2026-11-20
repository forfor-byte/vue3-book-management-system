<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import { books, categories, categoryTotal, type Category } from '../data'

const toast = ref('')
let timer: number | undefined
function say(msg: string) {
  toast.value = msg
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (toast.value = ''), 2200)
}

const total = computed(() => categories.reduce((s, c) => s + c.count, 0))
const pct = (n: number) => Math.round((n / total.value) * 100)

const fallback: Category = categories[0] ?? { name: '', count: 1, code: '', shelf: '', out: 0, children: [] }
const selected = ref(fallback.name)
const cur = computed<Category>(() => categories.find((c) => c.name === selected.value) ?? fallback)
const minis = computed(() => books.filter((b) => b.category === cur.value.name).slice(0, 4))
</script>

<template>
  <div class="page">
    <PageHead no="03" group="馆藏" title="分类管理" desc="按一级类目归架，用于采编与盘点的上架定位">
      <button class="btn ghost" @click="say('演示操作：调整排架（原型未接后端）')">调整排架</button>
      <button class="btn primary" @click="say('演示操作：新增类目（原型未接后端）')">
        <Icon name="plus" :size="13" />新增类目
      </button>
    </PageHead>

    <div class="cat-grid">
      <div
        v-for="c in categories"
        :key="c.name"
        class="cat"
        :class="{ on: c.name === selected }"
        @click="selected = c.name"
      >
        <div class="code">{{ c.code }}</div>
        <div class="nm">{{ c.name }}</div>
        <div class="ct">{{ c.count.toLocaleString() }} 册 · 占比 {{ pct(c.count) }}%</div>
        <div class="ct dim">近 30 天借出 {{ c.out }} 册 · {{ c.shelf }}</div>
        <div class="track"><div class="fill" :style="{ width: pct(c.count) + '%' }" /></div>
      </div>
    </div>

    <div class="split">
      <article class="card">
        <div class="card-h">
          <h2>类目明细与排架</h2>
          <span class="note">{{ categories.length }} 类 · {{ categoryTotal.toLocaleString() }} 册</span>
        </div>
        <div class="table-wrap">
          <table>
            <colgroup>
              <col style="width: 18%" />
              <col style="width: 14%" />
              <col style="width: 16%" />
              <col style="width: 12%" />
              <col style="width: 16%" />
              <col style="width: 24%" />
            </colgroup>
            <thead>
              <tr>
                <th>类目</th>
                <th>馆藏前缀</th>
                <th>在册</th>
                <th>占比</th>
                <th>近 30 天借出</th>
                <th>排架位置</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in categories" :key="c.name" :class="{ sel: c.name === selected }">
                <td class="strong">{{ c.name }}</td>
                <td><span class="num">{{ c.code }}</span></td>
                <td><span class="num">{{ c.count.toLocaleString() }}</span> 册</td>
                <td><span class="num">{{ pct(c.count) }}%</span></td>
                <td><span class="num">{{ c.out }}</span> 册</td>
                <td class="ell">{{ c.shelf }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-b footnote">
          一级类目下再按著者号细分书架位；「其他」收纳地方文献与捐赠本，单独造册、闭架管理，不参与常规排架。
          新增类目后需同步更新馆藏号前缀规则，否则盘点时无法定位。
        </div>
      </article>

      <article class="card">
        <div class="card-h">
          <h2>{{ cur.name }} · 细目</h2>
          <span class="note">{{ cur.code }} · {{ cur.shelf }}</span>
        </div>
        <div class="card-b">
          <div v-for="ch in cur.children" :key="ch.name" class="sub">
            <span class="sn">{{ ch.name }}</span>
            <span class="sk"><span class="sf" :style="{ width: Math.round((ch.count / cur.count) * 100) + '%' }" /></span>
            <span class="sv">{{ ch.count }}</span>
          </div>
          <div class="hr" />
          <p class="note" style="margin-bottom: 8px">该目下常借书目</p>
          <div v-for="b in minis" :key="b.isbn" class="mb">
            <b>{{ b.title }}</b>
            <span>{{ b.author }} · 在架 {{ b.stock }}</span>
          </div>
          <div v-if="!minis.length" class="empty" style="padding: 18px 0">该目下暂无示例书目</div>
        </div>
      </article>
    </div>

    <div class="toast" :class="{ on: !!toast }">{{ toast }}</div>
  </div>
</template>

<style scoped>
.split { display: grid; grid-template-columns: 1.45fr 1fr; gap: 14px; align-items: start; margin-top: 14px; }
.footnote { border-top: 1px solid var(--rule-soft); font-size: 11.5px; color: var(--text-3); line-height: 1.7; }
.ell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cat.on { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(91, 91, 214, 0.1); }
tbody tr.sel { background: #f1f1fe; }
.sub { display: grid; grid-template-columns: 4.6em 1fr 3em; gap: 9px; align-items: center; margin-bottom: 9px; }
.sn { font-size: 11.5px; color: var(--text-2); }
.sk { height: 8px; border-radius: 999px; background: var(--surface-2); display: block; overflow: hidden; }
.sf { display: block; height: 8px; border-radius: 999px; background: linear-gradient(90deg, #7d7de8, var(--brand)); }
.sv { font-size: 11.5px; font-weight: 600; color: var(--text-2); text-align: right; font-variant-numeric: tabular-nums; }
.hr { height: 1px; background: var(--rule-soft); margin: 14px 0 12px; }
.mb { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--rule-soft); }
.mb:last-child { border-bottom: 0; }
.mb b { font-size: 12px; font-weight: 500; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mb span { flex: none; font-size: 10.5px; color: var(--text-3); }
@media (max-width: 1000px) {
  .split { grid-template-columns: 1fr; }
}
</style>
