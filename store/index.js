export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}

export const mutations = {
  setUser (state, user) {
    if (user) {
      state.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }
    } else {
      state.user = null
    }
  }
}

export const actions = {
  setUser ({ commit }, user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('setUser', user)
        resolve()
      }, 1000)
    })
  }
}
