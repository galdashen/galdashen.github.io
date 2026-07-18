---
sidebar_position: 4
---

# 39. 组合总和

[原题链接](https://leetcode.cn/problems/combination-sum/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个无重复元素的整数数组 `candidates` 和一个目标整数 `target`，找出 `candidates` 中可以使数字和为目标数 `target` 的所有不同组合，并以列表形式返回。你可以按任意顺序返回这些组合。

`candidates` 中的同一个数字可以无限制重复被选取。如果至少一个数字的被选数量不同，则两种组合是不同的。

对于给定的输入，保证和为 `target` 的不同组合数少于 `150` 个。

### 解法：回溯

此题类似于 [78. 子集](https://galdashen.github.io/leetcode-hot-100/backtracking/subsets)，可以套用它的解法。

```java title="Java"
class Solution {
    private List<List<Integer>> ans;
    private List<Integer> combine;
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        ans = new ArrayList<>();
        combine = new ArrayList<>();
        dfs(candidates, target, 0);
        return ans;
    }
    private void dfs(int[] candidates, int target, int idx) {
        if (target == 0) {
            ans.add(new ArrayList<>(combine));
            return;
        }
        if (idx == candidates.length || target < 0) return;
        dfs(candidates, target, idx + 1);
        combine.add(candidates[idx]);
        dfs(candidates, target - candidates[idx], idx);
        combine.remove(combine.size() - 1);
    }
}
```

时间复杂度：$O(S)$，其中 $S$ 为所有可行解的长度之和。

空间复杂度：$O(target)$。
