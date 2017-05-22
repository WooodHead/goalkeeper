import crypto from 'crypto'
import url from 'url'
import util from 'util'

/**
 * 获取头部信息
 * @param {Object} conf
 */
function getHeaders(conf) {
  return {
    'Content-Type': conf.contentType || 'application/x-www-form-urlencoded',
    'Authorization': util.format('%s %s', conf.auth, getCer(conf))
  }
}

/**
 * 获取管理凭证
 * @param {Object} conf
 */
function getCer(conf) {
  const urlObj = url.parse(conf.url)
  const signingStr = util.format('%s%s\n%s', urlObj.path, conf.query ?
    `?${conf.query}` :
    '', conf.body || '')
  const sign = crypto.createHmac('sha1', conf.secretKey).update(signingStr).digest()
  const encodedSign = new Buffer(sign)
    .toString('base64')
    .replace(/\//g, '_')
    .replace(/\+/g, '-')

  return util.format('%s:%s', conf.accessKey, encodedSign)
}

export default getHeaders
