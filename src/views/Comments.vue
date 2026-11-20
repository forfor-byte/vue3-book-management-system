<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import { comments } from '../data'

const list = ref(comments.map((c) => ({ ...c })))
const filter = ref('待审核')
const kw = ref('')

const filters = ['待审核', '已通过', '已拒绝', '全部']

const filtered = computed(() =>
  list.value.filter(
    (c) =>
      (filter.value === '全部' || c.status === filter.value) &&
      (c.book + c.reader + c.content).toLowerCase().includes(kw.value.trim().toLowerCase()),
  ),
)

const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n)

const toast = ref('')
let timer: number | undefined
function say(msg: string) {
  toast.value = msg
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (toast.value = ''), 2200)
}

function judge(book: string, reader: string, pass: boolean) {
  const c = list.value.find((x) => x.book === book && x.reader === reader)
  if (!c) return
  c.status = pass ? '已通过' : '已拒绝'
  say(`${reader} 对《${book}》的书评已${pass ? '通过并发布' : '隐藏'}`)
}

const pending = computed(() => list.value.filter((c) => c.status === '待审核').length)
const avg = computed(() => {
  const src = list.value
  return src.length ? (src.reduce((s, c) => s + c.rating, 0) / src.length).toFixed(1) : '0.0'
})
</script>

<template>
  <div class="page">
    <PageHead no="08" group="流通" title="评论管理" desc="书评与评分审核，隐藏后不在前台展示">
      <button class="btn primary" @click="say('演示操作：导出评论（原型未接后端）')">导出评论</button>
    </PageHead>

    <article class="card">
      <div class="card-h">
        <h2>待审书评</h2>
        <span class="note">{{ pending }} 条待审 · 平均评分 {{ avg }}</span>
      </div>

      <div class="toolbar" style="border-bottom: 1px solid var(--rule-soft)">
        <label class="search">
          <Icon name="search" :size="14" />
          <input v-model="kw" type="search" placeholder="检索书目 / 读者 / 书评内容" />
        </label>
        <div class="seg">
          <button v-for="f in filters" :key="f" :class="{ on: filter === f }" @click="filter = f">{{ f }}</button>
        </div>
      </div>

      <div class="card-b" style="padding-top: 2px; padding-bottom: 6px">
        <div v-for="c in filtered" :key="c.book + c.reader" class="cm">
          <div class="cm-h">
            <span class="cm-av">{{ c.reader.slice(0, 1) }}</span>
            <b>{{ c.reader }}</b>
            <span>评《{{ c.book }}》</span>
            <span style="color: var(--rule)">·</span>
            <span>{{ c.time }}</span>
            <span class="stars">{{ stars(c.rating) }}</span>
          </div>
          <p>{{ c.content }}</p>
          <div class="acts">
            <template v-if="c.status === '待审核'">
              <button class="btn sm ghost" @click="judge(c.book, c.reader, true)">通过</button>
              <button class="btn sm ghost" @click="judge(c.book, c.reader, false)">隐藏</button>
              <span class="note">未审核前不在前台展示</span>
            </template>
            <template v-else>
              <span class="tag" :class="c.status === '已通过' ? 'ok' : 'done'">{{ c.status }}</span>
              <button class="btn sm ghost" @click="c.status = '待审核'; say('已退回待审队列')">撤回</button>
            </template>
          </div>
        </div>

        <div v-if="!filtered.length" class="empty">
          <b>这一类暂时没有书评</b>切换筛选或清空检索词
        </div>
      </div>
    </article>

    <div class="toast" :class="{ on: !!toast }">{{ toast }}</div>
  </div>
</template>
