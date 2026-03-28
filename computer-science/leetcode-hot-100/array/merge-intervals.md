---
sidebar_position: 2
---

# 56. 合并区间

[原题链接](https://leetcode.cn/problems/merge-intervals/description/?envType=study-plan-v2&envId=top-100-liked) [官解链接](https://leetcode.cn/problems/merge-intervals/solutions/203562/he-bing-qu-jian-by-leetcode-solution/?envType=study-plan-v2&envId=top-100-liked)

给定若干个区间 `int[][] intervals`，其中单个区间为 `intervals[i] = [start_i, end_i]`，请合并所有的重叠区间，然后返回合并后的结果。（该结果内的区间互不重叠且刚好覆盖原来的所有区间）

### 解法：排序

先按区间左端位置对区间排序，然后按顺序遍历区间。

```java title="Java"
class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length == 0) {
            return new int[0][2];
        }
        Arrays.sort(intervals, new Comparator<int[]>() {
            public int compare(int[] interval1, int[] interval2) {
                return interval1[0] - interval2[0];
            }
        });
        List<int[]> merged = new ArrayList<int[]>();
        for (int i = 0; i < intervals.length; ++i) {
            int L = intervals[i][0], R = intervals[i][1];
            if (merged.size() == 0 || merged.get(merged.size() - 1)[1] < L) {
                merged.add(new int[]{L, R});
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], R);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}
```

时间复杂度：$O(n\log n)$，排序的开销。

空间复杂度：$O(\log n)$，排序的开销。
