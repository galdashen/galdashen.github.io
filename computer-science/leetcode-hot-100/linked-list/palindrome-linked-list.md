---
sidebar_position: 3
---

# 234. 回文链表

[原题链接](https://leetcode.cn/problems/palindrome-linked-list/description/?envType=study-plan-v2&envId=top-100-liked)

判断链表是否为回文链表。

### 方法一：递归

设置一个外部指针 `p`，先递进到链表尾，回归时对比该层和 `p` 数值是否相等。

```java title="Java"
class Solution {
    private ListNode p;
    public boolean isPalindrome(ListNode head) {
        p = head;
        return check(head);
    }
    private boolean check(ListNode head) {
        if (head == null) return true;
        if (!check(head.next)) return false;
        if (head.val != p.val) return false;
        p = p.next;
        return true;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

### 方法二：快慢指针

1. 将链表平分为两半。
2. 反转后半部分链表。
3. 判断是否回文。
4. 恢复链表。
5. 返回结果。

```java title="Java"
class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode secondHead = reverseList(slow.next);
        ListNode p1 = head;
        ListNode p2 = secondHead;
        boolean result = true;
        while (result && p2 != null) {
            if (p1.val != p2.val) result = false;
            p1 = p1.next;
            p2 = p2.next;
        }
        slow.next = reverseList(secondHead);
        return result;
    }
    private ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
        return prev;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
