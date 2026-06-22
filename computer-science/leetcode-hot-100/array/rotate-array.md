---
sidebar_position: 3
---

# 189. 轮转数组

[原题链接](https://leetcode.cn/problems/rotate-array/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个整数数组，将数组中的元素向右轮转 `k` 个位置。

### 方法一：环状替代

先从 `0` 出发，每次往后走 `k` 个位置，进行一轮交换，然后从 `1` 出发，每次往后走 `k` 个位置，进行一轮交换，以此类推。每轮的路程长度同时是 `n` 和 `k` 的整数倍，有 $an = bk = \operatorname{lcm}(n, k) = \dfrac{nk}{\operatorname{gcd}(n,k)}$。总轮数为 $\dfrac{n}{b} = \operatorname{gcd}(n,k)$。`gcd` 用辗转相除法求。

```java title="Java"
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;
        int count = gcd(n, k);
        for (int start = 0; start < count; start++) {
            int current = start;
            int prev = nums[start];
            do {
                current = (current + k) % n;
                int temp = nums[current];
                nums[current] = prev;
                prev = temp;
            } while (start != current);
        }
    }
    private int gcd(int x, int y) {
        return y > 0 ? gcd(y, x % y) : x;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。

### 方法二：数组翻转

```java title="Java"
class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
