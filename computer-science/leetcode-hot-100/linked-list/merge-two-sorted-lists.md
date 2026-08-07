---
sidebar_position: 6
---

# 21. 合并两个有序链表

[原题链接](https://leetcode.cn/problems/merge-two-sorted-lists/description/?envType=study-plan-v2&envId=top-100-liked)

将两个升序链表合并为一个新的升序链表。

### 方法一：递归

```java title="Java"
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;
        if (l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        }
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
}
```

时间复杂度：$O(n + m)$。

空间复杂度：$O(n + m)$。

### 方法二：迭代

设定一个哨兵节点然后迭代。

```java title="Java"
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode();
        ListNode p = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                p.next = list1;
                list1 = list1.next;
            } else {
                p.next = list2;
                list2 = list2.next;
            }
            p = p.next;
        }
        p.next = list1 == null ? list2 : list1;
        return dummy.next;
    }
}
```

时间复杂度：$O(n + m)$。

空间复杂度：$O(1)$。
