export default {
  addUserInfo({commit}, payload) {
    localStorage.setItem("token", JSON.stringify(payload.token));
    localStorage.setItem("user", JSON.stringify(payload.user));
    commit('setToken', payload.token)
    commit('setUser', payload.user)
  },
  logOut({commit}, _) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    commit('setToken', '')
    commit('setUser', null)
  }
}