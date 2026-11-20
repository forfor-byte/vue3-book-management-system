/* ============================================================
   演示数据：全部为示例口径，供界面展示使用，未接后端数据库
   ============================================================ */

export type Page =
  | '首页'
  | '用户管理'
  | '读者管理'
  | '图书管理'
  | '分类管理'
  | '借阅管理'
  | '统计分析'
  | '图书推荐'
  | '评论管理'
  | '系统设置'

/** 每个页面在导航里的分组、编号与副标题 */
export interface PageMeta {
  name: Page
  group: '概览' | '馆藏' | '读者' | '流通' | '分析' | '系统'
  icon: string
  sub: string
}

export const pages: PageMeta[] = [
  { name: '首页', group: '概览', icon: 'home', sub: '馆藏总账与当日流通' },
  { name: '图书管理', group: '馆藏', icon: 'book', sub: '馆藏图书、索书号与在架状态' },
  { name: '分类管理', group: '馆藏', icon: 'folder', sub: '按一级类目归架与排架定位' },
  { name: '图书推荐', group: '馆藏', icon: 'star', sub: '按借阅热度与评分挑选书单' },
  { name: '读者管理', group: '读者', icon: 'reader', sub: '读者证信息与在借情况' },
  { name: '用户管理', group: '读者', icon: 'users', sub: '后台账号与角色权限' },
  { name: '借阅管理', group: '流通', icon: 'exchange', sub: '借出、应还与逾期的流转账目' },
  { name: '评论管理', group: '流通', icon: 'comment', sub: '读者书评与评分审核' },
  { name: '统计分析', group: '分析', icon: 'chart', sub: '借阅走势、馆藏构成与借阅周期' },
  { name: '系统设置', group: '系统', icon: 'settings', sub: '馆名、借期规则与通知开关' },
]

export const navGroups: { title: PageMeta['group']; keys: Page[] }[] = [
  { title: '概览', keys: ['首页'] },
  { title: '馆藏', keys: ['图书管理', '分类管理', '图书推荐'] },
  { title: '读者', keys: ['读者管理', '用户管理'] },
  { title: '流通', keys: ['借阅管理', '评论管理'] },
  { title: '分析', keys: ['统计分析'] },
  { title: '系统', keys: ['系统设置'] },
]

export const metaOf = (p: Page): PageMeta =>
  pages.find((x) => x.name === p) ?? { name: p, group: '概览', icon: 'book', sub: '' }

/** 首页/统计页用的馆藏总账口径（演示数据） */
export const overview = {
  total: 12486,
  available: 9864,
  borrowed: 1248,
  overdue: 17,
  over30: 6,
  monthDelta: '+4.2%',
  catalogNo: 'MJ-2026-11',
  settledAt: '每日 00:10 结算',
}

/** 1—10 月借阅走势（册） */
export const trend = [
  { label: '1月', value: 320 },
  { label: '2月', value: 356 },
  { label: '3月', value: 412 },
  { label: '4月', value: 398 },
  { label: '5月', value: 451 },
  { label: '6月', value: 486 },
  { label: '7月', value: 520 },
  { label: '8月', value: 502 },
  { label: '9月', value: 548 },
  { label: '10月', value: 588 },
]

/** 借阅周期分布 */
export const cycle = [
  { label: '7 天内', value: 41 },
  { label: '8—14 天', value: 28 },
  { label: '15—30 天', value: 19 },
  { label: '30 天以上', value: 12 },
]

/** 近日流转 */
export const flow = [
  { text: '沈知微 借出《人类简史》', meta: '今天 09:14 · 应还 12-14', act: '借出' },
  { text: '周葭 归还《艺术的故事》', meta: '今天 08:52 · 逾期 24 天', act: '逾期' },
  { text: '新增图书 3 册 · 理工类', meta: '昨天 16:30 · 采编部', act: '入库' },
  { text: '许岑 续借《三体》一次', meta: '昨天 11:20 · 新应还 12-24', act: '续借' },
  { text: '《美的历程》全部借出', meta: '11-18 15:06 · 当前 0 册在架', act: '缺藏' },
]

/* ---------------- 图书 ---------------- */

export interface Book {
  isbn: string
  title: string
  author: string
  press: string
  date: string
  category: string
  stock: number
  price: number
  rating: number
  borrows: number
  /** 索书号 */
  callNo: string
  /** 封面图（public/covers 下的 2:3 图） */
  cover: string
  /** 一句话简介（推荐页使用） */
  blurb: string
}

export const books: Book[] = [
  { isbn: '9787115563721', title: 'JavaScript高级程序设计', author: 'Matt Frisbie', press: '人民邮电出版社', date: '2020-09-01', category: '计算机', stock: 15, price: 99, rating: 4.8, borrows: 1256, callNo: 'TP312/FR2', cover: '/covers/js.jpg', blurb: '前端入门到进阶都绕不开的一本厚书，讲得细，例子多，适合当工具书常翻。' },
  { isbn: '9787115590087', title: 'Vue.js设计与实现', author: '霍春阳', press: '人民邮电出版社', date: '2021-05-01', category: '计算机', stock: 13, price: 91, rating: 4.7, borrows: 987, callNo: 'TP393/HU1', cover: '/covers/vue.jpg', blurb: '把响应式、渲染器、编译器拆开讲，读完再看 Vue 源码会顺很多。' },
  { isbn: '9787115509323', title: '深入理解计算机系统', author: 'Randal E. Bryant', press: '机械工业出版社', date: '2019-08-01', category: '计算机', stock: 11, price: 83, rating: 4.9, borrows: 856, callNo: 'TP303/BR1', cover: '/covers/csapp.jpg', blurb: '从二进制讲到链接与并发，是理解"程序到底怎么跑起来"的那本书。' },
  { isbn: '9787115219452', title: '算法导论', author: 'Thomas H. Cormen', press: '机械工业出版社', date: '2018-07-01', category: '计算机', stock: 9, price: 75, rating: 4.8, borrows: 745, callNo: 'TP301/CO1', cover: '/covers/alg.jpg', blurb: '算法教材里的字典，证明严谨，适合配合课程一章一章啃。' },
  { isbn: '9787111213826', title: '设计模式', author: 'Erich Gamma', press: '机械工业出版社', date: '2017-06-01', category: '文学', stock: 7, price: 67, rating: 4.5, borrows: 634, callNo: 'TP311/GA1', cover: '/covers/gof.jpg', blurb: '二十三种模式的源头文本，案例偏旧但结构思想仍然好使。' },
  { isbn: '9787115447602', title: 'Python编程：从入门到实践', author: 'Eric Matthes', press: '人民邮电出版社', date: '2016-05-01', category: '科学', stock: 5, price: 59, rating: 4.6, borrows: 567, callNo: 'TP312/MA1', cover: '/covers/py.jpg', blurb: '前半本讲语法，后半本做小项目，零基础也能自己跑通一遍。' },
  { isbn: '9787115525053', title: '代码整洁之道', author: 'Robert C. Martin', press: '人民邮电出版社', date: '2015-04-01', category: '科学', stock: 3, price: 51, rating: 4.4, borrows: 489, callNo: 'TP311/MA2', cover: '/covers/clean.jpg', blurb: '命名、函数长度、注释该不该写，讲的是把代码写给人看这件事。' },
  { isbn: '9787115371311', title: '数据结构与算法分析', author: 'Mark Allen Weiss', press: '机械工业出版社', date: '2014-03-01', category: '计算机', stock: 8, price: 43, rating: 4.5, borrows: 512, callNo: 'TP311/WE1', cover: '/covers/weiss.jpg', blurb: '比教材薄，复杂度分析讲得清楚，期末复习时常被借空。' },
  { isbn: '9787115120550', title: '三体', author: '刘慈欣', press: '重庆出版社', date: '2013-02-01', category: '文学', stock: 20, price: 35, rating: 4.9, borrows: 1580, callNo: 'I247/LI1', cover: '/covers/santi.jpg', blurb: '从红岸基地一路写到宇宙尽头，硬设定和人物命运都没落下。' },
  { isbn: '9787536692930', title: '活着', author: '余华', press: '作家出版社', date: '2012-01-01', category: '文学', stock: 18, price: 27, rating: 4.8, borrows: 1432, callNo: 'I247/YU1', cover: '/covers/huozhe.jpg', blurb: '福贵一生的账，写得极平静，读完反而更沉。' },
]

/* ---------------- 读者 ---------------- */

export interface Reader {
  id: string
  name: string
  gender: '男' | '女'
  dept: string
  type: '本科生' | '研究生' | '教师' | '社会读者'
  phone: string
  joined: string
  /** 在借册数 */
  onLoan: number
  /** 读者状态 */
  state: '正常' | '待催还' | '休眠'
}

export const readers: Reader[] = [
  { id: 'R-2019-0137', name: '沈知微', gender: '女', dept: '流通部', type: '教师', phone: '13800138001', joined: '2019-09-01', onLoan: 3, state: '正常' },
  { id: 'R-2021-0462', name: '陆明远', gender: '男', dept: '技术部', type: '研究生', phone: '13800138002', joined: '2021-09-02', onLoan: 2, state: '正常' },
  { id: 'R-2020-0288', name: '周葭', gender: '女', dept: '阅览室', type: '社会读者', phone: '13800138003', joined: '2020-09-01', onLoan: 1, state: '待催还' },
  { id: 'R-2018-0074', name: '陈砚', gender: '男', dept: '采编部', type: '教师', phone: '13800138004', joined: '2018-09-05', onLoan: 4, state: '正常' },
  { id: 'R-2022-0519', name: '林清和', gender: '女', dept: '阅览室', type: '本科生', phone: '13800138005', joined: '2022-09-08', onLoan: 0, state: '休眠' },
  { id: 'R-2023-0624', name: '许岑', gender: '男', dept: '技术部', type: '本科生', phone: '13800138006', joined: '2023-09-11', onLoan: 2, state: '正常' },
  { id: 'R-2019-0193', name: '罗禾', gender: '女', dept: '采编部', type: '社会读者', phone: '13800138007', joined: '2019-09-15', onLoan: 1, state: '正常' },
  { id: 'R-2021-0401', name: '章拂', gender: '男', dept: '流通部', type: '本科生', phone: '13800138008', joined: '2021-09-20', onLoan: 0, state: '休眠' },
]

/* ---------------- 借阅 ---------------- */

export interface Borrow {
  id: string
  book: string
  reader: string
  borrowAt: string
  dueAt: string
  status: '借出中' | '待归还' | '已归还' | '已逾期'
}

export const borrows: Borrow[] = [
  { id: 'B-0996', book: '人类简史', reader: '沈知微', borrowAt: '10-02', dueAt: '11-01', status: '已逾期' },
  { id: 'B-0994', book: '深入理解计算机系统', reader: '陆明远', borrowAt: '10-18', dueAt: '11-17', status: '借出中' },
  { id: 'B-0991', book: '艺术的故事', reader: '周葭', borrowAt: '09-24', dueAt: '10-24', status: '已逾期' },
  { id: 'B-0988', book: '乡土中国', reader: '陈砚', borrowAt: '10-26', dueAt: '11-25', status: '借出中' },
  { id: 'B-0985', book: '三体', reader: '许岑', borrowAt: '10-30', dueAt: '11-29', status: '待归还' },
  { id: 'B-0980', book: '活着', reader: '罗禾', borrowAt: '10-08', dueAt: '11-07', status: '已归还' },
  { id: 'B-0976', book: '算法导论', reader: '章拂', borrowAt: '10-21', dueAt: '11-20', status: '借出中' },
  { id: 'B-0971', book: '置身事内', reader: '林清和', borrowAt: '09-30', dueAt: '10-30', status: '已逾期' },
]

/* ---------------- 分类 ---------------- */

export interface Category {
  name: string
  count: number
  /** 馆藏前缀 */
  code: string
  /** 排架位置 */
  shelf: string
  /** 近 30 天借出 */
  out: number
  /** 细分小类 */
  children: { name: string; count: number }[]
}

export const categories: Category[] = [
  { name: '文学', count: 4230, code: 'K-1', shelf: '甲区 1—4 排', out: 412, children: [{ name: '小说', count: 2142 }, { name: '散文', count: 1263 }, { name: '诗歌', count: 825 }] },
  { name: '社科', count: 2740, code: 'K-2', shelf: '甲区 5—7 排', out: 236, children: [{ name: '经济', count: 986 }, { name: '社会学', count: 902 }, { name: '哲学', count: 852 }] },
  { name: '理工', count: 2250, code: 'K-3', shelf: '乙区 1—3 排', out: 198, children: [{ name: '计算机', count: 1120 }, { name: '数学', count: 630 }, { name: '物理', count: 500 }] },
  { name: '历史', count: 1624, code: 'K-4', shelf: '乙区 4—5 排', out: 121, children: [{ name: '中国古代史', count: 842 }, { name: '世界史', count: 782 }] },
  { name: '艺术', count: 1000, code: 'K-5', shelf: '丙区 1 排', out: 64, children: [{ name: '绘画', count: 470 }, { name: '音乐', count: 320 }, { name: '设计', count: 210 }] },
  { name: '其他', count: 642, code: 'K-9', shelf: '丙区 2 排（闭架）', out: 17, children: [{ name: '地方文献', count: 402 }, { name: '捐赠本', count: 240 }] },
]

export const categoryTotal = categories.reduce((s, c) => s + c.count, 0)

/** 类目占比（用于首页与统计页的条形图） */
export const categoryShare = categories.map((c) => ({
  label: c.name,
  value: Math.round((c.count / categoryTotal) * 100),
}))

/* ---------------- 评论 ---------------- */

export interface CommentItem {
  book: string
  reader: string
  rating: number
  content: string
  status: '已通过' | '待审核' | '已拒绝'
  time: string
  /** 评分时间（列表展示用） */
}

export const comments: CommentItem[] = [
  { book: '活着', reader: '陆明远', rating: 5, content: '一口气读完，余华把苦难写得很平静，反而更重。结尾那段叙述几乎是白描，没有一句抒情。', status: '待审核', time: '11-19 20:36' },
  { book: '艺术的故事', reader: '周葭', rating: 4, content: '贡布里希把艺术史讲成了连续的故事，适合当入门的第一本书，但配图版本值得挑一挑。', status: '待审核', time: '11-18 22:10' },
  { book: '三体', reader: '许岑', rating: 5, content: '黑暗森林法则那段推理，读的时候后背发凉。人物略扁平，但世界观撑得住。', status: '待审核', time: '11-17 13:02' },
  { book: '万历十五年', reader: '陈砚', rating: 4, content: '黄仁宇从一年切入讲三百年，视角很妙。文笔偏学术，需要一点耐心。', status: '待审核', time: '11-15 09:44' },
  { book: '乡土中国', reader: '章拂', rating: 5, content: '费孝通讲的差序格局，放在今天看依然准确，能解释很多日常里说不清的事。', status: '待审核', time: '11-12 18:20' },
]

/* ---------------- 后台账号 ---------------- */

export interface UserAccount {
  account: string
  name: string
  role: '管理员' | '编目员' | '审核员' | '读者'
  dept: string
  last: string
  on: boolean
}

export const users: UserAccount[] = [
  { account: 'shen.zhiwei', name: '沈知微', role: '管理员', dept: '流通部', last: '2026-11-20 09:14', on: true },
  { account: 'lu.mingyuan', name: '陆明远', role: '管理员', dept: '技术部', last: '2026-11-20 08:02', on: true },
  { account: 'zhou.jia', name: '周葭', role: '编目员', dept: '阅览室', last: '2026-11-19 17:41', on: true },
  { account: 'chen.yan', name: '陈砚', role: '审核员', dept: '采编部', last: '2026-11-18 10:26', on: false },
  { account: 'lin.qinghe', name: '林清和', role: '编目员', dept: '阅览室', last: '2026-11-15 14:08', on: true },
  { account: 'xu.cen', name: '许岑', role: '读者', dept: '—', last: '2026-10-31 11:52', on: false },
]

/** 角色权限矩阵 */
export const permissions: { name: string; roles: [boolean, boolean, boolean, boolean] }[] = [
  { name: '新增 / 编辑馆藏', roles: [true, true, false, false] },
  { name: '删除书评与评分', roles: [true, false, true, false] },
  { name: '导出借阅报表', roles: [true, false, false, false] },
  { name: '修改借期与罚金规则', roles: [true, false, false, false] },
  { name: '查看读者信息', roles: [true, true, false, false] },
  { name: '前台借还操作', roles: [true, false, false, true] },
]

/* ---------------- 系统设置 ---------------- */

export interface SettingRule {
  key: string
  label: string
  hint: string
  value: string
}

export const settingRules: SettingRule[] = [
  { key: 'name', label: '馆名', hint: '显示在页头与借阅凭条', value: '墨卷图书馆' },
  { key: 'no', label: '馆编号', hint: '总账与报表抬头', value: 'MJ-2026-11' },
  { key: 'days', label: '默认借期（天）', hint: '续借一次延长 15 天', value: '30' },
  { key: 'fine', label: '逾期罚金（元 / 天）', hint: '按自然日计，封顶 20 元', value: '0.50' },
  { key: 'times', label: '单册最大续借次数', hint: '超出后需到馆办理', value: '1' },
  { key: 'hours', label: '开馆时间', hint: '借还台与自动柜同步', value: '周二至周日 09:00—20:30' },
]

export const settingSwitches = [
  { key: 'notice', label: '逾期自动提醒', hint: '应还前 2 天与逾期当日各发一次站内信', on: true },
  { key: 'audit', label: '借阅需审核', hint: '开启后借出由管理员二次确认', on: false },
  { key: 'renew', label: '读者自助续借', hint: '允许读者在借期内自行续借一次', on: true },
  { key: 'review', label: '书评需审核', hint: '新书评先进入待审队列', on: true },
]
