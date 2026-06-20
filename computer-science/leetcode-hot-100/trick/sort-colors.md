---
sidebar_position: 3
---

# 75. 颜色分类

[原题链接](https://leetcode.cn/problems/sort-colors/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个包含红色、白色和蓝色、共 `n` 个元素的数组 `nums`，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 `0`、`1` 和 `2` 分别表示红色、白色和蓝色。

必须在不使用库内置的 `sort` 函数的情况下解决这个问题。

### 解法：双指针

```java title="Java"
class Solution {
    public void sortColors(int[] nums) {
        int n = nums.length;
        int p0 = 0, p2 = n - 1;
        for (int i = 0; i <= p2; i++) {
            while (nums[i] == 2 && i <= p2) { // 注意：这里要用 while 循环，因为交换过来的元素可能还是 2
                swap(nums, i, p2--);
            }
            if (nums[i] == 0) { // 注意：先判断 2 再判断 0，因为交换过来的元素可能是 0
                swap(nums, i, p0++);
            }
        }
    }
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
