<script setup lang="ts">
import { computed, ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
import type { Page } from './data'

import Home from './views/Home.vue'
import UserManage from './views/UserManage.vue'
import ReaderManage from './views/ReaderManage.vue'
import BookManage from './views/BookManage.vue'
import CategoryManage from './views/CategoryManage.vue'
import BorrowManage from './views/BorrowManage.vue'
import Statistics from './views/Statistics.vue'
import Recommend from './views/Recommend.vue'
import Comments from './views/Comments.vue'
import Settings from './views/Settings.vue'

const views: Record<Page, unknown> = {
  首页: Home,
  用户管理: UserManage,
  读者管理: ReaderManage,
  图书管理: BookManage,
  分类管理: CategoryManage,
  借阅管理: BorrowManage,
  统计分析: Statistics,
  图书推荐: Recommend,
  评论管理: Comments,
  系统设置: Settings,
}

const active = ref<Page>('首页')
const sidebarOpen = ref(false)

const current = computed(() => views[active.value])

function go(page: Page) {
  active.value = page
  sidebarOpen.value = false
}
</script>

<template>
  <div class="shell">
    <Sidebar :active="active" :open="sidebarOpen" @select="go" />

    <div v-if="sidebarOpen" class="scrim" @click="sidebarOpen = false" />

    <div class="main">
      <Topbar :page="active" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main class="content">
        <component :is="current" :key="active" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: var(--sidebar-w) 1fr;
  min-height: 100vh;
  transition: grid-template-columns 0.24s ease;
}
.main { min-width: 0; display: flex; flex-direction: column; }
.content { flex: 1; width: 100%; }
.scrim { position: fixed; inset: 0; z-index: 45; background: rgba(16, 24, 40, 0.42); }

@media (max-width: 820px) {
  .shell { grid-template-columns: 1fr; }
}
</style>
