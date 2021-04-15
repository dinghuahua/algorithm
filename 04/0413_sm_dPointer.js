/**
 * 283. 移动零
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (!nums[i]) nums.push(nums.splice(i, 1))
  }
}
var moveZeroes2 = function (nums) {
  let index = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      nums[index++] = nums[i]
    }
  }
  for (let i = index; i < nums.length; i++) {
    nums[i] = 0
  }
}
var moveZeroes3 = function (nums) {
  let index = -1
  for (let i = 0; i < nums.length; i++) {
    if (!nums[i]) {
      index = i

    }
  }
}

/**
 * 344. 反转字符串
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  for (let i = 0, j = s.length - 1; i <= j; i++, j--) {
    ;[s[i], s[j]] = [s[j], s[i]]
  }
}

/**
 * 345. 反转字符串中的元音字母
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  // TODO:
  //  let res = ''
  const arr = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
  for (let i = 0, j = s.length - 1; i <= j;) {
    if (arr.includes(s[i]) && arr.includes(s[j])) {
      if (s[i] !== s[j])
        s = s.slice(0, i) + s[j] + s.slice(i + 1, j) + s[i] + s.slice(j + 1)
      i++
      j--
    } else if (arr.includes(s[i])) {
      j--
    } else {
      i++
    }
  }
  return s
}

/**
 * 844. 比较含退格的字符串s
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  // TODO： stack 进出栈 保存的是字符
  const formatStr = (str) => {
    let num = 0
    for (let i = str.length - 1; i >= 0; i--) {
      if (str[i] === '#') {
        str = str.slice(0, i) + str.slice(i + 1)
        num++
      } else if (num) {
        str = str.slice(0, i) + str.slice(i + 1)
        num--
      }
    }
    return str
  }
  return formatStr(s) === formatStr(t)
}

/**
 * 977. 有序数组的平方
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  // TODO： 最大的值 只会出现在两端 0为分界线 左侧单调递减 右侧单调递增
  return nums.map((i) => i * i).sort((a, b) => a - b)
}

/**
 * 面试题 10.01. 合并排序的数组
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
var merge = function (A, m, B, n) {
  let i = m - 1,
    j = n - 1,
    tail = m + n - 1
  while (i >= 0 || j >= 0) {
    if (i === -1) {
      A[tail--] = B[j]
      j--
    } else if (j === -1) {
      A[tail--] = A[i]
      i--
    } else if (A[i] > B[j]) {
      A[tail--] = A[i]
      i--
    } else if (A[i] === B[j]) {
      A[tail--] = A[i]
      A[tail--] = B[j]
      i--
      j--
    } else {
      A[tail--] = B[j]
      j--
    }
    // console.log(i,j)
  }
}

/**
 * 18. 四数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  let set1 = new Set(),
    norepeatSet = new Set(),
    res = []

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
}
// 题解
var fourSum = function (nums, target) {
  const quadruplets = []
  if (nums.length < 4) {
    return quadruplets
  }
  nums.sort((x, y) => x - y)
  const length = nums.length
  for (let i = 0; i < length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break
    }
    if (
      nums[i] + nums[length - 3] + nums[length - 2] + nums[length - 1] <
      target
    ) {
      continue
    }
    for (let j = i + 1; j < length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue
      }
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
        break
      }
      if (nums[i] + nums[j] + nums[length - 2] + nums[length - 1] < target) {
        continue
      }
      let left = j + 1,
        right = length - 1

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right]
        if (sum === target) {
          quadruplets.push([nums[i], nums[j], nums[left], nums[right]])
          while (left < right && nums[left] === nums[left + 1]) {
            left++
          }
          left++
          while (left < right && nums[right] === nums[right - 1]) {
            right--
          }
          right--
        } else if (sum < target) {
          left++
        } else {
          right--
        }
      }
    }
  }
  return quadruplets
}
