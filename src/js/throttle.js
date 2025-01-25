const throttle = (callee, timeout) => {
  let timer = null
  return (...args) => {
    if (timer) return
    timer = setTimeout(() => {
      callee(...args)
      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}

export default throttle
