---
sidebar_position: 3
---

# 15. 三数之和

[原题链接](https://leetcode.cn/problems/3sum/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个数组，找到其中所有和为零的三元组。

### 解法：排序 + 双指针

如果用三重循环暴力求解，时间复杂度是 $O(n^3)$，除此以外还得去重。

需要把时间复杂度降到 $O(n^3)$ 以下。首先先排序，时间复杂度为 $O(n\log n)$。然后只保留三重循环的最外层循环，用双指针法代替内层的两重循环，这样总时间复杂度就是 $O(n^2)$。注意不要忘了去重。

```java title="Java"
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 2; i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int j = i + 1, k = nums.length - 1;
            while (j < k) {
                int sum = nums[i] + nums[j] + nums[k];
                if (sum == 0) {
                    ans.add(Arrays.asList(nums[i], nums[j], nums[k]));
                    while (j < k && nums[j] == nums[++j]);
                    while (j < k && nums[k] == nums[--k]);
                } else if (sum < 0) {
                    j++;
                } else {
                    k--;
                }
            }
        }
        return ans;
    }
}
```

时间复杂度：$O(n^2)$。

空间复杂度：$O(\log n)$。
