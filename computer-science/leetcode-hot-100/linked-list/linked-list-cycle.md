---
sidebar_position: 4
---

# 141. 环形链表

[原题链接](https://leetcode.cn/problems/linked-list-cycle/description/?envType=study-plan-v2&envId=top-100-liked)

判断链表是否有环。

### 解法：快慢指针

```java title="Java"
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head, fast = head.next;
        while (slow != fast) {
            if (fast == null || fast.next == null) return false;
            fast = fast.next.next;
            slow = slow.next;
        }
        return true;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
