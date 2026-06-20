---
sidebar_position: 2
---

# 55. 跳跃游戏

[原题链接](https://leetcode.cn/problems/jump-game/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个非负整数数组 `nums`，你最初位于数组的第一个下标。数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 `true`；否则，返回 `false`。

### 解法：贪心

```java title="Java"
class Solution {
    public boolean canJump(int[] nums) {
        int n = nums.length;
        int rightmost = 0;
        for (int i = 0; i < n; i++) {
            if (i <= rightmost) {
                rightmost = Math.max(rightmost, i + nums[i]);
            } else {
                break;
            }
        }
        return rightmost >= n - 1;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
