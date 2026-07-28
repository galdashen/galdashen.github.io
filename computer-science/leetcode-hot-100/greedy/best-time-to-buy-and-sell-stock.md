---
sidebar_position: 1
---

# 121. 买卖股票的最佳时机

[原题链接](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个数组 `prices`，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。

你只能选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0`。

### 解法：一次遍历

遍历一遍数组，求每个位置卖出能获得的最大利润，即用每个位置的价格减去之前的最低价格。

```java title="Java"
class Solution {
    public int maxProfit(int[] prices) {
        int min = prices[0];
        int pro = 0;
        for (int i = 1; i < prices.length; i++) {
            pro = Math.max(pro, prices[i] - min);
            min = Math.min(min, prices[i]);
        }
        return pro;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
