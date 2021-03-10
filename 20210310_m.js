class MyPromise {
  constructor(name) {
    // 姓名
    this.name = name
    // 等待队列
    this.queue = []
    this.sleepFirst(0, !1, true)
  }
  /**
   *
   * @param {*} callback 回调方法
   * @param {string} isTail  !0 尾部压入 !1头部压入
   * @returns
   */
  then(callback, isTail = !0) {
    if (isTail) this.queue.push(callback)
    else this.queue.unshift(callback)
    return this
  }
  popQueue() {
    debugger
    this.queue.reduce((pre, fn) => {
      return pre.then(fn)
    }, Promise.resolve())
  }
  sleepFirst(delay, isNoInit = true) {
    return this.sleep(delay, isNoInit, !0)
  }
  sleep(delay, isNoInit = true) {
    return this.then(() => {
      new Promise((resolve) => {
        setTimeout(() => {
          if (isNoInit) {
            console.log(`Wake up after ${delay}`)
          }
          resolve()
        }, 1000 * delay)
      })
    })
  }
  eat(meals) {
    return this.then(() => {
      new Promise((resolve) => {
        console.log(`Eat ${meals}~`)
        resolve()
      })
    })
  }
}
function CodingMain(name) {
  const _mp = new MyPromise(name)
  //   setTimeout(() => {
  //     console.log('====')
  //     cm.popQueue()
  //   }, 0)
  return _mp
}

// cm = CodingMain('Peter')
// cm = CodingMain('Peter').sleep(3).eat('dinner')
// cm = CodingMain('Peter').eat('dinner').eat('supper')
cm = CodingMain('Peter').sleepFirst(5).eat('supper')
console.log('cm', cm.queue)
cm.popQueue()
