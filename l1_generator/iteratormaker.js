const IteratorMaker = (obj) => {
  function iteratorFunc () {
    var keys = Object.keys(obj)
    var index = -1;

    return {
      next() {
        index++;
        if(index < keys.length) {
          return {
            value: obj[keys[index] + ''],
            done: false
          }
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
  obj[Symbol.iterator] = iteratorFunc;
  return obj;
}

export default IteratorMaker;
