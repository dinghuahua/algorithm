/**
 * 5730. 将所有数字用字符替换
 * @param {string} s
 * @return {string}
 */
var replaceDigits = function (s) {
  const shift = (c, x) => {
    return String.fromCharCode(c.charCodeAt() + x);
  };
  s = s.split("");
  for (i = 1; i < s.length; i += 2) {
    s[i] = shift(s[i - 1], +s[i]);
  }
  return s.join("");
};

/**
 * 5731. 座位预约管理系统
 * @param {number} n
 */
// 不知道这道题在考什么
// var SeatManager = function (n) {
//   // this.seats = new Array(n).fill(true)

// }

// /**
//  * @return {number}
//  */
// SeatManager.prototype.reserve = function () {
//   let seats = this.seats,
//     len = seats.length

//   for (let i = 0; i < len; i++) {
//     if (seats[i]) {
//       this.seats[i] = false
//       return i + 1
//     }
//   }
// }

// /**
//  * @param {number} seatNumber
//  * @return {void}
//  */
// SeatManager.prototype.unreserve = function (seatNumber) {
//   this.seats[seatNumber - 1] = true
// }
var SeatManager = function (n) {
  this.list = new Array(n);
  for (let i = 1; i <= n; i++) {
    this.list[i - 1] = i;
  }
};

/**
 * @return {number}
 */
SeatManager.prototype.reserve = function () {
  return this.list.shift();
};

/**
 * @param {number} seatNumber
 * @return {void}
 */

SeatManager.prototype.unreserve = function (seatNumber) {
  // log(n)
  let left = 0;
  let right = this.list.length - 1;
  if (seatNumber < this.list[left]) {
    this.list.unshift(seatNumber);
    return;
  } else if (seatNumber > this.list[right]) {
    this.list.push(seatNumber);
    return;
  }
  //二分法找到新元素的下标然后插入
  while (right >= left) {
    if (left === right) {
      break;
    }
    const mid = ~~((left + right) / 2);
    if (mid === left) break;
    if (this.list[mid] > seatNumber) {
      right = mid;
    } else {
      left = mid;
    }
  }
  this.list.splice(right, 0, seatNumber);
};
/**
 * Your SeatManager object will be instantiated and called as such:
 * var obj = new SeatManager(n)
 * var param_1 = obj.reserve()
 * obj.unreserve(seatNumber)
 */

/**
 * 5732. 减小和重新排列数组后的最大元素
 * @param {number[]} arr
 * @return {number}
 */
var maximumElementAfterDecrementingAndRearranging = function (arr) {
  let len = arr.length;
  arr.sort((a, b) => a - b);
  arr[0] = 1;
  for (let i = 1; i < len; i++) {
    if (Math.abs(arr[i] - arr[i - 1]) > 1) {
      arr[i] = arr[i - 1] + 1;
    }
    // max = Math.max(max, arr[i]);
  }
  return arr[len - 1];
};

/**
 * 5733. 最近的房间
 * @param {number[][]} rooms
 * @param {number[][]} queries
 * @return {number[]}
 */
function middle(arr, n) {
  let left = 0;
  let right = arr.length - 1;
  if (arr[left] >= n) return arr[left];
  if (arr[right] <= n) return arr[right];
  while (right >= left) {
    if (left === right) break;
    const mid = ~~((left + right) / 2);
    if (mid === left) break;
    if (arr[mid] === n) return n;
    if (arr[mid] > n) {
      right = mid;
    } else {
      left = mid;
    }
  }
  if (Math.abs(arr[right] - n) < Math.abs(arr[left] - n)) {
    return arr[right];
  } else {
    return arr[left];
  }
}
function insert(arr, n) {
  if (!arr.length) {
    arr.push(n);
  } else {
    let left = 0;
    let right = arr.length - 1;
    if (arr[left] > n) {
      arr.unshift(n);
      return;
    } else if (arr[right] < n) {
      arr.push(n);
      return;
    }
    while (right >= left) {
      if (left === right) break;
      const mid = ~~((left + right) / 2);
      if (left === mid) break;
      if (arr[mid] > n) {
        right = mid;
      } else {
        left = mid;
      }
    }
    arr.splice(right, 0, n);
  }
}
var closestRoom = function (rooms, queries) {
  const k = queries.length;
  const res = new Array(k);
  queries = queries.map((item, i) => [item[0], item[1], i]);
  queries.sort((a, b) => b[1] - a[1]);
  rooms.sort((a, b) => {
    return b[1] - a[1];
  });
  const ids = [];
  for (let i = 0; i < k; i++) {
    const [id, s, index] = queries[i];
    //把面积满足条件的房间id放入数组
    while (rooms.length && rooms[0][1] >= s) {
      const newId = rooms.shift()[0];
      insert(ids, newId);
    }
    if (!ids.length) {
      res[index] = -1;
      continue;
    } else {
      res[index] = middle(ids, id);
    }
  }
  return res;
};
