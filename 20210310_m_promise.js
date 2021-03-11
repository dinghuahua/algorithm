class MyPromise {
  constructor(name) {
    // 姓名
    this.name = name
    // 等待队列
    this.queue = []
    // 打印 Hi
    this.sayHi()
  }

  /**
   * 创建回调方法
   * @param {*} isAsync  是否创建异步回调
   * @param {*} str      打印的文案
   * @param {*} delay    延迟时间
   */
  createCallBack(isAsync, str = '', delay = 0) {
    let fun
    if (isAsync) {
      fun = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            str && console.log(str)
            resolve()
          }, 1000 * delay)
        })
      }
    } else {
      fun = () => {
        str && console.log(str)
      }
    }

    return fun
  }
  /**
   * 接收回调方法
   * @param {*} callback 回调方法
   * @param {string} isTail  !0 尾部压入 !1头部压入
   * @returns
   */
  then(callback, isTail = !0) {
    isTail ? this.queue.push(callback) : this.queue.unshift(callback)
    return this
  }
  /**
   * 保存的回调依次调用
   */
  popQueue() {
    this.queue.reduce((pre, fn) => pre.then(fn), Promise.resolve())
  }

  /**
   * 压入队列
   * 把任务推入队列的动作可以和创建回调函数的动作分开
   * @param {*} str        打印的文案
   * @param {*} isAsync    是否创建异步回调
   * @param {*} delay      异步回调延迟时间
   * @param {*} isTail     是否尾部进入队列
   */
  pushQueue(str = '', isAsync = !0, delay = 0, isTail = true) {
    return this.then(this.createCallBack(isAsync, str, delay), isTail)
  }
  sayHi() {
    return this.pushQueue(`Hi! This is ${this.name}`, !1)
  }
  sleep(delay = 0) {
    return this.pushQueue('', !0, delay)
  }
  sleepFirst(delay = 0) {
    return this.pushQueue(`Wake up after ${delay}`, !0, delay, !1)
  }
  eat(meals) {
    return this.pushQueue(`Eat ${meals}~`, !1)
  }
}
function CodingMain(name) {
  const _mp = new MyPromise(name)
  setTimeout(() => {
    _mp.popQueue()
  }, 0)
  return _mp
}

// let cm = CodingMain('Peter')
let cm = CodingMain('Peter').sleep(3).eat('dinner')
// let cm = CodingMain('Peter').eat('dinner').eat('supper')
// let cm = CodingMain('Peter').sleepFirst(5).eat('supper')
console.log('queue', cm.queue)
// cm.popQueue()
