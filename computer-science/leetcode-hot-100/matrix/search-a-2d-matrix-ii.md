---
sidebar_position: 4
---

# 240. 搜索二维矩阵 II

[原题链接](https://leetcode.cn/problems/search-a-2d-matrix-ii/description/?envType=study-plan-v2&envId=top-100-liked)

编写一个高效的算法来搜索矩阵中的一个目标值。该矩阵具有以下特性：

- 每行的元素从左到右升序排列。
- 每列的元素从上到下升序排列。

### 解法：Z 字形查找

从左下角或右上角开始进行 Z 字形查找。

```java title="Java"
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int x = 0, y = n - 1;
        while (x < m && y >= 0) {
            if (matrix[x][y] == target) {
                return true;
            } else if (matrix[x][y] > target) {
                y--;
            } else {
                x++;
            }
        }
        return false;
    }
}
```

时间复杂度：$O(m + n)$。

空间复杂度：$O(1)$。
