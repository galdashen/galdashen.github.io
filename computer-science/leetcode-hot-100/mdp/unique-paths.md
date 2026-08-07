---
sidebar_position: 1
---

# 62. 不同路径

[原题链接](https://leetcode.cn/problems/unique-paths/description/?envType=study-plan-v2&envId=top-100-liked)

一个机器人位于一个 `m x n` 网格的左上角（起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

### 方法一：动态规划

```java title="Java"
class Solution {
    public int uniquePaths(int m, int n) {
        if (n < m) return uniquePaths(n, m);
        int[] f = new int[n];
        for (int i = 0; i < n; ++i) {
            f[i] = 1;
        }
        for (int i = 1; i < m; ++i) {
            for (int j = 1; j < n; ++j) {
                f[j] += f[j - 1];
            }
        }
        return f[n - 1];
    }
}
```

时间复杂度：$O(mn)$。

空间复杂度：$O(\text{min}(m, n))$。

### 方法二：组合数

计算 $C_{m + n - 2}^{m - 1} = \dfrac{(m + n - 2)(m + n - 3)\cdots n}{(m - 1)!}$。

```java title="Java"
class Solution {
    public int uniquePaths(int m, int n) {
        if (n < m) return uniquePaths(n, m);
        long ans = 1;
        for (int x = n, y = 1; y < m; ++x, ++y) {
            ans = ans * x / y;
        }
        return (int) ans;
    }
}
```

时间复杂度：$O(\text{min}(m, n))$。

空间复杂度：$O(1)$。
