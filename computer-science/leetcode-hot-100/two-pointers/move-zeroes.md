---
sidebar_position: 1
---

# 283. 移动零

[原题链接](https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个数组 `int[] nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意，必须在不复制数组的情况下原地对数组进行操作。

### 解法：双指针

遍历一遍数组，每发现一个非零元素就把它放到前方已排好的序列的末尾，需要记录前方已处理好序列的尾部的位置。

```java title="Java"
public void moveZeroes(int[] nums) {
    int left = 0;
    for (int right = 0; right < nums.length; right++) {
        if (nums[right] != 0) {
            if (left != right) {
                nums[left] = nums[right];
                nums[right] = 0;
            }
            left++;
        }
    }
}
```

时间复杂度 $O(n)$，空间复杂度 $O(1)$。
