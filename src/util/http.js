// 网络请求

const $get = (url, obj) => {
  // 拼接 url
  if (obj) {
    url = url + _serialize(obj)
  }

  let xhr = new window.XMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhr.open('GET', url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText)
      }
    }
    xhr.send()
  })
}

const _serialize = (data) => {
  if (!data || typeof data !== 'object') {
    return ''
  }

  let pairs = []

  for (let k in data) {
    if (typeof data[k] === 'function') {
      continue
    }
    let v = data[k].toString()
    let key = encodeURIComponent(k)
    let value = encodeURIComponent(v)
    pairs.push(key + '=' + value)
  }

  return pairs.join('&')
}

export default {
  $get
}
