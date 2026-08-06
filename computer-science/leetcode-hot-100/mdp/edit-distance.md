---
sidebar_position: 5
---

# 72. 编辑距离

[原题链接](https://leetcode.cn/problems/edit-distance/description/?envType=study-plan-v2&envId=top-100-liked)

给你两个单词 `word1` 和 `word2`，请返回将 `word1` 转换成 `word2` 所使用的最少操作数。

你可以对一个单词进行如下三种操作：

- 插入一个字符
- 删除一个字符
- 替换一个字符

### 解法：动态规划

将三种操作全部视为配对，该配对操作将 `word1` 的插入（删除）与 `word2` 的删除（插入）进行配对，将替换直接视为配对，然后可知与操作顺序无关，根据字符串最末尾的配对情况进行分类讨论。

```java title="Java"
class Solution {
    public int minDistance(String word1, String word2) {
        int n = word1.length();
        int m = word2.length();
        if (n * m == 0) return n + m;
        // 将 word1 的前 i 个字符转换为 word2 的前 j 个字符所需的最少操作次数
        int[][] D = new int[n + 1][m + 1];
        for (int i = 0; i < n + 1; i++) D[i][0] = i;
        for (int j = 0; j < m + 1; j++) D[0][j] = j;
        for (int i = 1; i < n + 1; i++) {
            for (int j = 1; j < m + 1; j++) {
                // 分三种情况讨论 D[i - 1][j]、D[i][j - 1] 和 D[i - 1][j - 1]
                int top = D[i - 1][j] + 1;
                int left = D[i][j - 1] + 1;
                int top_left = D[i - 1][j - 1];
                if (word1.charAt(i - 1) != word2.charAt(j - 1)) {
                    top_left += 1;
                }
                D[i][j] = Math.min(top, Math.min(left, top_left));
            }
        }
        return D[n][m];
    }
}
```

时间复杂度：$O(nm)$。

空间复杂度：$O(nm)$。
