---
sidebar_position: 14
---

# 146. LRU 缓存

[原题链接](https://leetcode.cn/problems/lru-cache/description/?envType=study-plan-v2&envId=top-100-liked)

请你设计并实现一个满足 <abbr title="淘汰最久未使用">LRU缓存</abbr> 约束的数据结构。

实现 `LRUCache` 类：

- `LRUCache(int capacity)` 以 `int capacity` 作为容量初始化 LRU 缓存
- `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1`。
- `void put(int key, int value)` 如果关键字 `key` 已经存在，则变更其数据值 `value`；如果不存在，则向缓存中插入该组 `key-value`。如果插入操作导致关键字数量超过 `capacity`，则应该逐出最久未使用的关键字。

函数 `get` 和 `put` 必须以 `O(1)` 的平均时间复杂度运行。

### 解法：哈希表 + 双向链表

为了实现 $O(1)$ 的查找和修改，需要用哈希。为了实现 $O(1)$ 的头部插入和尾部删除，需要用双向链表。

```java title="Java"
class LRUCache {
    class DLinkedNode {
        int key;
        int value;
        DLinkedNode prev;
        DLinkedNode next;
        public DLinkedNode() {
        }
        public DLinkedNode(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private int capacity;
    private int size;
    private Map<Integer, DLinkedNode> map;
    private DLinkedNode dummy;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        size = 0;
        map = new HashMap<>();
        dummy = new DLinkedNode();
        dummy.prev = dummy;
        dummy.next = dummy;
    }

    public int get(int key) {
        DLinkedNode node = map.get(key);
        if (node == null)
            return -1;
        removeNode(node);
        addToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        DLinkedNode node = map.get(key);
        if (node == null) {
            DLinkedNode newNode = new DLinkedNode(key, value);
            map.put(key, newNode);
            addToHead(newNode);
            size++;
            if (size > capacity) {
                map.remove(dummy.prev.key);
                removeNode(dummy.prev);
                size--;
            }
        } else {
            node.value = value;
            removeNode(node);
            addToHead(node);
        }
    }

    private void removeNode(DLinkedNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void addToHead(DLinkedNode node) {
        node.prev = dummy;
        node.next = dummy.next;
        dummy.next.prev = node;
        dummy.next = node;
    }
}
```

时间复杂度：$O(1)$。

空间复杂度：$O(\text{capacity})$。
