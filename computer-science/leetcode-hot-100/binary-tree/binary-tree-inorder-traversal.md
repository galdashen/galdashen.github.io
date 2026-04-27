---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 94. 二叉树的中序遍历

[原题链接](https://leetcode.cn/problems/binary-tree-inorder-traversal/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个二叉树的根节点 `root`，返回它的中序遍历。

> 此处给出前中后序三种遍历的递归、迭代、Morris 三种解法

### 方法一：递归

```java title="Java"
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        preorder(root, res);
        return res;
    }
    public void preorder(TreeNode root, List<Integer> res) {
        if (root == null) {
            return;
        }
        res.add(root.val);
        preorder(root.left, res);
        preorder(root.right, res);
    }

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        inorder(root, res);
        return res;
    }
    public void inorder(TreeNode root, List<Integer> res) {
        if (root == null) {
            return;
        }
        inorder(root.left, res);
        res.add(root.val);
        inorder(root.right, res);
    }

    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        postorder(root, res);
        return res;
    }
    public void postorder(TreeNode root, List<Integer> res) {
        if (root == null) {
            return;
        }
        postorder(root.left, res);
        postorder(root.right, res);
        res.add(root.val);
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

### 方法二：迭代

<Tabs groupId="inorder-iterative-java">
<TabItem value="method1" label="迭代一" default>

往左下角一直走到底，到底就往右走一步。

```java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) return res;
        Deque<TreeNode> stack = new LinkedList<TreeNode>();
        TreeNode node = root;
        while (!stack.isEmpty() || node != null) {
            while (node != null) {
                res.add(node.val);
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            node = node.right;
        }
        return res;
    }

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        Deque<TreeNode> stk = new LinkedList<TreeNode>();
        while (root != null || !stk.isEmpty()) {
            while (root != null) {
                stk.push(root);
                root = root.left;
            }
            root = stk.pop();
            res.add(root.val);
            root = root.right;
        }
        return res;
    }

    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) return res;
        Deque<TreeNode> stack = new LinkedList<TreeNode>();
        TreeNode prev = null; // 标记上一个弹出的是哪个节点，
        while (root != null || !stack.isEmpty()) {
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            if (root.right == null || root.right == prev) {
                res.add(root.val);
                prev = root;
                root = null;
            } else {
                // 如果有右子树且右子树没遍历完就不允许弹出
                stack.push(root);
                root = root.right;
            }
        }
        return res;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

</TabItem>
<TabItem value="method2" label="迭代二">

弹出即访问，要保证节点 `node, node.left, node.right` 三者的弹出顺序符合遍历要求，通过 `null` 来标记 `node` 的子节点是否入过栈。

```java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) return res;
        Deque<TreeNode> stk = new LinkedList<TreeNode>();
        stk.push(root);
        while (!stk.isEmpty()) {
            // 也可和下面的中序和后序统一写法添加 null 标记
            root = stk.pop();
            res.add(root.val);
            if (root.right != null) stk.push(root.right);
            if (root.left != null) stk.push(root.left);
        }
        return res;
    }

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) return res;
        Deque<TreeNode> stk = new LinkedList<TreeNode>();
        stk.push(root);
        while (!stk.isEmpty()) {
            root = stk.pop();
            if (root != null) {
                if (root.right != null) stk.push(root.right);
                stk.push(root);
                stk.push(null);
                if (root.left != null) stk.push(root.left);
            } else {
                // null 作为加入 res 的标记
                res.add(stk.pop().val);
            }
        }
        return res;
    }

    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) return res;
        Deque<TreeNode> stk = new LinkedList<TreeNode>();
        stk.push(root);
        while (!stk.isEmpty()) {
            root = stk.pop();
            if (root != null) {
                stk.push(root);
                stk.push(null);
                if (root.right != null) stk.push(root.right);
                if (root.left != null) stk.push(root.left);
            } else {
                // null 作为加入 res 的标记
                res.add(stk.pop().val);
            }
        }
        return res;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

</TabItem>
</Tabs>

### 方法三：Morris 遍历

迭代需要用栈是因为按照往左下角一直走到底，到底就往右走一步的走法，在叶节点时无法知道上一个岔路在哪。考虑通过标记上一个岔路的位置就可节省掉栈的空间，但是上一个岔路的位置不太好标记，Morris 遍历仅标记每个节点的中序顺序的后继节点（将当前节点的中序前驱节点的右指针指向当前节点），这样可以不用栈也实现迭代遍历。

```java title="Java"
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) return res;
        TreeNode p1 = root, p2 = null;
        while (p1 != null) {
            p2 = p1.left;
            if (p2 != null) {
                while (p2.right != null && p2.right != p1) {
                    p2 = p2.right;
                }
                if (p2.right == null) {
                    res.add(p1.val);
                    p2.right = p1;
                    p1 = p1.left;
                } else {
                    p2.right = null; // 还原树
                    p1 = p1.right; // 回退 p1 指针或往右下走
                }
            } else {
                res.add(p1.val);
                p1 = p1.right; // 回退 p1 指针或往右下走
            }
        }
        return res;
    }

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) return res;
        TreeNode p1 = root, p2 = null;
        while (p1 != null) {
            p2 = p1.left;
            if (p2 != null) {
                while (p2.right != null && p2.right != p1) {
                    p2 = p2.right;
                }
                if (p2.right == null) {
                    p2.right = p1;
                    p1 = p1.left;
                } else {
                    res.add(p1.val);
                    p2.right = null; // 还原树
                    p1 = p1.right; // 回退 p1 指针或往右下走
                }
            } else {
                res.add(p1.val);
                p1 = p1.right; // 回退 p1 指针或往右下走
            }
        }
        return res;
    }

    // 后序较为复杂，也可先按前序做根右左，然后反转结果
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) return res;
        TreeNode p1 = root, p2 = null;
        while (p1 != null) {
            p2 = p1.left;
            if (p2 != null) {
                while (p2.right != null && p2.right != p1) {
                    p2 = p2.right;
                }
                if (p2.right == null) {
                    p2.right = p1;
                    p1 = p1.left;
                } else {
                    p2.right = null; // 还原树
                    addPath(res, p1.left);
                    p1 = p1.right; // 回退 p1 指针或往右下走
                }
            } else {
                p1 = p1.right; // 回退 p1 指针或往右下走
            }
        }
        addPath(res, root);
        return res;
    }
    public void addPath(List<Integer> res, TreeNode node) {
        int count = 0;
        while (node != null) {
            ++count;
            res.add(node.val);
            node = node.right;
        }
        int left = res.size() - count, right = res.size() - 1;
        while (left < right) {
            int temp = res.get(left);
            res.set(left, res.get(right));
            res.set(right, temp);
            left++;
            right--;
        }
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
