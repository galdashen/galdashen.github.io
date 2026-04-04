---
sidebar_position: 5
---

# 142. 环形链表 II

[原题链接](https://leetcode.cn/problems/linked-list-cycle-ii/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个链表的头节点 `head`，返回链表开始入环的第一个节点。如果链表无环，则返回 `null`。

### 方法一：哈希表

哈希。

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

记相遇时慢指针的路程是 $s$，则快指针的路程是 $2s$。分析可知 $s$ 是环长的整数倍，将慢指针的路径按环长进行等分，取最后一份，最后一份未入环的长度等于环中剩余部分的长度。

```java title="Java"
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null) {
            return null;
        }
        ListNode slow = head, fast = head;
        while (fast != null) {
            slow = slow.next;
            if (fast.next != null) {
                fast = fast.next.next;
            } else {
                return null;
            }
            if (fast == slow) {
                ListNode ptr = head;
                while (ptr != slow) {
                    ptr = ptr.next;
                    slow = slow.next;
                }
                return ptr;
            }
        }
        return null;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
