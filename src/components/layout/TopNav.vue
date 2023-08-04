<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar color="" prominent class="top-nav px-10" elevation="0">
    <v-toolbar-title class="nav-header text-black"> </v-toolbar-title>

    <!-- <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
    <a class="login-btn rounded-pill px-5 py-3" @click="onNavBtnClick"
      >{{ toggleBtnText }}
    </a>
  </v-app-bar>
</template>
    <script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TopNav",
  data: () => ({
    btnText: "Log In",
  }),
  methods: {
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
  border-bottom: 2px solid #e3dfdf;
  display: flex;
  justify-items: flex-end;
  /* background-color: #54595f; */
}
.top-nav-container {
  border: 2px solid red;
}
.logo-item {
  width: 20px;
  border: 2px solid red;
}
.nav-header {
  font-size: 25px;
}
.login-btn {
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #ca6b14;
  transition: all 0.8s;
}
.login-btn:hover {
  opacity: 0.8;
}
</style>