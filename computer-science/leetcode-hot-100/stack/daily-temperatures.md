---
sidebar_position: 4
---

# 739. 每日温度

[原题链接](https://leetcode.cn/problems/daily-temperatures/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个整数数组 `temperatures`，表示每天的温度，返回一个数组 `answer`，其中 `answer[i]` 是指对于第 `i` 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 `0` 来代替。

### 解法：单调栈

遍历一遍数组，元素逐个入栈，已确定下一个更高温度的就出栈。单调递减栈，存储索引。

```java title="Java"
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int len = temperatures.length;
        int[] ans = new int[len];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < len; i++) {
            int temperature = temperatures[i];
            while (!stack.isEmpty() && temperature > temperatures[stack.peek()]) {
                int prevIndex = stack.pop();
                ans[prevIndex] = i - prevIndex;
            }
            stack.push(i);
        }
        return ans;
    }
}
```

时间复杂度：$O(n)$，其中 $n$ 是数组 `temperatures` 的长度。

空间复杂度：$O(n)$。
