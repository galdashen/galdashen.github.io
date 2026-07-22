---
sidebar_position: 3
---

# 34. 在排序数组中查找元素的第一个和最后一个位置

[原题链接](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

### 解法：二分查找

把数组分为三个部分，第一部分是小于 `target` 的元素，第二部分是等于 `target` 的元素，第三部分是大于 `target` 的元素。为了得到第一部分可以通过二分查找将数组划分为小于 `target` 和大于等于 `target` 的两部分；为了得到第三部分可以仿照上一步写一个新的二分查找将数组划分为小于等于 `target` 和大于 `target` 的两部分，也可以直接利用上一个二分查找将数组划分为小于 `target + 1` 和大于等于 `target + 1` 的两部分。

```java title="Java"
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int leftIndex = binarySearch(nums, target);
        int rightIndex = binarySearch(nums, target + 1) - 1;
        return leftIndex <= rightIndex ? new int[] {leftIndex, rightIndex} : new int[]{-1, -1};
    }
    private int binarySearch(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = (right - left) / 2 + left;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
}
```

时间复杂度：$O(\log n)$。

空间复杂度：$O(1)$。
