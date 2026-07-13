---
sidebar_position: 12
---

# 105. 从前序与中序遍历序列构造二叉树

[原题链接](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/?envType=study-plan-v2&envId=top-100-liked)

给定两个整数数组 `preorder` 和 `inorder`，其中 `preorder` 是二叉树的先序遍历，`inorder` 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

### 解法：递归

```java title="Java"
class Solution {
    Map<Integer, Integer> inPosition;
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        inPosition = new HashMap<>();
        int len = preorder.length;
        for (int i = 0; i < len; i++) inPosition.put(inorder[i], i);
        return dfs(preorder, inorder, 0, len - 1, 0, len - 1);
    }
    private TreeNode dfs(int[] preorder, int[] inorder, int preStart, int preEnd, int inStart, int inEnd) {
        if (preStart > preEnd) return null;
        TreeNode root = new TreeNode(preorder[preStart]);
        int inIndex = inPosition.get(preorder[preStart]);
        root.left = dfs(preorder, inorder, preStart + 1, preStart + inIndex - inStart, inStart, inIndex - 1);
        root.right = dfs(preorder, inorder, preStart + inIndex - inStart + 1, preEnd, inIndex + 1, inEnd);
        return root;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
