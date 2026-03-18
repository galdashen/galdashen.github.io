---
sidebar_position: 3
---

# 76. 最小覆盖子串

[原题链接](https://leetcode.cn/problems/minimum-window-substring/description/?envType=study-plan-v2&envId=top-100-liked)

给定两个字符串 `s` 和 `t`，找到 `s` 中的最短<abbr title="字符串中连续的非空字符序列">子串</abbr>，使得该子串包含 `t` 中的每一个字符（包括重复字符）。如果没有这样的子串，返回空字符串 `""`。

测试用例保证答案唯一。

### 解法：滑动窗口

维护一个滑动窗口，统计窗口内中各字符的出现次数是否覆盖了 `t`，即是否大于等于 `t` 中各字符的出现次数。窗口右边界往右走，然后判断是否已覆盖，若覆盖则左边界不断往右走直至刚好不覆盖，求出窗口长度。

```java title="Java"
class Solution {
    Map<Character, Integer> ori = new HashMap<Character, Integer>();
    Map<Character, Integer> cnt = new HashMap<Character, Integer>();

    public String minWindow(String s, String t) {
        int tLen = t.length();
        for (int i = 0; i < tLen; i++) {
            char c = t.charAt(i);
            ori.put(c, ori.getOrDefault(c, 0) + 1);
        }
        int l = 0, r = -1;
        int len = Integer.MAX_VALUE, ansL = -1, ansR = -1;
        int sLen = s.length();
        while (r < sLen) {
            ++r;
            if (r < sLen && ori.containsKey(s.charAt(r))) {
                cnt.put(s.charAt(r), cnt.getOrDefault(s.charAt(r), 0) + 1);
            }
            while (check() && l <= r) {
                if (r - l + 1 < len) {
                    len = r - l + 1;
                    ansL = l;
                    ansR = l + len;
                }
                if (ori.containsKey(s.charAt(l))) {
                    cnt.put(s.charAt(l), cnt.getOrDefault(s.charAt(l), 0) - 1);
                }
                ++l;
            }
        }
        return ansL == -1 ? "" : s.substring(ansL, ansR);
    }

    public boolean check() {
        Iterator iter = ori.entrySet().iterator();
        while (iter.hasNext()) {
            Map.Entry entry = (Map.Entry) iter.next();
            Character key = (Character) entry.getKey();
            Integer val = (Integer) entry.getValue();
            if (cnt.getOrDefault(key, 0) < val) {
                return false;
            }
        }
        return true;
    }
}
```

时间复杂度：$O(C \cdot \lvert s\rvert + \lvert t \rvert)$，其中 $C$ 为字符集大小。

空间复杂度：$O(C)$。
