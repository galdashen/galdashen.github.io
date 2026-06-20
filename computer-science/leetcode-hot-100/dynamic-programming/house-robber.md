---
sidebar_position: 3
---

# 198. 打家劫舍

[原题链接](https://leetcode.cn/problems/house-robber/description/?envType=study-plan-v2&envId=top-100-liked)

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。

### 解法：动态规划

递推关系，`dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])`。

```java title="Java"
class Solution {
    public int rob(int[] nums) {
        int length = nums.length;
        if (length == 1) {
            return nums[0];
        }
        int first = nums[0], second = Math.max(nums[0], nums[1]);
        for (int i = 2; i < length; i++) {
            int temp = second;
            second = Math.max(first + nums[i], second);
            first = temp;
        }
        return second;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
