---
sidebar_position: 5
---

# 84. 柱状图中最大的矩形

[原题链接](https://leetcode.cn/problems/largest-rectangle-in-histogram/description/?envType=study-plan-v2&envId=top-100-liked)

给定 $n$ 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 $1$。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

### 解法：单调栈

为了遍历一遍就能完成，对每个元素求以它作为最高点的矩形面积，确定左边界和右边界。左边界是左边第一个比它矮的柱子，右边界是右边第一个比它矮的柱子。

遍历一遍数组，元素逐个入栈，确定了下一个更矮的柱子作为右边界就出栈。单调递增栈，存储索引。

```java title="Java"
class Solution {
    public int largestRectangleArea(int[] heights) {
        int[] newHeights = new int[heights.length + 2];
        System.arraycopy(heights, 0, newHeights, 1, heights.length);
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0;
        for (int i = 0; i < newHeights.length; i++) {
            while (!stack.isEmpty() && newHeights[i] < newHeights[stack.peek()]) {
                int height = newHeights[stack.pop()];
                int width = i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
