---
sidebar_position: 2
---

# 49. 字母异位词分组

[原题链接](https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个字符串数组 `String[] strs`，将 <abbr title="由相同字母，且每个字母出现次数相同，重新排列组合而成的不同单词">字母异位词</abbr> 组合在一起，返回组合后的结果 `List<List<String>>`。

可以按任意顺序返回结果列表。

### 方法一：排序

对每个单词排序，如果两个单词排序后的结果相同说明它们是字母异位词。将排序后的单词作为键，然后开一个 `Map`，将键相同的单词存到键对应的值里去。

```java title="Java"
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<String, List<String>>();
        for (String str : strs) {
            char[] array = str.toCharArray();
            Arrays.sort(array);
            String key = new String(array);
            List<String> list = map.getOrDefault(key, new ArrayList<String>());
            list.add(str);
            map.put(key, list);
        }
        return new ArrayList<List<String>>(map.values());
    }
}
```

遍历一遍，每次需要排序 $O(k\log k)$ 的时间和更新 `list` $O(1)$ 的时间，其中 $k$ 是单词的最大长度，总时间复杂度为 $O(nk\log k)$。哈希表内会存储所有的单词，空间复杂度为 $O(nk)$。

### 方法二：计数

对每个单词统计每个字母的出现次数，如果两个单词的每个字母出现次数相同说明它们是字母异位词。<abbr title="但由于 Java 的 int[] 不能作为键，这里需要特殊处理">将每个字母出现次数作为键</abbr>，然后开一个 `Map`，将键相同的单词存到键对应的值里去。

```java title="Java"
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<String, List<String>>();
        for (String str : strs) {
            int[] counts = new int[26];
            int length = str.length();
            for (int i = 0; i < length; i++) {
                counts[str.charAt(i) - 'a']++;
            }
            // 将每个出现次数大于 0 的字母和出现次数按顺序拼接成字符串，作为哈希表的键
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < 26; i++) {
                if (counts[i] != 0) {
                    sb.append((char) ('a' + i));
                    sb.append(counts[i]);
                }
            }
            String key = sb.toString();
            List<String> list = map.getOrDefault(key, new ArrayList<String>());
            list.add(str);
            map.put(key, list);
        }
        return new ArrayList<List<String>>(map.values());
    }
}
```

遍历一遍，每次需要统计字母次数的时间 $O(k)$ 以及根据次数生成键的时间 $O(26)$，总时间复杂度约为 $O(nk)$，其中 $k$ 是单词的最大长度。哈希表会储存所有的单词，总空间复杂度约为 $O(nk)$。
