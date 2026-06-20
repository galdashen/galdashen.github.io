---
sidebar_position: 1
---

# 136. 只出现一次的数字

[原题链接](https://leetcode.cn/problems/single-number/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个非空整数数组 `nums`，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

### 解法：位运算

```java title="Java"
class Solution {
    public int singleNumber(int[] nums) {
        int single = 0;
        for (int num : nums) {
            single ^= num;
        }
        return single;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
