---
sidebar_position: 1
---

# 46. 全排列

[原题链接](https://leetcode.cn/problems/permutations/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个不含重复数字的数组 `nums`，返回其所有可能的全排列。你可以按任意顺序返回答案。

### 解法：回溯

`backtrack` 函数的参数 `len` 表示当前递归到第几个数了。每当 `len` 和 `n` 相等时，说明已经产生了一个全排列，将其加入结果中。

```java title="Java"
class Solution {
    private List<List<Integer>> res;
    private List<Integer> path;
    public List<List<Integer>> permute(int[] nums) {
        res = new ArrayList<>();
        path = new ArrayList<>();
        for (int num : nums) path.add(num);
        backtrack(0);
        return res;
    }
    private void backtrack(int len) {
        if (len == path.size()) res.add(new ArrayList<>(path));
        for (int i = len; i < path.size(); i++) {
            Collections.swap(path, len, i);
            backtrack(len + 1);
            Collections.swap(path, len, i);
        }
    }
}
```

时间复杂度：$O(n \times n!)$。

空间复杂度：$O(n)$，递归和答案数组都是$O(n)$。
