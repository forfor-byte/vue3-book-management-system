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

export const nav: { label: Page; icon: string }[] = [
  { label: '首页', icon: 'home' },
  { label: '用户管理', icon: 'users' },
  { label: '读者管理', icon: 'reader' },
  { label: '图书管理', icon: 'book' },
  { label: '分类管理', icon: 'folder' },
  { label: '借阅管理', icon: 'exchange' },
  { label: '统计分析', icon: 'chart' },
  { label: '图书推荐', icon: 'star' },
  { label: '评论管理', icon: 'comment' },
  { label: '系统设置', icon: 'settings' },
]

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
}

export const books: Book[] = [
  { isbn: '9787115563721', title: 'JavaScript高级程序设计', author: 'Matt Frisbie', press: '人民邮电出版社', date: '2020-09-01', category: '计算机', stock: 15, price: 99, rating: 4.8, borrows: 1256 },
  { isbn: '9787115590087', title: 'Vue.js设计与实现', author: '霍春阳', press: '人民邮电出版社', date: '2021-05-01', category: '计算机', stock: 13, price: 91, rating: 4.7, borrows: 987 },
  { isbn: '9787115509323', title: '深入理解计算机系统', author: 'Randal E. Bryant', press: '机械工业出版社', date: '2019-08-01', category: '计算机', stock: 11, price: 83, rating: 4.9, borrows: 856 },
  { isbn: '9787115219452', title: '算法导论', author: 'Thomas H. Cormen', press: '机械工业出版社', date: '2018-07-01', category: '计算机', stock: 9, price: 75, rating: 4.8, borrows: 745 },
  { isbn: '9787111213826', title: '设计模式', author: 'Erich Gamma', press: '机械工业出版社', date: '2017-06-01', category: '文学', stock: 7, price: 67, rating: 4.5, borrows: 634 },
  { isbn: '9787115447602', title: 'Python编程：从入门到实践', author: 'Eric Matthes', press: '人民邮电出版社', date: '2016-05-01', category: '科学', stock: 5, price: 59, rating: 4.6, borrows: 567 },
  { isbn: '9787115525053', title: '代码整洁之道', author: 'Robert C. Martin', press: '人民邮电出版社', date: '2015-04-01', category: '科学', stock: 3, price: 51, rating: 4.4, borrows: 489 },
  { isbn: '9787115371311', title: '数据结构与算法分析', author: 'Mark Allen Weiss', press: '机械工业出版社', date: '2014-03-01', category: '计算机', stock: 8, price: 43, rating: 4.5, borrows: 512 },
  { isbn: '9787115120550', title: '三体', author: '刘慈欣', press: '重庆出版社', date: '2013-02-01', category: '文学', stock: 20, price: 35, rating: 4.9, borrows: 1580 },
  { isbn: '9787536692930', title: '活着', author: '余华', press: '作家出版社', date: '2012-01-01', category: '文学', stock: 18, price: 27, rating: 4.8, borrows: 1432 },
]

export interface Reader {
  id: string
  name: string
  gender: '男' | '女'
  dept: string
  type: '本科生' | '研究生' | '教师'
  phone: string
  joined: string
}

export const readers: Reader[] = [
  { id: '20230001', name: '张三', gender: '男', dept: '计算机学院', type: '本科生', phone: '13800138001', joined: '2023-09-01' },
  { id: '20230002', name: '李四', gender: '女', dept: '数学学院', type: '研究生', phone: '13800138002', joined: '2023-09-02' },
  { id: '20230003', name: '王五', gender: '男', dept: '物理学院', type: '教师', phone: '13800138003', joined: '2022-09-01' },
  { id: '20230004', name: '赵六', gender: '女', dept: '化学学院', type: '本科生', phone: '13800138004', joined: '2023-09-05' },
  { id: '20230005', name: '钱七', gender: '男', dept: '文学院', type: '研究生', phone: '13800138005', joined: '2022-09-08' },
  { id: '20230006', name: '孙八', gender: '女', dept: '外国语学院', type: '本科生', phone: '13800138006', joined: '2023-09-11' },
]

export interface Borrow {
  id: string
  book: string
  reader: string
  borrowAt: string
  dueAt: string
  status: '借出' | '待归还' | '已归还' | '逾期'
}

export const borrows: Borrow[] = [
  { id: 'JY202610001', book: 'JavaScript高级程序设计', reader: '张三', borrowAt: '2026-10-01', dueAt: '2026-10-31', status: '借出' },
  { id: 'JY202610002', book: '三体', reader: '李四', borrowAt: '2026-09-20', dueAt: '2026-10-20', status: '逾期' },
  { id: 'JY202610003', book: '深入理解计算机系统', reader: '王五', borrowAt: '2026-10-05', dueAt: '2026-11-04', status: '待归还' },
  { id: 'JY202610004', book: '算法导论', reader: '赵六', borrowAt: '2026-09-28', dueAt: '2026-10-28', status: '借出' },
  { id: 'JY202610005', book: '活着', reader: '钱七', borrowAt: '2026-10-08', dueAt: '2026-11-07', status: '已归还' },
  { id: 'JY202610006', book: 'Python编程', reader: '孙八', borrowAt: '2026-10-02', dueAt: '2026-11-01', status: '借出' },
]

export interface Category {
  name: string
  count: number
  children?: { name: string; count: number }[]
}

export const categories: Category[] = [
  { name: '文学', count: 320, children: [{ name: '小说', count: 142 }, { name: '诗歌', count: 63 }, { name: '散文', count: 115 }] },
  { name: '计算机', count: 286, children: [{ name: '编程语言', count: 98 }, { name: '算法', count: 76 }, { name: '前端开发', count: 61 }, { name: '数据库', count: 51 }] },
  { name: '历史', count: 178, children: [{ name: '中国古代史', count: 82 }, { name: '世界史', count: 96 }] },
  { name: '科学', count: 165, children: [{ name: '物理学', count: 61 }, { name: '数学', count: 55 }, { name: '化学', count: 49 }] },
  { name: '艺术', count: 120, children: [{ name: '绘画', count: 47 }, { name: '音乐', count: 40 }, { name: '设计', count: 33 }] },
  { name: '哲学', count: 88, children: [{ name: '中哲', count: 46 }, { name: '西哲', count: 42 }] },
  { name: '经济', count: 96, children: [{ name: '经济学原理', count: 58 }, { name: '金融', count: 38 }] },
]

export interface CommentItem {
  book: string
  reader: string
  rating: number
  content: string
  status: '已通过' | '待审核' | '已拒绝'
  time: string
}

export const comments: CommentItem[] = [
  { book: 'JavaScript高级程序设计', reader: '张三', rating: 5, content: '非常棒的一本书，内容深入浅出，很适合系统学习。', status: '已通过', time: '2026-10-18 10:30:00' },
  { book: 'Vue.js设计与实现', reader: '李四', rating: 4, content: '深入浅出，适合有一定基础的读者。', status: '待审核', time: '2026-10-17 09:12:00' },
  { book: '深入理解计算机系统', reader: '王五', rating: 5, content: '经典教材，值得反复阅读。', status: '已通过', time: '2026-10-16 14:03:00' },
  { book: '算法导论', reader: '赵六', rating: 4, content: '内容很全面，但有些难度。', status: '已通过', time: '2026-10-15 08:45:00' },
  { book: '三体', reader: '钱七', rating: 5, content: '想象力极其宏大，中国科幻的巅峰之作。', status: '已通过', time: '2026-10-14 20:18:00' },
  { book: '设计模式', reader: '孙八', rating: 3, content: '理论性太强，案例不够。', status: '已拒绝', time: '2026-10-13 16:27:00' },
]
