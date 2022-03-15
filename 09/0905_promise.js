class Promise {
  // 定义Promise状态变量，初始值为pending
  status = 'pending';
  // 因为在then方法中需要处理Promise成功或失败时的值，所以需要一个全局变量存储这个值
  data = '';
  // Promise resolve时的回调函数集
  onResolvedCallback = [];
  // Promise reject时的回调函数集
  onRejectedCallback = [];

  // Promise构造函数，传入参数为一个可执行的函数
  constructor(executor) {
    // resolve函数负责把状态转换为resolved
    function resolve(value) {
      this.status = 'resolved';
      this.data = value;
      for (const func of this.onResolvedCallback) {
        func(this.data);
      }
    }
    // reject函数负责把状态转换为rejected
    function reject(reason) {
      this.status = 'rejected';
      this.data = reason;
      for (const func of this.onRejectedCallback) {
        func(this.data);
      }
    }

    // 直接执行executor函数，参数为处理函数resolve, reject。因为executor执行过程有可能会出错，错误情况需要执行reject
    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e)
    }
  }
  /**
    * 拥有一个then方法
    * then方法提供：状态为resolved时的回调函数onResolved，状态为rejected时的回调函数onRejected
    * 返回一个新的Promise
  */
  then(onResolved, onRejected) {

    // 设置then的默认参数，默认参数实现Promise的值的穿透
    onResolved = typeof onResolved === 'function' ? onResolved : function(e) { return e };
    onRejected = typeof onRejected === 'function' ? onRejected : function(e) { throw e };

    let promise2;

    promise2 =  new Promise((resolve, reject) => {
      // 如果状态为resolved，则执行onResolved
      if (this.status === 'resolved') {
        setTimeout(() => {
          try {
            // onResolved/onRejected有返回值则把返回值定义为x
            const x = onResolved(this.data);
            // 执行[[Resolve]](promise2, x)
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 如果状态为rejected，则执行onRejected
      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.data);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 如果状态为pending，则把处理函数进行存储
      if (this.status = 'pending') {
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onResolved(this.data);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.data);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }

    });

    return promise2;
  }

  // [[Resolve]](promise2, x)函数
  resolvePromise(promise2, x, resolve, reject) {
    let called = false;

    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise!'))
    }
    
    // 如果x仍然为Promise的情况
    if (x instanceof Promise) {
      // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值，所以需要继续调用resolvePromise
      if (x.status === 'pending') {
        x.then(function(value) {
          resolvePromise(promise2, value, resolve, reject)
        }, reject)
      } else { 
        // 如果x状态已经确定了，直接取它的状态
        x.then(resolve, reject)
      }
      return
    }
  
    if (x !== null && (Object.prototype.toString(x) === '[object Object]' || Object.prototype.toString(x) === '[object Function]')) {
      try {
        // 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用，所以通过变量called进行控制
        const then = x.then 
        // then是函数，那就说明x是thenable，继续执行resolvePromise函数，直到x为普通值
        if (typeof then === 'function') { 
          then.call(x, (y) => { 
            if (called) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, (r) => {
            if (called) return;
            called = true;
            reject(r);
          })
        } else { // 如果then不是函数，那就说明x不是thenable，直接resolve x
          if (called) return ;
          called = true;
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  }
  
}