---
sidebar_position: 8
---

# 51. N 皇后

[原题链接](https://leetcode.cn/problems/n-queens/description/?envType=study-plan-v2&envId=top-100-liked)

按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

`n` 皇后问题 研究的是如何将 `n` 个皇后放置在 `n×n` 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 `n` ，返回所有不同的 `n` 皇后问题的解决方案。

每一种解法包含一个不同的 `n` 皇后问题的棋子放置方案，该方案中 `'Q'` 和 `'.'` 分别代表了皇后和空位。

### 解法：回溯

```java title="Java"
class Solution {
    private List<List<String>> ans;
    private int[] queens;
    private boolean[] columns;
    private boolean[] diagonals1;
    private boolean[] diagonals2;
    public List<List<String>> solveNQueens(int n) {
        ans = new ArrayList<List<String>>();
        queens = new int[n];
        Arrays.fill(queens, -1);
        columns = new boolean[n];
        diagonals1 = new boolean[2 * n - 1];
        diagonals2 = new boolean[2 * n - 1];
        backtrack(n, 0);
        return ans;
    }
    private void backtrack(int n, int row) {
        if (row == n) {
            List<String> board = generateBoard(queens, n);
            ans.add(board);
            return;
        }
        for (int i = 0; i < n; i++) {
            if (columns[i] == true) continue;
            int diagonal1 = row - i + n - 1;
            if (diagonals1[diagonal1] == true) continue;
            int diagonal2 = row + i;
            if (diagonals2[diagonal2] == true) continue;
            queens[row] = i;
            columns[i] = true;
            diagonals1[diagonal1] = true;
            diagonals2[diagonal2] = true;
            backtrack(n, row + 1);
            queens[row] = -1;
            columns[i] = false;
            diagonals1[diagonal1] = false;
            diagonals2[diagonal2] = false;
        }
    }
    private List<String> generateBoard(int[] queens, int n) {
        List<String> board = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            char[] row = new char[n];
            Arrays.fill(row, '.');
            row[queens[i]] = 'Q';
            board.add(new String(row));
        }
        return board;
    }
}
```

时间复杂度：$O(N!)$，其中 $N$ 是皇后数量。

空间复杂度：$O(N)$，来自递归和 `boolean` 数组。
