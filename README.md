# ⚽ 2026 FIFA World Cup - 世界杯赛程与预测平台

一个炫酷的 2026 年世界杯赛程网站，支持自动时区转换、球队介绍、比赛预测投票和赛果展示。

![World Cup 2026](https://img.shields.io/badge/World%20Cup-2026-green)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-cyan)

## ✨ 功能特性

- **🌍 自动时区转换** — 根据用户位置自动显示比赛当地时间
- **📅 完整赛程** — 48支球队、104场比赛的完整赛程表
- **🏆 球队档案** — 48支参赛球队的详细介绍、球星和战绩
- **🎯 预测投票** — 为每场比赛投票预测胜负，实时统计
- **📊 赛果追踪** — 实时更新比分、积分榜和赛事数据
- **💫 炫酷动画** — 粒子背景、玻璃拟态、流畅页面切换动画

## 🛠 技术栈

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** — 现代化样式
- **Framer Motion** — 流畅动画
- **Lucide React** — 图标库
- **Cloudflare Pages** — 部署托管

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📦 部署

### 方式一：Cloudflare Pages (推荐)

#### 1. 推送到 GitHub

```bash
# 在 GitHub 创建仓库后执行
git remote add origin https://github.com/YOUR_USERNAME/worldcup-2026.git
git push -u origin master
```

#### 2. Cloudflare Pages 自动部署

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Pages** → **创建项目**
3. 连接 GitHub 仓库 `worldcup-2026`
4. 构建设置：
   - **构建命令**: `npm run build`
   - **构建输出目录**: `dist`
5. 点击 **保存并部署**

#### 3. 或直接上传 (Direct Upload)

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
wrangler pages deploy dist --project-name worldcup-2026
```

### 方式二：GitHub Pages

```bash
# 安装 gh-pages
npm install -D gh-pages

# 部署
npm run build
npx gh-pages -d dist
```

## 📁 项目结构

```
src/
├── components/          # 公共组件
│   ├── ParticleBackground.tsx   # 粒子背景效果
│   ├── Navbar.tsx               # 导航栏
│   ├── Countdown.tsx            # 倒计时组件
│   └── Footer.tsx               # 页脚
├── pages/               # 页面组件
│   ├── HomePage.tsx             # 首页
│   ├── SchedulePage.tsx         # 赛程页
│   ├── TeamsPage.tsx            # 球队页
│   ├── VotingPage.tsx           # 投票页
│   └── ResultsPage.tsx          # 结果页
├── data/
│   └── worldcupData.ts          # 世界杯数据
├── hooks/
│   └── useLocalTime.ts          # 时区转换 Hook
└── types/
    └── index.ts                 # TypeScript 类型定义
```

## 🗓 赛事信息

- **时间**: 2026年6月11日 — 7月19日
- **主办国**: 美国 🇺🇸 · 加拿大 🇨🇦 · 墨西哥 🇲🇽
- **参赛球队**: 48支（历史首次扩军至48强）
- **比赛场次**: 104场
- **赛制**: 12个小组，每组4队；前两名 + 8个最佳第三名晋级32强淘汰赛

## 📄 License

MIT License

---

Made with ❤️ for football fans worldwide
