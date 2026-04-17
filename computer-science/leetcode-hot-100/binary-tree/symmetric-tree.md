---
sidebar_position: 4
---

# 101. 对称二叉树

[原题链接](https://leetcode.cn/problems/symmetric-tree/solutions/268109/dui-cheng-er-cha-shu-by-leetcode-solution/?envType=study-plan-v2&envId=top-100-liked)

给你一个二叉树的根节点 `root`，检查它是否轴对称。

### 方法一：递归

二叉树自身对称等价于它的左右子树相互对称。`check` 函数用于判断两棵树是否相互对称。判断两棵树是否相互对称等价于去判断它们的子树的相互对称的关系。

```java title="Java"
class Solution {
    public boolean isSymmetric(TreeNode root) {
        return check(root.left, root.right);
    }

    public boolean check(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p == null || q == null) {
            return false;
        }
        return p.val == q.val && check(p.left, q.right) && check(p.right, q.left);
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

### 方法二：迭代

用迭代的方法检查两颗树是否相互对称。自身对称就是自己和自己相互对称。

```java title="Java"
class Solution {
    public boolean isSymmetric(TreeNode root) {
        return check(root, root);
    }

    public boolean check(TreeNode u, TreeNode v) {
        Queue<TreeNode> q = new LinkedList<TreeNode>();
        q.offer(u);
        q.offer(v);
        while (!q.isEmpty()) {
            u = q.poll();
            v = q.poll();
            if (u == null && v == null) {
                continue;
            }
            if ((u == null || v == null) || (u.val != v.val)) {
                return false;
            }

            q.offer(u.left);
            q.offer(v.right);

            q.offer(u.right);
            q.offer(v.left);
        }
        return true;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
