---
sidebar_position: 4
---

# 42. 接雨水

[原题链接](https://leetcode.cn/problems/trapping-rain-water/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个数组 `int[] height` 代表 `n` 个宽度为 `1` 的柱子的高度，柱子挨在一起的，计算下雨后能接多少雨水，返回雨水总量 `int`。

### 方法一：动态规划

分别计算每个柱子正上方的雨水量，然后给所有的都加起来。为了计算第 `i` 个柱子正上方的雨水量，我们需要知道它左侧所有柱子的最大高度以及右侧所有柱子的最大高度，可以开两个数组 `int[] leftMax` 和 `int[] rightMax` 存储每个位置左右侧的最大高度。

```java title="Java"
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if (n == 0) {
            return 0;
        }

        int[] leftMax = new int[n];
        leftMax[0] = height[0];
        for (int i = 1; i < n; ++i) {
            leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        }

        int[] rightMax = new int[n];
        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; --i) {
            rightMax[i] = Math.max(rightMax[i + 1], height[i]);
        }

        int ans = 0;
        for (int i = 0; i < n; ++i) {
            ans += Math.min(leftMax[i], rightMax[i]) - height[i];
        }
        return ans;
    }
}
```

时间复杂度 $O(n)$，空间复杂度 $O(n)$。

### 方法二：单调栈

维护一个单调栈，单调栈存储的是下标，下标对应的高度单调递减。按顺序遍历数组 `height`，如果递减就入栈，如果不递减，也就是当 `height[i] > height[stack.peek()]` 时，从 `height[i]` 的顶层往左画一条水平线，碰撞到之前的柱子，从而得到一个装水的凹槽，然后计算里面的水量，如下图所示。

![](./assets/42_1.png)

为了计算凹槽内的水量，我们需要分层进行计算，下图分为了三层，分层的依据是左侧高度变化的次数，然后分别把这三层的水量算出来再加起来就得到了这个凹槽的水量。首先是最底层，水量为 `4 * 1`，然后是第二层，水量为 `5 * 2`，最后是第三层，水量为 `6 * 1`，于是这个凹槽内的水量为 `4 * 1 + 5 * 2 + 6 * 1 = 20`。

![](./assets/42_2.png)

```java title="Java"
class Solution {
    public int trap(int[] height) {
        int ans = 0;
        Deque<Integer> stack = new LinkedList<Integer>();
        int n = height.length;
        for (int i = 0; i < n; ++i) {
            while (!stack.isEmpty() && height[i] > height[stack.peek()]) {
                int top = stack.pop();
                if (stack.isEmpty()) {
                    break;
                }
                int left = stack.peek();
                int currWidth = i - left - 1;
                int currHeight = Math.min(height[left], height[i]) - height[top];
                ans += currWidth * currHeight;
            }
            stack.push(i);
        }
        return ans;
    }
}
```

时间复杂度 $O(n)$：遍历一遍，并且每个下标最多只会入栈出栈各一次。

空间复杂度 $O(n)$：来自于栈的空间。

### 方法三：双指针

类似于方法一，同样考虑 `leftMax` 以及 `rightMax`，但是不设数组，用双指针法优化空间复杂度。注意判断 `if (height[left] < height[right])` 后，每次都移动较短的一边，因此 `height[left]` 和 `height[right]` 有一个是当前已遍历柱子中的最高的，因此也蕴含了 `leftMax` 与 `rightMax` 的大小关系。最外层的 `while (left < right)` 循环也不需要取等，因为当 `left == right` 时，此柱子是全局最高的，上面不会有雨水。

```java title="Java"
class Solution {
    public int trap(int[] height) {
        int ans = 0;
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        while (left < right) {
            leftMax = Math.max(leftMax, height[left]);
            rightMax = Math.max(rightMax, height[right]);
            if (height[left] < height[right]) {
                ans += leftMax - height[left];
                ++left;
            } else {
                ans += rightMax - height[right];
                --right;
            }
        }
        return ans;
    }
}
```

时间复杂度 $O(n)$，空间复杂度 $O(1)$。
