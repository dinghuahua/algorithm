class MyPromise {
    constructor(name, fun) {
        // 姓名
        this.name = name;
        // 等待队列
        this.queue = [];
        this.sleepFirst(0, !1)
    }
    then(callback) {
        this.queue.push(callback)
        return this
    }
    pop() {
        this.queue.forEach((fn) => {
            fn()
        })
    }
    sleepFirst(delay, isNoInit = true) {
        return this.then(async () => {
            await this.sleep(delay, isNoInit)
            console.log(`Hi! This is${this.name}`)
        })
    }
    sleep(delay, isNoInit = true) {
        return this.then(async () => {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000 * delay);
            });
            if (isNoInit) {
                console.log(`Wake up after ${delay}`)
            }
        })

    }
    eat(meals) {
        return this.then(() => {
            console.log(`Eat ${meals}~`)
        })
    }
}
function CodingMain(name) {
    return new MyPromise(name, (res) => res());
}

// console.log('======', CodingMain('Peter').sleep(3).eat('dinner'))
// CodingMain('Peter')
cm = CodingMain('Peter').sleep(3).eat('dinner')
// CodingMain('Peter').eat('dinner').eat('supper')
// CodingMain('Peter').sleepFirst(5).eat('supper')
console.log('cm', cm.queue)
cm.pop()