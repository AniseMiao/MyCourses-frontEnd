function createCookie (name, value, expireHour) {
  let date = new Date()
  date.setTime(date.getTime() + (expireHour * 60 * 60 * 1000))
  let expires = '; expires=' + date.toUTCString()
  document.cookie = name + '=' + value + expires + '; path=/'
}

function readCookie (name) {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) {
    return (arr[2])
  } else {
    return null
  }
}

function eraseCookie (name) {
  createCookie(name, '', -1)
}

export {
  createCookie,
  readCookie,
  eraseCookie
}
