---
sidebar_position: 3
---

# 45. 跳跃游戏 II

[原题链接](https://leetcode.cn/problems/jump-game-ii/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个长度为 `n` 的 `0` 索引整数数组 `nums`。初始位置在下标 `0`。

每个元素 `nums[i]` 表示从索引 `i` 向后跳转的最大长度。换句话说，如果你在索引 `i` 处，你可以跳转到任意 `(i + j)` 处：

- `0 <= j <= nums[i]` 且
- `i + j < n`

返回到达 `n - 1` 的最小跳跃次数。测试用例保证可以到达 `n - 1`。

### 解法：贪心

```java title="Java"
class Solution {
    public int jump(int[] nums) {
        int length = nums.length;
        int end = 0;
        int maxPosition = 0;
        int steps = 0;
        for (int i = 0; i < length; i++) {
            if (i > end) {
                end = maxPosition;
                steps++;
            }
            maxPosition = Math.max(maxPosition, i + nums[i]);
        }
        return steps;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
