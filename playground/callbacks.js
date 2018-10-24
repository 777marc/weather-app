var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Massa'
  }

  setTimeout(() => {
    callback(user);
  },1000);
  
};

getUser(123, (user) => {
  console.log(user);
});