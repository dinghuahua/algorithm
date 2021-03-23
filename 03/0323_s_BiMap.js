const keyMap = Symbol('key');
const valueMap = Symbol('value');
const inverseMap = Symbol('inverseMap');

class BiMap extends Map {
  constructor(arg) {
    super()
    this.map = new Map()
    this.allOnly(arg)
  }
  setOneOnly(key, value) {
    const isHasKey = this[keyMap].has(key),
      isHasValue = this[valueMap].has(value)
    if (!isHasKey && !isHasValue) {
      this.map.set(key, value)
      this[keyMap].set(key, 1)
      this[valueMap].set(value, 1)
    } else {
      throw new Error('存在重复的key/value')
    }
  }
  allOnly(arg) {
    for (var i = 0; i < arg.length; i++) {
      const [key, value] = arg[i]
      this.setOneOnly(key, value)
    }
  }
  [keyMap] = new Map();
  [valueMap] = new Map();
  [inverseMap] = new Map();
  set(key, value) {
    this.setOneOnly(key, value)
  }
  get(key, isInVerse = false) {
    console.log('dsd')
    let _value = ''
    if (isInVerse) {
      if (!this[inverseMap].size) {
        this.inverse()
      }
      _value = this[inverseMap].get(key)
    } else {
      _value = this.map.get(key)
    }
    return _value
  }
  forceSet(key, value) { }
  inverse() {
    for (let [key, value] of this.map) {
      this[inverseMap].set(value, key)
    }
    return this[inverseMap]
  }
}
const biMap = new BiMap([[1, 2], [2, 3]])
// console.log(biMap.map, biMap.get(2))
// console.log(biMap.set(5, 6), biMap.map)
// console.log(biMap.get(3, !0))
console.log(biMap.inverse().get(3))
