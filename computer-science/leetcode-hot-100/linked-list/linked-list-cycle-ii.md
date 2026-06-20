---
sidebar_position: 5
---

# 142. 环形链表 II

[原题链接](https://leetcode.cn/problems/linked-list-cycle-ii/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个链表的头节点 `head`，返回链表开始入环的第一个节点。如果链表无环，则返回 `null`。

### 方法一：哈希表

```java title="Java"
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode pos = head;
        Set<ListNode> visited = new HashSet<ListNode>();
        while (pos != null) {
            if (visited.contains(pos)) {
                return pos;
            } else {
                visited.add(pos);
            }
            pos = pos.next;
        }
        return null;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(n)$。

### 方法二：快慢指针

用快慢指针可以判断是否有环，但这题还需找到入环节点，这要求我们分析快慢指针相遇时与入环节点的距离。

记相遇时慢指针的总路程是 $s$，则快指针的总路程是 $2s$。分析可知 $s$ 是环长的整数倍，将慢指针的路径按环长进行等分，取最后一份，最后一份未入环的长度等于环中剩余部分的长度。

注意需要将链表结点视为线段端点，将链表指针视为线段单位长度，于是 `slow` 和 `fast` 初始位置都在 `head`。

```java title="Java"
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null;
        ListNode slow = head.next;
        ListNode fast = head.next.next;
        while (slow != fast) {
            if (fast == null || fast.next == null) {
                return null;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode p = head;
        while (p != slow) {
            p = p.next;
            slow = slow.next;
        }
        return p;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
