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

async function asyncParallel1(par1) {
  return new Promise((resolve, reject) => {
    if (par1 < 0 || par1 > 50000) {
      reject(new RangeError('Par1 is Invalid'))
    } else if (typeof par1 === 'string') {
      reject(new TypeError('Par1 is Not a Number'))
    }

    setTimeout(() => {
      if (par1 / 2 > 10000) {
        reject(new Error('Parallel #1 Timeout'))
      } else {
        resolve(true)
      }
    }, par1 / 2)
  })
}

async function asyncParallel2(par1) {
  return new Promise((resolve, reject) => {
    if (par1 < 0 || par1 > 50000) {
      reject(new RangeError('Par1 is Invalid'))
    } else if (typeof par1 === 'string') {
      reject(new TypeError('Par1 is Not a Number'))
    }

    setTimeout(() => {
      if (par1 / 3 > 10000) {
        reject(new Error('Parallel #2 Timeout'))
      } else {
        resolve(true)
      }
    }, par1 / 3)
  })
}

async function asyncParallel3(par1) {
  return new Promise((resolve, reject) => {
    if (par1 < 0 || par1 > 50000) {
      reject(new RangeError('Par1 is Invalid'))
    } else if (typeof par1 === 'string') {
      reject(new TypeError('Par1 is Not a Number'))
    }

    setTimeout(() => {
      if (par1 / 4 > 10000) {
        reject(new Error('Parallel #3 Timeout'))
      } else {
        resolve(true)
      }
    }, par1 / 4)
  })
}

async function runAsyncParallels(par1) {
  const promise1 = asyncParallel1(par1)
  const promise2 = asyncParallel2(par1)
  const promise3 = asyncParallel3(par1)

  Promise.allSettled([promise1, promise2, promise3])
    .then((result) => {
      console.log('all parallel calls completed')
      result.forEach((element) => {
        if (element.reason !== undefined) {
          console.log(element.reason.toString())
        } else {
          console.log(element.value.toString())
        }
      })
    })
}

async function asyncCB(par1, cb) {
  runAsyncParallels(par1)
  asyncPromise(par1)
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
