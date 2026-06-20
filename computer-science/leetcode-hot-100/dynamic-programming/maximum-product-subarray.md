---
sidebar_position: 8
---

# 152. 乘积最大子数组

[原题链接](https://leetcode.cn/problems/maximum-product-subarray/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个整数数组 `nums`，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个32位整数。

请注意，一个只包含一个元素的数组的乘积是这个元素的值。

### 解法：动态规划

开两个变量分别记录以当前元素结尾的最大乘积和最小乘积。因为负数会导致最大乘积和最小乘积互换，所以需要同时记录两者。

```java title="Java"
class Solution {
    public int maxProduct(int[] nums) {
        int maxF = nums[0], minF = nums[0];
        int ans = nums[0];
        int length = nums.length;
        for (int i = 1; i < length; ++i) {
            int mx = maxF, mn = minF;
            maxF = Math.max(mx * nums[i], Math.max(nums[i], mn * nums[i]));
            minF = Math.min(mn * nums[i], Math.min(nums[i], mx * nums[i]));
            ans = Math.max(maxF, ans);
        }
        return ans;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
