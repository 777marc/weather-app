var asyncAdd =(a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a+b);
      }
      else {
        reject('input parameters must be numbers!');
      }
    },1500);
  });
}

asyncAdd(5,7).then((res) => {
  console.log('Result:', res);
  return asyncAdd(res,55);
}).then((res) => {
  console.log('New Result:', res);
}).catch((errorMessage) => {
  console.log('Error:', errorMessage);
});


// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     //resolve('it worked!');
//     reject('rejected!');
//   },2500);
// });

// somePromise.then((message) => {
//   console.log('Success:', message);
// }, (errorMessage) => {
//   console.log('Error:', errorMessage);
// });