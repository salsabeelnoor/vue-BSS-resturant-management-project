<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar color="" prominent class="top-nav px-10" elevation="0">
    <v-toolbar-title class="nav-header text-black">
      <v-btn icon="mdi-format-align-justify"></v-btn
    ></v-toolbar-title>

    <!-- <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
    <v-btn class="login-btn" size="large" @click="onNavBtnClick"
      >{{ toggleBtnText }}
    </v-btn>
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
}

.nav-header {
  font-size: 25px;
}
.login-btn {
  font-size: 16px;
  text-transform: capitalize;
  cursor: pointer;
  background-color: #326383;
  color: white;

  /* color: #222;
  border: 2.5px solid #326383; */
}
.login-btn:hover {
  opacity: 0.8;
}
</style>