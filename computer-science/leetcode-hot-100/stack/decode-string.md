---
sidebar_position: 3
---

# 394. 字符串解码

[原题链接](https://leetcode.cn/problems/decode-string/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: `k[encoded_string]`，表示其中方括号内部的 `encoded_string` 正好重复 `k` 次。注意 `k` 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 `k`，例如不会出现像 `3a` 或 `2[4]` 的输入。

测试用例保证输出的长度不会超过 `10^5`。

### 方法一：栈

元素不断入栈，然后由最内层括号向外层一层一层拆括号。

```java title="Java"
class Solution {
    public String decodeString(String s) {
        Deque<String> strStack = new ArrayDeque<>();
        Deque<Integer> numStack = new ArrayDeque<>();
        StringBuilder currentStr = new StringBuilder();
        int currentNum = 0;
        for (char ch : s.toCharArray()) {
            if (ch >= 'a' && ch <= 'z') {
                currentStr.append(ch);
            } else if (ch >= '0' && ch <= '9') {
                currentNum = currentNum * 10 + (ch - '0');
            } else if (ch == '[') {
                strStack.push(currentStr.toString());
                numStack.push(currentNum);
                currentStr.setLength(0);
                currentNum = 0;
            } else { // ch == ']'
                int num = numStack.pop();
                String prevStr = strStack.pop();
                String repeated = currentStr.toString().repeat(num);
                currentStr.setLength(0);
                currentStr.append(prevStr).append(repeated);
            }
        }
        return currentStr.toString();
    }
}
```

时间复杂度：约 $O(S)$，其中 $S$ 是解码后字符串的长度。

空间复杂度：约 $O(S)$。

### 方法二：递归

每层递归刚好能处理一对括号。

```java title="Java"
class Solution {
    private int idx = 0;
    public String decodeString(String s) {
        return dfs(s.toCharArray());
    }
    private String dfs(char[] chars) {
        StringBuilder sb = new StringBuilder();
        int num = 0;
        while (idx < chars.length) {
            char c = chars[idx++];
            if (c >= '0' && c <= '9') {
                num = num * 10 + (c - '0');
            }
            else if (c == '[') {
                String sub = dfs(chars);
                while (num-- > 0) sb.append(sub);
                num = 0;
            }
            else if (c == ']') {
                return sb.toString();
            }
            else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}
```

时间复杂度：约 $O(S)$。

空间复杂度：约 $O(S)$。
