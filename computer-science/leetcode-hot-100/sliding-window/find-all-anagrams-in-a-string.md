---
sidebar_position: 2
---

# 438. 找到字符串中所有字母异位词

[原题链接](https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/?envType=study-plan-v2&envId=top-100-liked) [官解链接](https://leetcode.cn/problems/find-all-anagrams-in-a-string/solutions/1123971/zhao-dao-zi-fu-chuan-zhong-suo-you-zi-mu-xzin/?envType=study-plan-v2&envId=top-100-liked)

给定两个字符串 `String s` 和 `String p`，找到 `s` 中所有 `p` 的<abbr title="由相同字母，且每个字母出现次数相同，重新排列组合而成的不同单词">异位词</abbr>的<abbr title="连续的子字符串">子串</abbr>，返回这些子串的起始索引 `List<Integer>`。

不考虑答案输出的顺序。

### 方法一：滑动窗口

维护一个和 `p` 等长的滑动窗口，不断往右移动，每次都比较当前窗口内的字符串和 `p` 是否是异位词。

```java title="Java"
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int sLen = s.length(), pLen = p.length();

        if (sLen < pLen) {
            return new ArrayList<Integer>();
        }

        List<Integer> ans = new ArrayList<Integer>();
        int[] sCount = new int[26];
        int[] pCount = new int[26];
        for (int i = 0; i < pLen; ++i) {
            ++sCount[s.charAt(i) - 'a'];
            ++pCount[p.charAt(i) - 'a'];
        }

        if (Arrays.equals(sCount, pCount)) {
            ans.add(0);
        }

        for (int i = 0; i < sLen - pLen; ++i) {
            --sCount[s.charAt(i) - 'a'];
            ++sCount[s.charAt(i + pLen) - 'a'];

            if (Arrays.equals(sCount, pCount)) {
                ans.add(i + 1);
            }
        }

        return ans;
    }
}
```

时间复杂度：$O(m + (n - m) \times \Sigma)$，其中 $n$ 为字符串 `s` 的长度，$m$ 为字符串 `p` 的长度，$\Sigma = 26$ 为所有可能的字符数。

空间复杂度：$O(\Sigma)$。

### 方法二：优化的滑动窗口

不再每次遍历 `sCount` 与 `pCount` 来判断是否是异位词，而是用一个变量 `int differ` 记录有几个位置不同。

```java title="Java"
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int sLen = s.length(), pLen = p.length();

        if (sLen < pLen) {
            return new ArrayList<Integer>();
        }

        List<Integer> ans = new ArrayList<Integer>();
        int[] count = new int[26];
        for (int i = 0; i < pLen; ++i) {
            ++count[s.charAt(i) - 'a'];
            --count[p.charAt(i) - 'a'];
        }

        int differ = 0;
        for (int j = 0; j < 26; ++j) {
            if (count[j] != 0) {
                ++differ;
            }
        }

        if (differ == 0) {
            ans.add(0);
        }

        for (int i = 0; i < sLen - pLen; ++i) {
            if (count[s.charAt(i) - 'a'] == 1) {
                --differ;
            } else if (count[s.charAt(i) - 'a'] == 0) {
                ++differ;
            }
            --count[s.charAt(i) - 'a'];

            if (count[s.charAt(i + pLen) - 'a'] == -1) {
                --differ;
            } else if (count[s.charAt(i + pLen) - 'a'] == 0) {
                ++differ;
            }
            ++count[s.charAt(i + pLen) - 'a'];

            if (differ == 0) {
                ans.add(i + 1);
            }
        }

        return ans;
    }
}
```

时间复杂度：$O(n + m + \Sigma)$。

空间复杂度：$O(\Sigma)$。
