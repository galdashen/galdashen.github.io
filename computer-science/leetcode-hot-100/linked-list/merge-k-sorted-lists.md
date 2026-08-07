---
sidebar_position: 13
---

# 23. 合并 K 个升序链表

[原题链接](https://leetcode.cn/problems/merge-k-sorted-lists/description/?envType=study-plan-v2&envId=top-100-liked)

合并 `k` 个升序链表。

### 方法一：分治合并

```java title="Java"
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        return mergeKLists(lists, 0, lists.length - 1);
    }
    private ListNode mergeKLists(ListNode[] lists, int l, int r) {
        if (l > r) return null;
        if (l == r) return lists[l];
        int mid = l + (r - l) / 2;
        ListNode list1 = mergeKLists(lists, l, mid);
        ListNode list2 = mergeKLists(lists, mid + 1, r);
        return merge(list1, list2);
    }
    private ListNode merge(ListNode head1, ListNode head2) {
        ListNode dummy = new ListNode();
        ListNode temp = dummy, temp1 = head1, temp2 = head2;
        while (temp1 != null && temp2 != null) {
            if (temp1.val <= temp2.val) {
                temp.next = temp1;
                temp1 = temp1.next;
            } else {
                temp.next = temp2;
                temp2 = temp2.next;
            }
            temp = temp.next;
        }
        temp.next = temp1 == null ? temp2 : temp1;
        return dummy.next;
    }
}
```

时间复杂度：$O(kn\log k)$，用递归层数 $\log k$ 乘以总节点数 $kn$。

空间复杂度：$O(\log k)$。

### 方法二：使用优先队列合并

```java title="Java"
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> queue = new PriorityQueue<>((a, b) -> a.val - b.val);
        ListNode dummy = new ListNode();
        ListNode curr = dummy;
        for (int i = 0; i < lists.length; i++) {
            if (lists[i] != null) queue.offer(lists[i]);
        }
        while (!queue.isEmpty()) {
            ListNode temp = queue.poll();
            curr.next = temp;
            curr = curr.next;
            if (temp.next != null) queue.offer(temp.next);
        }
        return dummy.next;
    }
}
```

时间复杂度：$O(kn\log k)$，总节点数乘以优先队列的复杂度。

空间复杂度：$O(k)$。
