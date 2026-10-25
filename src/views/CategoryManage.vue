<script setup lang="ts">
import { ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'
import { categories, books } from '../data'

const open = ref<string[]>(categories.map((c) => c.name))
const selected = ref<string | null>(null)

const toggle = (name: string) => {
  const i = open.value.indexOf(name)
  i >= 0 ? open.value.splice(i, 1) : open.value.push(name)
}

const total = categories.reduce((s, c) => s + c.count, 0)
const catBooks = (name: string) => books.filter((b) => b.category === name)
</script>

<template>
  <div>
    <PageHead title="分类管理" desc="图书分类目录维护与各级类目统计。" actions>
      <template #actions>
        <button class="btn"><Icon name="plus" :size="15" />新增一级分类</button>
        <button class="btn btn-primary"><Icon name="plus" :size="15" />新增子分类</button>
      </template>
    </PageHead>

    <div class="cat-layout">
      <article class="card">
        <div class="card-head">
          <h3 class="card-title">分类目录</h3>
          <span class="total">共 {{ total }} 册 · {{ categories.length }} 个一级分类</span>
        </div>
        <ul class="tree">
          <li v-for="c in categories" :key="c.name" :class="{ sel: selected === c.name }" @click="selected = c.name">
            <div class="tree-row" :class="{ parent: true }">
              <button class="tree-toggle" @click.stop="toggle(c.name)">
                <Icon :name="open.includes(c.name) ? 'chevron' : 'chevron'" :size="15" :style="{ transform: open.includes(c.name) ? 'rotate(0deg)' : 'rotate(-90deg)' }" />
              </button>
              <Icon name="folder" :size="16" />
              <span class="tree-name">{{ c.name }}</span>
              <em class="tree-count">{{ c.count }}</em>
              <span class="tree-ops">
                <button class="btn-link"><Icon name="edit" :size="13" /></button>
                <button class="btn-link" style="color:var(--danger)"><Icon name="plus" :size="13" /></button>
              </span>
            </div>
            <ul v-if="open.includes(c.name)" class="tree-children">
              <li v-for="ch in c.children" :key="ch.name" class="tree-row child" @click.stop="selected = ch.name">
                <span class="tree-dot"></span>
                <span class="tree-name">{{ ch.name }}</span>
                <em class="tree-count">{{ ch.count }}</em>
                <span class="tree-ops">
                  <button class="btn-link"><Icon name="edit" :size="13" /></button>
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </article>

      <article class="card">
        <div class="card-head">
          <h3 class="card-title">{{ selected || '分类' }} · 关联书目</h3>
        </div>
        <div v-if="selected && catBooks(selected).length" class="cat-books">
          <div v-for="b in catBooks(selected)" :key="b.isbn" class="cb-item">
            <span class="cb-mark">{{ b.title.slice(0, 1) }}</span>
            <div class="cb-info"><b>{{ b.title }}</b><small>{{ b.author }}</small></div>
            <span class="cb-stock">库存 {{ b.stock }}</span>
          </div>
        </div>
        <div v-else class="empty">
          <Icon name="folder" :size="28" style="opacity:.4; margin-bottom:6px" />
          <p>选择左侧分类查看关联书目</p>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.cat-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; align-items: start; }
.total { font-size: 12px; color: var(--text-3); }
.tree { padding: 10px 12px; }
.tree li { user-select: none; }
.tree-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}
.tree-row:hover { background: var(--surface-2); }
.tree-row.sel, .tree li.sel > .tree-row { background: var(--accent-soft); }
.tree-toggle { border: 0; background: transparent; color: var(--text-3); padding: 0; display: grid; }
.tree-name { flex: 1; font-size: 14px; color: var(--text-1); }
.tree-count { font-size: 12px; color: var(--text-3); font-variant-numeric: tabular-nums; }
.tree-ops { opacity: 0; transition: opacity 0.15s; display: flex; }
.tree-row:hover .tree-ops { opacity: 1; }
.tree-children { margin-left: 20px; }
.tree-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border-strong); margin: 0 5px; }

.cat-books { padding: 8px 14px; }
.cb-item { display: flex; align-items: center; gap: 12px; padding: 11px 6px; border-bottom: 1px dashed var(--border); }
.cb-item:last-child { border-bottom: 0; }
.cb-mark {
  flex: none; width: 30px; height: 40px;
  display: grid; place-items: center;
  border-radius: 5px; background: var(--accent-soft); color: var(--accent);
  font-weight: 600;
}
.cb-info { flex: 1; min-width: 0; }
.cb-info b { display: block; font-size: 13px; color: var(--text-1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cb-info small { font-size: 12px; color: var(--text-3); }
.cb-stock { font-size: 12px; color: var(--text-3); }

@media (max-width: 1080px) { .cat-layout { grid-template-columns: 1fr; } }
</style>
