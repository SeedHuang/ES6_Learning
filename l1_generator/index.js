import ajax from './ajax';
import IteratorMaker from './iteratormaker';

const container = document.querySelector('#common');
container.innerHTML = `
  function* MyGen() {
    yield 11;
    yield 12;
    yield 13;
  }

  var myGen = MyGen();
  console.log(myGen.next().value) // 11
  console.log(myGen.next().value) // 12
  console.log(myGen.next().value) // 13
`;

function* MyGen() {
  yield 11;
  yield 12;
  yield 13;
}

var myGen = MyGen();
console.log(myGen.next().value) // 11
console.log(myGen.next().value) // 12
console.log(myGen.next().value) // 13
//

const returnContainer = document.querySelector('#return');

returnContainer.innerHTML = `
var myGen2 = MyGen();
console.log(myGen2.next()) // {value:"11", done: false}
console.log(myGen2.return("done")) // {value:"done", done:true}
console.log(myGen2.next()) // {value: undeifned, done:true}
`;
/**return*/
console.log("return", "-------------");
var myGen2 = MyGen();
console.log(myGen2.next()) // {value:"11", done: false}
console.log(myGen2.return("done")) // {value:"done", done:true}
console.log(myGen2.next()) // {value: undeifned, done:true}

/**next**/
console.log("next", "-------------");

const nextContainer = document.querySelector('#next');

nextContainer.innerHTML = `
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
`

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

console.log("throw", "-------------");

const throwContainer = document.querySelector('#throw');
throwContainer.innerHTML = `
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
`
function * MyGen4() {
  try {
      var firstNext = yield 1;
      console.log(firstNext, '>>>>>>>>>')
  } catch(e) {
    console.log(`has error: ${e}`)
  }
}

var myGen4 = MyGen4();
if(myGen4.next().value === 1){
  myGen4.throw('You have one');
}


console.log("promise", "-------------");
const promiseContainer = document.querySelector('#promise');
const promiseText = `
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
`;
promiseContainer.innerHTML = promiseText;

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

console.log("a generator call in generator", "-------------");

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

var iteratorObj = IteratorMaker({"a":1, "b":2, "c":3});
for(var value of iteratorObj) {
  console.log(value)
}
