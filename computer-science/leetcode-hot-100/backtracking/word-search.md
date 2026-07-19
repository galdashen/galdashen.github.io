---
sidebar_position: 6
---

# 79. 单词搜索

[原题链接](https://leetcode.cn/problems/word-search/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个 `m x n` 二维字符网格 `board` 和一个字符串单词 `word`。如果 `word` 存在于网格中，返回 `true`；否则，返回 `false`。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

### 解法：回溯

```java title="Java"
class Solution {
    public boolean exist(char[][] board, String word) {
        int h = board.length, w = board[0].length;
        boolean[][] visited = new boolean[h][w];
        for (int i = 0; i < h; i++) {
            for (int j = 0; j < w; j++) {
                if (check(board, visited, i, j, word, 0)) return true;
            }
        }
        return false;
    }
    private boolean check(char[][] board, boolean[][] visited, int i, int j, String s, int k) {
        if (board[i][j] != s.charAt(k)) return false;
        if (k == s.length() - 1) return true;
        visited[i][j] = true;
        int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        for (int[] dir : directions) {
            int newi = i + dir[0], newj = j + dir[1];
            if (newi >= 0 && newi < board.length && newj >= 0 && newj < board[0].length && !visited[newi][newj]) {
                if (check(board, visited, newi, newj, s, k + 1)) {
                    visited[i][j] = false;
                    return true;
                }
            }
        }
        visited[i][j] = false;
        return false;
    }
}
```

时间复杂度：$O(h\times w\times 3^L)$，其中 $h$ 是行数，$w$ 是列数，$L$ 是单词长度。

空间复杂度：$O(hw)$，来自递归栈的深度和访问数组。
