---
sidebar_position: 5
---

# 41. 缺失的第一个正数

[原题链接](https://leetcode.cn/problems/first-missing-positive/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个未排序的整数数组 `nums`，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 $O(n)$ 并且只使用常数级别额外空间的解决方案。

### 方法一：哈希表

记数组长度为 `n`，注意到返回的答案一定小于等于 `n + 1`。可以考虑开一个长度为 `n` 的数组当哈希，记录 $1\sim n$ 内出现的数字，然后找到里面最小的未出现数字，返回答案，但是这样不满足题目的空间复杂度要求。

考虑直接修改原数组。首先第一次遍历，由于负数和零不会对答案产生影响，将其改为一个大于 `n` 的正数（也不会对答案产生影响），确保所有数组元素均为正。然后第二次遍历数组，记录 $1\sim n$ 内出现的数字，结果保存到哈希表里，但是为了不开额外空间，继续修改原数组，将原数组当作哈希表，给 `nums[i]` 添上负号表示正数 `i + 1` 已出现。第三次遍历就可查找答案并返回。

```java title="Java"
class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; ++i) {
            if (nums[i] <= 0) {
                nums[i] = n + 1;
            }
        }
        for (int i = 0; i < n; ++i) {
            int num = Math.abs(nums[i]);
            if (num <= n) {
                nums[num - 1] = -Math.abs(nums[num - 1]);
            }
        }
        for (int i = 0; i < n; ++i) {
            if (nums[i] > 0) {
                return i + 1;
            }
        }
        return n + 1;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。

### 方法二：置换

对原数组进行置换，将在 $1 \sim n$ 之间的数 $x$ 交换到位置 `nums[x - 1]`。

```java title="Java"
class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; ++i) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int temp = nums[nums[i] - 1];
                nums[nums[i] - 1] = nums[i];
                nums[i] = temp;
            }
        }
        for (int i = 0; i < n; ++i) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        return n + 1;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
