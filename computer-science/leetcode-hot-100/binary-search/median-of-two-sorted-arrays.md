---
sidebar_position: 6
---

# 4. 寻找两个正序数组的中位数

[原题链接](https://leetcode.cn/problems/median-of-two-sorted-arrays/description/?envType=study-plan-v2&envId=top-100-liked)

给定两个大小分别为 `m` 和 `n` 的正序（从小到大）数组 `nums1` 和 `nums2`。请你找出并返回这两个正序数组的中位数。

算法的时间复杂度应该为 `O(log (m+n))`。

### 解法：划分数组二分查找

将 `nums1` 和 `nums2` 划分为两部分，使得左半部分和右半部分的数量一样多。

```java title="Java"
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int len1 = nums1.length, len2 = nums2.length;
        int left1 = 0, right1 = len1; // 左闭右开区间，可以处理 nums1 左半部分为空的情况
        int leftMax = 0, rightMin = 0;
        while (left1 <= right1) {
            int mid1 = (right1 - left1) / 2 + left1; // mid1 位置算右半部分的元素
            int mid2 = (len1 + len2) / 2 - mid1; // 左边少于等于右边，mid2 位置也算右边的元素
            int l1 = mid1 == 0 ? Integer.MIN_VALUE : nums1[mid1 - 1];
            int r1 = mid1 == len1 ? Integer.MAX_VALUE : nums1[mid1];
            int l2 = mid2 == 0 ? Integer.MIN_VALUE : nums2[mid2 - 1];
            int r2 = mid2 == len2 ? Integer.MAX_VALUE : nums2[mid2];
            leftMax = Math.max(l1, l2);
            rightMin = Math.min(r1, r2);
            if (leftMax <= rightMin) {
                break;
            } else if (l1 > l2) {
                right1 = mid1 - 1;
            } else {
                left1 = mid1 + 1;
            }
        }
        return (len1 + len2) % 2 == 1 ? rightMin : (leftMax + rightMin) / 2.0;
    }
}
```

时间复杂度：$O(\log \min(m, n))$。

空间复杂度：$O(1)$。
