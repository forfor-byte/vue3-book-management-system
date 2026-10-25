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
  <div class="app-shell">
    <Sidebar :active="active" :open="sidebarOpen" @select="go" />

    <div v-if="sidebarOpen" class="scrim" @click="sidebarOpen = false" />

    <div class="app-main">
      <Topbar :page="active" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main class="content">
        <component :is="current" :key="active" />
      </main>
      <footer class="app-foot">墨卷 · 图书管理系统 © 2026</footer>
    </div>
  </div>
</template>

<style scoped>
.app-shell { min-height: 100vh; display: flex; }
.app-main {
  flex: 1;
  min-width: 0;
  margin-left: var(--sidebar-w);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.28s ease;
}
.content { flex: 1; padding: 24px 28px 12px; width: 100%; max-width: 1440px; margin: 0 auto; }
.app-foot { padding: 18px 28px 22px; text-align: center; font-size: 12px; color: var(--text-3); }

.scrim {
  position: fixed;
  inset: 0;
  z-index: 35;
  background: rgba(16, 23, 34, 0.45);
  backdrop-filter: blur(2px);
}

@media (max-width: 820px) {
  .app-main { margin-left: 0; }
  .content { padding: 18px 16px 10px; }
}
</style>
