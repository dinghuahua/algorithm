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
    ans = []
  arr.sort((a, b) => a - b)

  for (let first = 0; first < n; ++first) {
    if (first > 0 && arr[first] == arr[first - 1]) {
      continue
    }
    let third = n - 1
    let t = target - arr[first]
    for (let second = first + 1; second < n; ++second) {
      // 需要和上一次枚举的数不相同
      if (second > first + 1 && arr[second] == arr[second - 1]) {
        continue
      }

      while (second !== third) {
        if (arr[second] + arr[third] == t) {
          ans.push([arr[first], arr[second], arr[third]])
        }
      }
    }
  }
  console.log(ans)
  return ans.reduce(
    (a, b) => a + map.get(b[0]) * map.get(b[1]) * map.get(b[2]),
    0
  )
}

// 堆溢出
var threeSumMultiError2 = function (arr, target) {
  let ans = []

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] === target) {
          ans.push([arr[i], arr[j], arr[k]])
        }
      }
    }
  }
  return ans.length
}
// 超时
var threeSumMulti = function (arr, target) {
  let num = 0,
    mod = Math.pow(10, 9) + 7

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] === target) {
          num = (num + 1) % mod
        }
      }
    }
  }
  return num
}

// 题解
var threeSumMulti = function (arr, target) {
  let mod = Math.pow(10, 9) + 7,
    ans = 0
  arr.sort((a, b) => a - b)

  for (let i = 0; i < arr.length; ++i) {
    // We'll try to find the number of i < j < k
    // with arr[j] + arr[k] == T, where T = target - arr[i].

    // The below is a "two sum with multiplicity".
    let T = target - arr[i]
    let j = i + 1,
      k = arr.length - 1

    while (j < k) {
      // These steps proceed as in a typical two-sum.
      if (arr[j] + arr[k] < T) j++
      else if (arr[j] + arr[k] > T) k--
      else if (arr[j] != arr[k]) {
        // We have arr[j] + arr[k] == T.
        // Let's count "left": the number of arr[j] == arr[j+1] == arr[j+2] == ...
        // And similarly for "right".
        let left = 1,
          right = 1
        while (j + 1 < k && arr[j] == arr[j + 1]) {
          left++
          j++
        }
        while (k - 1 > j && arr[k] == arr[k - 1]) {
          right++
          k--
        }

        ans += left * right
        ans %= mod
        j++
        k--
      } else {
        // M = k - j + 1
        // We contributed M * (M-1) / 2 pairs.
        // 5 = 4+3+2+1 = (5*4)/2 = 10
        ans += ((k - j + 1) * (k - j)) / 2
        ans %= mod
        break
      }
    }
  }

  return ans
}
