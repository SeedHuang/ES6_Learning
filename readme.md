# Generator

今天开始学Generator，Generator比较有用的一个东西，你会在很多地方用到它，像迭代器【Iterator】【迭代器的消费工具】for(... of ...)，异步请求之类的

Generator的语法

```
function * functionName () {
  yield somevalue
}
```
> ⏰小贴士 你如果想在实际环境下用到，得使用babel，babel只是用来转换语法的，像新的api如generator，fetch，则需要靠@babel/polyfill，将这些api进行转换成帮助函数，但是js中用到这些新api的地方也不是一次两次，会很大程度上增加了js的体积，并且这些帮助函数定义会污染全局变量，为了解决这个问题，就有了@babel/runtime,@babel/runtime把这些帮助函数封装在模块中，所以在任何地方使用到新api就是从引入这些帮助函数的引用，从而减小的js文件体积，也不会污染全局变量，但是babel-runtime只能支持到一些全局的静态语法，对于对象上面的方法和属性，依然只能通过babel-polyfill来解决

## 方法
### next
next方法是用来发触发yield后面部分的计算，
> ⚠️虽然yield本身不会返回任何值，但是通过给next的参数赋值来传给yield运算符之前的变量，一定要记住，除非触发第二次next，否则，yield之前和下一行的运算是不会被触发的

#### 普通示例
```
function* MyGen() {
  yield 11;
  yield 12;
  yield 13;
}

var myGen = MyGen();
console.log(myGen.next().value) // 11
console.log(myGen.next().value) // 12
console.log(myGen.next().value) // 13
```

#### 传值示例
```
function * MyGen3() {
  var var1 = yield 1;
  var var2 = yield var1 + 1;
  var var3 = yield var2 + 1;
  console.log(var1, var2, var3);
}

var myGen3 = MyGen3();
var firstNext = myGen3.next(); // {value: 1, done: false}
console.log(firstNext);
var secondNext = myGen3.next(firstNext.value); // {value: 2, done: false}
console.log(secondNext);
var thirdNext = myGen3.next(secondNext.value); // {value: 3, done: false}
console.log(thirdNext);
myGen3.next(thirdNext.value)
// console.log(1, 2, 3)
```

### return
return是用来打断generator继续往下走的，通过给return方法传值，可以指定最后一次的value，在return之后仍然可以执行generator，只不过，返回值都是{value:undefined, done:true}

示例
```
function* MyGen() {
  yield 11;
  yield 12;
  yield 13;
}

var myGen2 = MyGen();
console.log(myGen2.next()) // {value:"11", done: false}
console.log(myGen2.return("done")) // {value:"done", done:true}
console.log(myGen2.next()) // {value: undeifned, done:true}
```

### throw
throw是用来触发generator内报错的，这样做的好处是不会打断generator内整体的执行流程

#### 示例
```
function * MyGen4() {
  try {
      var firstNext = yield 1;
      console.log(firstNext, '>>>>>>>>>')
  } catch(e) {
    console.log(\`has error: \$\{e\}\`) // You have one
  }
}

var myGen4 = MyGen4();
if(myGen4.next().value === 1){
  myGen4.throw('You have one');
}
```

### 阶段总结
Generator【生产者】其实更像一个生产机器，在内部执行的所有流程都可以在外部通过next, throw, return的方式控制流程，所以有时候在看代码的时候发现如ajax异步请求怎么会和generator有关系呢，一时疑惑不解，但是现在我们也可以来做一个小例子来解释以下generator和promise

#### promise的例子

**伪造的ajax方法**
```
/**
  * @param {string} - url anyurl，it just a demo
  */
function ajax(url, isErrorCase) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isErrorCase) {
        reject("You have an error");
      } else {
        resolve("Request successs")
      }
    }, 1000);
  })
}

export default ajax;

```

**执行generator部分的代码**
```
function * MyGen5 (showErrorCase) {
  try {
    const result = yield ajax('https://www.baidu.com/some.json', showErrorCase);
    console.log(result); // Reuest Success
  } catch(e) {
    console.log(e);
  }

}
var myGen5 = MyGen5();
var ajaxSuccessResult = myGen5.next().value;
ajaxSuccessResult.then((value)=>{
  myGen5.next(value);
});

var myGen6 = MyGen5(true);
var ajaxErrorResult = myGen6.next().value;
ajaxErrorResult.then((value)=>{

}).catch((e)=>{
  myGen6.throw(e);
});
```

#### 最后部分在generator里面调用generator
在generator里面执行generator，只能在前面再加上yield `*`,否则只能返回{value: Generator, done: false},而不能实际返回generator中yield的值

```
function * MyGen6 () {
  yield 11;
  yield 12;
}

function * MyGen7 () {
  yield * MyGen6()
  yield 12;
  yield 13;
}

var myGen7 = MyGen7();
console.log(myGen7.next());
console.log(myGen7.next());
console.log(myGen7.next());
console.log(myGen7.next());
console.log(myGen7.next());
```

### 快速遍历generator中的值，使用for ... of
能够实现遍历其实就是实现了如下接口
```
{
  [Sybmol.iterator](){
    return {
      next() {
        return {
          value: xxx,
          done: true/false
        }
      }
    }
  }
}
```

一个对象实现了[Sybmol.iterator]接口就可以实现遍历，其实这个接口一个看就是generator的接口
那么我们来搞一下
**迭代器创建器编码**
```
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

```

**运行逻辑**
```
import IteratorMaker from './IteratorMaker';
var iteratorObj = IteratorMaker({"a":1, "b":2, "c":3});
for(var value of iteratorObj) {
  console.log(value)
}
```
