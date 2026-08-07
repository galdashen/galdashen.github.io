---
sidebar_position: 4
---

# 763. 划分字母区间

[原题链接](https://leetcode.cn/problems/partition-labels/description/?envType=study-plan-v2&envId=top-100-liked)

给你一个字符串 `s`。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。例如，字符串 `"ababcc"` 能够被分为 `["abab", "cc"]`，但类似 `["aba", "bcc"]` 或 `["ab", "ab", "cc"]` 的划分是非法的。

注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 `s`。

返回一个表示每个字符串片段的长度的列表。

### 解法：贪心

```java title="Java"
class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] last = new int[26];
        int length = s.length();
        for (int i = 0; i < length; i++) {
            last[s.charAt(i) - 'a'] = i;
        }
        List<Integer> partition = new ArrayList<>();
        int start = 0, end = 0;
        for (int i = 0; i < length; i++) {
            end = Math.max(end, last[s.charAt(i) - 'a']);
            if (i == end) {
                partition.add(end - start + 1);
                start = end + 1;
            }
        }
        return partition;
    }
}
```

时间复杂度：$O(n)$。

空间复杂度：$O(|\Sigma|)$。
