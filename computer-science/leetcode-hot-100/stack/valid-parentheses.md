---
sidebar_position: 1
---

# 20. 有效的括号

[原题链接](https://leetcode.cn/problems/valid-parentheses/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

### 解法：栈

```java title="Java"
class Solution {
    public boolean isValid(String s) {
        int n = s.length();
        if (n % 2 == 1) return false;
        Map<Character, Character> pairs = Map.of(
            '(', ')',
            '[', ']',
            '{', '}'
        );
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            char ch = s.charAt(i);
            if (pairs.containsKey(ch)) {
                stack.push(ch);
            } else {
                if (stack.isEmpty() || pairs.get(stack.peek()) != ch) {
                    return false;
                }
                stack.pop();
            }
        }
        return stack.isEmpty();
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n + |\Sigma|)$，栈和哈希。
