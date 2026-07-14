---
sidebar_position: 15
---

# 124. 二叉树中的最大路径和

[原题链接](https://leetcode.cn/problems/binary-tree-maximum-path-sum/description/?envType=study-plan-v2&envId=top-100-liked)

二叉树中的路径被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中至多出现一次。该路径至少包含一个节点，且不一定经过根节点。

路径和是路径中各节点值的总和。

给你一个二叉树的根节点 `root`，返回其最大路径和。

### 解法：递归

`dfs` 返回由该节点向下的路径的最大和。

```java title="Java"
class Solution {
    private int ans;
    public int maxPathSum(TreeNode root) {
        ans = Integer.MIN_VALUE;
        dfs(root);
        return ans;
    }
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int left = Math.max(dfs(node.left), 0);
        int right = Math.max(dfs(node.right), 0);
        ans = Math.max(ans, left + right + node.val);
        return Math.max(left, right) + node.val;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
