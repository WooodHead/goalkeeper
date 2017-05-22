import * as types from '../mutation-types'

const state = {
  accessKey: '',
  secretKey: '',
  lastAccessKey: '',
  lastSecretKey: '',
  showSetting: false,
  buckets: [],
  bucket: ''
}

const mutations = {
  [types.CHANGE_ACCESS_KEY](state, key) {
    state.accessKey = key
  },
  [types.CHANGE_SECRET_KEY](state, key) {
    state.secretKey = key
  },
  [types.OPEN_SETTING](state) {
    state.lastAccessKey = state.accessKey
    state.lastSecretKey = state.secretKey
    state.showSetting = true
  },
  [types.CONFIRM_SETTING](state) {
    state.showSetting = false    
  },
  [types.CANCEL_SETTING](state) {
    state.showSetting = false
    state.accessKey = state.lastAccessKey
    state.secretKey = state.lastSecretKey
  }
}

export default {
  state,
  mutations
}
