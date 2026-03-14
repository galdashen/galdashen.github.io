---
sidebar_position: 2
---

# 11. 盛最多水的容器

[原题链接](https://leetcode.cn/problems/container-with-most-water/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个整数数组 `int[] height` 代表容器壁高度，从中找出一对 `i, j`，使得它们能装的水 `abs(i - j) * min(height[i], height[j])` 最多。返回最大水量 `int`。

### 题解：双指针

首先暴力解法很容易想到，两重 `for` 循环遍历数组，求每一对 `i, j` 的水量，然后取最大值。时间复杂度为 $O(n^2)$。

优化思路是要减少不必要的情况，首先设 `i = 0, j = height.length - 1`，然后

1. 求对应的水量
2. 较矮的一条边往里移动

不断重复以上两步直到 `i = j`。这样就只遍历了一遍数组。

为什么这种做法可行呢？以 `height.length = 8` 为例，暴力解法遍历了以下所有情况，如下图所示

$$
\begin{matrix}
(0,1) & (0,2) & (0,3) & (0,4) & (0,5) & (0,6) & (0,7) \\
& (1,2) & (1,3) & (1,4) & (1,5) & (1,6) & (1,7) \\
& & (2,3) & (2,4) & (2,5) & (2,6) & (2,7) \\
& & & (3,4) & (3,5) & (3,6) & (3,7) \\
& & & & (4,5) & (4,6) & (4,7) \\
& & & & & (5,6) & (5,7) \\
& & & & & & (6,7)
\end{matrix}
$$

首先设 `i = 0, j = 7`，也就是说我们取的是 `(0,7)`，在右上角，然后我们比较 `height[0]` 与 `height[7]`，假设 `height[0] < height[7]`，此时我们就会有 `(0,1) (0,2) (0,3) (0,4) (0,5) (0,6)` 的水量都比 `(0,7)` 的水量小，于是可以排除它们，如下图所示

$$
\begin{matrix}
\bcancel{(0,1)} & \bcancel{(0,2)} & \bcancel{(0,3)} & \bcancel{(0,4)} & \bcancel{(0,5)} & \bcancel{(0,6)} & \bcancel{(0,7)} \\
& (1,2) & (1,3) & (1,4) & (1,5) & (1,6) & (1,7) \\
& & (2,3) & (2,4) & (2,5) & (2,6) & (2,7) \\
& & & (3,4) & (3,5) & (3,6) & (3,7) \\
& & & & (4,5) & (4,6) & (4,7) \\
& & & & & (5,6) & (5,7) \\
& & & & & & (6,7)
\end{matrix}
$$

此时仍然从右上角开始，取 `(1,7)`，假设 `height[1] > height[7]`，此时我们就会有 `(2,7) (3,7) (4,7) (5,7) (6,7)` 的水量都比 `(1,7)` 的水量小，于是可以排除它们，如下图所示

$$
\begin{matrix}
\bcancel{(0,1)} & \bcancel{(0,2)} & \bcancel{(0,3)} & \bcancel{(0,4)} & \bcancel{(0,5)} & \bcancel{(0,6)} & \bcancel{(0,7)} \\
& (1,2) & (1,3) & (1,4) & (1,5) & (1,6) & \bcancel{(1,7)} \\
& & (2,3) & (2,4) & (2,5) & (2,6) & \bcancel{(2,7)} \\
& & & (3,4) & (3,5) & (3,6) & \bcancel{(3,7)} \\
& & & & (4,5) & (4,6) & \bcancel{(4,7)} \\
& & & & & (5,6) & \bcancel{(5,7)} \\
& & & & & & \bcancel{(6,7)}
\end{matrix}
$$

不断重复以上过程即可，每次都取右上角。

```java title="Java"
public class Solution {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1;
        int ans = 0;
        while (l < r) {
            int area = Math.min(height[l], height[r]) * (r - l);
            ans = Math.max(ans, area);
            if (height[l] <= height[r]) {
                ++l;
            }
            else {
                --r;
            }
        }
        return ans;
    }
}
```

时间复杂度 $O(n)$，空间复杂度 $O(1)$。
