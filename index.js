async function asyncPromise(par1) {
  return new Promise((resolve, reject) => {
    if (par1 < 0 || par1 > 50000) {
      reject(new RangeError('Par1 is Invalid'))
    } else if (typeof par1 === 'string') {
      reject(new TypeError('Par1 is Not a Number'))
    }

    const timeout = 1000 + par1
    setTimeout(() => {
      if (timeout > 25000) {
        reject(new Error('Server Timeout'))
      } else {
        resolve(par1 * 2)
      }
    }, 1000 + par1)
  })
}

async function asyncCB(par1, cb) {
  await asyncPromise(par1)
    .then((result) => {
      cb(null, result)
      asyncCB(result, cb)
    })
    .catch((err) => {
      cb(err)
    })
}

function myCallback(err, result) {
  if (err) {
    console.log(`ERR: ${err}`)
  } else {
    console.log(`SUCCESS: ${result}`)
  }
}

asyncCB(30, myCallback)
