<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar color="" prominent class="top-nav px-10">
    <v-toolbar-title class="nav-header text-white"
      >BSS Restaurant System</v-toolbar-title
    >

    <!-- <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
    <v-btn class="login-btn rounded-pill" @click="onNavBtnClick"
      >{{ toggleBtnText }}
    </v-btn>
  </v-app-bar>
  <!-- <v-main>
    <router-view></router-view>
  </v-main> -->
  <!-- <v-app-bar prominent class="top-nav">
    <v-container class="d-flex">
      <v-app-bar-nav-icon
        variant="text"
        class="nav-bar-icon"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="text-white nav-title">
        BSS Restaurant
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="login-btn" @click="$router.push('/login')">Log in </v-btn>
    </v-container>
  </v-app-bar> -->
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
  background-color: #54595f;
}
.top-nav-container {
  border: 2px solid red;
}
.nav-header {
  font-size: 25px;
  /* font-weight: 600; */
}
.login-btn {
  color: #fff;
  background-color: rgb(225, 102, 39);
  transition: all 1s;
}
.login-btn:hover {
  background-color: transparent;
  border: 2px solid rgb(225, 102, 39);
}
</style>