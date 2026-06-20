---
sidebar_position: 2
---

# 104. 二叉树的最大深度

[原题链接](https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个二叉树 `root`，返回其最大深度。

### 方法一：深度优先搜索

```java title="Java"
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}
```

时间复杂度：$O(n)$，每个节点只被遍历一次。

空间复杂度：$O(height)$，栈空间取决于递归深度。

### 方法二：广度优先搜索

层序遍历，统计层数。

```java title="Java"
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(root);
        int ans = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            while (size > 0) {
                TreeNode node = queue.poll();
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
                size--;
            }
            ans++;
        }
        return ans;
    }
}
```

时间复杂度：$O(n)$，每个节点只被遍历一次。

空间复杂度：$O(n)$，最坏情况例如完全二叉树的最后一层。
