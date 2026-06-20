---
sidebar_position: 4
---

# 279. 完全平方数

[原题链接](https://leetcode.cn/problems/perfect-squares/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个整数 `n`，返回和为 `n` 的完全平方数的最少数量。

完全平方数是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，`1`、`4`、`9` 和 `16` 都是完全平方数，而 `3` 和 `11` 不是。

### 解法：动态规划

递推式，`f[i] = min(f[i - j * j] + 1)`。

```java title="Java"
class Solution {
    public int numSquares(int n) {
        int[] f = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int minn = i; // 最坏情况，全部用 1 的平方
            for (int j = 1; j * j <= i; j++) {
                minn = Math.min(minn, f[i - j * j] + 1);
            }
            f[i] = minn;
        }
        return f[n];
    }
}
```

时间复杂度：$O(n \sqrt n)$。

空间复杂度：$O(n)$。
