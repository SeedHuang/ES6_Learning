# Proxy [![Proxy](https://developer.mozilla.org/static/img/web-docs-sprite.22a6a085cf14.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

> Proxy和Object.defineProperty或者Object.defineProperies差不多，同样可以给一个对象添加一层代理的保护外衣，但是区别在于，Proxy监听对象整个一层的外部访问做监听，不需要给每个属性单独做一个代理

var obj = {}

Object.defineProperty({}, {
  a:{
    get:function() {
      return 1;
    },
    set:function(value) {
      obj["a"] = value
    }
  }
});
