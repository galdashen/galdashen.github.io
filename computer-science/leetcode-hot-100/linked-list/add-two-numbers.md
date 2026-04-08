---
sidebar_position: 7
---

# 2. 两数相加

[原题链接](https://leetcode.cn/problems/add-two-numbers/solutions/?envType=study-plan-v2&envId=top-100-liked)

给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照<abbr title="从低位到高位">逆序</abbr>的方式存储的，并且每个节点只能存储一位数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

### 解法：模拟

```java title="Java"
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode();
        ListNode curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            if (l1 != null) {
                carry += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                carry += l2.val;
                l2 = l2.next;
            }
            curr.next = new ListNode(carry % 10);
            carry = carry / 10;
            curr = curr.next;
        }
        return dummy.next;
    }
}
```

时间复杂度：$O(max(m,n))$。

空间复杂度：$O(1)$。
