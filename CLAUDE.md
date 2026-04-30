# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — 启动本地开发服务器（热重载）
- `npm run build` — 构建生产版本到 `build/`
- `npm run deploy` — 手动部署到 GitHub Pages（日常推送 main 分支即可，GitHub Actions 自动部署）
- `npm run typecheck` — TypeScript 类型检查
- `python check_leetcode.py` — 检查题解文件是否包含必需的章节（原题链接、时间复杂度、空间复杂度、方法/解法标题）

## 项目结构

- `computer-science/` — 唯一文档目录，路由前缀 `/`，自动生成侧边栏
  - `intro.md` — 首页（slug: `/`），C++ 基础教程（指针、链表、树、图）
  - `leetcode-hot-100/{topic}/` — LeetCode Hot 100 题解，按主题分类（array, binary-tree, hash, linked-list, matrix, sliding-window, substring, two-pointers）
  - `top-interview-150/` — Top Interview 150 题解
  - `java-interview/intro.md` — Java 面试笔记
- `src/theme/` — 自定义主题组件（移动端侧边栏、颜色主题切换按钮）
- `src/css/custom.css` — 全局样式及多套颜色主题（温迪绿、芙芙蓝、奶龙黄、胖猫紫、塔菲粉、东雪莲白、华为红）
- `static/` — 静态资源（`.nojekyll` 告诉 GitHub Pages 跳过 Jekyll 处理，不可删除）
- `docusaurus.config.ts` — Docusaurus 配置（路由、搜索、数学公式、代码高亮等）
- `sidebars.ts` — 文档侧边栏配置（自动生成，多学科可共用）
- `tsconfig.json` — 仅用于编辑器智能提示，不参与编译（`ignoreDeprecations: "6.0"` 静默 baseUrl 弃用警告）
- `.github/workflows/deploy.yml` — 推送到 main 分支自动构建并部署到 GitHub Pages

## 题解编写规范

- 每个 `.md` 文件顶部有 `sidebar_position` frontmatter，控制目录显示顺序
- 必须包含：原题链接、时间复杂度、空间复杂度
- 解法用 `### 方法` 或 `### 解法` 作为小节标题
- 代码块标注 `java title="Java"` 或相应语言标签
- 同一方法有多种实现时，使用 `import Tabs from '@theme/Tabs'` / `TabItem` 切换（参考 `kth-smallest-element-in-a-bst.md`）
- 分类目录下需有 `_category_.json` 配置 label 和 position

## 添加新学科

需要同时修改以下位置（⚠️ 数组顺序必须一一对应）：

1. `docusaurus.config.ts` — 注册新的 docs 插件实例
2. `docusaurus.config.ts` — 搜索插件中 `docsDir` 和 `docsRouteBasePath` 各加一项
3. 可共用 `sidebars.ts`，也可新建独立的侧边栏文件

## 添加新颜色主题

需要同时修改三个文件：

1. `src/css/custom.css` — 添加 `[data-color-theme="xxx"]` 的 CSS 变量
2. `src/theme/NavbarItem/ColorThemeNavbarItem.tsx` — 在 `ThemeId` 类型和 `COLOR_THEMES` 数组中添加新主题
3. `docusaurus.config.ts` — 在 `initColorThemeScript` 的 `allowed` Set 中添加新主题名
