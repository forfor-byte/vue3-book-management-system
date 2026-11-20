<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import { borrows } from '../data'

const status = ref('全部')
const kw = ref('')
const filters = ['全部', '借出中', '待归还', '已逾期', '已归还']

const filtered = computed(() =>
  borrows.filter(
    (b) =>
      (status.value === '全部' || b.status === status.value) &&
      (b.book + b.reader + b.id).toLowerCase().includes(kw.value.trim().toLowerCase()),
  ),
)

const overdue = computed(() => borrows.filter((b) => b.status === '已逾期').length)
const onLoanCount = computed(() => borrows.filter((b) => b.status === '借出中' || b.status === '待归还').length)
const dueCount = computed(() => borrows.filter((b) => b.status === '待归还').length)
const backCount = computed(() => borrows.filter((b) => b.status === '已归还').length)

const tag = (s: string) =>
  s === '已逾期' ? 'over' : s === '已归还' ? 'done' : s === '待归还' ? 'warn' : 'ok'

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
    <PageHead no="07" group="流通" title="借阅管理" desc="借出—应还—归还的完整流转，逾期记录自动标红">
      <button class="btn ghost" @click="say(`已筛出 ${overdue} 条逾期记录`)">批量催还</button>
      <button class="btn primary" @click="say('演示操作：办理借书（原型未接后端）')">
        <Icon name="plus" :size="13" />办理借书
      </button>
    </PageHead>

    <section class="metrics">
      <div class="metric">
        <div class="k"><i />在借合计</div>
        <div class="v">{{ onLoanCount }}<small>笔</small></div>
        <div class="d">含待归还 {{ dueCount }} 笔</div>
      </div>
      <div class="metric">
        <div class="k"><i />待归还</div>
        <div class="v">{{ dueCount }}<small>笔</small></div>
        <div class="d">应还日临近</div>
      </div>
      <div class="metric">
        <div class="k"><i class="sand" />已归还</div>
        <div class="v">{{ backCount }}<small>笔</small></div>
        <div class="d">本月累计</div>
      </div>
      <div class="metric risk">
        <div class="k"><i class="seal" />已逾期</div>
        <div class="v">{{ overdue }}<small>笔</small></div>
        <div class="d warn">建议优先催还</div>
      </div>
    </section>

    <article class="card" style="margin-top: 14px">
      <div class="toolbar">
        <label class="search">
          <Icon name="search" :size="14" />
          <input v-model="kw" type="search" placeholder="检索读者 / 书名 / 单号" />
        </label>
        <div class="seg">
          <button v-for="f in filters" :key="f" :class="{ on: status === f }" @click="status = f">{{ f }}</button>
        </div>
        <div class="spacer" />
        <span class="note">逾期 <b class="tnum" style="color: var(--seal)">{{ overdue }}</b> 条</span>
      </div>

      <div class="table-wrap">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 28%" />
            <col style="width: 13%" />
            <col style="width: 13%" />
            <col style="width: 13%" />
            <col style="width: 13%" />
          </colgroup>
          <thead>
            <tr>
              <th>读者</th>
              <th>图书</th>
              <th>借出日</th>
              <th>应还日</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in filtered" :key="b.id">
              <td>
                <div class="who">
                  <b>{{ b.reader }}</b>
                  <span>{{ b.id }}</span>
                </div>
              </td>
              <td class="ell2">{{ b.book }}</td>
              <td><span class="num">{{ b.borrowAt }}</span></td>
              <td><span class="num">{{ b.dueAt }}</span></td>
              <td><span class="tag" :class="tag(b.status)">{{ b.status }}</span></td>
              <td>
                <button class="btn sm ghost" @click="say(`演示操作：办理《${b.book}》${b.status === '已逾期' ? '催还' : '续借'}`)">
                  {{ b.status === '已逾期' ? '催还' : b.status === '已归还' ? '详情' : '续借' }}
                </button>
              </td>
            </tr>
            <tr v-if="!filtered.length">
              <td colspan="6"><div class="empty"><b>没有匹配的记录</b>换个关键词或切换筛选</div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pager">
        <span class="info">共 {{ filtered.length }} 条演示记录</span>
      </div>
    </article>

    <div class="toast" :class="{ on: !!toast }">{{ toast }}</div>
  </div>
</template>

<style scoped>
.who b { display: block; font-weight: 500; color: var(--text); font-size: 12.5px; }
.who span { display: block; font-family: var(--serif); font-size: 10.5px; color: var(--text-3); }
.ell2 { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
