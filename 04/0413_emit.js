class EventEmitter {
  constructor() {
    this._events = {}
  }
  on(event, listener) {
    if (!this._events[event]) {
      this._events[event] = []
    }
    this._events[event].push(listener)
    return this
  }
  off(event, listener) {
    if (!listener) {
      return
    }

    let listenerArr = this._events[event]
    if (this._events[event]) {
      for (let i = listenerArr.length - 1; i >= 0; i--) {
        const item = listenerArr[i]
        if (listener === item) {
          listenerArr.splice(i, 1)
          break
        }
      }
    }
    return this
  }
  emit(event, ...args) {
    let listenerArr = [...this._events[event]]
    for (let listener of listenerArr) {
      listener(...args)
    }
    return this
  }
}

class A {
  constructor(num = 1) {
    console.log(`A${num}`)
  }
  fn1(num = 2) {
    console.log(`A${num}`)
  }
  fn2(num = 3) {
    console.log(`A${num}`)
  }
}
class B extends A {
  fn1(num = 4) {
    console.log(`B${num}`)
  }
  fn2() {
    super.fn2(5)
  }
}
const b = new B();// A1
b.fn1();// B4
b.fn2()// A3
