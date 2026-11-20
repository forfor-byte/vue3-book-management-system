<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import { permissions, users } from '../data'

const list = ref(users.map((u) => ({ ...u })))
const kw = ref('')

const filtered = computed(() =>
  list.value.filter((u) => (u.account + u.name + u.dept).toLowerCase().includes(kw.value.trim().toLowerCase())),
)

const okCount = computed(() => list.value.filter((u) => u.on).length)

const roleTag = (role: string) => {
  if (role === '管理员') return 'brand'
  if (role === '编目员') return 'info'
  if (role === '审核员') return 'warn'
  return 'mute'
}

const toast = ref('')
let timer: number | undefined
function say(msg: string) {
  toast.value = msg
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (toast.value = ''), 2200)
}

function toggle(account: string) {
  const u = list.value.find((x) => x.account === account)
  if (!u) return
  u.on = !u.on
  say(`${u.name} 的登录已${u.on ? '启用' : '停用'}`)
}
</script>

<template>
  <div class="page">
    <PageHead no="06" group="读者" title="用户管理" desc="后台账号与角色权限，开关表示是否启用登录">
      <button class="btn primary" @click="say('演示操作：新增账号（原型未接后端）')">
        <Icon name="plus" :size="13" />新增账号
      </button>
    </PageHead>

    <article class="card">
      <div class="toolbar">
        <label class="search">
          <Icon name="search" :size="14" />
          <input v-model="kw" type="search" placeholder="检索账号 / 姓名 / 部门" />
        </label>
        <div class="spacer" />
        <span class="note">共 {{ filtered.length }} 个账号 · {{ okCount }} 个已启用</span>
      </div>

      <div class="table-wrap">
        <table>
          <colgroup>
            <col style="width: 26%" />
            <col style="width: 16%" />
            <col style="width: 22%" />
            <col style="width: 24%" />
            <col style="width: 12%" />
          </colgroup>
          <thead>
            <tr>
              <th>账号</th>
              <th>角色</th>
              <th>部门</th>
              <th>最近登录</th>
              <th>启用</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filtered" :key="u.account">
              <td><span class="acc">{{ u.account }}</span></td>
              <td><span class="tag" :class="roleTag(u.role)">{{ u.role }}</span></td>
              <td>{{ u.dept }}</td>
              <td><span class="num">{{ u.last }}</span></td>
              <td>
                <span class="sw" :class="{ on: u.on }" role="switch" :aria-checked="u.on" tabindex="0" @click="toggle(u.account)" @keydown.enter.prevent="toggle(u.account)"><i /></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pager"><span class="info">共 {{ list.length }} 个账号 · {{ okCount }} 个已启用</span></div>
    </article>

    <article class="card" style="margin-top: 14px">
      <div class="card-h"><h2>角色权限</h2><span class="note">按角色授予，改动即时生效</span></div>
      <div class="table-wrap">
        <table>
          <colgroup>
            <col style="width: 38%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 17%" />
          </colgroup>
          <thead>
            <tr><th>权限项</th><th>管理员</th><th>编目员</th><th>审核员</th><th>读者</th></tr>
          </thead>
          <tbody>
            <tr v-for="p in permissions" :key="p.name">
              <td class="strong">{{ p.name }}</td>
              <td v-for="(v, i) in p.roles" :key="i">
                <span class="mk" :class="{ no: !v }">{{ v ? '✓' : '—' }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-b foot">权限变更后会写入操作日志；读者账号仅开放前台借还与书评提交。</div>
    </article>

    <div class="toast" :class="{ on: !!toast }">{{ toast }}</div>
  </div>
</template>

<style scoped>
.acc { font-family: var(--sans); color: var(--ink); }
.foot { border-top: 1px solid var(--rule-soft); font-size: 11.5px; color: var(--text-3); }
</style>
