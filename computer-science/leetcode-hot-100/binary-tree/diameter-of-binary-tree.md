---
sidebar_position: 5
---

# 543. 二叉树的直径

[原题链接](https://leetcode.cn/problems/diameter-of-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)

给你一棵二叉树的根节点，返回该树的直径。

二叉树的直径是指树中任意两个节点之间最长路径的长度。这条路径可能经过也可能不经过根节点 `root`。

两节点之间路径的长度由它们之间边数表示。

### 解法：深度优先搜索

求直径等价于求每个节点的左右子树的高度和，然后取最大值。

```java title="Java"
class Solution {
    int ans;
    public int diameterOfBinaryTree(TreeNode root) {
        ans = 0;
        dfs(root);
        return ans;
    }
    private int dfs(TreeNode root) {
        if (root == null) return 0;
        int left = dfs(root.left);
        int right = dfs(root.right);
        ans = Math.max(left + right, ans);
        return Math.max(left, right) + 1;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(height)$。
