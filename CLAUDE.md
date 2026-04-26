# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn start` — 启动本地开发服务器（热重载）
- `yarn build` — 构建生产版本到 `build/`
- `yarn deploy` — 部署到 GitHub Pages
- `yarn typecheck` — TypeScript 类型检查
- `python check_leetcode.py` — 检查题解文件是否包含必需的章节（原题链接、时间复杂度、空间复杂度、方法/解法标题）

## 项目结构

- `computer-science/` — Docusaurus 文档根目录，自动生成侧边栏
  - `intro.md` — C++ 基础教程（指针、链表、树、图）
  - `leetcode-hot-100/{topic}/` — LeetCode Hot 100 题解，按主题分类（array, binary-tree, hash, linked-list, matrix, sliding-window, substring, two-pointers）
  - `top-interview-150/` — Top Interview 150 题解
  - `java-interview/intro.md` — Java 面试笔记
- `src/` — 自定义 React 组件（首页、导航栏、颜色主题切换）
- `static/` — 静态资源（图片、图标）
- `docusaurus.config.ts` — Docusaurus 配置（路由、搜索、数学公式、代码高亮等）
- `sidebarsComputerScience.ts` — 文档侧边栏配置（自动生成）
- `.github/workflows/deploy.yml` — 推送到 main 分支自动构建并部署到 GitHub Pages

## 题解编写规范

- 每个 `.md` 文件顶部有 `sidebar_position` frontmatter，控制目录显示顺序
- 必须包含：原题链接、时间复杂度、空间复杂度
- 解法用 `### 方法` 或 `### 解法` 作为小节标题
- 代码块标注 `java title="Java"` 或相应语言标签
- 同一方法有多种实现时，使用 `import Tabs from '@theme/Tabs'` / `TabItem` 切换（参考 `kth-smallest-element-in-a-bst.md`）
- 分类目录下需有 `_category_.json` 配置 label 和 position
