---
sidebar_position: 13
---

# 437. 路径总和 III

[原题链接](https://leetcode.cn/problems/path-sum-iii/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个二叉树的根节点 `root`，和一个整数 `targetSum`，求该二叉树里节点值之和等于 `targetSum` 的路径的数目。

路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

### 方法一：深度优先搜索

`rootSum(node, targetSum)` 代表从节点 `node` 开始的和为 `targetSum` 的路径的数量。

```java title="Java"
class Solution {
    public int pathSum(TreeNode root, long targetSum) {
        if (root == null) return 0;
        int ret = rootSum(root, targetSum);
        ret += pathSum(root.left, targetSum);
        ret += pathSum(root.right, targetSum);
        return ret;
    }
    private int rootSum(TreeNode root, long targetSum) {
        if (root == null) return 0;
        int ret = 0;
        int val = root.val;
        if (val == targetSum) ret++;
        ret += rootSum(root.left, targetSum - val);
        ret += rootSum(root.right, targetSum - val);
        return ret;
    }
}
```

时间复杂度：$O(n^2)$，对于每一个节点，求以该节点为起点的路径数目时，则需要遍历以该节点为根节点的子树的所有节点。

空间复杂度：$O(n)$。

### 方法二：前缀和

```java title="Java"
class Solution {
    private int pathNum;
    private long currSum;
    private Map<Long, Integer> map;
    public int pathSum(TreeNode root, int targetSum) {
        pathNum = 0;
        currSum = 0;
        map = new HashMap<>();
        map.put(0L, 1);
        dfs(root, targetSum);
        return pathNum;
    }
    private void dfs(TreeNode node, int targetSum) {
        if (node == null) return;
        currSum += node.val;
        pathNum += map.getOrDefault(currSum - targetSum, 0);
        map.put(currSum, map.getOrDefault(currSum, 0) + 1);
        dfs(node.left, targetSum);
        dfs(node.right, targetSum);
        map.put(currSum, map.get(currSum) - 1);
        currSum -= node.val;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
