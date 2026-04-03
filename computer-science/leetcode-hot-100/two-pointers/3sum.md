---
sidebar_position: 3
---

# 15. 三数之和

[原题链接](https://leetcode.cn/problems/3sum/description/?envType=study-plan-v2&envId=top-100-liked)

给定一个数组 `int[] nums`，寻找三个互不相同的下标 `i, j, k` 使得 `nums[i] + nums[j] + nums[k] == 0`。找到所有和为 `0` 且不重复的三元组 `[nums[i], nums[j], nums[k]]`，返回 `List<List<Integer>>`。

输出的顺序和三元组的顺序并不重要。答案中不可以包含重复的三元组。

### 解法：排序 + 双指针

如果用三重循环暴力求解，时间复杂度是 $O(n^3)$，除此以外还得去重。

需要把时间复杂度降到 $O(n^3)$ 以下。首先先排序，时间复杂度为 $O(n\log n)$。然后只保留三重循环的最外层循环，用双指针法代替内层的两重循环，这样总时间复杂度就是 $O(n^2)$。注意不要忘了去重。

```java title="Java"
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 2; i++) {
            if (nums[i] > 0) {
                break;
            }
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            int left = i + 1;
            int right = nums.length - 1;
            int target = -nums[i];
            while (left < right) {
                int sum = nums[left] + nums[right];
                if (sum == target) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) {
                        left++;
                    }
                    while (left < right && nums[right] == nums[right - 1]) {
                        right--;
                    }
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
}
```

时间复杂度 $O(n^2)$。空间复杂度 $O(\log n)$ 来自排序。
