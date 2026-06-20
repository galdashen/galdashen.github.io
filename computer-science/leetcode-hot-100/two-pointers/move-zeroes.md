---
sidebar_position: 1
---

# 283. 移动零

[原题链接](https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个数组，将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

### 解法：双指针

```java title="Java"
class Solution {
    public void moveZeroes(int[] nums) {
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] != 0) {
                int temp = nums[left];
                nums[left++] = nums[right];
                nums[right] = temp;
            }
        }
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
