# 高考3500词 · 闪卡学习网页

基于高考3500词表与人教版七本英语教材（必修1-3、选择性必修1-4）出现情况的在线查询与闪卡学习工具。

**在线访问：** https://edisonfan.github.io/gaokao-words-flashcards/

> **需要登录**：账号由管理员分配（存于 Supabase `users` 表），未登录无法访问词表和闪卡页。

## 功能

### 词表查询页（`index.html`）
- 3844 个高考词的中文释义查询
- 英文 / 中文搜索
- 按教材筛选（必修1-3、选择性必修1-4）
- 按出现册数排序、分页浏览
- 统计卡片：总词数、课本覆盖数、覆盖率、当前结果数

### 闪卡学习页（`flashcards.html`）
- 先显示单词、回忆词义，点击卡片或按钮才翻开释义（**初始状态隐藏释义**）
- 标记「认识 / 不认识」，写入 Supabase 数据库
- 模式筛选：全部 / 未确认 / 不认识（重点复习）/ 认识
- 键盘操作：空格翻卡、← 不认识、→ 认识
- 移动端 H5 适配（手机 / 平板、点击翻卡、左右滑动切换）
- 记住上次学习位置（每个模式分别记忆，按单词锚点恢复）

## 数据说明

| 项目 | 数值 |
|---|---:|
| 高考词表总数 | 3,844 词（GitHub 三源合并去重） |
| 七本教材合并覆盖率 | 82.9%（命中 3,188 词） |
| 七本教材未出现的高考词 | 656 词 |

词表来源：`pluto0x0/word3500`、`LazuliKao/brochure-of-vocabularies`、`Zay1337-max/word-forest`

统计口径：
- **覆盖率** = 命中词数 ÷ 高考词表总数（主口径）
- **精度** = 命中词数 ÷ 文本去重词数

## 登录与用户

- `login.html`：登录页，用户名 + 密码校验（查 Supabase `users` 表）
- `auth.js`：公共守卫，未登录访问 `index.html` / `flashcards.html` 会跳转到登录页
- 登录后把该用户的 `client_id` 写入本地，闪卡标记的进度（`word_progress`）与登录用户绑定
- 支持退出登录

Supabase 数据表：
- `gaokao_words`：词表、释义、七本教材出现标记
- `word_progress`：学习进度（client_id + word + status）
- `users`：用户（client_id、display_name、username、password、created_at、last_seen）

> 注意：当前密码为明文存储、RLS 允许匿名读写，仅适合个人/内部使用。正式对外需改为密码哈希 + 收紧权限。

## 技术栈

- 纯静态 HTML / CSS / JavaScript，无构建步骤
- Supabase（PostgREST）作为后端
- 直接部署到任意静态托管（GitHub Pages / Netlify / surge.sh 均可）

## 本地运行

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000/
```

页面通过 CDN 加载 Supabase JS，Supabase 连接信息写在 HTML 内（`SUPA_URL` / `KEY`）。

## GitHub Pages 部署

本仓库含 `.nojekyll` 文件，可直接启用 GitHub Pages：
Settings → Pages → Source 选择 `main` 分支根目录，保存后即可通过
`https://<用户名>.github.io/<仓库名>/` 访问。
