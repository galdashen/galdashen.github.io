---
sidebar_position: 14
---

# 236. 二叉树的最近公共祖先

[原题链接](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

### 解法：递归

公共祖先等价于 `p,q` 分别在左右子树，或者该节点等于 `p` 且 `q` 是它的后代，或者该节点等于 `q` 且 `p` 是它的后代。

`dfs` 返回该子树是否含有 `p` 或 `q`。

```java title="Java"
class Solution {
    private TreeNode ans;
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        ans = null;
        dfs(root, p, q);
        return ans;
    }
    private boolean dfs(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || ans != null) return false;
        boolean lson = dfs(root.left, p, q);
        boolean rson = dfs(root.right, p, q);
        if ((lson && rson) || ((root == p || root == q) && (lson || rson))) ans = root;
        return lson || rson || root == p || root == q;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
