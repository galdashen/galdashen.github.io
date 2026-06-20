---
sidebar_position: 1
---

# 1. 两数之和

[原题链接](https://leetcode.cn/problems/two-sum/description/?envType=study-plan-v2&envId=top-100-liked)

从数组里找两个数，使得它们的和为目标值。

### 解法：哈希表

遍历一遍数组，遍历过程中把已知的数值和下标信息存在哈希表里。每遍历一个数就把该数的值 `nums[i]` 还有下标 `i` 存到哈希表中，可以先通过哈希表检查先前的数中是否有等于 `target - nums[i]` 的，如果有的话就说明找到了。

```java title="Java"
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(target - nums[i])) {
                return new int[] { map.get(target - nums[i]), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
