---
sidebar_position: 2
---

# 155. 最小栈

[原题链接](https://leetcode.cn/problems/min-stack/description/?envType=study-plan-v2&envId=top-100-liked)

设计一个支持 `push`，`pop`，`top` 操作，并能在常数时间内检索到最小元素的栈。

实现 `MinStack` 类:

- `MinStack()` 初始化堆栈对象。
- `void push(int val)` 将元素 `val` 推入堆栈。
- `void pop()` 删除堆栈顶部的元素。
- `int top()` 获取堆栈顶部的元素。
- `int getMin()` 获取堆栈中的最小元素。

### 解法：辅助栈

```java title="Java"
class MinStack {
    private Deque<Integer> minStack;
    private Deque<Integer> helperStack;

    public MinStack() {
        minStack = new LinkedList<>();
        helperStack = new LinkedList<>();
        helperStack.push(Integer.MAX_VALUE);
    }

    public void push(int val) {
        minStack.push(val);
        helperStack.push(Math.min(helperStack.peek(), val));
    }

    public void pop() {
        minStack.pop();
        helperStack.pop();
    }

    public int top() {
        return minStack.peek();
    }

    public int getMin() {
        return helperStack.peek();
    }
}
```

时间复杂度：$O(1)$。

空间复杂度：$O(n)$。
