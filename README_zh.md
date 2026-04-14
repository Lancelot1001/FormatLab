# FormatLab

精心整理的在线格式转换工具集合。

![FormatLab](https://img.shields.io/badge/FormatLab-Tools-gold?style=for-the-badge)

[WEB](https://fomatlab.9328472.xyz/)

[English](README.md)

## 功能特点

- **50+ 工具** 覆盖 6 大分类
- **模糊搜索** 即时显示结果
- **双语切换** 支持中英文
- **暗色主题** 毛玻璃设计
- **收藏功能** 本地保存常用工具

## 分类

- 图片 - PNG、JPG、WebP、GIF 压缩和转换
- 文档 - PDF 合并、分割、转换
- 视频 - MP4、AVI、MOV 转换
- 音频 - MP3、WAV、FLAC 转换
- 压缩 - 文件压缩工具
- 开发 - JSON、Base64、二维码工具

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand（状态管理）
- Fuse.js（模糊搜索）
- i18next（国际化）
- Framer Motion（动画）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build
```

## 项目结构

```
src/
├── components/
│   ├── common/       # 可复用 UI 组件
│   ├── features/     # 功能组件
│   └── layout/       # 布局组件
├── data/             # 工具数据
├── hooks/            # 自定义 hooks
├── i18n/             # 翻译文件
├── pages/            # 页面组件
├── store/            # Zustand 状态
├── styles/           # 全局样式
└── types/            # TypeScript 类型
```

## 许可证

MIT
