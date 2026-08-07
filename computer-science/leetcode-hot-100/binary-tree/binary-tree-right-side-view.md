---
sidebar_position: 10
---

# 199. 二叉树的右视图

[原题链接](https://leetcode.cn/problems/binary-tree-right-side-view/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个二叉树的根节点 `root`，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

### 方法一：深度优先搜索

```java
class Solution {
    private List<Integer> ans;
    public List<Integer> rightSideView(TreeNode root) {
        ans = new ArrayList<>();
        dfs(root, 0);
        return ans;
    }
    private void dfs(TreeNode node, int depth) {
        if (node == null) return;
        if (depth == ans.size()) ans.add(node.val);
        dfs(node.right, depth + 1);
        dfs(node.left, depth + 1);
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

### 方法二：广度优先搜索

```java title="Java"
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if (root == null) return ans;
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            ans.add(queue.peek().val);
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (node.right != null) queue.offer(node.right);
                if (node.left != null) queue.offer(node.left);
            }
        }
        return ans;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
