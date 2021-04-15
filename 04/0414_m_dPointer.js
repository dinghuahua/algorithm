/**
 * 16. 最接近的三数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosestError = function (nums, target) {
  let map = new Map(),
    l = nums.length,
    min = Infinity

  nums.sort((a, b) => a - b)
  for (let i = 0; i < l; i++) {
    if (i >= 1 && nums[i] === nums[i - 1]) continue
    // 会遗漏一些可枚举的情况
    for (let j = i + 1; j < l - 1; j++) {
      const sum = nums[i] + nums[j] + nums[j + 1],
        diff = Math.abs(sum - target)
      min = Math.min(min, diff)
      map.set(diff, sum)
    }
  }
  // console.log(map)
  return map.get(min)
}

var threeSumClosest2 = function (nums, target) {
  nums.sort((a, b) => a - b)
  let n = nums.length, best = Infinity;

  // 根据差值的绝对值来更新答案
  const update = (cur) => {
    if (Math.abs(cur - target) < Math.abs(best - target)) {
      best = cur;
    }
  };

  // 枚举 a
  for (let i = 0; i < n; ++i) {
    // 保证和上一次枚举的元素不相等
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue;
    }
    // 使用双指针枚举 b 和 c
    let j = i + 1, k = n - 1;
    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      // 如果和为 target 直接返回答案
      if (sum == target) {
        return target;
      }
      update(sum);
      if (sum > target) {
        // 如果和大于 target，移动 c 对应的指针
        let k0 = k - 1;
        // 移动到下一个不相等的元素
        while (j < k0 && nums[k0] === nums[k]) {
          --k0;
        }
        k = k0;
      } else {
        // 如果和小于 target，移动 b 对应的指针
        let j0 = j + 1;
        // 移动到下一个不相等的元素
        while (j0 < k && nums[j0] === nums[j]) {
          ++j0;
        }
        j = j0;
      }
    }
  }
  return best;
}

var threeSumClosest3 = function (nums, target) {
  let l = nums.length, diff = Infinity

  nums.sort((a, b) => a - b)

  const update = (sum) => {
    if (Math.abs(sum - target) < Math.abs(diff - target))
      diff = sum
  }
  for (let i = 0; i < l; i++) {
    if (i >= 1 && nums[i] === nums[i - 1]) continue

    let j = i + 1, k = l - 1
    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k]

      if (sum === target) return target
      update(sum)
      if (sum > target) {
        let k0 = k - 1
        while (j < k0 && nums[k0] === nums[k]) k0--
        k = k0
      } else {
        let j0 = j + 1
        while (j0 < k && nums[j0] === nums[j]) j0++
        j = j0
      }
    }
  }
  return diff
}