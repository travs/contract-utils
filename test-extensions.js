// any extensions to the testing framework we might need
function assertThrows (fn, args, msg) {
  /*
  Asserts that `fn(args)` will throw an `invalid JUMP` error.
  Errors with message `msg` otherwise.
  This is necessary since this error is not caught (see https://goo.gl/WTYb4k).
  */
  return new Promise(
    function(resolve, reject){
      fn.apply(this, args)
      .then(() => {
        assert(false, 'No error thrown.');
        resolve();
      },
      (error) => {
        assert.include(error.toString(), 'invalid JUMP', msg + '\n\n' + error.toString());
        resolve();
      })
  })
}

function balanceFor (addr) {
  // return balance of `addr` as a Promise rather than using callbacks
  return new Promise(function(resolve, reject){
    web3.eth.getBalance(addr, function(err,res){
      if (err) reject(err);
      else resolve(res);
    });
  });
}


module.exports = {
  assertThrows,
  balanceFor
}
