/**
 * 1784. 检查二进制字符串字段
 * @param {string} s
 * @return {boolean}
 */
var checkOnesSegment = function (s) {
    return s.match(/11+/g)?.length ?? [] === 1
};