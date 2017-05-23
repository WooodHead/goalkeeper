import * as types from './mutation-types'
import Qiniu from '../../qiniu/index'

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER)
}

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER)
}

export const changeAccessKey = ({ commit }, e) => {
  commit(types.CHANGE_ACCESS_KEY, e.target.value)
}

export const changeSecretKey = ({ commit }, e) => {
  commit(types.CHANGE_SECRET_KEY, e.target.value)
}

export const openSetting = ({ commit }) => {
  commit(types.OPEN_SETTING)
}

export const confirmSetting = ({ commit, state }) => {
  commit(types.CONFIRM_SETTING)
  getBuckets({ commit, state })
}

export const cancelSetting = ({ commit }) => {
  commit(types.CANCEL_SETTING)
}

export const getBuckets = ({ commit, state }) => {
  const { accessKey, secretKey } = state.cdnConfigs
  const qiniu = new Qiniu({ accessKey, secretKey })
  qiniu
    .getBuckets()
    .then((res) => {
      if (res.status !== 200) throw new Error('网络错误')
      commit(types.CHANGE_BUCKETS, res.data)
      changeBucket({ commit }, '')
    })
    .catch((err) => {
      commit(types.CHANGE_BUCKETS, [])
      changeBucket({ commit }, '')
      this.$notify.warning({ content: '网络错误' })
    })
}

export const changeBucket = ({ commit }, bucket) => {
  commit(types.CHANGE_BUCKET, bucket)
}
