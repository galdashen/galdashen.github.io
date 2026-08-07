---
sidebar_position: 1
---

# 94. 二叉树的中序遍历

[原题链接](https://leetcode.cn/problems/binary-tree-inorder-traversal/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个二叉树的根节点 `root`，返回它的中序遍历。

### 解法：递归

```java title="Java"
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        inorder(root, res);
        return res;
    }
    private void inorder(TreeNode root, List<Integer> res) {
        if (root == null) return;
        inorder(root.left, res);
        res.add(root.val);
        inorder(root.right, res);
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
