import Vue from "vue";
import Vuex from "vuex";
import { login, logout, getInfo } from './api/login'
import { getToken, setToken, removeToken } from './utils/auth'
import * as types from './utils/type'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      token: null,
      name: '',
      avatar: '',
      roles: [],
      selectList: '',
      title: '',
      user: {}
  },
  mutations: {
      [types.LOGIN]: (state, data) => {
          localStorage.token = data;
          state.token = data;
      },
      [types.LOGOUT]: (state) => {
          localStorage.removeItem('token');
          state.token = null
      },
      [types.TITLE]: (state, data) => {
          state.title = data;
      }
  },
  actions: {
    Login({ commit }, userInfo) {
        const  username = userInfo.username.trim()
        return new Promise((resolve , reject) => {
          login(username,userInfo.password).then(res => {
            const data = res.data
              setToken(data.token)
              commit('SET_TOKEN', data.token)
              resolve()
          }).catch(error => {
            reject(error)
          })

        })
    },
    GetInfo({ commit, state }) {
          return new Promise((resolve, reject) => {
              getInfo(state.token).then(response => {
                  const data = response.data
                  if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                      commit('SET_ROLES', data.roles)
                  } else {
                      reject('getInfo: roles must be a non-null array !')
                  }
                  commit('SET_NAME', data.name)
                  commit('SET_AVATAR', data.avatar)
                  resolve(response)
              }).catch(error => {
                  reject(error)
              })
          })
      },
    LogOut({ commit, state }) {
          return new Promise((resolve, reject) => {
              logout(state.token).then(() => {
                  commit('SET_TOKEN', '')
                  commit('SET_ROLES', [])
                  removeToken()
                  resolve()
              }).catch(error => {
                  reject(error)
              })
          })
      },
    FedLogOut({ commit }) {
          return new Promise(resolve => {
              commit('SET_TOKEN', '')
              removeToken()
              resolve()
          })
      }
  },
  getters : {
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      token: state => state.user.token,
      avatar: state => state.user.avatar,
      name: state => state.user.name,
      roles: state => state.user.roles
  }
});
