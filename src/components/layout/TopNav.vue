<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar color="#6B7A8F" prominent class="top-nav px-10">
    <v-btn icon="mdi-food"></v-btn>

    <v-toolbar-title class="font-weight-medium"
      >BSS Restaurant System</v-toolbar-title
    >

    <!-- <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
    <v-btn class="login-btn" @click="onNavBtnClick">{{ toggleBtnText }} </v-btn>
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
  background-color: #143d6b;
}
.top-nav-container {
  border: 2px solid red;
}
.nav-bar-icon {
}
.nav-title {
  border: 2px solid red;
}
.login-btn {
  color: rgb(26, 21, 13);
  background-color: #f7c331;
}
</style>