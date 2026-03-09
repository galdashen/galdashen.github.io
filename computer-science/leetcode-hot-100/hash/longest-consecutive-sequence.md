---
sidebar_position: 3
---

# 128. 最长连续序列

[原题链接](https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个未排序的整数数组 `int[] nums`，找出数组中数字可以组成连续整数的最长长度。

例如：对于 `[100, 4, 200, 1, 3, 2]`，最长连续序列是 `[1, 2, 3, 4]`，长度为 `4`。

需要用时间复杂度为 $O(n)$ 的算法解决此问题。

### 题解：哈希表

如果是有序的整数数组，就直接对该数组进行遍历，可以一边遍历一边判断是否连续，同时统计最大长度。但是排序的时间复杂度为 $O(n\log n)$，不符合题目要求。

考虑先遍历一遍数组，将所有的数值存入哈希表中，<abbr title="本次遍历可以不遍历原数组，而是遍历 Set">然后再次遍历数组</abbr>，对于每个数 `nums[i]` 寻找 `nums[i] + 1, nums[i] + 2, ...` 是否在哈希表中，从而统计长度。对于 `nums[i]`，可以先查看 `nums[i] - 1` 是否在哈希表内，从而判断 `nums[i]` 是否该作为统计的起点。

```java title="Java"
class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> num_set = new HashSet<Integer>();
        for (int num : nums) {
            num_set.add(num);
        }

        int longestStreak = 0;

        for (int num : num_set) {
            if (!num_set.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                while (num_set.contains(currentNum + 1)) {
                    currentNum += 1;
                    currentStreak += 1;
                }

                longestStreak = Math.max(longestStreak, currentStreak);
            }
        }

        return longestStreak;
    }
}
```

遍历了两次，第一次生成哈希表 $O(n)$，第二次遍历需要查询哈希表判断是否连续并统计长度，但数组中的每个数只会进入内层的 `while` 循环一次，所以第二次遍历的复杂度还是 $O(n)$，总时间复杂度为 $O(n)$。空间复杂度为哈希表占用的 $O(n)$。
