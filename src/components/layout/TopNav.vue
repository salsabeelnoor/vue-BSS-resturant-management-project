<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar color="" prominent class="top-nav" elevation="0">
    <v-toolbar-title class="nav-header text-black">
      <v-btn
        @click="toggleDashboard"
        icon="mdi-format-align-justify "
        class="text-white"
      ></v-btn
    ></v-toolbar-title>
    <v-btn class="login-btn" @click="onNavBtnClick">
      <v-icon icon="mdi-logout" class="d-flex d-md-none"></v-icon>
      <p class="d-none d-md-flex">{{ toggleBtnText }}</p>
    </v-btn>
  </v-app-bar>
</template>
    <script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "TopNav",
  data: () => ({
    btnText: "Log In",
    toggleDashBoard: false,
  }),
  methods: {
    ...mapMutations(["TOGGLE_DASHBOARD"]),
    toggleDashboard() {
      this.TOGGLE_DASHBOARD();
    },
    ...mapActions(["logOut"]),
    renderImage() {
      return new URL("../../assets/logo-images/bLogo_2.png", import.meta.url)
        .href;
    },
    onNavBtnClick() {
      if (this.btnText === "Log Out") {
        this.logOut();
      }
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["user"]),
    toggleBtnText() {
      if (this.user) {
        return (this.btnText = "Log Out");
      } else {
        return (this.btnText = "Log In");
      }
    },
  },
};
</script>
<style scoped>
.top-nav {
  width: 80%;
  margin: 0 auto;
  color: black;
  background-color: #e6683c;
  /* background-image: linear-gradient(
      to bottom,
      rgba(106, 29, 3, 0.747) 0%,
      rgba(75, 74, 74, 0.73) 50%
    ),
    url("../../assets/bg-image/bg_2.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  /* background-color: #fdfdfa; */
  border-bottom: 2px solid #e3dfdf;
}
.nav-header {
  font-size: 25px;
}
.login-btn {
  border-radius: 0px;
  font-size: 16px;
  letter-spacing: 0;
  text-transform: capitalize;
  cursor: pointer;
  background-color: #fff;
  /* border: 2px solid #cc2366; */
  color: black;
}
.login-btn:hover {
  opacity: 0.8;
}
</style>