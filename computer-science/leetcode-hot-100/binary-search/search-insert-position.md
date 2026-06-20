---
sidebar_position: 1
---

# 35. 搜索插入位置

[原题链接](https://leetcode.cn/problems/search-insert-position/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 `O(log n)` 的算法。

### 解法：二分查找

希望返回的 `ans` 左边的数都小于 `target`，位置 `ans` 和右边的数都大于等于 `target`。

```java title="Java"
class Solution {
    public int searchInsert(int[] nums, int target) {
        int n = nums.length;
        int left = 0, right = n - 1;
        while (left <= right) {
            int mid = (right - left) / 2 + left;
            if (target <= nums[mid]) {
                right = mid - 1; // right 右边都是大于等于 target 的数
            } else {
                left = mid + 1; // left 左边都是小于 target 的数
            }
        }
        return left;
    }
}
```

时间复杂度：$O(\log n)$。

空间复杂度：$O(1)$。
