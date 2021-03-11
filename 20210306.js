/**
 * 斐波那契数列 递归
 * @param {*} N 
 */
const getResByMap = (N) => {
  const map = new Map([[1, 1], [2, 1]])
  const dfs = (N) => {
    if (!map.has(N)) {
      const sum = dfs(N - 1) + dfs(N - 2);
      map.set(N, sum)
      return sum;
    }
    return map.get(N)
  }
  return dfs(N)
}

/**
 * 数组中累加和小于等于k的最长子数组
 * @param {*} arr 
 * @param {*} targetSum 
 */
function maxLength(
  arr = [1, 3, 5, 6, 7, 8, 12, 10, 2, 1, 2, 4],
  targetSum = 10
) {
  console.log(arr)
  let left = 0, right = 1,
    sum = arr[0],
    maxLen = 0
  // 0 -1
  if (sum < targetSum) maxLen = left + 1

  for (; right < arr.length;) {

    sum += arr[right]
    console.log('left=', left, 'right=', right, 'sum=', sum)
    if (sum < targetSum) {
      maxLen = Math.max(maxLen, (right - left + 1))
      right++
    } else {
      //   sum = sum - arr[left] + arr[right + 1] + +arr[right + 2]
      sum = sum - arr[left]
      ++left
      // 优化后移 窗口扩大1 right + maxLen - 1
      ++right
    }
  }
  return maxLen
}
console.log(maxLength())

/**
 * 有负数的情况下
 * @param {*} arr 
 * @param {*} target 
 */
const maxLength = (arr, target) => {
  const l = arr.length;
  //两个前缀和数组 自左向右和自右向左
  if (l === 1) return arr[0] < target ? 1 : 1;
  let sum = arr.reduce((a, b) => a + b, 0);
  let left = 0;
  let right = l - 1;
  while (right > left) {
    if (sum < target) {
      break;
    }
    if (arr[left] < arr[right]) {
      sum -= arr[right];
      right--;
    } else {
      sum -= arr[left];
      left++;
    }
  }

  return sum < target ? right - left + 1 : 0;
  //此时用双指针的方法，从边界向内收缩
};



const list = [1, 2, 3, 4, 5];
const delay = 1000;
const createFun = (item) => () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(item);
      resolve();
    }, delay);
  });
};

list.map(createFun).reduce((p, item) => p.then(item), Promise.resolve());


// 这种方式可以做类似校验的，把校验的方法一个个抽取，然后按顺序执行校验方法，
// 如果校验成功调用下一个，如果校验失败可以抛出异常原因，后续的就不会执行了