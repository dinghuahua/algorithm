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
};
var removeElement2 = function (nums, val) {
  let index = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) nums[index++] = nums[i]
  }
  return index
};

/**
 * 28. 实现 strStr()
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// "mississippi"
// "issip"
var strStr = function (haystack, needle) {
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
};
var strStr2 = function (haystack, needle) {
  if (!needle.length) return 0
  let j = 0, start = 0
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
};

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
};

var isPalindrome2 = function (s) {
  s = s.toLocaleLowerCase()
  s = s.replace(/[^a-z0-9]/g, '')
  if (!s.length) return true
  const fun = (start, end) => {
    if (start >= end) return true

    return s[start] === s[end] && fun(start + 1, end - 1)
  }
  return fun(0, s.length - 1)
};

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
};

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
};
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
};


/**
 * 15. 三数之和
 * @param {number[]} nums
 * @return {number[][]}
 */
// 超时
var threeSum = function (nums) {
  let map = new Map(), res = []

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

  return res.map(item => item.split(','))
};

var threeSumError = function (nums) {
  let map = new Map(), res = []

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

  return res.map(item => item.split(','))
};

// 题解