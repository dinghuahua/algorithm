/**
 * 1004. 最大连续1的个数 III
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 如何优化，写的有点复杂
var longestOnes = function (nums, k) {
  if (nums.length <= 1) return k >= 0 ? 1 : nums[0];

  let left = 0,
    right = 0,
    num = 0,
    max = 0;

  for (; right < nums.length; ) {
    !nums[right] && ++num;

    if (num <= k) {
      max = Math.max(max, right - left + 1);
      right++;
    } else {
      max = Math.max(max, right - left);
      // console.log(left,right,max)
      !nums[left] && --num;
      left++;
      right++;
    }
  }
  return max;
};
//记录0的次数对应的下标
// [0,1,1,1,1,1] 0
//  Map  0:-1,1:0 ,2:6
var longestOnes = function (nums, k) {
  // 0-n n<l
  // map.get(k)-map.get(0)
  const map = new Map();
  map.set(0, -1);
  let c = 0;
  const l = nums.length;
  for (let i = 0; i < l; i++) {
    if (nums[i] === 0) {
      c++;
      map.set(c, i);
    }
  }
  c++;
  map.set(c, l);
  if (c <= k) return l;
  let max = 0;
  for (let i = 0; i < c; i++) {
    max = Math.max(max, (map.get(i + 1 + k) || 0) - map.get(i) - 1);
  }
  return max;
};
// 0:-1, 1:2, 2:4
// n ... n+k+1 k
// m - n 范围内有n-m-1个数 不考虑端点
const a = [0, 0, 1, 1, 0, 1, 1, 0],
  b = 1;
console.log(longestOnes(a, b));
