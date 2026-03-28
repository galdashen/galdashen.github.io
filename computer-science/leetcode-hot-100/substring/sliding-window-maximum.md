---
sidebar_position: 2
---

# 239. 滑动窗口最大值

[原题链接](https://leetcode.cn/problems/sliding-window-maximum/description/?envType=study-plan-v2&envId=top-100-liked) [官解链接](https://leetcode.cn/problems/sliding-window-maximum/solutions/543426/hua-dong-chuang-kou-zui-da-zhi-by-leetco-ki6m/?envType=study-plan-v2&envId=top-100-liked)

给你一个整数数组 `int[] nums`，有一个大小为 `k` 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 `k` 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

### 方法一：优先队列

需要返回的答案是 `int[] ans`，维护一个优先队列（最大堆），首先先把数组的前 `k` 个元素入队，然后可得 `ans[0]`。然后数组再入队一个元素，然后再通过 `while (pq.peek()[1] <= i - k)` 删除堆顶的过期元素（可能堆下面残留的有过期元素，但是不会影响到整体的最大值），可得 `ans[1]`。

也就是说，通过优先队列**获取最大值**，每次都通过 `while` 循环**排除堆顶的过期元素**。

```java title="Java"
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        PriorityQueue<int[]> pq = new PriorityQueue<int[]>(new Comparator<int[]>() {
            public int compare(int[] pair1, int[] pair2) {
                return pair1[0] != pair2[0] ? pair2[0] - pair1[0] : pair2[1] - pair1[1];
            }
        });
        for (int i = 0; i < k; ++i) {
            pq.offer(new int[]{nums[i], i});
        }
        int[] ans = new int[n - k + 1];
        ans[0] = pq.peek()[0];
        for (int i = k; i < n; ++i) {
            pq.offer(new int[]{nums[i], i});
            while (pq.peek()[1] <= i - k) {
                pq.poll();
            }
            ans[i - k + 1] = pq.peek()[0];
        }
        return ans;
    }
}
```

时间复杂度：$O(n\log n)$，在最坏情况下，数组中的元素单调递增，那么最终优先队列中包含了所有元素，没有元素被移除。由于将一个元素放入优先队列的时间复杂度为 $O(\log n)$，因此总时间复杂度为 O(nlogn)。

空间复杂度：$O(n)$。

### 方法二：单调队列

维护一个单调队列 `Deque<Integer> deque`，队列中存下标，下标对应的数值（严格）单调递减。

通过单调队列**获取最大元素**，通过队列中存的下标**排除过期元素**。

```java title="Java"
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        Deque<Integer> deque = new LinkedList<Integer>();
        for (int i = 0; i < k; ++i) {
            while (!deque.isEmpty() && nums[i] >= nums[deque.peekLast()]) {
                deque.pollLast();
            }
            deque.offerLast(i);
        }

        int[] ans = new int[n - k + 1];
        ans[0] = nums[deque.peekFirst()];
        for (int i = k; i < n; ++i) {
            while (!deque.isEmpty() && nums[i] >= nums[deque.peekLast()]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            if (deque.peekFirst() == i - k) {
                deque.pollFirst();
            }
            ans[i - k + 1] = nums[deque.peekFirst()];
        }
        return ans;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(k)$。

### 方法三：分块 + 预处理

将原数组 `k` 个一组进行分块，最后一块可以不是 `k`个。求出每一块内每个元素的 `prefixMax` 和 `suffixMax`，于是有 `ans[i] = Math.max(suffixMax[i], prefixMax[i + k - 1])`。

```java title="Java"
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] prefixMax = new int[n];
        int[] suffixMax = new int[n];
        for (int i = 0; i < n; ++i) {
            if (i % k == 0) {
                prefixMax[i] = nums[i];
            }
            else {
                prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);
            }
        }
        for (int i = n - 1; i >= 0; --i) {
            if (i == n - 1 || (i + 1) % k == 0) {
                suffixMax[i] = nums[i];
            } else {
                suffixMax[i] = Math.max(suffixMax[i + 1], nums[i]);
            }
        }

        int[] ans = new int[n - k + 1];
        for (int i = 0; i <= n - k; ++i) {
            ans[i] = Math.max(suffixMax[i], prefixMax[i + k - 1]);
        }
        return ans;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
