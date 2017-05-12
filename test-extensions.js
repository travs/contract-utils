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
        var errstr = error.toString();
        var newErrMsg = errstr.indexOf('invalid opcode') != -1;
        var oldErrMsg = errstr.indexOf('invalid JUMP') != -1;
        if(!newErrMsg && !oldErrMsg)
          assert(false, 'Did not receive expected error message');
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
