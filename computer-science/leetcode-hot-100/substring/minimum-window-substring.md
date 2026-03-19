---
sidebar_position: 3
---

# 76. 最小覆盖子串

[原题链接](https://leetcode.cn/problems/minimum-window-substring/description/?envType=study-plan-v2&envId=top-100-liked)

给定两个字符串 `s` 和 `t`，找到 `s` 中的最短<abbr title="字符串中连续的非空字符序列">子串</abbr>，使得该子串包含 `t` 中的每一个字符（包括重复字符）。如果没有这样的子串，返回空字符串 `""`。

测试用例保证答案唯一。

### 解法：滑动窗口

维护一个滑动窗口，统计窗口内中各字符的出现次数是否覆盖了 `t`，即是否大于等于 `t` 中各字符的出现次数。窗口右边界往右走，然后判断是否已覆盖，若覆盖则左边界不断往右走直至不覆盖，求出窗口长度。（可以用一个 `int differ` 表示还差几个字符未覆盖）

```java title="Java"
class Solution {
    public String minWindow(String s, String t) {
        int[] sCount = new int[128];
        int[] tCount = new int[128];
        int sLen = s.length(), tLen = t.length();
        int differ = 0;
        int left = 0, right = -1;
        int ansL = -1, ansR = sLen;
        for (int i = 0; i < tLen; i++) {
            tCount[t.charAt(i)]++;
        }
        for (int i = 0; i < 128; i++) {
            if (tCount[i] > 0) differ++;
        }
        for (right = 0; right < sLen; right++) {
            char c = s.charAt(right);
            if (++sCount[c] == tCount[c]) differ--;
            while (differ == 0) {
                if (right - left < ansR - ansL) {
                    ansL = left;
                    ansR = right;
                }
                char d = s.charAt(left++);
                if (sCount[d]-- == tCount[d]) differ++;
            }
        }
        return ansL == -1 ? "" : s.substring(ansL, ansR + 1);
    }
}
```

时间复杂度：$O(\lvert s\rvert + \lvert t \rvert)$。

空间复杂度：$O(C)$，其中 $C$ 是字符集大小。
