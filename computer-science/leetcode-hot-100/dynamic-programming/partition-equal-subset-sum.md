---
sidebar_position: 9
---

# 416. 分割等和子集

[原题链接](https://leetcode.cn/problems/partition-equal-subset-sum/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个只包含正整数的非空数组 `nums`。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

### 解法：动态规划

```java title="Java"
class Solution {
    public boolean canPartition(int[] nums) {
        int n = nums.length;
        int sum = 0;
        for (int num : nums) sum += num;
        if (sum % 2 != 0) return false;
        int target = sum / 2;
        // dp[j] 表示是否能从数组中选出一些数，使得它们的和为 j
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int num : nums) {
            // 必须从后往前遍历，避免重复使用同一个数
            for (int i = target; i >= num; --i) dp[i] |= dp[i - num];
        }
        return dp[target];
    }
}
```

时间复杂度：$O(n \times target)$。

空间复杂度：$O(target)$。
