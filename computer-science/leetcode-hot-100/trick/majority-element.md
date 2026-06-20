---
sidebar_position: 2
---

# 169. 多数元素

[原题链接](https://leetcode.cn/problems/majority-element/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个大小为 `n` 的数组 `nums`，返回其中的多数元素。多数元素是指在数组中出现次数大于 `⌊ n/2 ⌋` 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

### 解法：Boyer-Moore 投票算法

每个元素的出现次数都要和别的元素的次数相消，由于多数元素出现的次数大于 `⌊ n/2 ⌋`，所以最后剩下的就是多数元素。

```java title="Java"
class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
        int candidate = 0;
        for (int num : nums) {
            if (count == 0) {
                count++;
                candidate = num;
            } else {
                count += (num == candidate) ? 1 : -1;
            }
        }
        return candidate;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
