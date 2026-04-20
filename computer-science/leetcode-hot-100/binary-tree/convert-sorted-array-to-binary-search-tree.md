---
sidebar_position: 7
---

# 108. 将有序数组转换为二叉搜索树

[原题链接](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个整数数组 `nums`，其中元素已经按升序排列，请你将其转换为一棵平衡二叉搜索树。

### 解法：中序遍历

```java title="Java"
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return helper(nums, 0, nums.length - 1);
    }

    public TreeNode helper(int[] nums, int left, int right) {
        if (left > right) {
            return null;
        }

        int mid = (left + right) / 2;

        TreeNode root = new TreeNode(nums[mid]);
        root.left = helper(nums, left, mid - 1);
        root.right = helper(nums, mid + 1, right);
        return root;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(\log n)$。
