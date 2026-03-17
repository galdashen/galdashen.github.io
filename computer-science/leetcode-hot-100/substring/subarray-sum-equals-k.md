---
sidebar_position: 1
---

# 560. 和为 K 的子数组

[原题链接](https://leetcode.cn/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个整数数组 `int[] nums` 和一个整数 `int k`，请你统计并返回该数组中和为 `k` 的子数组的个数。

子数组是数组中元素的连续非空序列。

### 方法一：枚举

两重循环暴力遍历数组，但是不需要第三重循环来求和。

```java title="Java"
class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0;
        for (int start = 0; start < nums.length; start++) {
            int sum = 0;
            for (int end = start; end < nums.length; end++) {
                sum += nums[end];
                if (sum == k) {
                    count++;
                }
            }
        }
        return count;
    }
}
```

时间复杂度：$O(n^2)$。

空间复杂度：$O(1)$。

### 方法二：前缀和 + 哈希表优化

遍历一遍，采用前缀和方法，根据前面有多少个位置的前缀和为 `pre - k`，就知道有几个在该处结尾的和为 K 的子数组。用哈希表保存前方不同前缀和出现的次数。

```java title="Java"
public class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0, pre = 0;
        HashMap < Integer, Integer > mp = new HashMap < > ();
        mp.put(0, 1);
        for (int i = 0; i < nums.length; i++) {
            pre += nums[i];
            if (mp.containsKey(pre - k)) {
                count += mp.get(pre - k);
            }
            mp.put(pre, mp.getOrDefault(pre, 0) + 1);
        }
        return count;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
