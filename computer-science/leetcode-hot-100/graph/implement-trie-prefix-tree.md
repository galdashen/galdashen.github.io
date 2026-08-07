---
sidebar_position: 4
---

# 208. 实现 Trie (前缀树)

[原题链接](https://leetcode.cn/problems/implement-trie-prefix-tree/description/?envType=study-plan-v2&envId=top-100-liked)

[Trie](https://baike.baidu.com/item/%E5%AD%97%E5%85%B8%E6%A0%91/9825209?fr=aladdin)（发音类似 "try"）或者说前缀树是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查。

请你实现 Trie 类：

- `Trie()` 初始化前缀树对象。
- `void insert(String word)` 向前缀树中插入字符串 `word`。
- `boolean search(String word)` 如果字符串 `word` 在前缀树中，返回 `true`（即，在检索之前已经插入）；否则，返回 `false`。
- `boolean startsWith(String prefix)` 如果之前已经插入的字符串 `word` 的前缀之一为 `prefix`，返回 `true` ；否则，返回 `false`。

### 解法：字典树

这里相当于二十六叉树，注意代码中重复的部分可以抽象成一个函数，减少代码冗余。

```java title="Java"
class Trie {
    private Trie[] children;
    private boolean isEnd;
    public Trie() {
        children = new Trie[26];
        isEnd = false;
    }
    public void insert(String word) {
        Trie node = this;
        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            int index = ch - 'a';
            if (node.children[index] == null) node.children[index] = new Trie();
            node = node.children[index];
        }
        node.isEnd = true;
    }
    public boolean search(String word) {
        Trie node = searchPrefix(word);
        return node != null && node.isEnd;
    }
    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null;
    }
    private Trie searchPrefix(String prefix) {
        Trie node = this;
        for (int i = 0; i < prefix.length(); i++) {
            char ch = prefix.charAt(i);
            int index = ch - 'a';
            if (node.children[index] == null) return null;
            node = node.children[index];
        }
        return node;
    }
}
```

时间复杂度：初始化为 $O(1)$，其余操作为 $O(|S|)$，其中 $|S|$ 是每次插入或查询的字符串的长度。

空间复杂度：$O(|T|\cdot \Sigma)$，其中 $|T|$ 为所有插入字符串的长度之和，$\Sigma$ 为字符集的大小，本题 $\Sigma=26$。
