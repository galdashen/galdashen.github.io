---
sidebar_position: 2
---

# 56. 合并区间

[原题链接](https://leetcode.cn/problems/merge-intervals/description/?envType=study-plan-v2&envId=top-100-liked)

给定若干个区间，请合并所有的重叠区间，然后返回合并后的结果。

### 解法：排序

先按区间左端位置对区间排序，然后按顺序遍历区间。

```java title="Java"
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (interval1, interval2) -> interval1[0] - interval2[0]);
        List<int[]> ans = new ArrayList<>();
        for (int[] interval : intervals) {
            if (ans.size() > 0 && ans.getLast()[1] >= interval[0]) {
                ans.getLast()[1] = Math.max(ans.getLast()[1], interval[1]);
            } else {
                ans.add(interval);
            }
        }
        return ans.toArray(new int[ans.size()][]);
    }
}
```

时间复杂度：$O(n\log n)$，排序的开销。

空间复杂度：$O(\log n)$，排序的开销。
