---
sidebar_position: 7
---

# 131. 分割回文串

[原题链接](https://leetcode.cn/problems/palindrome-partitioning/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个字符串 `s`，请你将 `s` 分割成一些子串，使每个子串都是回文串。返回 `s` 所有可能的分割方案。

### 解法：回溯

```java title="Java"
class Solution {
    private boolean[][] f;
    private List<List<String>> ret;
    private List<String> ans;
    public List<List<String>> partition(String s) {
        int n = s.length();
        ret = new ArrayList<>();
        ans = new ArrayList<>();
        f = new boolean[n][n];
        for (int i = 0; i < n; ++i) f[i][i] = true;
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                f[i][j] = (s.charAt(i) == s.charAt(j)) && (len == 2 || f[i + 1][j - 1]);
            }
        }
        dfs(s, 0);
        return ret;
    }
    private void dfs(String s, int i) {
        if (i == s.length()) {
            ret.add(new ArrayList<>(ans));
            return;
        }
        for (int j = i; j < s.length(); ++j) {
            if (f[i][j]) {
                ans.add(s.substring(i, j + 1));
                dfs(s, j + 1);
                ans.remove(ans.size() - 1);
            }
        }
    }
}
```

时间复杂度：$O(n\cdot 2^n)$，在最坏情况下，`s` 包含 $n$ 个完全相同的字符。

空间复杂度：$O(n^2)$。
