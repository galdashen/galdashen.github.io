---
sidebar_position: 3
---

# 17. 电话号码的字母组合

[原题链接](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。答案可以按任意顺序返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![img](https://pic.leetcode.cn/1752723054-mfIHZs-image.png)

### 解法：回溯

```java title="Java"
class Solution {
    private static final String[] MAPPING = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    private List<String> ans;
    private StringBuilder path;
    public List<String> letterCombinations(String digits) {
        ans = new ArrayList<>();
        path = new StringBuilder();
        backtrack(digits, 0);
        return ans;
    }
    private void backtrack(String digits, int index) {
        if (index == digits.length()) {
            ans.add(path.toString());
            return;
        }
        String letters = MAPPING[digits.charAt(index) - '0'];
        for (int i = 0; i < letters.length(); i++) {
            path.append(letters.charAt(i));
            backtrack(digits, index + 1);
            path.deleteCharAt(index);
        }
    }
}
```

时间复杂度：$O(3^m \times 4^n)$，其中 $m$ 是输入中对应 $3$ 个字母的数字个数，$n$ 是输入中对应 $4$ 个字母的数字个数。

空间复杂度：$O(m + n)$。
