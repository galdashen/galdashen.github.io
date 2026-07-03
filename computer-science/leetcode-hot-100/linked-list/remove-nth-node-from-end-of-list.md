---
sidebar_position: 8
---

# 19. 删除链表的倒数第 N 个结点

[原题链接](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/?envType=study-plan-v2&envId=top-100-liked)

删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

### 解法：双指针

```java title="Java"
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode first = head;
        ListNode second = dummy;
        for (int i = 0; i < n; ++i) {
            first = first.next;
        }
        while (first != null) {
            first = first.next;
            second = second.next;
        }
        second.next = second.next.next;
        return dummy.next;
    }
}
```

时间复杂度：$O(L)$。

空间复杂度：$O(1)$。
