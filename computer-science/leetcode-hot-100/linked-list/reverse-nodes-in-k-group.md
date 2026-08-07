---
sidebar_position: 10
---

# 25. K 个一组翻转链表

[原题链接](https://leetcode.cn/problems/reverse-nodes-in-k-group/description/?envType=study-plan-v2&envId=top-100-liked)

`k` 个一组翻转链表。

### 方法一：递归

```java title="Java"
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode p = head;
        for (int i = 0; i < k; i++) {
            if (p == null) return head;
            p = p.next;
        }
        ListNode prev = null;
        ListNode curr = head;
        for (int i = 0; i < k; i++) {
            ListNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
        head.next = reverseKGroup(p, k);
        return prev;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n/k)$。

### 方法二：模拟

```java title="Java"
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0, head);
        ListNode curr = dummy;
        int len = 0;
        while (curr.next != null) {
            curr = curr.next;
            len++;
        }
        curr = dummy;
        while (len >= k) {
            ListNode right = curr.next;
            for (int i = 0; i < k - 1; i++) {
                ListNode left = curr.next;
                curr.next = right.next;
                right.next = curr.next.next;
                curr.next.next = left;
            }
            curr = right;
            len -= k;
        }
        return dummy.next;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
