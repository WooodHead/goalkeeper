import Qiniu from './helper'
// import db from '../model/qiniu'

export const fetchFiles = (op) => {
  const qiniu = new Qiniu({
    accessKey: op.accessKey,
    secretKey: op.secretKey
  })
  qiniu.getFiles({
    bucket: op.buckets[0],
    marker: op.marker || ''
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}