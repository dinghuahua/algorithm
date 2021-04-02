// 给你一个二进制字符串 s ，该字符串 不含前导零 。
// 如果 s 最多包含 一个由连续的 '1' 组成的字段 ，返回 true​​​ 。否则，返回 false 。
// "1" "10" "110" '1001' '111' "10110000" true
/**
 * 1784. 检查二进制字符串字段
 * @param {string} s
 * @return {boolean}
 */
var checkOnesSegment = function (s) {
    if (s.length === 1 && s === '1') return true
    let arr = s.match(/1+/g) ?? []
    return arr.length === 1
};

// 题解 
var checkOnesSegment = function (s) {
    let num = 0;
    for (let i = 0; i < s.length; i++) {
        if (num >= 1 && s[i] == '1' && s[i - 1] == '0') return false;
        if (s[i] === '1') {
            num++;
        }
    }
    return true;
};