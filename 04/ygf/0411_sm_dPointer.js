/**
 * 26. 删除有序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let pre = Infinity;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === pre) nums.splice(i, 1);
    pre = nums[i];
  }
  return nums.length;
};
// 题解
var removeDuplicates2 = function (nums) {
  if (nums.length == 0) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] != nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
};

/**
 * 88. 合并两个有序数组
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m, ...nums2);
  nums1.sort((a, b) => a - b);
};
// 题解 双指针
var merge2 = function (nums1, m, nums2, n) {
  let p1 = 0,
    p2 = 0;
  const sorted = new Array(m + n).fill(0);
  var cur;
  while (p1 < m || p2 < n) {
    if (p1 === m) {
      cur = nums2[p2++];
    } else if (p2 === n) {
      cur = nums1[p1++];
    } else if (nums1[p1] < nums2[p2]) {
      cur = nums1[p1++];
    } else {
      cur = nums2[p2++];
    }
    sorted[p1 + p2 - 1] = cur;
  }
  for (let i = 0; i != m + n; ++i) {
    nums1[i] = sorted[i];
  }
};
// 逆向双指针
var merge3 = function (nums1, m, nums2, n) {
  let p1 = m - 1,
    p2 = n - 1;
  let tail = m + n - 1;
  var cur;
  while (p1 >= 0 || p2 >= 0) {
    if (p1 === -1) {
      cur = nums2[p2--];
    } else if (p2 === -1) {
      cur = nums1[p1--];
    } else if (nums1[p1] > nums2[p2]) {
      cur = nums1[p1--];
    } else {
      cur = nums2[p2--];
    }
    nums1[tail--] = cur;
  }
};

/**
 * 349. 两个数组的交集
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  let set1 = new Set(nums1),
    set2 = new Set(nums2);
  let intersect = Array.from(set2).filter((x) => set1.has(x));

  return intersect;
};
// 题解
var intersection2 = function (nums1, nums2) {
  nums1.sort((x, y) => x - y);
  nums2.sort((x, y) => x - y);
  const length1 = nums1.length,
    length2 = nums2.length;
  let index1 = 0,
    index2 = 0;
  const intersection = [];
  while (index1 < length1 && index2 < length2) {
    const num1 = nums1[index1],
      num2 = nums2[index2];
    if (num1 === num2) {
      // 保证加入元素的唯一性
      if (
        !intersection.length ||
        num1 !== intersection[intersection.length - 1]
      ) {
        intersection.push(num1);
      }
      index1++;
      index2++;
    } else if (num1 < num2) {
      index1++;
    } else {
      index2++;
    }
  }
  return intersection;
};

/**
 * 350. 两个数组的交集 II
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  let map1 = new Map(),
    res = [];
  for (let i = 0; i < nums1.length; i++) {
    map1.set(nums1[i], (map1.get(nums1[i]) || 0) + 1);
  }
  for (let i = 0; i < nums2.length; i++) {
    if (map1.get(nums2[i])) {
      res.push(nums2[i]);
      map1.set(nums2[i], map2.get(nums1[i]) - 1);
    }
  }
  // console.log(map1,res)

  return res;
};
//题解优化： 为了降低空间复杂度，首先遍历较短的数组并在哈希表中记录每个数字以及对应出现的次数，然后遍历较长的数组得到交集。
var intersect2 = function (nums1, nums2) {
  let map1 = new Map(),
    res = [];
  // 保证先遍历短的数组，降低空间复杂度
  if (nums1.length > nums2.length) return intersect(nums2, nums1);

  for (let i = 0; i < nums1.length; i++) {
    if (!map1.has(nums1[i])) map1.set(nums1[i], []);
    let arr = map1.get(nums1[i]);
    arr.push(i);
    map1.set(nums1[i], arr);
  }
  for (let i = 0; i < nums2.length; i++) {
    if (map1.get(nums2[i])) {
      res.push(nums2[i]);
      if (map1.get(nums2[i]).length === 1) {
        map1.delete(nums2[i]);
      } else {
        map1.get(nums2[i]).pop();
      }
    }
  }
  // console.log(map1,res)

  return res;
};
// 双指针
var intersect3 = function (nums1, nums2) {
  Arrays.sort(nums1);
  Arrays.sort(nums2);
  let length1 = nums1.length,
    length2 = nums2.length;
  let intersection = new Array(Math.min(length1, length2));
  let index1 = 0,
    index2 = 0,
    index = 0;
  while (index1 < length1 && index2 < length2) {
    if (nums1[index1] < nums2[index2]) {
      index1++;
    } else if (nums1[index1] > nums2[index2]) {
      index2++;
    } else {
      intersection[index] = nums1[index1];
      index1++;
      index2++;
      index++;
    }
  }
  return intersection.slice(0, index);
};

/**
 * 3. 无重复字符的最长子串
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let map = new Map(),
    max = 0,
    start = 0;

  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], i);
    else {
      max = Math.max(max, i - start);

      for (const [c, index] of map.entries()) {
        index < start && map.delete(c);
      }
      start = map.get(s[i]) + 1;
      map.set(s[i], i);
    }
  }

  return Math.max(max, map.size);
};
var lengthOfLongestSubstring2 = function (s) {
  let map = new Map(),
    max = 0;

  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], i);
    else {
      max = Math.max(max, map.size);
      for (const [c, index] of map.entries()) {
        index < map.get(s[i]) + 1 && map.delete(c);
      }
      map.set(s[i], i);
    }
  }

  return Math.max(max, map.size);
};
// 题解
var lengthOfLongestSubstring = function (s) {
  // 哈希集合，记录每个字符是否出现过
  const occ = new Set();
  const n = s.length;
  // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
  let rk = -1,
    ans = 0;
  for (let i = 0; i < n; ++i) {
    if (i != 0) {
      // 左指针向右移动一格，移除一个字符
      occ.delete(s.charAt(i - 1));
    }
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      // 不断地移动右指针
      occ.add(s.charAt(rk + 1));
      ++rk;
    }
    // 第 i 到 rk 个字符是一个极长的无重复字符子串
    ans = Math.max(ans, rk - i + 1);
  }
  return ans;
};
