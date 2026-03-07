---
sidebar_position: 1
---

# 1. 两数之和

[原题链接](https://leetcode.cn/problems/two-sum/?envType=study-plan-v2&envId=top-100-liked)

给定一个整数数组 `int[] nums` 和一个目标整数 `int target`，需要在 `nums` 中找到两个下标不同的整数，使得它们的和为 `target`，返回这两个整数的下标 `int[]`。

假设每个测试用例只会对应一个答案，并且可以按任意顺序返回答案。

### 方法一：暴力解法

两重 `for` 循环对数组暴力遍历，检查每个情况的和是否为 `target`。

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int n = nums.length;
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[0];
    }
}
```

两重 `for` 循环，时间复杂度为 $ O(N^2) $。没有用到额外空间，空间复杂度为 $ O(1) $。

### 方法二：哈希表
