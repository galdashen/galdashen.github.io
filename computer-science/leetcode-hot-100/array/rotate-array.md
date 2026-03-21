---
sidebar_position: 3
---

# 189. 轮转数组

[原题链接](https://leetcode.cn/problems/rotate-array/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个整数数组 `nums`，将数组中的元素向右轮转 `k` 个位置，其中 `k` 是非负数。

### 方法一：使用额外的数组

新开一个数组。

```java title="Java"
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        int[] newArr = new int[n];
        for (int i = 0; i < n; ++i) {
            newArr[(i + k) % n] = nums[i];
        }
        System.arraycopy(newArr, 0, nums, 0, n);
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

### 方法二：环状替代

先从 `0` 出发，每次往后走 `k` 个位置，进行一轮交换。然后从 `1` 出发，每次往后走 `k` 个位置，进行一轮交换。每轮一定会在走了 $a$ 圈后返回该轮起点，每轮会交换 $b$ 个位置，有 $an = bk = \operatorname{lcm}(n, k) = \dfrac{nk}{\operatorname{gcd}(n,k)}$。总轮数为 $\dfrac{n}{b} = \operatorname{gcd}(n,k)$。`gcd` 用辗转相除法求。

```java title="Java"
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;
        int count = gcd(k, n);
        for (int start = 0; start < count; ++start) {
            int current = start;
            int prev = nums[start];
            do {
                int next = (current + k) % n;
                int temp = nums[next];
                nums[next] = prev;
                prev = temp;
                current = next;
            } while (start != current);
        }
    }

    public int gcd(int x, int y) {
        return y > 0 ? gcd(y, x % y) : x;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。

### 方法三：数组翻转

翻转。

```java title="Java"
class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }

    public void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start += 1;
            end -= 1;
        }
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
