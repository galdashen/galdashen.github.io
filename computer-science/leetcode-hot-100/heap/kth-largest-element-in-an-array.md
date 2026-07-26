---
sidebar_position: 1
---

# 215. 数组中的第K个最大元素

[原题链接](https://leetcode.cn/problems/kth-largest-element-in-an-array/description/?envType=study-plan-v2&envId=top-100-liked)

给定整数数组 `nums` 和整数 `k`，请返回数组中第 `k` 个最大的元素。

请注意，你需要找的是数组排序后的第 `k` 个最大的元素，而不是第 `k` 个不同的元素。

你必须设计并实现时间复杂度为 `O(n)` 的算法解决此问题。

### 方法一：基于快速排序的选择方法

`quickselect` 算法是快速排序的一种变体，能够在平均情况下以线性时间复杂度找到第 `k` 个最小元素（`k` 从 `0` 开始索引）。

```java title="Java"
class Solution {
    public int findKthLargest(int[] nums, int k) {
        return quickselect(nums, 0, nums.length - 1, nums.length - k);
    }
    private int quickselect(int[] nums, int l, int r, int k) {
        if (l == r) return nums[k];
        int pivot = nums[l], i = l, j = r;
        while (i < j) {
            while (i < j && nums[j] > pivot) j--;
            if (i < j) nums[i++] = nums[j];
            while (i < j && nums[i] < pivot) i++;
            if (i < j) nums[j--] = nums[i];
        }
        nums[i] = pivot;
        if (k < i) return quickselect(nums, l, i - 1, k);
        if (k == i) return nums[i];
        return quickselect(nums, i + 1, r, k);
    }
}
```

时间复杂度：平均情况下为 $O(n)$。

空间复杂度：$O(\log n)$。

### 方法二：基于堆排序的选择方法

用大顶堆，然后所有元素构建堆，然后删掉 `k-1` 个元素，或者用小顶堆，堆的大小为 `k`。这里的代码示例使用了大顶堆的方法。

```java title="Java"
class Solution {
    public int findKthLargest(int[] nums, int k) {
        int heapSize = nums.length;
        buildMaxHeap(nums, heapSize);
        for (int i = nums.length - 1; i >= nums.length - k + 1; --i) {
            swap(nums, 0, i);
            maxHeapify(nums, 0, --heapSize);
        }
        return nums[0];
    }
    private void buildMaxHeap(int[] a, int heapSize) {
        for (int i = heapSize / 2 - 1; i >= 0; --i) {
            maxHeapify(a, i, heapSize);
        }
    }
    private void maxHeapify(int[] a, int i, int heapSize) {
        int l = i * 2 + 1, r = i * 2 + 2, largest = i;
        if (l < heapSize && a[l] > a[largest]) {
            largest = l;
        }
        if (r < heapSize && a[r] > a[largest]) {
            largest = r;
        }
        if (largest != i) {
            swap(a, i, largest);
            maxHeapify(a, largest, heapSize);
        }
    }
    private void swap(int[] a, int i, int j) {
        int temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
```

时间复杂度：$O(n + k \log n)$。

空间复杂度：$O(\log n)$，来自递归调用栈。
