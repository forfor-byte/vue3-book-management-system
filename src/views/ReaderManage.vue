<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import { readers } from '../data'

const kw = ref('')
const type = ref('全部')
const types = ['全部', '教师', '研究生', '本科生', '社会读者']

const filtered = computed(() =>
  readers.filter(
    (r) =>
      (type.value === '全部' || r.type === type.value) &&
      (r.name + r.id + r.dept).toLowerCase().includes(kw.value.trim().toLowerCase()),
  ),
)

const pageSize = 8
const page = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const paged = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const from = computed(() => (filtered.value.length ? (page.value - 1) * pageSize + 1 : 0))
const to = computed(() => Math.min(filtered.value.length, page.value * pageSize))

function goPage(n: number) {
  page.value = Math.min(totalPages.value, Math.max(1, n))
}

watch([kw, type], () => (page.value = 1))

const stat = (v: string) => readers.filter((r) => r.type === v).length
const sleeping = computed(() => readers.filter((r) => r.state === '休眠').length)

const toast = ref('')
let timer: number | undefined
function say(msg: string) {
  toast.value = msg
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (toast.value = ''), 2200)
}

const stateTag = (s: string) => (s === '正常' ? 'ok' : s === '待催还' ? 'warn' : 'done')
</script>

<template>
  <div class="page">
    <PageHead no="05" group="读者" title="读者管理" desc="读者证信息与在借情况，休眠读者可批量清理">
      <button class="btn ghost" @click="say('演示操作：导出读者名单（原型未接后端）')">导出名单</button>
      <button class="btn primary" @click="say('演示操作：登记读者（原型未接后端）')">
        <Icon name="plus" :size="13" />登记读者
      </button>
    </PageHead>

    <article class="card">
      <div class="toolbar">
        <label class="search">
          <Icon name="search" :size="14" />
          <input v-model="kw" type="search" placeholder="检索姓名 / 读者证号 / 院系" />
        </label>
        <div class="seg">
          <button v-for="t in types" :key="t" :class="{ on: type === t }" @click="type = t">{{ t }}</button>
        </div>
        <div class="spacer" />
        <span class="note">共 {{ filtered.length }} 位</span>
      </div>

      <div class="table-wrap">
        <table class="t-readers">
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 24%" />
            <col style="width: 14%" />
            <col style="width: 12%" />
            <col style="width: 14%" />
            <col style="width: 12%" />
          </colgroup>
          <thead>
            <tr>
              <th>读者</th>
              <th>读者证号</th>
              <th>等级</th>
              <th>在借</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in paged" :key="r.id">
              <td>
                <div class="who">
                  <span class="av">{{ r.name.slice(0, 1) }}</span>
                  <span class="nm">{{ r.name }}</span>
                </div>
              </td>
              <td><span class="num">{{ r.id }}</span></td>
              <td>{{ r.type }}</td>
              <td><span class="num">{{ r.onLoan }}</span> 册</td>
              <td><span class="tag" :class="stateTag(r.state)">{{ r.state }}</span></td>
              <td><button class="btn sm ghost" @click="say(`演示操作：查看 ${r.name} 的详情`)">详情</button></td>
            </tr>
            <tr v-if="!filtered.length">
              <td colspan="6"><div class="empty"><b>没有匹配的读者</b>换个关键词或切换等级</div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pager">
        <span class="info">第 {{ from }}—{{ to }} 位 · 共 {{ filtered.length }} 位</span>
        <button v-for="n in totalPages" :key="n" class="pg" :class="{ on: page === n }" @click="goPage(n)">{{ n }}</button>
        <button class="pg" :disabled="page >= totalPages" @click="goPage(page + 1)">›</button>
      </div>
    </article>

    <article class="card" style="margin-top: 18px">
      <div class="meta-strip">
        <div class="ms-item"><span>教师</span><em>{{ stat('教师') }}<i>位</i></em></div>
        <div class="ms-item"><span>研究生</span><em>{{ stat('研究生') }}<i>位</i></em></div>
        <div class="ms-item"><span>本科生</span><em>{{ stat('本科生') }}<i>位</i></em></div>
        <div class="ms-item"><span>社会读者 / 休眠</span><em>{{ stat('社会读者') }}<i>位</i> · {{ sleeping }}<i>位</i></em></div>
      </div>
    </article>

    <div class="toast" :class="{ on: !!toast }">{{ toast }}</div>
  </div>
</template>

<style scoped>
.who { display: flex; align-items: center; gap: 9px; min-width: 0; }
.av {
  flex: none;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--brand-soft);
  color: var(--brand);
  font-size: 11.5px;
  font-weight: 600;
}
.nm { color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
@media (max-width: 560px) {
  .t-readers { min-width: 0; }
}
</style>
