import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from "axios";

Vue.use(Vuex)

const Store = new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    tokens: {
      access_token: null,
      expires_in: null,
      refresh_token: null,
      token_type: null,
    },
    currentUser: {
      name: null,
      email: null,
    },
  },

  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        let data = {
          client_id: 2,
          client_secret: 'dOjwKuRQ9DZBSfqVgaIOv5jIWagzQ3iNJj73lTCz',
          grant_type: 'password',
          username: user.email,
          password: user.password,
        };

        axios.post(API.login, data)
          .then(response => {
            let responseData = response.data
            let now = Date.now()

            responseData.expires_in = responseData.expires_in + now

            context.commit('updateTokens', responseData)

            axios.defaults.headers.common['Authorization'] = `Bearer ${responseData.access_token}`;

            resolve(response)
          })
          .catch(response => {
            reject(response)
          })
      })
    },
    getCurrentUser(context) {
      return new Promise((resolve, reject) => {
        axios.get(API.user)
          .then(response => {
            let responseData = response.data

            context.commit('updateCurrentUser', responseData)

            resolve(response)
          })
          .catch(response => {
            reject(response)
          })
      })
    },
  },

  mutations: {
    updateTokens(state, tokens) {
      state.tokens = tokens
    },
    updateCurrentUser(state, currentUser) {
      state.currentUser = currentUser
    },
  },

  getters: {
    getAccessToken(state) {
      return state.tokens.access_token
    },
    getCurrentUser(state) {
      return state.currentUser
    },
  },

})

export default Store
