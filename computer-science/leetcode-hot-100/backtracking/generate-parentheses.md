---
sidebar_position: 5
---

# 22. 括号生成

[原题链接](https://leetcode.cn/problems/generate-parentheses/description/?envType=study-plan-v2&envId=top-100-liked)

数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且有效的括号组合。

### 解法：回溯法

右括号的数量不多于左括号。

```java title="Java"
class Solution {
    private List<String> ans = new ArrayList<>();
    public List<String> generateParenthesis(int n) {
        backtrack(new StringBuilder(), 0, 0, n);
        return ans;
    }
    private void backtrack(StringBuilder curr, int open, int close, int max) {
        if (curr.length() == max * 2) {
            ans.add(curr.toString());
            return;
        }
        if (open < max) {
            curr.append('(');
            backtrack(curr, open + 1, close, max);
            curr.deleteCharAt(curr.length() - 1);
        }
        if (close < open) {
            curr.append(')');
            backtrack(curr, open, close + 1, max);
            curr.deleteCharAt(curr.length() - 1);
        }
    }
}
```

时间复杂度：$O(\dfrac{4^n}{\sqrt n})$，来源于卡特兰数，且在回溯过程中，每个答案需要 $O(n)$ 的时间复制到答案数组中。

空间复杂度：$O(n)$，来自递归栈的深度。
