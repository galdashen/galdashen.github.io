---
sidebar_position: 5
---

# 153. 寻找旋转排序数组中的最小值

[原题链接](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked)

已知一个长度为 `n` 的数组，预先按照升序排列，经由 `1` 到 `n` 次旋转后，得到输入数组。例如，原数组 `nums = [0,1,2,4,5,6,7]` 在变化后可能得到：

- 若旋转 `4` 次，则可以得到 `[4,5,6,7,0,1,2]`
- 若旋转 `7` 次，则可以得到 `[0,1,2,4,5,6,7]`

注意，数组 `[a[0], a[1], a[2], ..., a[n-1]]` 旋转一次的结果为数组 `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`。

给你一个元素值互不相同的数组 `nums`，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的最小元素。

你必须设计一个时间复杂度为 `O(log n)` 的算法解决此问题。

### 解法：二分查找

二分查找，希望 `left` 和 `right` 之间的元素是断开的，因为这样才能找到中间的间断点，代码始终保持 `nums[left] > nums[right]`。

```java title="Java"
class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        if (nums[left] <= nums[right]) return nums[left];
        while (right - left > 1) {
            int mid = (right - left) / 2 + left;
            if (nums[mid] < nums[right]) {
                right = mid;
            } else {
                left = mid;
            }
        }
        return nums[right];
    }
}
```

时间复杂度：$O(\log n)$。

空间复杂度：$O(1)$。
