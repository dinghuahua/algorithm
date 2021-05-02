/**
 * 923. 三数之和的多种可能
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var threeSumMultiError1 = function (arr, target) {
  // let map = new Map()
  // for(let i = 0;i<arr.length;i++){
  //     map.set(arr[i],(map.get(arr[i])|| 0)+1)
  // }
  //  nums = Array.from(map.keys()),
  let n = arr.length,
    ans = [];
  arr.sort((a, b) => a - b);

  for (let first = 0; first < n; ++first) {
    if (first > 0 && arr[first] == arr[first - 1]) {
      continue;
    }
    let third = n - 1;
    let t = target - arr[first];
    for (let second = first + 1; second < n; ++second) {
      // 需要和上一次枚举的数不相同
      if (second > first + 1 && arr[second] == arr[second - 1]) {
        continue;
      }

      while (second !== third) {
        if (arr[second] + arr[third] == t) {
          ans.push([arr[first], arr[second], arr[third]]);
        }
      }
    }
  }
  console.log(ans);
  return ans.reduce(
    (a, b) => a + map.get(b[0]) * map.get(b[1]) * map.get(b[2]),
    0
  );
};

// 堆溢出
var threeSumMultiError2 = function (arr, target) {
  let ans = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] === target) {
          ans.push([arr[i], arr[j], arr[k]]);
        }
      }
    }
  }
  return ans.length;
};
//
var threeSumMulti = function (nums, target) {
  let c = 0;
  const mod = Math.pow(10, 9) + 7;
  const map = new Map();
  for (const n of nums) {
    map.set(n, (map.get(n) || 0) + 1);
  }
  const keys = [...map.keys()];
  const length = keys.length;
  keys.sort((a, b) => a - b);
  // 枚举 a
  for (let i = 0; i < length; ++i) {
    const ni = map.get(keys[i]);
    if (3 * keys[i] === target) {
      // n个球取3个的可能  不考虑顺序 Cn3 = An3 / A33
      c = (c + (ni * (ni - 1) * (ni - 2)) / 6) % mod;
    } else {
      // 取两个数
      c =
        (c + ((ni * (ni - 1)) / 2) * (map.get(target - 2 * keys[i]) || 0)) %
        mod;
    }
    //三数之和的遍历
    let j = i + 1;
    let k = length - 1;
    if (j >= k) continue;
    do {
      const sum = keys[i] + keys[j] + keys[k];

      if (target === sum) {
        c = (c + map.get(keys[i]) * map.get(keys[j]) * map.get(keys[k])) % mod;
      }
      if (sum > target) {
        k--;
      } else {
        j++;
      }
    } while (k > j);
  }
  return c;
};
const a = [1, 1, 2, 2, 2, 2],
  b = 5;
console.log(threeSumMulti(a, b));
