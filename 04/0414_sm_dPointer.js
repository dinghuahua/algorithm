/**
 * 18. 四数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  let set1 = new Set(), norepeatSet = new Set(), res = []

  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        for (let m = k + 1; m < nums.length; m++) {
          if (nums[i] + nums[j] + nums[k] + nums[m] === target) {
            let arr = [nums[i], nums[j], nums[k], nums[m]]
            set1.add(arr)
          }
        }
      }
    }
  }
  for (const arr of set1) {
    if (!norepeatSet.has(arr.join())) {
      norepeatSet.add(arr.join())
      res.push(arr)
    }
  }
  return res
};
// 题解 还没看懂
var fourSum = function (nums, target) {
  const quadruplets = [];
  if (nums.length < 4) {
    return quadruplets;
  }
  nums.sort((x, y) => x - y);
  const length = nums.length;
  for (let i = 0; i < length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break;
    }
    if (nums[i] + nums[length - 3] + nums[length - 2] + nums[length - 1] < target) {
      continue;
    }
    for (let j = i + 1; j < length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
        break;
      }
      if (nums[i] + nums[j] + nums[length - 2] + nums[length - 1] < target) {
        continue;
      }
      let left = j + 1, right = length - 1;
      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum === target) {
          quadruplets.push([nums[i], nums[j], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) {
            left++;
          }
          left++;
          while (left < right && nums[right] === nums[right - 1]) {
            right--;
          }
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }
  return quadruplets;
};

/**
 * 16. 最接近的三数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  let map = new Map(), l = nums.length, min = Infinity

  nums.sort((a, b) => a - b)
  for (let i = 0; i < l; i++) {
    if (i >= 1 && nums[i] === nums[i - 1]) continue
    // 会遗留一些可枚举的情况
    for (let j = i + 1; j < l - 1; j++) {
      const sum = nums[i] + nums[j] + nums[j + 1],
        diff = Math.abs(sum - target)
      console.log(nums[i], nums[j], nums[j + 1])
      min = Math.min(min, diff)
      map.set(diff, sum)
    }
  }
  // console.log(map)
  return map.get(min)

};
