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
console.log('123')
export default ajax;
