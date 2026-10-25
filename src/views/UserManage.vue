<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'

interface User {
  username: string
  name: string
  email: string
  phone: string
  role: '管理员' | '普通用户'
  status: '启用' | '停用'
  created: string
}
const list = ref<User[]>([
  { username: 'admin', name: '系统管理员', email: 'admin@example.com', phone: '13800138000', role: '管理员', status: '启用', created: '2023-01-01' },
  { username: 'zhangsan', name: '张三', email: 'zhangsan@example.com', phone: '13800138001', role: '普通用户', status: '启用', created: '2023-09-01' },
  { username: 'lisi', name: '李四', email: 'lisi@example.com', phone: '13800138002', role: '普通用户', status: '启用', created: '2023-09-02' },
  { username: 'wangwu', name: '王五', email: 'wangwu@example.com', phone: '13800138003', role: '普通用户', status: '停用', created: '2022-09-01' },
  { username: 'zhaoliu', name: '赵六', email: 'zhaoliu@example.com', phone: '13800138004', role: '普通用户', status: '启用', created: '2023-09-05' },
  { username: 'qianqi', name: '钱七', email: 'qianqi@example.com', phone: '13800138005', role: '普通用户', status: '启用', created: '2022-09-08' },
])

const kw = ref('')
const role = ref('全部')
const filtered = computed(() =>
  list.value.filter(
    (u) =>
      (role.value === '全部' || u.role === role.value) &&
      (u.username + u.name + u.email).toLowerCase().includes(kw.value.toLowerCase()),
  ),
)
</script>

<template>
  <div>
    <PageHead
      title="用户管理"
      desc="管理系统登录账号、角色与权限状态。"
      actions
    >
      <template #actions>
        <button class="btn"><Icon name="filter" :size="15" />筛选</button>
        <button class="btn btn-primary"><Icon name="plus" :size="15" />新增用户</button>
      </template>
    </PageHead>

    <article class="card">
      <div class="filters card-body">
        <div class="field"><Icon name="search" :size="15" /><input v-model="kw" class="input" placeholder="用户名 / 姓名 / 邮箱" /></div>
        <select v-model="role" class="select">
          <option>全部</option>
          <option>管理员</option>
          <option>普通用户</option>
        </select>
        <span class="count">共 {{ filtered.length }} 个账号</span>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr><th>用户名</th><th>姓名</th><th>邮箱</th><th>手机号</th><th>角色</th><th>状态</th><th>创建时间</th><th style="text-align:right">操作</th></tr>
          </thead>
          <tbody>
            <tr v-for="u in filtered" :key="u.username">
              <td><b class="cell-main">{{ u.username }}</b></td>
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td class="num">{{ u.phone }}</td>
              <td><span class="tag" :class="{ 'tag-neutral': u.role !== '管理员' }">{{ u.role }}</span></td>
              <td><span class="tag" :class="u.status === '启用' ? 'tag-success' : 'tag-danger'">{{ u.status }}</span></td>
              <td class="num">{{ u.created }}</td>
              <td style="text-align:right; white-space:nowrap">
                <button class="btn-link"><Icon name="edit" :size="14" />编辑</button>
                <button class="btn-link" style="color:var(--danger)"><Icon name="trash" :size="14" />删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pager">
        <span class="pager-info">第 1-{{ filtered.length }} 条，共 {{ filtered.length }} 条</span>
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
