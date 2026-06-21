---
sidebar_position: 1
---

# 53. 最大子数组和

[原题链接](https://leetcode.cn/problems/maximum-subarray/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个整数数组，找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

### 解法：动态规划

用 $f(i)$ 代表已第 $i$ 个位置结尾的连续子数组的最大和，则 $f(i) = max\{f(i - 1) + nums[i], nums[i]\}$。

```java title="Java"
class Solution {
    public int maxSubArray(int[] nums) {
        int pre = 0, maxAns = nums[0];
        for (int x : nums) {
            pre = Math.max(pre + x, x);
            maxAns = Math.max(maxAns, pre);
        }
        return maxAns;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
