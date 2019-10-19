export const state = () => ({
  token: true
})

export const mutations = {
  // Присваиваем токен в стейт
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  // Логин
  async login({commit, dispatch}, formData) {
    try {
      const token = await new Promise((resolve, reject) => {
        setTimeout(() => resolve('mock-token'), 2000)
      })
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, {root: true}) // root: true означает что мы смотрим на setError в корне
      throw e // для того чтобы мы в методе login попали в catch
    }
  },
  async createUser({commit}, formData) {
    try {
      console.log('createUser', formData);
    } catch (error) {
      
    }
  },
  // Отправляем полученный токен в мутации
  setToken({commit}, token) {
    commit('setToken', token)
  },
  logout({commit}) {
    commit('clearToken')
  }
}

export const getters = {
  // Отправляем булево значение в зависимости от того получен токен или нет
  isAuthenticated: state => Boolean(state.token)
}