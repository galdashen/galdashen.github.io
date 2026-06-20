---
sidebar_position: 5
---

# 322. 零钱兑换

[原题链接](https://leetcode.cn/problems/coin-change/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个整数数组 `coins`，表示不同面额的硬币；以及一个整数 `amount`，表示总金额。

计算并返回可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 `-1`。

你可以认为每种硬币的数量是无限的。

### 方法一：记忆化搜索

递推式，`f(amount) = min{f(amount - coins[i]) + 1}`。

```java title="Java"
public class Solution {
    public int coinChange(int[] coins, int amount) {
        if (amount < 1) return 0;
        return coinChange(coins, amount, new int[amount + 1]);
    }
    private int coinChange(int[] coins, int rem, int[] count) {
        if (rem < 0) return -1;
        if (rem == 0) return 0;
        if (count[rem] != 0) return count[rem]; // 记忆化搜索
        int min = Integer.MAX_VALUE;
        for (int coin : coins) {
            int res = coinChange(coins, rem - coin, count) + 1;
            if (res > 0 && res < min) min = res;
        }
        count[rem] = (min == Integer.MAX_VALUE) ? -1 : min;
        return count[rem];
    }
}
```

时间复杂度：$O(Sn)$，其中 $S$ 是金额，$n$ 是面额数。

空间复杂度：$O(S)$。

### 方法二：动态规划

```java title="Java"
public class Solution {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int j = 0; j < coins.length; j++) {
                if (coins[j] <= i) dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

时间复杂度：$O(Sn)$。

空间复杂度：$O(S)$。
