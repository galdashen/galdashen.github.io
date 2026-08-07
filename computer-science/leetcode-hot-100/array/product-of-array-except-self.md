---
sidebar_position: 4
---

# 238. 除了自身以外数组的乘积

[原题链接](https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个整数数组 `nums`，返回数组 `answer`，其中 `answer[i]` 等于 `nums` 中除了 `nums[i]` 之外其余各元素的乘积 。

请不要使用除法。

### 方法一：左右乘积列表

```java title="Java"
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int length = nums.length;
        int[] L = new int[length];
        int[] R = new int[length];
        int[] answer = new int[length];
        L[0] = 1;
        for (int i = 1; i < length; i++) L[i] = nums[i - 1] * L[i - 1];
        R[length - 1] = 1;
        for (int i = length - 2; i >= 0; i--) R[i] = nums[i + 1] * R[i + 1];
        for (int i = 0; i < length; i++) answer[i] = L[i] * R[i];
        return answer;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

### 方法二：空间复杂度 $O(1)$ 的方法

遍历两遍，不开额外空间，第一遍从左往右，第二遍从右往左。

```java title="Java"
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int length = nums.length;
        int[] answer = new int[length];
        answer[0] = 1;
        for (int i = 1; i < length; i++) answer[i] = nums[i - 1] * answer[i - 1];
        int R = 1;
        for (int i = length - 2; i >= 0; i--) {
            R *= nums[i + 1];
            answer[i] *= R;
        }
        return answer;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
