---
sidebar_position: 9
---

# 24. 两两交换链表中的节点

[原题链接](https://leetcode.cn/problems/swap-nodes-in-pairs/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

### 方法一：递归

```java title="Java"
class Solution {
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode temp = head.next;
        head.next = swapPairs(temp.next);
        temp.next = head;
        return temp;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

### 方法二：迭代

```java title="Java"
class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode curr = dummy;
        while (curr.next != null && curr.next.next != null) {
            ListNode temp = curr.next;
            curr.next = temp.next;
            temp.next = curr.next.next;
            curr.next.next = temp;
            curr = temp;
        }
        return dummy.next;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
