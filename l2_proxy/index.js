var obj = {a: 1, b: 2, c: {d: 2}};

var proxyObj = new Proxy(obj, {
  get:function(obj, prop) {
    debugger;
    if (prop in obj) {
      return obj[prop]
    } else {
      return undefined;
    }
  },
  set: function(obj, prop, value) {
    obj[prop] = value;
  }
})

var obj = {}
debugger;
Object.defineProperty(obj,  'name', {
  get(obj) {
    return "hello"
  },
  set(value) {
    obj['name'] = value;
  }

});

console.log(obj['name']);
