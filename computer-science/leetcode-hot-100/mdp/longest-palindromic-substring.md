---
sidebar_position: 3
---

# 5. 最长回文子串

[原题链接](https://leetcode.cn/problems/longest-palindromic-substring/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

### 方法一：动态规划

首先所有长度为 1 的子串都是回文串。对于长度大于 1 的子串，如果首尾字符相同，并且去掉首尾字符的子串也是回文串，那么这个子串也是回文串。

```java title="Java"
public class Solution {
    public String longestPalindrome(String s) {
        int len = s.length();
        if (len < 2) return s;
        int maxLen = 1;
        int begin = 0;
        // dp[i][j] 表示 s[i..j] 是否是回文串，索引从 0 开始
        boolean[][] dp = new boolean[len][len];
        for (int i = 0; i < len; i++) dp[i][i] = true;
        char[] charArray = s.toCharArray();
        for (int L = 2; L <= len; L++) {
            for (int i = 0; i < len - L + 1; i++) {
                int j = L + i - 1;
                if (charArray[i] == charArray[j]) {
                    if (L == 2) {
                        dp[i][j] = true;
                    } else {
                        dp[i][j] = dp[i + 1][j - 1];
                    }
                }
                if (dp[i][j] && L > maxLen) {
                    maxLen = L;
                    begin = i;
                }
            }
        }
        return s.substring(begin, begin + maxLen);
    }
}
```

时间复杂度：$O(n^2)$。

空间复杂度：$O(n^2)$。

### 方法二：中心扩展

从每个中心往外扩展，注意有奇偶两种情况。

```java title="Java"
class Solution {
    public String longestPalindrome(String s) {
        int start = 0, maxLen = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > maxLen) {
                start = i - (len - 1) / 2;
                maxLen = len;
            }
        }
        return s.substring(start, start + maxLen);
    }
    public int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            --left;
            ++right;
        }
        return right - left - 1; // 求 left 和 right 指针之间的长度，不包括这两个指针
    }
}
```

时间复杂度：$O(n^2)$。

空间复杂度：$O(1)$。
