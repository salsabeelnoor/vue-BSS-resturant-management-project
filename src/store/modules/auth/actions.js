export default {
  addUserInfo({commit}, payload) {
    console.log("addUserInfo", payload);
    localStorage.setItem("token", JSON.stringify(payload.token));
    localStorage.setItem("user", JSON.stringify(payload.user));
    commit('setToken', payload.token)
    commit('setUser', payload.user)
  },
  logOut({commit}) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    commit('setToken', '')
    context.commit('setUser', null)
  }
}