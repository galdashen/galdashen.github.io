---
sidebar_position: 6
---

# 139. 单词拆分

[原题链接](https://leetcode.cn/problems/word-break/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个字符串 `s` 和一个字符串列表 `wordDict` 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 `s` 则返回 `true`。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

### 解法：动态规划

`dp[i]=dp[j] && check(s[j..i−1])`。

```java title="Java"
public class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordDictSet = new HashSet(wordDict);
        boolean[] dp = new boolean[s.length() + 1]; // 记录 wordDictSet.contains(s.substring(0, i)) ?
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = i - 1; j >= 0 && i - j <= 20; j--) {
                if (dp[j] && wordDictSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}
```

时间复杂度：$O(n^2)$，其中 $n$ 是字符串长度。

空间复杂度：$O(n + m)$，其中 $m$ 是哈希表大小。
