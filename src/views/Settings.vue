<script setup lang="ts">
import { reactive, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import Icon from '../components/Icon.vue'

const form = reactive({
  nickname: '管理员',
  email: 'admin@example.com',
  phone: '13800138000',
  language: '简体中文',
  timezone: 'UTC+8 中国标准时间',
  notifyBorrow: true,
  notifyOverdue: true,
  notifyReview: false,
  weeklyReport: true,
  darkMode: false,
  twoFactor: true,
})

const saved = ref(false)
const save = () => {
  saved.value = true
  setTimeout(() => (saved.value = false), 2000)
}
</script>

<template>
  <div>
    <PageHead title="系统设置" desc="管理个人资料、通知偏好与安全选项。" />

    <div class="two-col wide-left">
      <article class="card">
        <div class="card-head"><h3 class="card-title">基本资料</h3></div>
        <div class="card-body form">
          <div class="form-row"><label>昵称</label><input v-model="form.nickname" class="input" /></div>
          <div class="form-row"><label>邮箱</label><input v-model="form.email" class="input" /></div>
          <div class="form-row"><label>联系电话</label><input v-model="form.phone" class="input" /></div>
          <div class="form-row"><label>界面语言</label><select v-model="form.language" class="select"><option>简体中文</option><option>English</option></select></div>
          <div class="form-row"><label>时区</label><select v-model="form.timezone" class="select"><option>UTC+8 中国标准时间</option></select></div>
        </div>
        <div class="card-foot"><button class="btn btn-primary" @click="save"><Icon name="check" :size="15" />保存资料</button><span v-if="saved" class="saved">已保存 ✓</span></div>
      </article>

      <div class="stack">
        <article class="card">
          <div class="card-head"><h3 class="card-title">通知偏好</h3></div>
          <div class="card-body">
            <label v-for="(v, k) in { notifyBorrow: '借阅状态变更提醒', notifyOverdue: '逾期未还提醒', notifyReview: '新评论审核提醒', weeklyReport: '每周运营周报' }" :key="k" class="switch-row">
              <span>{{ v }}</span>
              <span class="switch" :class="{ on: (form as any)[k] }"><i @click="(form as any)[k] = !(form as any)[k]"></i></span>
            </label>
          </div>
        </article>

        <article class="card">
          <div class="card-head"><h3 class="card-title">安全</h3></div>
          <div class="card-body">
            <label class="switch-row">
              <span>两步验证（2FA）</span>
              <span class="switch" :class="{ on: form.twoFactor }"><i @click="form.twoFactor = !form.twoFactor"></i></span>
            </label>
            <button class="btn" style="margin-top:12px"><Icon name="key" :size="15" />修改密码</button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form { display: flex; flex-direction: column; gap: 16px; }
.form-row { display: grid; grid-template-columns: 96px 1fr; align-items: center; gap: 12px; }
.form-row label { font-size: 13px; color: var(--text-3); }
.form-row .input, .form-row .select { width: 100%; max-width: 320px; }
.saved { font-size: 13px; color: var(--success); margin-left: 10px; }

.stack { display: flex; flex-direction: column; gap: 16px; }
.switch-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; font-size: 14px; color: var(--text-1); cursor: pointer; }
.switch { position: relative; width: 40px; height: 22px; border-radius: 20px; background: var(--border-strong); transition: background 0.2s; }
.switch i { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform 0.2s; box-shadow: var(--shadow-sm); }
.switch.on { background: var(--accent); }
.switch.on i { transform: translateX(18px); }

@media (max-width: 560px) {
  .form-row { grid-template-columns: 1fr; gap: 6px; }
  .form-row .input, .form-row .select { max-width: 100%; }
}
</style>
