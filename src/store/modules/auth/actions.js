export default {
  addUserInfo({ commit }, payload) {
    console.log(payload);
    localStorage.setItem("token", JSON.stringify("Bearer " + payload.token));
    localStorage.setItem("user", JSON.stringify(payload.user));
    commit("setToken", "Bearer " + payload.token);
    commit("setUser", payload.user);
  },
  logOut({ commit }, _) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    commit("setToken", "");
    commit("setUser", null);
  },
};
