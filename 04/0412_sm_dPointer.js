/**
 * 27. 移除元素
 * 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  for (let i = nums.length; i >= 0; i--) {
    if (nums[i] === val) nums.splice(i, 1)
  }
  return nums.length
}
var removeElement2 = function (nums, val) {
  let index = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) nums[index++] = nums[i]
  }
  return index
}

/**
 * 28. 实现 strStr()
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// "mississippi"
// "issip"
var strStr = function (haystack, needle) {
  return haystack.indexOf(needle)
}

var strStr2 = function (haystack, needle) {
  if (!needle.length) return 0
  for (let i = 0; i < haystack.length; i++) {
    let j = 0
    for (let k = i; k < haystack.length && j < needle.length; k++, j++) {
      if (haystack[k] !== needle[j]) {
        break
      }
    }
    if (j === needle.length) {
      return i
    }
  }
  return -1
}
var strStr3 = function (haystack, needle) {
  if (!needle.length) return 0
  for (let i = 0; i < haystack.length; i++) {
    let j = 0
    for (; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        break
      }
    }
    if (j === needle.length) {
      return i
    }
  }
  return -1
}
var strStr4 = function (haystack, needle) {
  if (!needle.length) return 0
  for (let i = 0; i + needle.length - 1 < haystack.length; i++) {
    if (haystack.slice(i, i + needle.length) === needle) return i
  }
  return -1
}

/**
 * 125. 验证回文串
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.toLocaleLowerCase()
  s = s.replace(/[^a-z0-9]/g, '')
  for (let left = 0, right = s.length - 1; left <= right; left++, right--) {
    if (s[left] !== s[right]) return false
  }
  return true
}

var isPalindrome2 = function (s) {
  s = s.toLocaleLowerCase()
  s = s.replace(/[^a-z0-9]/g, '')
  if (!s.length) return true
  const fun = (start, end) => {
    if (start >= end) return true

    return s[start] === s[end] && fun(start + 1, end - 1)
  }
  return fun(0, s.length - 1)
}

/**
 * 167. 两数之和 II - 输入有序数组
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let map = new Map()

  for (let i = 0; i < numbers.length; i++) {
    if (map.has(target - numbers[i])) {
      return [map.get(target - numbers[i]) + 1, i + 1]
    } else {
      map.set(numbers[i], i)
    }
  }
}

// 题解 双指针
var twoSum2 = function (numbers, target) {
  let i = 0
  let j = numbers.length - 1
  while (i < j) {
    let sum = numbers[i] + numbers[j]
    if (sum < target) {
      i++
    } else if (sum > target) {
      j--
    } else {
      return [i + 1, j + 1]
    }
  }
  return [-1, -1]
}

// 题解 二分查找
var twoSum = function (numbers, target) {
  for (let i = 0; i < numbers.length; ++i) {
    let low = i + 1,
      high = numbers.length - 1
    while (low <= high) {
      let mid = ~~((high - low) / 2) + low
      if (numbers[mid] == target - numbers[i]) {
        return [i + 1, mid + 1]
      } else if (numbers[mid] > target - numbers[i]) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
  }
  return [-1, -1]
}

/**
 * 925. 长按键入
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
// "rick"
// "kric"
var isLongPressedNameError = function (name, typed) {
  let map1 = new Map()
  let map2 = new Map()

  for (let i = 0; i < name.length; i++) {
    map1.set(name[i], (map1.get(name[i]) || 0) + 1)
  }
  for (let i = 0; i < typed.length; i++) {
    map2.set(typed[i], (map2.get(typed[i]) || 0) + 1)
  }
  if (map2.size > map1.size) return false
  for (const [c, num] of map1) {
    if ((map2.get(c) || 0) < num) return false
  }
  return true
}

var isLongPressedName = function (name, typed) {
  if (!name.length) return true
  if (!typed.length) return false
  if (typed[0] !== name[0]) return false
  let index = 1
  for (let i = 1; i < typed.length; i++) {
    if (typed[i] === name[index]) index++
    else if (typed[i] !== typed[i - 1]) return false
  }
  return index === name.length
}


/**
 * 15. 三数之和
 * @param {number[]} nums
 * @return {number[][]}
 */
// 超时
// 题解都是直接丢双指针的解题思路，没有讲如何从暴力解逐渐推到双指针解法的
// 下面讲一下我的理解： 首先，如果用暴力解，用一个三重循环遍历那么时间复杂度在O(N ^ 3) ，
// 然后稍微进行优化，根据题目：找到三元组不能重复
// 可以想到，如果要排序（能保证重复出现的数字在一起，并且时间复杂度为O(NlogN)，没啥影响）
// 可以在第二重循环的枚举中找到不小于当前第一重循环的枚举元素
// 和第三重循环同理，找到不小于第二重循环的枚举元素 => 那么能想到了排序，但是本质上还是三重循环，那么时间复杂度还是O(N^3) ，
// 继续优化，将下面的两重循环变成一重循环：
// 可以发现我们是固定了第一个数然后去找其他两个数的，那么可以将后面两个数看成一个数，
// 那么问题就变成了 => 在有序数组中从[i + 1, len - 1]这个范围内找到一个符合要求的数，
// 那么就变成了双指针问题 => ，而这个数的值不再是mid，而是两个边界left和right的和。
// 而指针的移动条件就是：如果当前的sum值太大，那么右指针就移动；如果sum太小，那么左指针就移动；
// 如果值正好，那么就是当前值，并且左指针右移，右指针左移（因为是找到所有满足的解）；
// 循环的结束条件就是左右指针相遇 而双指针情况下，第二三重循环就从O(N^2)变成O(N)

var threeSum = function (nums) {
  let map = new Map()

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          let arr = [nums[i], nums[j], nums[k]]
          arr.sort((a, b) => a - b)
          map.set(arr.join(), arr)
        }
      }
    }
  }
  return Array.from(map.values())
};
var threeSum2 = function (nums) {
  let set1 = new Set(), pre1 = Infinity

  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === pre1) continue
    let pre2 = Infinity
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] === pre2) continue
      let pre3 = Infinity
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[k] === pre3) continue
        if (nums[i] + nums[j] + nums[k] === 0) {
          let arr = [nums[i], nums[j], nums[k]]
          set1.add(arr)
        }
        pre3 = nums[k]
      }
      pre2 = nums[j]
    }
    pre1 = nums[i]
  }
  return Array.from(set1)
};

var threeSumError = function (nums) {
  let map = new Map(),
    res = []

  for (let i = 0; i < nums.length; i++) {
    if (map.has(0 - nums[i])) {
      let arr = map.get(0 - nums[i])
      console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].length < 2) {
          arr[i].push(nums[i])
        } else if (arr.length === 2) {
          if (arr[i] + nums[i] === 0) {
            arr[i].push(nums[i])
            arr[i].sort((a, b) => a - b)
            res.push(arr[i].join())
          }
        }
      }
    } else {
      map.set(nums[i], [nums[i]])
    }
  }
  let set = new Set(res)
  res = Array.from(set)

  return res.map((item) => item.split(','))
}

// 题解
var threeSum3 = function (nums) {
  let n = nums.length, ans = [];
  nums.sort((a, b) => a - b);
  // 枚举 a
  for (let first = 0; first < n; ++first) {
    // 需要和上一次枚举的数不相同
    if (first > 0 && nums[first] == nums[first - 1]) {
      continue;
    }
    // c 对应的指针初始指向数组的最右端
    let third = n - 1;
    let target = -nums[first];
    // 枚举 b
    for (let second = first + 1; second < n; ++second) {
      // 需要和上一次枚举的数不相同
      if (second > first + 1 && nums[second] == nums[second - 1]) {
        continue;
      }
      // 这个方法就是我们常说的「双指针」，当我们需要枚举数组中的两个元素时，如果我们发现随着第一个元素的递增，第二个元素是递减的，
      // 那么就可以使用双指针的方法，将枚举的时间复杂度从 O(N^2)减少至 O(N)。
      // 为什么是 O(N)呢？这是因为在枚举的过程每一步中，「左指针」会向右移动一个位置（也就是题目中的 b），
      // 而「右指针」会向左移动若干个位置，这个与数组的元素有关，但我们知道它一共会移动的位置数为 O(N)，
      // 均摊下来，每次也向左移动一个位置，因此时间复杂度为 O(N)。

      // 需要保证 b 的指针在 c 的指针的左侧
      while (second < third && nums[second] + nums[third] > target) {
        --third;
      }
      // 如果指针重合，随着 b 后续的增加
      // 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
      if (second == third) {
        break;
      }
      if (nums[second] + nums[third] == target) {
        ans.push([nums[first], nums[second], nums[third]]);
      }
    }
  }
  return ans;
};
