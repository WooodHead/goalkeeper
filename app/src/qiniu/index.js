// import querystring from 'querystring';
import axios from 'axios';
import qiniu from 'qiniu';
import auth from './auth';
import httpAdapter from 'axios/lib/adapters/http'

axios.defaults.adapter = httpAdapter

export default class Qiniu {
  constructor(op) {
    this.accessKey = op.accessKey
    this.secretKey = op.secretKey
    qiniu.conf.ACCESS_KEY = op.accessKey
    qiniu.conf.SECRET_KEY = op.secretKey
    this.qiniu = qiniu
  }

  getBucketList() {
    const url = 'http://rs.qbox.me/buckets'
    return axios({
      method: 'GET',
      url,
      headers: auth({
        url,
        auth: 'QBox',
        accessKey: this.accessKey,
        secretKey: this.secretKey
      })
    });
  }
}


/**
 * 获取空间列表
 */
export function getBucket() {
  const url = 'http://rs.qbox.me/buckets';
  return axios({
    method: 'GET',
    url,
    headers: auth({
      url,
      auth: 'QBox'
    })
  });
}

/**
 * 获取空间域名
 * @param {*} bucket 空间名
 */
export function getUrl(bucket) {
  const url = 'http://qpi.qiniu.com/v6/domain/list';
  return axios({
    method: 'GET',
    url,
    headers: auth({
      url,
      auth: 'QBox'
    }),
    params: {
      tbl: bucket
    }
  });
}

/**
 * 获取文件列表
 * @param {*} params
 */
// export function getList(params) {
//   const url = 'http://rsf.qbox.me/list';
//   return axios({
//     method: 'POST',
//     url,
//     headers: auth({
//       url,
//       query: querystring.stringify(params),
//       auth: 'QBox'
//     }),
//     params
//   });
// }

/**
 * 上传单个文件
 * @param {*} bucket 空间
 * @param {*} key 文件在七牛空间上的key
 * @param {*} localFilePath 本地文件路径
 */
// export async function uploadFile(bucket, key, localFilePath) {
//   const putPolicy = new qiniu.rs.PutPolicy(`${bucket}:${key}`);
//   const token = putPolicy.token();
//   const extra = new qiniu.io.PutExtra();
//   const res = await qiniu.io.putFile(token, key, localFilePath, extra);
//   return res;
// }
export async function uploadFile(bucket, fileData) {
  const key = `${fileData.path}/${fileData.name}`;
  const putPolicy = new qiniu.rs.PutPolicy(`${bucket}:${key}`);

  return axios({
    method: 'POST',
    url: 'http://upload.qiniu.com',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: {
      key,
      file: fileData.name,
      fileBinaryData: fileData.data,
      uploadToken: putPolicy.token
    }
  });
}

/**
 * 下载单个文件
 * @param {*} key 文件在七牛空间上的key
 */
export async function downloadFile(url, key) {
  const policy = new qiniu.rs.GetPolicy();
  const downloadUrl = policy.makeRequest(`${url}/${key}`);
  return downloadUrl;
}
