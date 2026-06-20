---
sidebar_position: 7
---

# 131. 分割回文串

[原题链接](https://leetcode.cn/problems/palindrome-partitioning/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个字符串 `s`，请你将 `s` 分割成一些子串，使每个子串都是回文串。返回 `s` 所有可能的分割方案。

### 方法一：回溯 + 动态规划预处理

```java title="Java"
class Solution {
    List<List<String>> ret = new ArrayList<List<String>>();
    List<String> ans = new ArrayList<String>();

    public List<List<String>> partition(String s) {
        int n = s.length();
        boolean[][] f = new boolean[n][n];
        for (int i = 0; i < n; i++) {
            f[i][i] = true;
        }
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                f[i][j] = (s.charAt(i) == s.charAt(j)) && (len == 2 || f[i + 1][j - 1]);
            }
        }
        dfs(s, f, 0);
        return ret;
    }

    private void dfs(String s, boolean[][] f, int i) {
        if (i == s.length()) {
            ret.add(new ArrayList<>(ans));
            return;
        }
        for (int j = i; j < s.length(); j++) {
            if (f[i][j]) {
                ans.add(s.substring(i, j + 1));
                dfs(s, f, j + 1);
                ans.remove(ans.size() - 1);
            }
        }
    }
}
```

时间复杂度：$O(n\cdot 2n)$，在最坏情况下，`s` 包含 $n$ 个完全相同的字符。

空间复杂度：$O(n^2)$。

### 方法二：回溯 + 记忆化搜索

```java title="Java"
class Solution {
    int[][] f;
    List<List<String>> ret = new ArrayList<List<String>>();
    List<String> ans = new ArrayList<String>();
    int n;

    public List<List<String>> partition(String s) {
        n = s.length();
        f = new int[n][n];

        dfs(s, 0);
        return ret;
    }

    public void dfs(String s, int i) {
        if (i == n) {
            ret.add(new ArrayList<String>(ans));
            return;
        }
        for (int j = i; j < n; ++j) {
            if (isPalindrome(s, i, j) == 1) {
                ans.add(s.substring(i, j + 1));
                dfs(s, j + 1);
                ans.remove(ans.size() - 1);
            }
        }
    }

    // 记忆化搜索中，f[i][j] = 0 表示未搜索，1 表示是回文串，-1 表示不是回文串
    public int isPalindrome(String s, int i, int j) {
        if (f[i][j] != 0) {
            return f[i][j];
        }
        if (i >= j) {
            f[i][j] = 1;
        } else if (s.charAt(i) == s.charAt(j)) {
            f[i][j] = isPalindrome(s, i + 1, j - 1);
        } else {
            f[i][j] = -1;
        }
        return f[i][j];
    }
}
```

时间复杂度：$O(n\cdot 2n)$。

空间复杂度：$O(n^2)$。
