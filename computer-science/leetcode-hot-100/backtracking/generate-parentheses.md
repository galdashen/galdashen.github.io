---
sidebar_position: 5
---

# 22. 括号生成

[原题链接](https://leetcode.cn/problems/generate-parentheses/description/?envType=study-plan-v2&envId=top-100-liked)

数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且有效的括号组合。

### 解法：回溯法

```java title="Java"
class Solution {
    private List<String> ans;
    private StringBuilder cur;
    public List<String> generateParenthesis(int n) {
        ans = new ArrayList<>();
        cur = new StringBuilder();
        backtrack(0, 0, n);
        return ans;
    }
    private void backtrack(int open, int close, int max) {
        if (cur.length() == max * 2) {
            ans.add(cur.toString());
            return;
        }
        if (open < max) {
            cur.append('(');
            backtrack(open + 1, close, max);
            cur.deleteCharAt(cur.length() - 1);
        }
        if (close < open) {
            cur.append(')');
            backtrack(open, close + 1, max);
            cur.deleteCharAt(cur.length() - 1);
        }
    }
}
```

时间复杂度：$O(\dfrac{4^n}{\sqrt n})$，来源于卡特兰数，且在回溯过程中，每个答案需要 $O(n)$ 的时间复制到答案数组中。

空间复杂度：$O(n)$，来自递归栈的深度。
