console.log('starting app');

setTimeout(() => {
  console.log('timeout');
},2000);

setTimeout(() => {
  console.log('my 0 timeout');
},0);


console.log('finishing app');