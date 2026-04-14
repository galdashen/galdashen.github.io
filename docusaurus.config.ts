import { themes as prismThemes } from "prism-react-renderer";
import rehypeKatex from "rehype-katex";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const initColorThemeScript = `(() => {
  try {
    const value = window.localStorage.getItem("site.color-theme");
    if (!value) return;
    const allowed = new Set(["wendi", "fufu", "nailong", "pangmao", "taffy", "dongxuelian", "huawei"]);
    if (!allowed.has(value)) return;
    document.documentElement.setAttribute("data-color-theme", value);
  } catch {
    // Ignore read errors in restricted environments.
  }
})();`;

const config: Config = {
  title: "galdashen",
  tagline: "本站主要用于存放我的学习笔记",
  favicon: "https://github.com/galdashen.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://galdashen.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "galdashen", // Usually your GitHub org/user name.
  projectName: "galdashen.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",

  onBrokenLinks: "throw",

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
      type: "text/css",
    },
  ],
  headTags: [
    {
      tagName: "script",
      attributes: {},
      innerHTML: initColorThemeScript,
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsDir: ["computer-science"],
        docsRouteBasePath: ["computer-science"],
        searchBarShortcutHint: false,
        hashed: true,
        language: ["zh", "en"],
        docsPluginIdForPreferredVersion: "computer-science",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "computer-science",
        path: "computer-science",
        routeBasePath: "computer-science",
        sidebarPath: "./sidebarsComputerScience.ts",
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/social-card.jpg",
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: "Home",
      logo: {
        alt: "My Site Logo",
        src: "https://github.com/galdashen.png",
      },
      items: [
        {
          to: "/computer-science/intro",
          label: "计算机",
          position: "left",
        },
        {
          href: "https://github.com/galdashen",
          label: "GitHub",
          position: "right",
        },
        {
          type: "search",
          position: "right",
        },
        {
          type: "custom-colorTheme",
          position: "right",
          className: "color-theme-desktop-item",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} galdashen.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["java", "cpp"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
