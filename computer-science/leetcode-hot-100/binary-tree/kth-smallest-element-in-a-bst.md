---
sidebar_position: 9
---

# 230. 二叉搜索树中第 K 小的元素

[原题链接](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个二叉搜索树的根节点 `root`，和一个整数 `k`，请你设计一个算法查找其中第 `k` 小的元素（`k` 从 `1` 开始计数）。

### 解法：中序遍历

二叉搜索树等价于中序遍历递增。

```java title="Java"
class Solution {
    private int count;
    private int ans;
    public int kthSmallest(TreeNode root, int k) {
        count = k;
        helper(root);
        return ans;
    }
    private void helper(TreeNode node) {
        if (node == null || count <= 0) return;
        helper(node.left);
        if (--count == 0) ans = node.val;
        helper(node.right);
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(h)$，其中 $h$ 是树的高度。
