/**
 * 5730. 将所有数字用字符替换
 * @param {string} s
 * @return {string}
 */
var replaceDigits = function (s) {
  const shift = (c, x) => {
    return String.fromCharCode(c.charCodeAt() + x)
  }
  s = s.split('')
  for (i = 1; i < s.length; i += 2) {
    s[i] = shift(s[i - 1], +s[i])
  }
  return s.join('')
}

/**
 * 5731. 座位预约管理系统
 * @param {number} n
 */
// 不知道这道题在考什么
var SeatManager = function (n) {
  this.seats = new Array(n).fill(true)
}

/**
 * @return {number}
 */
SeatManager.prototype.reserve = function () {
  let seats = this.seats,
    len = seats.length

  for (let i = 0; i < len; i++) {
    if (seats[i]) {
      this.seats[i] = false
      return i + 1
    }
  }
}

/**
 * @param {number} seatNumber
 * @return {void}
 */
SeatManager.prototype.unreserve = function (seatNumber) {
  this.seats[seatNumber - 1] = true
}

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
  let max = 1,
    len = arr.length
  arr.sort((a, b) => a - b)
  arr[0] = 1
  for (let i = 1; i < len; i++) {
    if (Math.abs(arr[i] - arr[i - 1]) > 1) {
      arr[i] = arr[i - 1] + 1
    }
    max = Math.max(max, arr[i])
  }
  return max
}
