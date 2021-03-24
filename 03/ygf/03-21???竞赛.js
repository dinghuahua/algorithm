/**
 * 5709. 最大升序子数组和
 * @param {number[]} nums
 * @return {number}
 */
var maxAscendingSum = function (nums) {
  let pre = -Infinity,
    max = 0,
    sum = 0;
  for (var i = 0; i < nums.length; i++) {
    const cur = nums[i];
    if (cur > pre) {
      sum += cur;
    } else {
      sum = cur;
    }
    max = Math.max(sum, max);
    pre = cur;
  }
  return max;
};

// 输入：orders = [[10,5,0],[15,2,1],[25,1,1],[30,4,0]]
// 输出：6
// 解释：输入订单后会发生下述情况：
// - 提交 5 笔采购订单，价格为 10 。没有销售订单，所以这 5 笔订单添加到积压订单中。
// - 提交 2 笔销售订单，价格为 15 。没有采购订单的价格大于或等于 15 ，所以这 2 笔订单添加到积压订单中。
// - 提交 1 笔销售订单，价格为 25 。没有采购订单的价格大于或等于 25 ，所以这 1 笔订单添加到积压订单中。
// - 提交 4 笔采购订单，价格为 30 。前 2 笔采购订单与价格最低（价格为 15）的 2 笔销售订单匹配，从积压订单中删除这 2 笔销售订单。第 3 笔采购订单与价格最低的 1 笔销售订单匹配，销售订单价格为 25 ，从积压订单中删除这 1 笔销售订单。积压订单中不存在更多销售订单，所以第 4 笔采购订单需要添加到积压订单中。
// 最终，积压订单中有 5 笔价格为 10 的采购订单，和 1 笔价格为 30 的采购订单。所以积压订单中的订单总数为 6 。

/**
 * 5710. 积压订单中的订单总数
 * @param {number[][]} orders
 * @return {number}
 */
var getNumberOfBacklogOrders = function (orders) {
  var buyArr = [],
    sellArr = [];

  for (var i = 0; i < orders.length; i++) {
    const cur = orders[i];
    let amount = orders[i][1];
    var j = 0;
    if (cur[2]) {
      // sell
      while (amount && j < buyArr.length) {
        const buy = buyArr[j];
        if (buy[0] >= cur[0]) {
          if (buy[1] > amount) {
            buyArr[j][1] = buy[1] - amount;
            amount = 0;
          } else {
            amount = amount - buy[1];
            buyArr[j][1] = 0;
          }
          if (amount <= 0) {
            break;
          }
        }
        j++;
      }
      if (amount) {
        let arr = [...orders[i]];
        arr[1] = amount;
        sellArr.push(arr);
        sellArr.sort(
          ([pricei, amounti, orderTypei], [pricej, amountj, orderTypej]) => {
            return pricei - pricej;
          }
        );
        // console.log(sellArr)
      }
    } else {
      // buy
      while (amount && j < sellArr.length) {
        const sell = sellArr[j];
        if (cur[0] >= sell[0]) {
          if (sell[1] > amount) {
            sellArr[j][1] = sell[1] - amount;
            amount = 0;
          } else {
            amount = amount - sell[1];
            sellArr[j][1] = 0;
          }
          if (amount <= 0) {
            break;
          }
        }
        j++;
      }
      if (amount) {
        let arr = [...orders[i]];
        arr[1] = amount;
        buyArr.push(arr);
        buyArr.sort(
          ([pricei, amounti, orderTypei], [pricej, amountj, orderTypej]) => {
            return pricej - pricei;
          }
        );
        // console.log(buyArr)
      }
    }
  }
  // console.log(buyArr, sellArr)
  return (
    (buyArr.reduce((pre, item) => pre + item[1], 0) +
      sellArr.reduce((pre, item) => pre + item[1], 0)) %
    (Math.pow(10, 9) + 7)
  );
};

var getNumberOfBacklogOrders1 = function (orders) {
  var buyArr = [],
    sellArr = [];

  for (var i = 0; i < orders.length; i++) {
    const cur = orders[i];
    let price = cur[0],
      amount = cur[1],
      orderType = cur[2];

    if (orderType) {
      // sell
      while (amount && buyArr.length) {
        const buy = buyArr[0];
        let buyPrice = buy[0],
          buyAmount = buy[1];
        if (buyPrice >= price) {
          if (buyAmount > amount) {
            buy[1] = buyAmount - amount;
            amount = 0;
          } else {
            amount = amount - buyAmount;
            // buy[1] = 0
            buyArr.shift();
          }
          if (amount <= 0) {
            break;
          }
        }
        j++;
      }
      if (amount) {
        for (var k = 0; k < sellArr.length; k++) {
          let _cur = sellArr[k],
            _price = _cur[0];
          if (_price >= price) {
            break;
          }
        }
        // 升序
        sellArr.splice(k, 0, [price, amount, orderType]);
      }
      // buyArr = buyArr.filter((item) => item[1]);
    } else {
      // buy
      while (amount && j < sellArr.length) {
        const sell = sellArr[j];
        let sellPrice = sell[0],
          sellAmount = sell[1];

        if (price >= sellPrice) {
          if (sellAmount > amount) {
            sell[1] = sellAmount - amount;
            amount = 0;
          } else {
            amount = amount - sellAmount;
            sell[1] = 0;
          }
          if (amount <= 0) {
            break;
          }
        }
        j++;
      }
      if (amount) {
        for (var k = 0; k < buyArr.length; k++) {
          let _price = buyArr[k][0];
          if (_price <= price) {
            break;
          }
        }
        // 降序
        buyArr.splice(k, 0, [price, amount, orderType]);
      }
      sellArr = sellArr.filter((item) => item[1]);
    }
  }
  console.log(buyArr, sellArr);
  let sum =
    (buyArr.reduce((pre, item) => pre + item[1], 0) +
      sellArr.reduce((pre, item) => pre + item[1], 0)) %
    (Math.pow(10, 9) + 7);
  console.log(sum);
  return sum;
};

getNumberOfBacklogOrders1([
  [10, 5, 0],
  [15, 2, 1],
  [25, 1, 1],
  [30, 4, 0],
]);

/**
 * 5711. 有界数组中指定下标处的最大值
 * @param {number} n
 * @param {number} index
 * @param {number} maxSum
 * @return {number}
 */
var maxValue = function (n, index, maxSum) {};
// var getNumberOfBacklogOrders = function (orders) {
//   const list0 = [];
//   const list1 = [];
//   for (const item of orders) {
//     if (item[2] === 0) {
//       //   if (!list1.length) {
//       //     list0.push(item);
//       //     continue;
//       //   }
//       while (list1.length && item[1] && list1[0][0] <= item[0]) {
//         if (list1[0][1] <= item[1]) {
//           item[1] -= list1[0][1];
//           list1.shift();
//         } else {
//           list1[0][1] -= item[1];
//           item[1] = 0;
//         }
//       }
//       if (item[1] > 0) {
//         const index = list0.findIndex((i) => i[0] >= item[0]);
//         if (index < 0) {
//           list0.push(item);
//         } else {
//           list0.splice(index, 0, item);
//         }
//       }
//     } else {
//       while (list0.length && item[1] && list0[list0.length - 1][0] >= item[0]) {
//         if (list0[list0.length - 1][1] <= item[1]) {
//           item[1] -= list0[list0.length - 1][1];
//           list0.pop();
//         } else {
//           list0[list0.length - 1][1] -= item[1];
//           item[1] = 0;
//         }
//       }
//       if (item[1] > 0) {
//         const index = list1.findIndex((i) => i[0] >= item[0]);
//         if (index < 0) {
//           list1.push(item);
//         } else {
//           list1.splice(index, 0, item);
//         }
//       }
//     }
//   }
//   const mod = Math.pow(10, 9) + 7;
//   return [...list0, ...list1].reduce((pre, item) => {
//     return (pre + item[1]) % mod;
//   }, 0); n 1- maxSum)*n -n
// };  n-1   n-1 n-2     index =2
//      1 ...n-2 n-1 3 4 5  l-1
var maxValue = function (n, index, maxSum) {
  const realV = maxSum;
  // 因为后续计算是从0开始，所以先减去n
  maxSum -= n;
  //两个等差数列求和
  const getSum = (max) => {
    //left 是左侧数列和
    //right 是右侧数列和 从0-max的和
    const left = Math.min(index + 1, max);
    const right = Math.min(n - 1 - index, max);
    return (
      (left * (2 * max - left + 1)) / 2 +
      (right * (2 * max - 2 - right + 1)) / 2
    );
  };
  //二分法求得
  let left = 0;
  let right = realV;
  while (right > left) {
    if (right - left === 1) break;
    const mid = ~~((left + right) / 2);
    if (mid === left) break;
    const v = getSum(mid);
    if (v === maxSum) return mid + 1;
    if (v > maxSum) {
      right = mid;
    } else {
      left = mid;
    }
  }
  //前面每个位置减了1，这里加上
  if (getSum(right) <= maxSum) return right + 1;
  return left + 1;
};
