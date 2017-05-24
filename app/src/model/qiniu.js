import Sequelize from 'sequelize'
// import { getUrl } from '../../utils/qiniu/index'
import msg from '../../utils/msg';

const { STRING, INTEGER } = Sequelize;

const sequelize = new Sequelize(dbName, null, null, {
  dialect: 'sqlite',
  storage: 'data.db',
  port,
  define: {
    underscored: true
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  logging: () => {}
})

const File = sequelize.define('file', {
  bucket: STRING,
  parentDir: STRING,
  dir: STRING,
  name: STRING,
  fsize: INTEGER,
  mimeType: STRING
})

File.sync()

// const createUrl = query => `http://${getUrl(bucket)[0]}/${query.path}/${query.filename}`

export async function insertFile(data) {
  const delimiter = '/'
  const { bucket, key, fsize, mimeType } = data
  const keyAttr = key.split(delimiter).reverse()
  const name = keyAttr[0]
  const dir = keyAttr.length > 1 ? keyAttr.slice(1).join(delimiter).reverse() : ''
  const parentDir = keyAttr.length > 2 ? keyAttr.slice(2).join(delimiter).reverse() : ''
  const file = await File.create({
    bucket,
    parentDir,
    dir,
    name,
    fsize,
    mimeType
  })

  return re
}

export async function getDirs(data) {
  const dirs = await File.findAll({
    attributes: [[sequelize.literal('distinct `dir`'),'dir']],
    where: {
      bucket: data.bucket,
      parentDir: data.dir || ''
    }
  })
}

export async function getFiles(data) {
  const files = await File.findAll({
    attributes: ['name', 'fsize', 'mimeType'],
    where: {
      dir: data.dir || ''
    },
    limit: +data.pageSize,
    offset: data.pageSize * (data.page - 1)
  });

  return files;
}

export async function getFile(data) {
  const file = await File.findOne({
    attributes: ['name', 'fsize', 'mimeType'],
    where: {
      dir: data.dir || '',
      name: data.name
    }
  });

  return file;
}
