# galdashen.github.io

个人学习笔记站点，基于 [Docusaurus](https://docusaurus.io/) 构建，部署在 [GitHub Pages](https://galdashen.github.io)。

## 📚 内容

- **LeetCode Hot 100**：按主题分类的题解（数组、哈希、链表、二叉树、矩阵、滑动窗口、子串、双指针）
- **Top Interview 150**：高频面试题题解
- **Java 面试笔记**：Java 常见面试知识点整理
- **C++ 基础教程**：指针、链表、树、图等基础内容

## 🚀 快速开始

**安装依赖**

```bash
npm install
```

**启动本地开发服务器**

```bash
npm start
```

**构建生产版本**

```bash
npm run build
```

构建产物输出到 `build/` 目录，可通过任意静态文件托管服务部署。

**部署到 GitHub Pages**

```bash
npm run deploy
```

## 🛠️ 技术栈

- [Docusaurus v3](https://docusaurus.io/) — 静态站点框架
- [KaTeX](https://katex.org/) — 数学公式渲染
- [@easyops-cn/docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local) — 本地全文搜索（支持中英文）
- GitHub Actions — 推送 `main` 分支自动构建并部署
