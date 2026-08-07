---
sidebar_position: 4
---

# 101. 对称二叉树

[原题链接](https://leetcode.cn/problems/symmetric-tree/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个二叉树的根节点 `root`，检查它是否轴对称。

### 方法一：递归

二叉树自身对称等价于它的左右子树相互对称。`check` 函数用于判断两棵树是否相互对称。判断两棵树是否相互对称等价于去判断它们的子树的相互对称的关系。

```java title="Java"
class Solution {
    public boolean isSymmetric(TreeNode root) {
        return check(root.left, root.right);
    }
    private boolean check(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        return p.val == q.val && check(p.left, q.right) && check(p.right, q.left);
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

### 方法二：迭代

```java title="Java"
class Solution {
    public boolean isSymmetric(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        TreeNode p = root, q = root;
        queue.offer(p);
        queue.offer(q);
        while (!queue.isEmpty()) {
            p = queue.poll();
            q = queue.poll();
            if (p == null && q == null) continue;
            if (p == null || q == null) return false;
            if (p.val != q.val) return false;
            queue.offer(p.left);
            queue.offer(q.right);
            queue.offer(p.right);
            queue.offer(q.left);
        }
        return true;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
