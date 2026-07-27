---
sidebar_position: 3
---

# 295. 数据流的中位数

[原题链接](https://leetcode.cn/problems/find-median-from-data-stream/description/?envType=study-plan-v2&envId=top-100-liked)

中位数是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。

- 例如 `arr = [2,3,4]` 的中位数是 `3`。
- 例如 `arr = [2,3]` 的中位数是 `(2 + 3) / 2 = 2.5`。

实现 `MedianFinder` 类:

- `MedianFinder()` 初始化 `MedianFinder` 对象。
- `void addNum(int num)` 将数据流中的整数 `num` 添加到数据结构中。
- `double findMedian()` 返回到目前为止所有元素的中位数。与实际答案相差 `10-5` 以内的答案将被接受。

### 解法：优先队列

将元素划分为小的一半和大的一半，通过两个优先队列分别获取两半的最大值和最小值。

```java title="Java"
class MedianFinder {
    private PriorityQueue<Integer> queMin;
    private PriorityQueue<Integer> queMax;
    public MedianFinder() {
        queMin = new PriorityQueue<>((a, b) -> (b - a));
        queMax = new PriorityQueue<>((a, b) -> (a - b));
    }
    public void addNum(int num) {
        if (queMin.size() == queMax.size()) {
            queMax.offer(num);
            queMin.offer(queMax.poll());
        } else {
            queMin.offer(num);
            queMax.offer(queMin.poll());
        }
    }
    public double findMedian() {
        if (queMin.size() > queMax.size()) return queMin.peek();
        return (queMin.peek() + queMax.peek()) / 2.0;
    }
}
```

时间复杂度：`addNum` $O(\log n)$，`findMedian` $O(1)$。

空间复杂度：$O(n)$。
