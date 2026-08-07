---
sidebar_position: 2
---

# 347. 前 K 个高频元素

[原题链接](https://leetcode.cn/problems/top-k-frequent-elements/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个整数数组 `nums` 和一个整数 `k`，请你返回其中出现频率前 `k` 高的元素。你可以按任意顺序返回答案。

### 方法一：堆

先遍历一遍统计每个元素出现的次数，然后就转化为了求数组前 `k` 个最大值的问题。

```java title="Java"
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> occurrences = new HashMap<>();
        for (int num : nums) occurrences.put(num, occurrences.getOrDefault(num, 0) + 1);
        PriorityQueue<int[]> queue = new PriorityQueue<>((m, n) -> m[1] - n[1]);
        for (Map.Entry<Integer, Integer> entry : occurrences.entrySet()) {
            int num = entry.getKey(), count = entry.getValue();
            queue.offer(new int[]{num, count});
            if (queue.size() > k) queue.poll();
        }
        int[] ret = new int[k];
        for (int i = 0; i < k; ++i) ret[i] = queue.poll()[0];
        return ret;
    }
}
```

时间复杂度：$O(n \log k)$。

空间复杂度：$O(n)$。

### 方法二：基于快速排序

```java title="Java"
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> occurrences = new HashMap<>();
        for (int num : nums) occurrences.put(num, occurrences.getOrDefault(num, 0) + 1);
        List<int[]> values = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : occurrences.entrySet()) {
            int num = entry.getKey(), count = entry.getValue();
            values.add(new int[]{num, count});
        }
        int[] ret = new int[k];
        qsort(values, 0, values.size() - 1, k);
        for (int i = 0; i < k; i++) ret[i] = values.get(i)[0];
        return ret;
    }
    private void qsort(List<int[]> values, int start, int end, int k) {
        int pivot = values.get(end)[1];
        int index = start;
        for (int i = start; i < end; i++) if (values.get(i)[1] >= pivot) Collections.swap(values, index++, i);
        Collections.swap(values, index, end);
        if (k <= index - start) qsort(values, start, index - 1, k);
        if (k > index - start + 1) qsort(values, index + 1, end, k - (index - start + 1));
    }
}
```

时间复杂度：平均情况下为 $O(n)$，最坏情况下为 $O(n^2)$。

空间复杂度：$O(n)$。
