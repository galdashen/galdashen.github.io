---
sidebar_position: 1
---

# 3. 无重复字符的最长子串

[原题链接](https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个字符串 `String s`，请你找出其中不含有重复字符的最长<abbr title="连续的子字符串">子串</abbr>的长度。

### 题解：滑动窗口

右指针不断前进，遇到重复就移动左指针。

```java title="Java"
class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> occ = new HashSet<Character>();
        int n = s.length();
        int left = 0, ans = 0;
        for (int right = 0; right < n; right++) {
            while (occ.contains(s.charAt(right))) {
                occ.remove(s.charAt(left));
                left++;
            }
            occ.add(s.charAt(right));
            ans = Math.max(ans, right - left + 1);
        }
        return ans;
    }
}
```

时间复杂度：$O(n)$，左指针和右指针分别会遍历整个字符串一次。

空间复杂度：$O(\lvert\Sigma\rvert)$，`String s` 中的不同字符会存到哈希表里。
