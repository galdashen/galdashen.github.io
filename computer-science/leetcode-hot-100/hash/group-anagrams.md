---
sidebar_position: 2
---

# 49. 字母异位词分组

[原题链接](https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked)

按 <abbr title="由相同字母，且每个字母出现次数相同，重新排列组合而成的不同单词">字母异位词</abbr> 给字符串数组分组。

### 方法一：排序

对每个单词排序，如果两个单词排序后的结果相同说明它们是字母异位词。

```java title="Java"
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String str : strs) {
            char[] array = str.toCharArray();
            Arrays.sort(array);
            String key = new String(array);
            List<String> list = map.get(key);
            if (list == null) {
                list = new ArrayList<>();
                map.put(key, list);
            }
            list.add(str);
        }
        return new ArrayList<List<String>>(map.values());
    }
}
```

时间复杂度：$O(nk \log k)$。

空间复杂度：$O(nk)$。

### 方法二：计数

对每个单词统计每个字母的出现次数，如果两个单词的每个字母出现次数相同说明它们是字母异位词。<abbr title="但由于 Java 的 int[] 不能作为键，这里需要特殊处理">将每个字母出现次数作为键</abbr>，然后开一个 `Map`，将键相同的单词存到键对应的值里去。

```java title="Java"
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String str : strs) {
            int[] counts = new int[26];
            int length = str.length();
            for (int i = 0; i < length; i++) {
                counts[str.charAt(i) - 'a']++;
            }
            // 将每个出现次数大于 0 的字母和出现次数按顺序拼接成字符串，作为哈希表的键
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 26; i++) {
                if (counts[i] != 0) {
                    sb.append((char) ('a' + i));
                    sb.append(counts[i]);
                }
            }
            String key = sb.toString();
            List<String> list = map.get(key);
            if (list == null) {
                list = new ArrayList<>();
                map.put(key, list);
            }
            list.add(str);
        }
        return new ArrayList<List<String>>(map.values());
    }
}
```

时间复杂度：$O(nk)$。

空间复杂度：$O(nk)$。
