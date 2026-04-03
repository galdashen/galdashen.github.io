---
sidebar_position: 2
---

# 206. 反转链表

[原题链接](https://leetcode.cn/problems/reverse-linked-list/description/?envType=study-plan-v2&envId=top-100-liked)

给你单链表的头节点 `head`，请你反转链表，并返回反转后的链表。

### 方法一：迭代

迭代。

```java title="Java"
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。

### 方法二：递归

先反转 `head.next` 为首的链表，然后让 `head.next` 指向 `head`，然后 `head` 指向 `null`。

```java title="Java"
class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。
