# ConvHub 格式转换中转站 - 完整实施计划

---

## 1. PRD（产品需求文档）

### 1.1 产品概述

| 项目 | 内容 |
|------|------|
| **产品名称** | ConvHub（格式转换中转站） |
| **中文名** | 格式转换中转站 |
| **产品类型** | 工具导航网站 |
| **核心价值** | 聚合热门格式转换工具，帮助用户快速找到并访问目标网站 |
| **目标用户** | 需要频繁进行文件格式转换的用户（设计师、开发者、内容创作者） |

### 1.2 核心功能需求

#### 1.2.1 工具分类导航
- **图片转换**：PNG/JPG/WebP/GIF/BMP/ICO/SVG 互转
- **文档转换**：PDF/Word/Excel/PPT/TXT 互转
- **视频转换**：MP4/AVI/MKV/MOV/WMV/FLV 互转
- **音频转换**：MP3/WAV/FLAC/AAC/OGG 互转
- **压缩工具**：图片压缩、文档压缩、视频压缩
- **开发工具**：JSON/XML/YAML 互转、Base64 编码、URL 编码

#### 1.2.2 搜索功能
- 实时搜索建议
- 支持中英文关键词
- 按分类筛选结果
- 热门搜索推荐

#### 1.2.3 多语言支持
- 中文/English 一键切换
- 语言偏好自动记忆
- 搜索结果匹配语言

#### 1.2.4 用户体验
- 暗色调主题 + 毛玻璃效果
- 响应式设计（桌面/平板/手机）
- 流畅的交互动画
- 收藏功能（本地存储）

### 1.3 非功能需求

| 类型 | 要求 |
|------|------|
| **性能** | 首屏加载 < 2s，搜索响应 < 200ms |
| **兼容性** | Chrome/Firefox/Safari/Edge 最新两版本 |
| **可访问性** | 键盘导航、屏幕阅读器支持 |
| **SEO** | 语义化 HTML、元数据优化 |

---

## 2. 系统架构设计

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                        客户端层                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Web App   │  │  Mobile H5  │  │    PWA      │          │
│  │  (React)    │  │  (响应式)    │  │  (可选)     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       应用层 (Frontend)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  路由管理    │  │  状态管理    │  │  国际化     │          │
│  │  (React     │  │  (Zustand)  │  │  (i18next)  │          │
│  │   Router)   │  │             │  │             │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       数据层                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  工具数据    │  │  用户偏好    │  │  搜索索引   │          │
│  │  (JSON)     │  │  (Local     │  │  (Fuse.js   │          │
│  │             │  │   Storage)  │  │   客户端)   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 技术架构决策

| 决策点 | 选择 | 理由 |
|--------|------|------|
| **前端框架** | React 18 + TypeScript | 生态丰富、类型安全、社区活跃 |
| **构建工具** | Vite | 极速开发体验、HMR 快 |
| **状态管理** | Zustand | 轻量级、TypeScript 友好 |
| **国际化** | i18next | 功能完整、Tree-shaking |
| **搜索** | Fuse.js | 客户端模糊搜索、无后端依赖 |
| **样式** | Tailwind CSS | 原子化CSS、开发效率高 |
| **动画** | Framer Motion | React 原生、声明式 |
| **图标** | Lucide React | 简洁、现代感 |

### 2.3 数据模型

#### 2.3.1 工具条目 (Tool)
```typescript
interface Tool {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  category: ToolCategory;
  tags: string[];
  tagsZh: string[];
  url: string;
  favicon: string;
  isPopular: boolean;
  createdAt: string;
}
```

#### 2.3.2 分类 (Category)
```typescript
type ToolCategory =
  | 'image'      // 图片转换
  | 'document'   // 文档转换
  | 'video'      // 视频转换
  | 'audio'      // 音频转换
  | 'compression' // 压缩工具
  | 'dev';       // 开发工具
```

#### 2.3.3 用户偏好 (UserPreferences)
```typescript
interface UserPreferences {
  language: 'zh' | 'en';
  favorites: string[];  // tool IDs
  recentSearches: string[];
}
```

---

## 3. 技术栈选择

### 3.1 核心技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| **框架** | React | 18.x |
| **语言** | TypeScript | 5.x |
| **构建** | Vite | 5.x |
| **样式** | Tailwind CSS | 3.x |
| **状态** | Zustand | 4.x |
| **路由** | React Router | 6.x |
| **国际化** | i18next + react-i18next | 23.x |
| **搜索** | Fuse.js | 7.x |
| **动画** | Framer Motion | 11.x |
| **图标** | Lucide React | 0.3xx |
| **PWA** | Vite PWA | 0.5.x |

### 3.2 开发工具

| 工具 | 用途 |
|------|------|
| ESLint + Prettier | 代码格式化与 lint |
| Commitlint | 提交信息规范化 |
| lint-staged | pre-commit 检查 |
| clsx | 条件 className 合并 |

---

## 4. 设计语言

### 4.1 视觉方向

| 属性 | 设计值 |
|------|--------|
| **主题** | 暗色调（Dark Mode Only） |
| **风格** | 现代简约 + 毛玻璃效果 |
| **参考** | Apple Vision Pro UI、Arc Browser |
| **圆角** | 大圆角（12-24px） |
| **间距** | 8px 基准网格 |

### 4.2 色彩系统

```css
:root {
  /* 背景色 */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-glass: rgba(255, 255, 255, 0.05);

  /* 主题色 */
  --accent-primary: #6366f1;   /* Indigo */
  --accent-secondary: #8b5cf6; /* Purple */
  --accent-gradient: linear-gradient(135deg, #6366f1, #8b5cf6);

  /* 文字色 */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  /* 边框 */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-glow: rgba(99, 102, 241, 0.3);

  /* 功能色 */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### 4.3 毛玻璃效果

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### 4.4 动效规范

| 场景 | 动效 |
|------|------|
| **页面进入** | opacity 0→1, translateY 20px→0, 500ms ease-out |
| **卡片悬停** | scale 1.02, shadow 增强, 200ms |
| **按钮点击** | scale 0.97→1, 150ms |
| **语言切换** | 淡入淡出 300ms |

---

## 5. 任务分解（Task List）

### Sprint 1：项目初始化与基础设施

| 任务 | 描述 | 验收标准 |
|------|------|----------|
| T1.1 | 初始化 Vite + React + TypeScript 项目 | 项目运行无报错 |
| T1.2 | 配置 Tailwind CSS | 暗色调主题生效 |
| T1.3 | 配置 ESLint + Prettier | 保存自动格式化 |
| T1.4 | 配置 i18next 国际化框架 | 中英文切换正常 |
| T1.5 | 配置 React Router | 路由跳转正常 |
| T1.6 | 创建项目目录结构 | 符合 feature-based 结构 |

**完成标准**：本地开发服务器正常运行，访问 http://localhost:5173 显示首页

---

### Sprint 2：核心组件开发

| 任务 | 描述 | 验收标准 |
|------|------|----------|
| T2.1 | 创建毛玻璃卡片组件 `<GlassCard>` | 毛玻璃效果正常，支持 hover 动效 |
| T2.2 | 创建搜索栏组件 `<SearchBar>` | 实时搜索、键盘导航、清除按钮 |
| T2.3 | 创建分类导航组件 `<CategoryNav>` | 6 个分类 Tab，支持图标 |
| T2.4 | 创建工具卡片组件 `<ToolCard>` | 展示工具信息，hover 效果，点击跳转 |
| T2.5 | 创建语言切换组件 `<LanguageSwitch>` | 中/英切换，动画过渡 |
| T2.6 | 创建 Header/Footer 布局 | 响应式布局 |
| T2.7 | 创建收藏按钮 `<FavoriteButton>` | 本地存储收藏状态 |

**完成标准**：组件可在 Storybook 中独立预览

---

### Sprint 3：页面开发

| 任务 | 描述 | 验收标准 |
|------|------|----------|
| T3.1 | 首页布局与路由配置 | 路由正常，页面加载 |
| T3.2 | 实现分类筛选逻辑 | 点击分类正确筛选 |
| T3.3 | 实现搜索功能（Fuse.js） | 模糊搜索，中英文支持 |
| T3.4 | 实现收藏功能 | 添加/移除收藏，本地持久化 |
| T3.5 | 实现热门工具展示 | 展示 isPopular=true 的工具 |
| T3.6 | 响应式适配 | 桌面/平板/手机三端正常 |

**完成标准**：完整用户流程可操作（搜索→筛选→跳转）

---

### Sprint 4：数据与内容

| 任务 | 描述 | 验收标准 |
|------|------|----------|
| T4.1 | 创建工具数据 JSON | 包含 30+ 工具，覆盖全部分类 |
| T4.2 | 添加工具 favicon | 使用 local favicon 或 CDN |
| T4.3 | 优化搜索索引配置 | 搜索结果相关性高 |
| T4.4 | 添加 Empty State | 无结果时友好提示 |
| T4.5 | 添加 Loading State | 骨架屏/加载动画 |

**完成标准**：内容充实，搜索结果准确

---

### Sprint 5：体验优化

| 任务 | 描述 | 验收标准 |
|------|------|----------|
| T5.1 | 添加 Framer Motion 动画 | 页面过渡流畅 |
| T5.2 | 优化键盘导航 | Tab/Enter/ESC 正常 |
| T5.3 | 添加键盘快捷键 | Cmd+K 打开搜索 |
| T5.4 | 页面滚动优化 | 平滑滚动 |
| T5.5 | 性能优化 | Lighthouse 评分 > 90 |

**完成标准**：体验流畅，达到性能指标

---

### Sprint 6：PWA 与发布准备

| 任务 | 描述 | 验收标准 |
|------|------|----------|
| T6.1 | 配置 Vite PWA | 可安装到桌面/手机 |
| T6.2 | 添加 manifest.json | PWA 图标、主题色 |
| T6.3 | 添加 Service Worker | 离线缓存 |
| T6.4 | SEO 优化 | meta 标签、OG 标签 |
| T6.5 | GitHub Actions 部署 | 自动部署到 GitHub Pages |

**完成标准**：可通过域名访问，PWA 可安装

---

## 6. 风险评估与依赖

### 6.1 风险矩阵

| 风险 | 概率 | 影响 | 缓解策略 |
|------|------|------|----------|
| **搜索结果相关性差** | 中 | 高 | 调优 Fuse.js 权重配置，增加同义词映射 |
| **工具链接失效** | 低 | 中 | 定期检查工具网站状态，标记失效工具 |
| **i18n 内容遗漏** | 中 | 低 | 建立翻译检查清单，使用 key 覆盖检测 |
| **移动端体验不佳** | 低 | 中 | 响应式优先开发，多设备测试 |
| **PWA 缓存更新不及时** | 低 | 低 | 配置更新提示机制 |

### 6.2 关键依赖

| 依赖项 | 类型 | 说明 |
|--------|------|------|
| `fuse.js` | npm | 客户端搜索 |
| `i18next` | npm | 国际化 |
| `framer-motion` | npm | 动画 |
| `tailwindcss` | npm | 样式 |
| `lucide-react` | npm | 图标库 |
| 工具网站 | 外部 | 跳转目标，需网络连接 |

### 6.3 项目里程碑

| 阶段 | 目标 | 预计周期 |
|------|------|----------|
| **M1** | Sprint 1-2 完成 | Week 1 |
| **M2** | Sprint 3-4 完成 | Week 2 |
| **M3** | Sprint 5 完成 | Week 3 |
| **M4** | Sprint 6 + 发布 | Week 4 |

---

## 7. 目录结构

```
ConvHub/
├── public/
│   ├── favicon.ico
│   └── tools/              # 工具数据
│       └── data.json
├── src/
│   ├── assets/            # 静态资源
│   ├── components/        # 组件
│   │   ├── common/        # 通用组件
│   │   │   ├── GlassCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── LanguageSwitch.tsx
│   │   ├── layout/        # 布局组件
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── features/      # 功能组件
│   │       ├── CategoryNav.tsx
│   │       ├── ToolCard.tsx
│   │       └── FavoriteButton.tsx
│   ├── data/
│   │   └── tools.ts       # 工具数据
│   ├── hooks/             # 自定义 hooks
│   │   ├── useSearch.ts
│   │   ├── useFavorites.ts
│   │   └── useLanguage.ts
│   ├── i18n/              # 国际化
│   │   ├── index.ts
│   │   ├── zh.json
│   │   └── en.json
│   ├── store/             # 状态管理
│   │   └── useAppStore.ts
│   ├── styles/            # 全局样式
│   │   └── globals.css
│   ├── types/             # TypeScript 类型
│   │   └── index.ts
│   ├── utils/             # 工具函数
│   │   └── search.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── SPEC.md
```

---

## 8. 验收检查清单

### 功能验收
- [ ] 首页显示所有分类的工具列表
- [ ] 点击分类正确筛选
- [ ] 搜索框输入后实时显示匹配结果
- [ ] 点击工具卡片跳转目标网站（新标签页）
- [ ] 语言切换中英文内容同步更新
- [ ] 收藏功能正常工作
- [ ] 移动端布局正常

### 视觉验收
- [ ] 暗色调主题正常显示
- [ ] 毛玻璃效果正常
- [ ] 动画流畅无卡顿
- [ ] 图标显示正常
- [ ] 响应式布局正常

### 性能验收
- [ ] Lighthouse Performance > 90
- [ ] 首屏加载 < 2s
- [ ] 搜索响应 < 200ms

---

*文档版本：1.0*
*创建日期：2026-04-11*
*下次审查：Sprint 2 结束后*
