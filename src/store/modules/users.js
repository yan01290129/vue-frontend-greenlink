const users = {
  state: {
    user: '',
    roles: []
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 登录登出
    LoginOut({ commit }, users) {
      commit('SET_USER', users)
      commit('SET_ROLES', users)
    },
    // 动态修改权限
    ChangeRoles({ commit }) {
      commit('SET_ROLES')
    }
  }
}

export default users
