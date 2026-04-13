# ConvHub 任务列表

## 图例

| 标记 | 含义 |
|------|------|
| `[P0]` | 必须完成，影响核心流程 |
| `[P1]` | 重要，影响体验 |
| `[P2]` | 可选，锦上添花 |

---

## Sprint 1：项目初始化与基础设施

### T1.1 初始化项目
- [ ] 创建 Vite + React + TypeScript 项目
- [ ] 选择 `react-ts` 模板
- [ ] 安装依赖：`npm create vite@latest . -- --template react-ts`

### T1.2 配置 Tailwind CSS
- [ ] 安装 Tailwind：`npm install -D tailwindcss postcss autoprefixer`
- [ ] 初始化配置：`npx tailwindcss init -p`
- [ ] 配置 `tailwind.config.js`：
  - `content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']`
  - 扩展深色主题配色
- [ ] 添加全局样式到 `src/styles/globals.css`
- [ ] 引入 Tailwind 指令

### T1.3 配置开发工具
- [ ] 安装 ESLint：`npm install -D eslint`
- [ ] 安装 Prettier：`npm install -D prettier eslint-config-prettier eslint-plugin-prettier`
- [ ] 创建 `.prettierrc.json` 配置文件
- [ ] 配置 VSCode settings.json（保存时格式化）

### T1.4 配置 i18next 国际化
- [ ] 安装：`npm install i18next react-i18next i18next-browser-languagedetector`
- [ ] 创建 `src/i18n/index.ts`
- [ ] 创建 `src/i18n/zh.json` 和 `src/i18n/en.json`
- [ ] 配置语言检测与持久化
- [ ] 在 `main.tsx` 初始化 i18n

### T1.5 配置 React Router
- [ ] 安装：`npm install react-router-dom`
- [ ] 创建 `src/pages/` 目录
- [ ] 创建首页路由 `/`
- [ ] 配置 404 路由

### T1.6 创建目录结构
- [ ] 按 Feature-based 组织：
  ```
  src/components/common/    # 通用组件
  src/components/layout/    # 布局组件
  src/components/features/  # 功能组件
  src/hooks/                # 自定义 hooks
  src/store/                # 状态管理
  src/types/                # 类型定义
  src/utils/               # 工具函数
  src/data/                 # 静态数据
  ```

### T1.7 安装其他依赖
- [ ] `npm install zustand` — 状态管理
- [ ] `npm install fuse.js` — 搜索
- [ ] `npm install framer-motion` — 动画
- [ ] `npm install lucide-react` — 图标
- [ ] `npm install clsx` — className 合并

---

## Sprint 2：核心组件开发

### T2.1 GlassCard 毛玻璃卡片
- [ ] 创建 `src/components/common/GlassCard.tsx`
- [ ] 实现毛玻璃背景效果
- [ ] 实现 hover 缩放动画
- [ ] 支持 `as`  prop（div/button/a）
- [ ] 导出类型定义

### T2.2 SearchBar 搜索栏
- [ ] 创建 `src/components/common/SearchBar.tsx`
- [ ] 实现输入框 + 搜索图标
- [ ] 实现清除按钮（输入有内容时显示）
- [ ] 实现键盘事件（Enter 提交、Esc 清空）
- [ ] 实现聚焦/失焦状态样式
- [ ] 添加搜索动画

### T2.3 LanguageSwitch 语言切换
- [ ] 创建 `src/components/common/LanguageSwitch.tsx`
- [ ] 实现中/英切换按钮
- [ ] 添加切换动画（滑动/淡入淡出）
- [ ] 显示当前语言

### T2.4 CategoryNav 分类导航
- [ ] 创建 `src/components/features/CategoryNav.tsx`
- [ ] 定义 6 个分类：`image`, `document`, `video`, `audio`, `compression`, `dev`
- [ ] 为每个分类配置图标（Lucide）
- [ ] 实现 Tab 切换逻辑
- [ ] 实现移动端横向滚动

### T2.5 ToolCard 工具卡片
- [ ] 创建 `src/components/features/ToolCard.tsx`
- [ ] 显示：favicon、名称（中英文）、描述、标签
- [ ] 实现点击跳转到 `target="_blank"`
- [ ] 实现 hover 效果（scale + shadow）
- [ ] 集成 FavoriteButton

### T2.6 FavoriteButton 收藏按钮
- [ ] 创建 `src/components/features/FavoriteButton.tsx`
- [ ] 实现收藏/取消收藏状态
- [ ] 使用 Zustand + localStorage 持久化
- [ ] 添加心形图标动画

### T2.7 Header 布局
- [ ] 创建 `src/components/layout/Header.tsx`
- [ ] 包含：Logo、SearchBar（移动端）、LanguageSwitch
- [ ] 毛玻璃背景
- [ ] 响应式：桌面显示完整，移动端简化

### T2.8 Footer 布局
- [ ] 创建 `src/components/layout/Footer.tsx`
- [ ] 包含：版权信息、GitHub 链接
- [ ] 简洁暗色调设计

---

## Sprint 3：页面开发

### T3.1 首页布局
- [ ] 创建 `src/pages/HomePage.tsx`
- [ ] 布局结构：Header + Hero(Search) + CategoryNav + ToolGrid + Footer
- [ ] 配置路由

### T3.2 分类筛选
- [ ] 创建 `src/hooks/useCategory.ts`
- [ ] 实现选中分类状态管理
- [ ] 实现「全部」选项
- [ ] 实现 URL 参数同步（可选）

### T3.3 搜索功能
- [ ] 创建 `src/hooks/useSearch.ts`
- [ ] 配置 Fuse.js：
  - keys: `['name', 'nameZh', 'description', 'descriptionZh', 'tags', 'tagsZh']`
  - threshold: 0.4
  - includeScore: true
- [ ] 实现实时搜索防抖（300ms）

### T3.4 收藏功能
- [ ] 创建 `src/hooks/useFavorites.ts`
- [ ] 创建 `src/store/useAppStore.ts`（Zustand）
- [ ] 实现 add/remove favorites
- [ ] 持久化到 localStorage

### T3.5 工具网格
- [ ] 创建 `src/components/features/ToolGrid.tsx`
- [ ] 实现响应式网格（1/2/3/4 列）
- [ ] 实现空状态组件

### T3.6 响应式适配
- [ ] 桌面端：4 列网格
- [ ] 平板端：2-3 列网格
- [ ] 移动端：1 列网格
- [ ] 移动端导航优化

---

## Sprint 4：数据与内容

### T4.1 创建工具数据
- [ ] 创建 `src/data/tools.ts`
- [ ] 添加图片转换工具（8+）：TinyPNG、CloudConvert、IMG2GO 等
- [ ] 添加文档转换工具（6+）：iLovePDF、Smallpdf、PDF2DOC 等
- [ ] 添加视频转换工具（5+）：Convertio、OnlineConvert 等
- [ ] 添加音频转换工具（4+）：CloudConvert、AudioTrimmer 等
- [ ] 添加压缩工具（5+）：Compressor.io、TinyPNG 等
- [ ] 添加开发工具（6+）：JSONFormatter、Base64decode 等

### T4.2 工具数据结构
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
}
```

### T4.3 Favicon 处理
- [ ] 使用 Clearbit Logo API：`https://logo.clearbit.com/{domain}`
- [ ] 或使用本地 favicon 目录
- [ ] 添加 fallback 图标

### T4.4 Empty State
- [ ] 创建 `src/components/common/EmptyState.tsx`
- [ ] 无搜索结果时显示友好提示
- [ ] 建议重新搜索或浏览分类

### T4.5 Loading State
- [ ] 创建 `src/components/common/Skeleton.tsx`
- [ ] 卡片骨架屏加载动画
- [ ] 搜索时显示 loading 状态

---

## Sprint 5：体验优化

### T5.1 页面动画
- [ ] 配置 Framer Motion
- [ ] 添加页面过渡动画
- [ ] 添加卡片交错进入动画
- [ ] 添加搜索结果动画

### T5.2 键盘导航
- [ ] Tab 键导航
- [ ] Enter 键选择
- [ ] Esc 键关闭搜索/清空

### T5.3 快捷键
- [ ] `Cmd/Ctrl + K` 聚焦搜索框
- [ ] 在全局添加 keyboard listener

### T5.4 滚动优化
- [ ] 平滑滚动
- [ ] 滚动时 Header 效果（可选）

### T5.5 性能优化
- [ ] 图片懒加载
- [ ] 组件懒加载（React.lazy）
- [ ] 使用 React.memo 优化
- [ ] Lighthouse 检查

---

## Sprint 6：PWA 与发布

### T6.1 PWA 配置
- [ ] 安装：`npm install -D vite-plugin-pwa`
- [ ] 配置 `vite.config.ts`：
  - Register SW
  - Configure manifest
- [ ] 创建 `public/manifest.json`

### T6.2 PWA 资源
- [ ] 添加 PWA 图标（192x192, 512x512）
- [ ] 配置主题色
- [ ] 配置 display: standalone

### T6.3 SEO 优化
- [ ] 更新 `index.html` meta 标签
- [ ] 添加 Open Graph 标签
- [ ] 添加 sitemap（可选）

### T6.4 部署配置
- [ ] 创建 GitHub Actions workflow
- [ ] 配置 GitHub Pages 部署
- [ ] 设置分支保护

### T6.5 最终测试
- [ ] 全浏览器测试
- [ ] 移动设备测试
- [ ] 性能测试

---

## 任务进度总览

| Sprint | 任务数 | P0 | P1 | P2 |
|--------|--------|----|----|-----|
| Sprint 1 | 7 | 7 | 0 | 0 |
| Sprint 2 | 8 | 6 | 2 | 0 |
| Sprint 3 | 6 | 5 | 1 | 0 |
| Sprint 4 | 5 | 3 | 2 | 0 |
| Sprint 5 | 5 | 3 | 1 | 1 |
| Sprint 6 | 5 | 4 | 1 | 0 |
| **总计** | **36** | **28** | **7** | **1** |

---

*最后更新：2026-04-11*
