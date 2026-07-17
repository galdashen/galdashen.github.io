---
sidebar_position: 2
---

# 78. 子集

[原题链接](https://leetcode.cn/problems/subsets/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个整数数组 `nums`，数组中的元素互不相同。返回该数组所有可能的子集（幂集）。

解集不能包含重复的子集。你可以按任意顺序返回解集。

### 方法一：二进制

```java title="Java"
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        int n = nums.length;
        for (int mask = 0; mask < (1 << n); ++mask) {
            List<Integer> t = new ArrayList<>();
            for (int i = 0; i < n; ++i) {
                if ((mask & (1 << i)) != 0) t.add(nums[i]);
            }
            ans.add(new ArrayList<>(t));
        }
        return ans;
    }
}
```

时间复杂度：$O(n \times 2^n)$。

空间复杂度：$O(n)$。

### 方法二：选或不选每个元素

```java title="Java"
class Solution {
    private List<List<Integer>> ans;
    private List<Integer> t;
    public List<List<Integer>> subsets(int[] nums) {
        ans = new ArrayList<>();
        t = new ArrayList<>();
        dfs(0, nums);
        return ans;
    }
    private void dfs(int cur, int[] nums) {
        if (cur == nums.length) {
            ans.add(new ArrayList<>(t));
            return;
        }
        t.add(nums[cur]);
        dfs(cur + 1, nums);
        t.remove(t.size() - 1);
        dfs(cur + 1, nums);
    }
}
```

时间复杂度：$O(n \times 2^n)$。

空间复杂度：$O(n)$。

### 方法三：逐元素扩展

```java title="Java"
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        ans.add(new ArrayList<>());
        for (int num : nums) {
            int currentSize = ans.size();
            for (int i = 0; i < currentSize; i++) {
                List<Integer> newSubset = new ArrayList<>(ans.get(i));
                newSubset.add(num);
                ans.add(newSubset);
            }
        }
        return ans;
    }
}
```

时间复杂度：$O(n \times 2^n)$。

空间复杂度：$O(n)$。

### 方法四：枚举

```java title="Java"
class Solution {
    private List<List<Integer>> ans;
    private List<Integer> t;
    public List<List<Integer>> subsets(int[] nums) {
        ans = new ArrayList<>();
        t = new ArrayList<>();
        dfs(0, nums);
        return ans;
    }
    private void dfs(int cur, int[] nums) {
        ans.add(new ArrayList<>(t));
        for (int i = cur; i < nums.length; i++) {
            t.add(nums[i]);
            dfs(i + 1, nums);
            t.remove(t.size() - 1);
        }
    }
}
```

时间复杂度：$O(n \times 2^n)$。

空间复杂度：$O(n)$。
