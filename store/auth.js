import Cookie from 'cookie' // для парсинга куки
import Cookies from 'js-cookie' // для записи и удаления куки
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null
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
      // /api/auth/admin/login этот путь записывается в файле server/routes/auth.routes.js
      const {token} = await this.$axios.$post('/api/auth/admin/login', formData)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, {root: true}) // root: true означает что мы смотрим на setError в корне
      throw e // для того чтобы мы в методе login попали в catch
    }
  },
  async createUser({commit}, formData) {
    try {
      await this.$axios.$post('/api/auth/admin/create', formData)
    } catch (error) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  // Отправляем полученный токен в мутации
  setToken({commit}, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    Cookies.set('jwt-token', token)
  },
  logout({commit}) {
    this.$axios.setToken(false)
    commit('clearToken')
    Cookies.remove('jwt-token')
  },
  autoLogin({dispatch}) {
    const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie // забираем все существующие куки либо с сервера либо с фронта
    const cookies = Cookie.parse(cookieStr || '') || {} // парсим куки при помощи библиотеки
    const token = cookies['jwt-token'] // сохраняем из куков значение токена

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  }
}

export const getters = {
  // Отправляем булево значение в зависимости от того получен токен или нет
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token,
}

function isJWTValid(token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}