import Sequelize from 'sequelize'
import { port, dbName, account, password } from '../../config/db'
import { getUrl } from '../../utils/qiniu/index'
// import { bucket } from '../../utils/qiniu/config';
import msg from '../../utils/msg';

const { STRING, INTEGER } = Sequelize;

const sequelize = new Sequelize(dbName, account, password, {
  dialect: 'mysql',
  host: 'localhost',
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
});

const Folder = sequelize.define('folder', {
  path: STRING,
  name: STRING
})

const File = sequelize.define('file', {
  bucket: STRING,
  path: STRING,
  name: STRING,
  fsize: INTEGER,
  mimeType: STRING,
  url: STRING
})

Folder.sync()
File.sync()

const createUrl = query => `http://${getUrl(bucket)[0]}/${query.path}/${query.filename}`;

export async function insertFile(data) {
  const { path = '', name, fsize, mimeType } = data
  const file = await File.create({
    path,
    name,
    fsize,
    mimeType
  });

  // 上传真实cdn

  return re;
}

export async function getFiles(data) {
  const files = await File.findAll({
    where: {
      path: data.path || ''
    },
    limit: +data.pageSize,
    offset: data.pageSize * (data.page - 1)
  });

  return files;
}

export async function getFile(data) {
  const file = await File.findOne({
    where: {
      path: data.path,
      name: data.name
    }
  });

  return file;
}
