import React from "react";
import Head from "@docusaurus/Head";

const STORAGE_KEY = "site.color-theme";

const initColorThemeScript = `(() => {
  try {
    const value = window.localStorage.getItem("${STORAGE_KEY}");
    if (!value) return;
    const allowed = new Set(["nailong", "wendi", "fufu", "heita", "xilian", "dongxuelian"]);
    if (!allowed.has(value)) return;
    document.documentElement.setAttribute("data-color-theme", value);
  } catch {
    // Ignore read errors in private mode or restricted environments.
  }
})();`;

type RootProps = {
  children: React.ReactNode;
};

export default function Root({ children }: RootProps): React.JSX.Element {
  return (
    <>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: initColorThemeScript }} />
      </Head>
      {children}
    </>
  );
}
