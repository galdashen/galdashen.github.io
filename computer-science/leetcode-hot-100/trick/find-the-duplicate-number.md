---
sidebar_position: 5
---

# 287. 寻找重复数

[原题链接](https://leetcode.cn/problems/find-the-duplicate-number/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个包含 `n + 1` 个整数的数组 `nums`，其数字都在 `[1, n]` 范围内（包括 `1` 和 `n`），可知至少存在一个重复的整数。

假设 `nums` 只有一个重复的整数，返回这个重复的数。

你设计的解决方案必须不修改数组 `nums` 且只用常量级 `O(1)` 的额外空间。

### 解法：快慢指针

把数组看成一个链表，每个位置是一个结点，值是下一个结点的位置。在每个结点的出度都是 $1$ 的情况下，会形成内向基环森林。此题保证重复数字唯一，所以从 $0$ 开始可以找到环的入口。

```java title="Java"
class Solution {
    public int findDuplicate(int[] nums) {
        int slow = 0, fast = 0;
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
