<script setup lang="ts">
import { reactive, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import { settingRules, settingSwitches } from '../data'

const rules = reactive(settingRules.map((r) => ({ ...r })))
const switches = reactive(settingSwitches.map((s) => ({ ...s })))

const toast = ref('')
let timer: number | undefined
function say(msg: string) {
  toast.value = msg
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (toast.value = ''), 2200)
}

function toggle(key: string) {
  const s = switches.find((x) => x.key === key)
  if (!s) return
  s.on = !s.on
  say(`${s.label}已${s.on ? '开启' : '关闭'}`)
}

function save() {
  say('设置已保存（演示：原型未接后端，刷新后恢复默认）')
}
</script>

<template>
  <div class="page">
    <PageHead no="10" group="系统" title="系统设置" desc="馆务参数与借阅规则，修改后写入馆务日志">
      <button class="btn ghost" @click="say('已恢复为默认参数')">恢复默认</button>
      <button class="btn primary" @click="save">保存设置</button>
    </PageHead>

    <div class="grid2">
      <article class="card">
        <div class="card-h"><h2>馆务参数</h2><span class="note">影响借还与凭条打印</span></div>
        <div class="card-b">
          <div class="form">
            <div v-for="r in rules" :key="r.key" class="frow">
              <label :for="'f-' + r.key">{{ r.label }}<span>{{ r.hint }}</span></label>
              <input :id="'f-' + r.key" v-model="r.value" class="finput" />
            </div>
          </div>
        </div>
        <div class="card-b" style="border-top: 1px solid var(--rule-soft); padding-top: 12px">
          <button class="btn primary" @click="save">保存修改</button>
          <span class="note" style="margin-left: 10px">改动即时生效于新办理的借阅</span>
        </div>
      </article>

      <article class="card">
        <div class="card-h"><h2>流转开关</h2><span class="note">点击即切换</span></div>
        <div class="card-b">
          <div v-for="s in switches" :key="s.key" class="switch-row">
            <div class="sw-text">
              <b>{{ s.label }}</b>
              <span>{{ s.hint }}</span>
            </div>
            <span
              class="sw"
              :class="{ on: s.on }"
              role="switch"
              :aria-checked="s.on"
              tabindex="0"
              @click="toggle(s.key)"
              @keydown.enter.prevent="toggle(s.key)"
            ><i /></span>
          </div>
        </div>
      </article>
    </div>

    <article class="card" style="margin-top: 16px">
      <div class="card-h"><h2>账号安全</h2><span class="note">当前登录：管理员 · admin</span></div>
      <div class="card-b">
        <div class="acts">
          <button class="btn ghost" @click="say('演示操作：修改密码（原型未接后端）')">修改密码</button>
          <button class="btn ghost" @click="say('演示操作：查看操作日志（原型未接后端）')">查看操作日志</button>
          <button class="btn ghost" @click="say('演示操作：导出配置（原型未接后端）')">导出配置</button>
        </div>
      </div>
    </article>

    <div class="toast" :class="{ on: !!toast }">{{ toast }}</div>
  </div>
</template>

<style scoped>
.grid2 { display: grid; grid-template-columns: 1.25fr 1fr; gap: 14px; align-items: start; }
.form { display: flex; flex-direction: column; gap: 14px; }
.frow { display: grid; grid-template-columns: 132px 1fr; align-items: center; gap: 12px; }
.frow label { font-size: 12.5px; font-weight: 500; color: var(--text); }
.frow label span { display: block; font-size: 10.5px; color: var(--text-3); margin-top: 2px; font-weight: 400; }
.finput {
  width: 100%;
  height: 36px;
  padding: 0 11px;
  border: 1px solid var(--rule);
  background: var(--surface);
  color: var(--text);
  font-family: var(--sans);
  font-size: 12.5px;
  border-radius: var(--radius-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.finput:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 3px rgba(91, 91, 214, 0.12); }
.sw-text b { display: block; font-size: 12.5px; font-weight: 500; color: var(--text); }
.sw-text span { display: block; font-size: 11px; color: var(--text-3); margin-top: 2px; }
.switch-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--rule-soft); }
.switch-row:last-child { border-bottom: 0; }
.acts { display: flex; flex-wrap: wrap; gap: 8px; }
@media (max-width: 1000px) {
  .grid2 { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .frow { grid-template-columns: 1fr; gap: 6px; }
}
</style>
