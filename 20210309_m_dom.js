// [1, 2, 2, 3, 2, 1]有以上数组输出字符串(不考虑缩进):
// 尽量不用到 domApi
; <ul>
    <li deep="1">
        <ul>
            <li deep="2"></li>
            <li deep="2">
                <ul>
                    <li deep="3"></li>
                </ul>
            </li>
            <li deep="2"></li>
        </ul>
    </li>
    <li deep="1"></li>
</ul>

    ; <ul>
        <li deep="1">
            <ul>
                <li deep="2"></li>
                <li deep="2">
                    <ul>
                        <li deep="3">
                            <ul>
                                <ul>
                                    <li deep="5"></li>
                                </ul>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li deep="2"></li>
            </ul>
        </li>
        <li deep="1"></li>
    </ul>

/**
 * 只可以解决相邻的数字
 * @param {*} arr 
 */
function getDomByArr(arr = [1, 2, 2, 3, 2, 1]) {
    let prefixArr = [];
    let suffixStack = [];
    function pushLiDom(deep) {
        prefixArr.push(`<li deep="${deep}">`);
        suffixStack.push("</li>");
    }
    function pushUlDom() {
        prefixArr.push(`<ul>`);
        suffixStack.push("</ul>");
    }
    // 没有考虑0
    arr.reduce((pre, item) => {
        if (item < pre) {
            // li 出栈
            prefixArr.push(suffixStack.pop());
            // ul 出栈
            prefixArr.push(suffixStack.pop());
            // li 出栈
            prefixArr.push(suffixStack.pop());
            pushLiDom(item);
        } else if (item == pre) {
            // li 出栈
            prefixArr.push(suffixStack.pop());
            pushLiDom(item);
        } else {
            pushUlDom();
            pushLiDom(item);
        }
        return item;
    }, 0);
    let dom = prefixArr.concat(suffixStack.reverse()).join("");
    console.log(dom);
}

/**
 * 部分情况不可以兼容 3 5 2 ; 2 2 2 5 4 1
 * @param {*} arr 
 */
function getDomByArr2(arr = [1, 2, 2, 3, 2, 1]) {
    let deep = []
    let prefixArr = []
    let suffixStack = []

    function pushLiDom(deep) {
        prefixArr.push(`<li deep="${deep}">`)
        suffixStack.push('</li>')
    }
    function pushUlDom() {
        prefixArr.push(`<ul>`)
        suffixStack.push('</ul>')
    }
    // 没有考虑0
    arr.reduce((pre, item, index) => {
        deep.push(pre)
        if (item < pre) {
            prefixArr = prefixArr.concat(tempSuffixStack.pop())
            deep.pop()
            while (item < deep[deep.length - 1]) {
                prefixArr = prefixArr.concat(suffixStack.pop().reverse())
                deep.pop()
            }

            if (item == deep[deep.length - 1]) {
                deep.pop()
                prefixArr = prefixArr.concat(suffixStack.pop().reverse())
                tempSuffixStack = []
                pushLiDom(item)
            } else if (item > deep[deep.length - 1]) {
                for (var i = 0; i < item - deep[deep.length - 1]; i++) {
                    prefixArr = prefixArr.concat(suffixStack.pop().reverse())
                }
                tempSuffixStack = []
                pushLiDom(item)
            }
        } else if (item == pre) {
            deep.pop()
            prefixArr = prefixArr.concat(tempSuffixStack.pop())
            tempSuffixStack = []
            pushLiDom(item)
        } else {
            for (var i = 0; i < item - pre; i++) {
                pushUlDom()
                suffixStack.push(tempSuffixStack)
                tempSuffixStack = []
            }
            pushLiDom(item)
        }
        return item
    }, 0)

    let dom = prefixArr
        .concat(tempSuffixStack.pop(), suffixStack.reverse())
        .join('\r\n')
    console.log(dom)
}

function getDomByArr3(arr = [1, 2, 2, 3, 2, 1]) {
    let deep = [0]
    let prefixArr = []
    let suffixStack = []

    function pushLiDom(deep) {
        prefixArr.push(`<li deep="${deep}">`)
        suffixStack.push('</li>')
    }
    function pushUlDom() {
        prefixArr.push(`<ul>`)
        suffixStack.push('</ul>')
    }
    // 没有考虑0
    for (const n of arr) {
        
        if (item < pre) {

        } else if (item == pre) {

        } else {

        }
        return item
    }

    let dom = prefixArr
        .concat(tempSuffixStack.pop(), suffixStack.reverse())
        .join('\r\n')
    console.log(dom)
}

/**
 * 栈 各种情况都可以兼容
 * @param {*} arr
 */
const getDomByArr4 = (arr) => {
    const stack = [0];
    arr.push(0);
    const l = arr.length;
    const suffix = [];
    const createUl = (n, deep, flag, url = "") => {
        let res = "";
        for (let c = 0; c < n; c++) {
            const s = `\n${" ".repeat(deep + Math.abs(flag) * c)}<${url}ul>`;
            if (flag > 0) {
                res += s;
            } else {
                suffix.unshift(s);
            }
        }
        return res;
    };
    const createLiStart = (deep) => {
        return `\n${" ".repeat(deep)}<li deep="${deep}">`;
    };
    const createLiEnd = (deep) => {
        suffix.unshift(`\n${" ".repeat(deep)}</li>`);
    };
    let res = "";
    for (const n of arr) {
        const pre = stack[stack.length - 1];
        //相等，先闭合前一个标签
        //然后添加当前标签
        if (pre === n) {
            if (!n) break;
            res += suffix.shift();
            res += createLiStart(n);
            createLiEnd(n);
        } else if (pre < n) {
            //大于前一个数字时，创建对应层级的ul标签
            //添加当前标签
            res += createUl(n - pre, pre, 1);
            res += createUl(n - pre, pre, -1, "/");
            res += createLiStart(n);
            createLiEnd(n);
        } else {
            //小于前一个数字
            //先闭合前一个li
            //然后闭合之前的ul
            while (stack[stack.length - 1] >= n) {
                const last = stack.pop();
                if (last) {
                    // console.log(n, last, suffix[0], stack);
                    res += suffix.shift();
                }
                //闭合ul标签
                if (last !== n) {
                    let dis = Math.min(last - stack[stack.length - 1], last - n);

                    while (dis--) {
                        res += suffix.shift();
                    }
                }
            }
            //添加当前的标签
            if (n) {
                res += createLiStart(n);
                createLiEnd(n);
            }
        }
        if (n !== stack[stack.length - 1]) {
            stack.push(n);
            console.log('stack', stack)
        }
    }
    res += suffix.join("");
    console.log(res)
    return res;
};
// getDomByArr([1, 2, 2, 3, 4, 5, 4, 3, 2, 2, 1])
// getDomByArr([1, 2, 2, 3, 5, 4, 2, 1])
// getDomByArr([1, 2, 2, 3, 5, 4, 3, 2, 1])
// getDomByArr([1, 2, 2, 3, 5, 2, 1])
getDomByArr([1, 2, 2, 3, 2, 5, 2, 1])
// getDomByArr([2, 2, 3, 5, 4, 2, 1])
// getDomByArr([1, 2, 2, 3, 5, 2, 1]);
// getDomByArr();
// getDomByArr([1, 2, 2, 3, 4, 5, 4, 3, 2, 2, 1]);