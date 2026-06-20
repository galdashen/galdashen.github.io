---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 230. 二叉搜索树中第 K 小的元素

[原题链接](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个二叉搜索树的根节点 `root`，和一个整数 `k`，请你设计一个算法查找其中第 `k` 小的元素（`k` 从 `1` 开始计数）。

### 方法一：中序遍历

二叉搜索树等价于中序遍历递增。

<Tabs groupId="kth-smallest-java">
<TabItem value="recursive" label="递归" default>

```java
class Solution {
    private int count;
    private int ans;
    public int kthSmallest(TreeNode root, int k) {
        count = k;
        inorder(root);
        return ans;
    }
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (--count == 0) {
            ans = node.val;
            return;
        }
        inorder(node.right);
    }
}
```

时间复杂度：$O(n)$，不会提前终止。

空间复杂度：$O(h)$，递归栈深度。

</TabItem>
<TabItem value="recursive2" label="递归优化">

```java
class Solution {
    private int count;
    private int ans;
    public int kthSmallest(TreeNode root, int k) {
        count = k;
        inorder(root);
        return ans;
    }
    private boolean inorder(TreeNode node) {
        if (node == null) return false;
        if (inorder(node.left)) return true;
        if (--count == 0) {
            ans = node.val;
            return true;
        }
        if (inorder(node.right)) return true;
        return false;
    }
}
```

时间复杂度：$O(h + k)$。

空间复杂度：$O(h)$。

</TabItem>
<TabItem value="iterative" label="迭代">

```java
class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<TreeNode>();
        while (root != null || !stack.isEmpty()) {
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            --k;
            if (k == 0) {
                break;
            }
            root = root.right;
        }
        return root.val;
    }
}
```

时间复杂度：$O(h + k)$。

空间复杂度：$O(h)$。

</TabItem>
</Tabs>

### 方法二：记录子树的结点数

```java title="Java"
class Solution {
    public int kthSmallest(TreeNode root, int k) {
        MyBst bst = new MyBst(root);
        return bst.kthSmallest(k);
    }
}

class MyBst {
    TreeNode root;
    Map<TreeNode, Integer> nodeNum;

    public MyBst(TreeNode root) {
        this.root = root;
        this.nodeNum = new HashMap<TreeNode, Integer>();
        countNodeNum(root);
    }

    // 返回二叉搜索树中第k小的元素
    public int kthSmallest(int k) {
        TreeNode node = root;
        while (node != null) {
            int left = nodeNum.getOrDefault(node.left, 0);
            if (left < k - 1) {
                node = node.right;
                k -= left + 1;
            } else if (left == k - 1) {
                break;
            } else {
                node = node.left;
            }
        }
        return node.val;
    }

    // 统计以node为根结点的子树的结点数
    private int countNodeNum(TreeNode node) {
        if (node == null) {
            return 0;
        }
        nodeNum.put(node, 1 + countNodeNum(node.left) + countNodeNum(node.right));
        return nodeNum.get(node);
    }
}
```

时间复杂度：预处理的时间复杂度是$O(n)$，搜索的时间复杂度是$O(h)$。

空间复杂度：O(n)。