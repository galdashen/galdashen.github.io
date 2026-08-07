---
sidebar_position: 11
---

# 138. 随机链表的复制

[原题链接](https://leetcode.cn/problems/copy-list-with-random-pointer/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个长度为 `n` 的链表，每个节点包含一个额外增加的随机指针 `random`，该指针可以指向链表中的任何节点或空节点。

构造这个链表的<a href="https://baike.baidu.com/item/%E6%B7%B1%E6%8B%B7%E8%B4%9D/22785317?fr=aladdin" target="_blank">深拷贝</a>。

### 解法：迭代 + 节点拆分

通过节点拆分优化空间复杂度。分为三步，一让原节点与复制节点交替排列为一条链表，二给复制节点设置 `random` 指针，三拆分链表为两条。

```java title="Java"
class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        for (Node node = head; node != null; node = node.next.next) {
            node.next = new Node(node.val, node.next);
        }
        for (Node node = head; node != null; node = node.next.next) {
            if (node.random != null) node.next.random = node.random.next;
        }
        Node dummy = new Node(0);
        Node curr = dummy;
        for (Node node = head; node != null; node = node.next, curr = curr.next) {
            curr.next = node.next;
            node.next = node.next.next;
        }
        return dummy.next;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(1)$。
