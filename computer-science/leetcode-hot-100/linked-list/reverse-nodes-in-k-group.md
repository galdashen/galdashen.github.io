---
sidebar_position: 10
---

# 25. K 个一组翻转链表

[原题链接](https://leetcode.cn/problems/reverse-nodes-in-k-group/description/?envType=study-plan-v2&envId=top-100-liked)

给你链表的头节点 `head`，每 `k` 个节点一组进行翻转，请你返回修改后的链表。

`k` 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 `k` 的整数倍，那么请将最后剩余的节点保持原有顺序。

### 解法：模拟

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
