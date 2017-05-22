import * as types from './mutation-types'

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

export const confirmSetting = ({ commit }) => {
  commit(types.CONFIRM_SETTING)
}

export const cancelSetting = ({ commit }) => {
  commit(types.CANCEL_SETTING)
}
