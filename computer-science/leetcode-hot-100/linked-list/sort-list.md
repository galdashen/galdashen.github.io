---
sidebar_position: 12
---

# 148. 排序链表

[原题链接](https://leetcode.cn/problems/sort-list/description/?envType=study-plan-v2&envId=top-100-liked)

排序链表。

### 方法一：自顶向下归并排序

常见的排序算法包括冒泡排序、插入排序、选择排序、快速排序、堆排序、归并排序等。对于以上提到的六种排序，首先排除掉前三个时间复杂度为 $O(n^2)$ 的。快速排序当链表本身有序时会退化为 $O(n^2)$，而堆排序需要把链表转成数组，所以选用归并排序。

```java title="Java"
class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode list2 = sortList(slow.next);
        slow.next = null;
        ListNode list1 = sortList(head);
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

时间复杂度：$O(n\log n)$。

空间复杂度：$O(\log n)$。

### 方法二：自底向上归并排序

自底向上，不递归，优化空间复杂度。第一轮单个节点为一组，相邻两组合并，第二轮两个节点一组，相邻两组合并，第三轮四个节点一组，相邻两组合并，以此类推，最后一组节点可以不够。

```java title="Java"
class Solution {
    public ListNode sortList(ListNode head) {
        int length = 0;
        ListNode node = head;
        while (node != null) {
            length++;
            node = node.next;
        }
        ListNode dummyHead = new ListNode(0, head);
        for (int subLength = 1; subLength < length; subLength <<= 1) {
            ListNode prev = dummyHead, curr = dummyHead.next;
            while (curr != null) {
                for (int i = 1; i < subLength && curr.next != null; i++) curr = curr.next;
                if (curr.next == null) break;
                ListNode list1 = prev.next;
                ListNode list2 = curr.next;
                curr.next = null;
                curr = list2;
                for (int i = 1; i < subLength && curr.next != null; i++) curr = curr.next;
                if (curr.next == null) {
                    curr = null;
                } else {
                    ListNode temp = curr.next;
                    curr.next = null;
                    curr = temp;
                }
                prev.next = merge(list1, list2);
                while (prev.next != null) prev = prev.next;
                prev.next = curr;
            }
        }
        return dummyHead.next;
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

时间复杂度：$O(n\log n)$。

空间复杂度：$O(1)$。
