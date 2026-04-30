---
sidebar_position: 14
---

# 236. 二叉树的最近公共祖先

[原题链接](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

### 方法一：递归

公共祖先等价于 `p,q` 分别在左右子树，或者该节点等于 `p` 且 `q` 是它的后代，或者该节点等于 `q` 且 `p` 是它的后代。

`dfs` 返回该子树是否含有 `p` 或 `q`。

```java title="Java"
class Solution {
    private TreeNode ans = null;
    private boolean dfs(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return false;
        boolean lson = dfs(root.left, p, q);
        boolean rson = dfs(root.right, p, q);
        if ((lson && rson) || ((root == p || root == q) && (lson || rson))) {
            ans = root;
        }
        return lson || rson || (root == p || root == q);
    }
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        dfs(root, p, q);
        return ans;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

### 方法二：存储父节点

```java title="Java'
class Solution {
    Map<TreeNode, TreeNode> parent = new HashMap<>();
    Set<TreeNode> visited = new HashSet<>();
    public void dfs(TreeNode root) {
        if (root.left != null) {
            parent.put(root.left, root);
            dfs(root.left);
        }
        if (root.right != null) {
            parent.put(root.right, root);
            dfs(root.right);
        }
    }
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        dfs(root);
        while (p != null) {
            visited.add(p);
            p = parent.get(p);
        }
        while (q != null) {
            if (visited.contains(q)) {
                return q;
            }
            q = parent.get(q);
        }
        return null;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
