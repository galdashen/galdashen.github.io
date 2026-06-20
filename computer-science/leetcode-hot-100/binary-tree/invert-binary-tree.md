---
sidebar_position: 3
---

# 226. 翻转二叉树

[原题链接](https://leetcode.cn/problems/invert-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)

给你一棵二叉树的根节点 `root`，翻转这棵二叉树，并返回其根节点。

### 解法：递归

翻转整个二叉树等于交换每个节点的左右指针。

```java title="Java"
class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
