---
sidebar_position: 1
---

# 1. 两数之和

[原题链接](https://leetcode.cn/problems/two-sum/description/?envType=study-plan-v2&envId=top-100-liked) [官解链接](https://leetcode.cn/problems/two-sum/solutions/434597/liang-shu-zhi-he-by-leetcode-solution/?envType=study-plan-v2&envId=top-100-liked)

给定一个整数数组 `int[] nums` 和一个目标整数 `int target`，需要在 `nums` 中找到两个下标不同的整数，使得它们的和为 `target`，返回这两个整数的下标 `int[]`。

假设每个测试用例只会对应一个答案，并且可以按任意顺序返回两个下标。

### 方法一：暴力解法

两重 `for` 循环遍历数组，检查每对整数的和是否为 `target`。

```java title="Java"
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

两重 `for` 循环，时间复杂度为 $O(N^2)$。没有用到额外空间，空间复杂度为 $O(1)$。

### 方法二：哈希表

遍历一遍数组，遍历过程中把已知的数值和下标信息存在哈希表里。每遍历一个数就把该数的值 `nums[i]` 还有下标 `i` 存到哈希表中，可以先通过哈希表检查先前的数中是否有等于 `target - nums[i]` 的，如果有的话就说明找到了。

```java title="Java"
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> hashtable = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums.length; ++i) {
            if (hashtable.containsKey(target - nums[i])) {
                return new int[]{hashtable.get(target - nums[i]), i};
            }
            hashtable.put(nums[i], i);
        }
        return new int[0];
    }
}
```

只遍历了一遍数组，时间复杂度为 $O(N)$。哈希表要储存数组中的元素，空间复杂度为 $O(N)$。
