const state = {
  password: '',
  settings: null
}

const mutations = {
  SET_PASSWORD (state, payload) { state.password = payload },
  SET_SETTINGS (state, payload) { state.settings = payload }
}

const actions = {
}

const getters = {
  GET_PASSWORD: state => state.password,
  GET_SETTINGS: state => state.settings
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
