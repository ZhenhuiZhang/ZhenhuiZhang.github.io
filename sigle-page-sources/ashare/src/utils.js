export function getUrlVars(url) { let vars = {}; let parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) { vars[key] = value }); return vars }
export function getMainDomain() {
  // 去掉端口号
  let domain = window.location.host.replace(/:\d*$/, '').split('.')
  if (domain.length > 2) {
    domain = domain.slice(1)
  }
  return domain.join('.')
}
export function isMobile() {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}
export function getNextUrl(params) {
  let origin = window.location.origin.split('.')
  if (/^(https?:\/\/)?h5/.test(origin[0])) {
    return false
  } else if (origin.length > 2) {
    // 如果网站分三段, 则把第一个替换成h5
    origin[0] = origin[0].replace(/^(https?:\/\/)?.+/, '$1h5')
  } else {
    // 如果网站少于三段, 则把h5添加到host
    // /^(https?:\/\/)$/.test('https://s')
    origin[0] = origin[0].replace(/^(https?:\/\/)?(.+)/, '$1h5.$2')
  }
  return origin.join('.') + `/#/qrsignup/${params.codeid}`
}
