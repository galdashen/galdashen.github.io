---
sidebar_position: 1
---

# 46. 全排列

[原题链接](https://leetcode.cn/problems/permutations/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个不含重复数字的数组 `nums`，返回其所有可能的全排列。你可以按任意顺序返回答案。

### 解法：回溯

`backtrack` 函数的参数 `first` 表示当前递归到第几个数了。每当 `first` 和 `n` 相等时，说明已经产生了一个全排列，将其加入结果中。

```java title="Java"
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();

        List<Integer> output = new ArrayList<Integer>();
        for (int num : nums) {
            output.add(num);
        }

        int n = nums.length;
        backtrack(n, output, res, 0);
        return res;
    }

    public void backtrack(int n, List<Integer> output, List<List<Integer>> res, int first) {
        // 所有数都填完了
        if (first == n) {
            res.add(new ArrayList<Integer>(output));
        }
        for (int i = first; i < n; i++) {
            // 动态维护数组
            Collections.swap(output, first, i);
            // 继续递归填下一个数
            backtrack(n, output, res, first + 1);
            // 撤销操作
            Collections.swap(output, first, i);
        }
    }
}
```

时间复杂度：$O(n \times n!)$。

空间复杂度：$O(n)$，递归和答案数组都是$O(n)$。
